import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, User, Vehicle } from '../types';
import { VEHICLE_DATA } from '../data/vehicles';
import { Language, translations, getLocalized } from '../translations';
import { auth, db } from '../lib/firebase';
import { 
  onAuthStateChanged, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification 
} from 'firebase/auth';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  query, 
  where,
  getDoc,
  serverTimestamp
} from 'firebase/firestore';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  user: User | null;
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  vehicles: Vehicle[];
  addVehicle: (vehicle: Vehicle) => void;
  updateVehicle: (vehicle: Vehicle) => void;
  deleteVehicle: (vehicleId: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartQty: (productId: number, delta: number) => void;
  clearCart: () => void;
  placeOrder: (orderDetails: any) => Promise<void>;
  login: () => Promise<void>;
  loginEmail: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resendVerification: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string | number) => Promise<void>;
  deleteOrder: (orderId: string | number) => Promise<void>;
  toggleOrderStatus: (order: Order) => Promise<void>;
  updateUser: (user: User) => void;
  requestRestockNotification: (productId: number, email: string) => void;
  requestPriceAlert: (productId: number, email: string, targetPrice: number) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getLocalized: (value: any) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);
  
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(() => {
    const saved = localStorage.getItem('selected_vehicle');
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    return (saved as Language) || 'en';
  });

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const isAdminEmail = firebaseUser.email === 'sprinterpluspz@gmail.com';
        
        try {
          // Sync user profile from Firestore
          const userDoc = doc(db, 'users', firebaseUser.uid);
          const snap = await getDoc(userDoc);
          
          const baseProfile = {
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || 'User',
            role: (isAdminEmail ? 'admin' : 'customer') as 'admin' | 'customer',
            emailVerified: firebaseUser.emailVerified
          };

          if (snap.exists()) {
            const profile = snap.data();
            setUser({
              ...baseProfile,
              name: profile.name || baseProfile.name,
              role: profile.role || baseProfile.role,
              phone: profile.phone,
              address: profile.address,
              emailVerified: firebaseUser.emailVerified
            });
          } else {
            // Create initial profile
            await setDoc(userDoc, baseProfile);
            setUser(baseProfile as User);
          }
        } catch (error) {
          console.error("Error syncing user profile:", error);
          // Fallback to basic info from auth
          setUser({
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || 'User',
            role: isAdminEmail ? 'admin' : 'customer',
            emailVerified: firebaseUser.emailVerified
          });
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Products Listener
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const prods = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as unknown as Product));
      setProducts(prods);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'products'));
    return () => unsubscribe();
  }, []);

  // Vehicles Listener
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'vehicles'), (snapshot) => {
      const vehs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as unknown as Vehicle));
      setVehicles(vehs);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'vehicles'));
    return () => unsubscribe();
  }, []);

  // Orders Listener (Admin sees all, User sees only theirs)
  useEffect(() => {
    if (!auth.currentUser) {
      setOrders([]);
      return;
    }

    const isAdmin = user?.role === 'admin';
    const ordersRef = collection(db, 'orders');
    const q = isAdmin ? ordersRef : query(ordersRef, where('userId', '==', auth.currentUser.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ords = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as unknown as Order));
      setOrders(ords.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'orders'));
    return () => unsubscribe();
  }, [user]);

  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('lang', language), [language]);
  useEffect(() => localStorage.setItem('selected_vehicle', JSON.stringify(selectedVehicle)), [selectedVehicle]);

  const t = (key: string) => translations[key]?.[language] || key;

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (productId: number | string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQty = (productId: number | string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const placeOrder = async (details: any) => {
    if (!auth.currentUser) return;
    try {
      const processedItems = cart.map(item => ({
        ...item,
        isEUOrder: !item.instock || item.quantity <= 0
      }));

      const orderData = {
        ...details,
        userId: auth.currentUser.uid,
        items: processedItems,
        created: serverTimestamp(),
        status: 'new',
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
        hasEUItems: processedItems.some(i => i.isEUOrder)
      };
      await addDoc(collection(db, 'orders'), orderData);
      clearCart();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'orders');
    }
  };

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  };

  const loginEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  };

  const register = async (email: string, pass: string, name: string) => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, pass);
      await sendEmailVerification(firebaseUser);
      
      const userDoc = doc(db, 'users', firebaseUser.uid);
      const profile = {
        email,
        name,
        role: email === 'sprinterpluspz@gmail.com' ? 'admin' : 'customer',
        emailVerified: false,
        created: serverTimestamp()
      };
      await setDoc(userDoc, profile);
    } catch (error) {
      console.error('Registration Error:', error);
      throw error;
    }
  };

  const resendVerification = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateUser = async (u: User) => {
    if (!auth.currentUser) return;
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), u as any);
      setUser(u);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${auth.currentUser.uid}`);
    }
  };
  
  const addProduct = async (p: Omit<Product, 'id'>) => {
    try {
      await addDoc(collection(db, 'products'), {
        ...p,
        created: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'products');
    }
  };

  const updateProduct = async (p: Product) => {
    try {
      const { id, ...data } = p;
      await updateDoc(doc(db, 'products', String(id)), data as any);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `products/${p.id}`);
    }
  };

  const deleteProduct = async (id: string | number) => {
    try {
      await deleteDoc(doc(db, 'products', String(id)));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `products/${id}`);
    }
  };
  
  const deleteOrder = async (id: string | number) => {
    if (!id) return;
    try {
      await deleteDoc(doc(db, 'orders', String(id)));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `orders/${id}`);
    }
  };

  const toggleOrderStatus = async (order: Order) => {
    if (!order || !order.id) {
      console.error('Cannot toggle order status: missing order ID', order);
      return;
    }
    const newStatus = order.status === 'new' ? 'processed' : 'new';
    try {
      const orderRef = doc(db, 'orders', String(order.id));
      await updateDoc(orderRef, { status: newStatus });
      
      // Synchronize stock if moving to processed
      if (newStatus === 'processed') {
        const syncPromises = order.items.map(async (item) => {
          // Find product by SKU to get its ID and current quantity
          const product = products.find(p => p.sku === item.sku);
          if (product && product.id) {
            const productRef = doc(db, 'products', String(product.id));
            const newQty = Math.max(0, product.quantity - item.qty);
            await updateDoc(productRef, {
              quantity: newQty,
              instock: newQty > 0
            });
          }
        });
        await Promise.all(syncPromises);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `orders/${order.id}`);
    }
  };

  const addVehicle = async (v: Vehicle) => {
    try {
      const { id, ...data } = v;
      if (id) {
        await setDoc(doc(db, 'vehicles', String(id)), data);
      } else {
        await addDoc(collection(db, 'vehicles'), data);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'vehicles');
    }
  };

  const updateVehicle = async (v: Vehicle) => {
    try {
      const { id, ...data } = v;
      await updateDoc(doc(db, 'vehicles', String(id)), data as any);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `vehicles/${v.id}`);
    }
  };

  const deleteVehicle = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'vehicles', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `vehicles/${id}`);
    }
  };

  const requestRestockNotification = () => {}; // Placeholder
  const requestPriceAlert = () => {}; // Placeholder

  return (
    <StoreContext.Provider value={{
      products, cart, orders, user, selectedVehicle, setSelectedVehicle, vehicles, addVehicle, updateVehicle, deleteVehicle,
      addToCart, removeFromCart, updateCartQty, clearCart, placeOrder,
      login, loginEmail, register, logout, resendVerification, addProduct, updateProduct, deleteProduct,
      deleteOrder, toggleOrderStatus, updateUser, requestRestockNotification, requestPriceAlert, language, setLanguage, t,
      getLocalized: (val) => getLocalized(val, language)
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) throw new Error('useStore must be used within a StoreProvider');
  return context;
}
