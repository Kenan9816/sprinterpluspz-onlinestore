export type Language = 'en' | 'sq' | 'sr';

export interface Translations {
  [key: string]: {
    en: string;
    sq: string;
    sr: string;
  };
}

export const getLocalized = (value: any, lang: Language): string => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[lang] || value['en'] || '';
};

export const translations: Translations = {
  // Navigation
  home: { en: 'HOME', sq: 'BALLINA', sr: 'POČETNA' },
  products: { en: 'PRODUCTS', sq: 'PRODUKTET', sr: 'PROIZVODI' },
  brands: { en: 'BRANDS', sq: 'BRENDET', sr: 'BRENDOVI' },
  about: { en: 'ABOUT', sq: 'RRETH NESH', sr: 'O NAMA' },
  contact: { en: 'CONTACT', sq: 'KONTAKTI', sr: 'KONTAKT' },
  
  // Hero
  heroTitle: { en: 'Keep Your CAR Running Longer', sq: 'Mbajeni Makinën Tuaj në Punë më Gjatë', sr: 'Održavajte Vaš Auto u Radu Duže' },
  heroSub: { en: 'Quality Parts. Better Drives.', sq: 'Pjesë Cilësore. Vozitje më e Mirë.', sr: 'Kvalitetni Delovi. Bolja Vožnja.' },
  shopNow: { en: 'Shop All Parts', sq: 'Bli të Gjitha Pjesët', sr: 'Kupi Sve Delove' },
  partFinder: { en: 'Part Finder', sq: 'Gjetësi i Pjesëve', sr: 'Pronalaženje Delova' },
  
  // Stats
  fastDispatch: { en: 'Fast Dispatch', sq: 'Dërgim i Shpejtë', sr: 'Brza Otprema' },
  warranty: { en: '2-Year Warranty', sq: '2 Vite Garancion', sr: '2 Godine Garancije' },
  expertSupport: { en: 'Expert Support', sq: 'Mbështetje Eksperte', sr: 'Ekspert Podrška' },
  securePayment: { en: 'Secure Payment', sq: 'Pagesë e Sigurt', sr: 'Sigurno Plaćanje' },
  
  // Header/Common
  login: { en: 'Login', sq: 'Kyçu', sr: 'Prijavi se' },
  logout: { en: 'Logout', sq: 'Çkyçu', sr: 'Odjavi se' },
  search: { en: 'Search part, SKU...', sq: 'Kërko pjesë, SKU...', sr: 'Pretraži delove, SKU...' },
  cart: { en: 'Cart', sq: 'Shporta', sr: 'Korpa' },
  admin: { en: 'ADMIN', sq: 'ADMIN', sr: 'ADMIN' },
  hi: { en: 'Hi', sq: 'Përshëndetje', sr: 'Zdravo' },
  
  // Products Page
  filters: { en: 'Filters', sq: 'Filtrat', sr: 'Filteri' },
  category: { en: 'Category', sq: 'Kategoria', sr: 'Kategorija' },
  priceRange: { en: 'Price Range', sq: 'Gama e Çmimit', sr: 'Raspon Cena' },
  inStockOnly: { en: 'In Stock Only', sq: 'Vetëm në Stok', sr: 'Samo na Lageru' },
  compatibleOnly: { en: 'Compatible Only', sq: 'Vetëm Kompatibile', sr: 'Samo Kompatibilno' },
  guaranteedFit: { en: 'Guaranteed Fit', sq: 'Përshtatje e Garantuar', sr: 'Garantovano Odgovara' },
  sortBy: { en: 'Sort by', sq: 'Rendit sipas', sr: 'Sortiraj po' },
  noProducts: { en: 'No parts found', sq: 'Nuk u gjet asnjë pjesë', sr: 'Nema pronađenih delova' },
  
  // Cart Page
  subtotal: { en: 'Subtotal', sq: 'Nëntotali', sr: 'Međuzbir' },
  shipping: { en: 'Shipping', sq: 'Transporti', sr: 'Dostava' },
  total: { en: 'Total inclusive VAT', sq: 'Totali duke përfshirë TVSH', sr: 'Ukupno sa PDV-om' },
  proceedCheckout: { en: 'PROCEED TO CHECKOUT', sq: 'VAZHDO NË PAGESË', sr: 'NASTAVI NA PLAĆANJE' },
  
  // Admin Page
  adminConsole: { en: 'Admin Console', sq: 'Konsolla e Adminit', sr: 'Admin Konzola' },
  revenue: { en: 'Total Revenue', sq: 'Të Hyrat Totale', sr: 'Ukupan Prihod' },
  activeSkus: { en: 'Active SKUs', sq: 'SKU Aktive', sr: 'Aktivni SKU-ovi' },
  pending: { en: 'Pending', sq: 'Në Pritje', sr: 'Na Čekanju' },
  newProduct: { en: 'NEW PRODUCT', sq: 'PRODUKT I RI', sr: 'NOVI PROIZVOD' },
  printLabel: { en: 'PRINT LABEL', sq: 'SHTYP ETIKETËN', sr: 'ŠTAMPAJ ETIKETU' },
  printInvoice: { en: 'PRINT INVOICE', sq: 'SHTYP FATURËN', sr: 'ŠTAMPAJ RAČUN' },
  
  // Restock Notification
  notifyMe: { en: 'Notify Me', sq: 'Më Njofto', sr: 'Obavesti Me' },
  notifyWhenAvailable: { en: 'Notify me when available', sq: 'Më njofto kur të jetë në dispozicion', sr: 'Obavesti me kada bude dostupno' },
  emailPlaceholder: { en: 'Enter your email', sq: 'Shkruani email-in tuaj', sr: 'Unesite vaš email' },
  notificationSuccess: { en: 'You will be notified!', sq: 'Do të njoftoheni!', sr: 'Bićete obavešteni!' },
  restockTitle: { en: 'Get Restock Updates', sq: 'Merr njoftime për furnizim', sr: 'Dobijajte informacije o dopuni' },
  restockDesc: { en: 'This item is currently out of stock. Leave your email and we will send you a one-time notification when it is back in stock.', sq: 'Ky artikull është jashtë gjendjes. Lini email-in tuaj dhe ne do t\'ju dërgojmë një njoftim kur të jetë përsëri në gjendje.', sr: 'Ovaj artikal trenutno nije na stanju. Ostavite svoj email i poslaćemo vam jednokratno obaveštenje kada ponovo bude dostupan.' },
  
  // Price Alert
  priceAlertTitle: { en: 'Price Drop Alert', sq: 'Njoftim për Ulje Çmimi', sr: 'Obaveštenje o Padu Cene' },
  priceAlertDesc: { en: 'We will notify you if the price drops below your target.', sq: 'Ne do t\'ju njoftojmë nëse çmimi bie nën objektivin tuaj.', sr: 'Obavestićemo vas ako cena padne ispod vašeg cilja.' },
  targetPriceLabel: { en: 'Target Price (€)', sq: 'Çmimi Objektiv (€)', sr: 'Ciljana Cena (€)' },
  setAlert: { en: 'Set Alert', sq: 'Vendos Njoftimin', sr: 'Postavi Obaveštenje' },
  alertSuccess: { en: 'Price alert set!', sq: 'Njoftimi u vendos!', sr: 'Obaveštenje o ceni je postavljeno!' },
  shareProduct: { en: 'Share Product', sq: 'Shpërndaj Produktin', sr: 'Podeli Proizvod' },
  
  // Brands Page
  brandsTitle: { en: 'Our Brands', sq: 'Brendet Tona', sr: 'Naši Brendovi' },
  brandsSubtitle: { en: 'We partner with the world\'s leading automotive manufacturers to bring you quality you can trust.', sq: 'Ne bashkëpunojmë me prodhuesit kryesorë botërorë të automobilave për t\'ju sjellë cilësi që mund t\'i besoni.', sr: 'Partneri smo sa vodećim svetskim proizvođačima automobila kako bismo vam pružili kvalitet kome možete verovati.' },
  
  // About Page
  aboutTitle: { en: 'Our Story', sq: 'Historia Jonë', sr: 'Naša Priča' },
  aboutSubtitle: { en: '30 Years of Excellence in Car Parts', sq: '30 Vite Ekselencë në Pjesë Automjetesh', sr: '30 Godina Izvrsnosti u Auto Delovima' },
  aboutStory: { 
    en: 'With over 30 years of dedicated experience in the automotive industry, Sprinter Plus has grown from a local workshop into a leading provider of premium car parts. Our journey began with a simple mission: to provide vehicle owners with reliable, high-quality components that keep them safe on the road. Today, we stand as a symbol of trust and expertise in Prizren and beyond.',
    sq: 'Me mbi 30 vjet përvojë të përkushtuar në industrinë e automobilave, Sprinter Plus është rritur nga një punëtori lokale në një ofrues kryesor të pjesëve premium të makinave. Udhëtimi ynë filloi me një mision të thjeshtë: t\'u ofrojmë pronarëve të automjeteve komponentë të besueshëm dhe me cilësi të lartë që i mbajnë ata të sigurt në rrugë. Sot, ne jemi një simbol i besimit dhe ekspertizës në Prizren dhe më gjerë.',
    sr: 'Sa više od 30 godina predanog iskustva u automobilskoj industriji, Sprinter Plus je iz lokalne radionice izrastao u vodećeg dobavljača premium auto delova. Naše putovanje je počelo sa jednostavnom misijom: da vlasnicima vozila pružimo pouzdane, visokokvalitetne komponente koje ih čuvaju na putu. Danas stojimo kao simbol poverenja i stručnosti u Prizrenu i šire.'
  },
  whyChooseUs: { en: 'Why Choose Sprinter Plus?', sq: 'Pse të zgjidhni Sprinter Plus?', sr: 'Zašto odabrati Sprinter Plus?' },
  experienceTitle: { en: '30+ Years Experience', sq: '30+ Vite Përvojë', sr: '30+ Godina Iskustva' },
  qualityTitle: { en: 'Premium Quality', sq: 'Cilësi Premium', sr: 'Premium Kvalitet' },
  supportTitle: { en: 'Expert Support', sq: 'Mbështetje Eksperte', sr: 'Ekspertska Podrška' },
  
  // Contact Page
  contactTitle: { en: 'Get in Touch', sq: 'Na Kontaktoni', sr: 'Kontaktirajte Nas' },
  contactSubtitle: { en: 'Have questions? We\'re here to help you find the perfect part for your car.', sq: 'Keni pyetje? Ne jemi këtu për t\'ju ndihmuar të gjeni pjesën e përsosur për makinën tuaj.', sr: 'Imate pitanja? Tu smo da vam pomognemo da pronađete savršen deo za vaš auto.' },
  storeName: { en: 'Sprinter Plus', sq: 'Sprinter Plus', sr: 'Sprinter Plus' },
  storeLocation: { en: 'Prizren, Kosovo', sq: 'Prizren, Kosovë', sr: 'Prizren, Kosovo' },
  storeJob: { en: 'Car Parts Store', sq: 'Dyqan i Pjesëve të Automjeteve', sr: 'Prodavnica Auto Delova' },
  storeSupport: { en: 'Good support for every car part.', sq: 'Mbështetje e mirë për çdo pjesë të makinës.', sr: 'Dobra podrška za svaki auto deo.' },
  storeAddress: { en: 'Ahmet Prishtina nr141', sq: 'Ahmet Prishtina nr.141', sr: 'Ahmet Prishtina br.141' },
  phone: { en: 'Phone', sq: 'Telefoni', sr: 'Telefon' },
  address: { en: 'Address', sq: 'Adresa', sr: 'Adresa' },
  workingHours: { en: 'Working Hours', sq: 'Orari i Punës', sr: 'Radno Vreme' },
  monFri: { en: 'Mon - Fri: 08:30 - 18:00', sq: 'Hënë - Premte: 08:30 - 18:00', sr: 'Pon - Pet: 08:30 - 18:00' },
  sat: { en: 'Sat: 09:00 - 15:00', sq: 'Shtunë: 09:00 - 15:00', sr: 'Sub: 09:00 - 15:00' },
  sun: { en: 'Sun: Closed', sq: 'Dielë: Mbyllur', sr: 'Ned: Zatvoreno' },
  
  // Invoice
  invoiceTitle: { en: 'INVOICE', sq: 'FATURA', sr: 'FAKTURA' },
  placeOfIssue: { en: 'Place of Issue', sq: 'Vendi i lëshimit', sr: 'Mjesto izdavanja' },
  dateOfIssue: { en: 'Date of Issue', sq: 'Data e lëshimit', sr: 'Datum izdavanja' },
  dueDate: { en: 'Due Date', sq: 'Data e dospimit', sr: 'Datum dospijeća' },
  fiscalNumber: { en: 'Fiscal Receipt No.', sq: 'Nr. i faturës fiskale', sr: 'Broj fiskalnog računa' },
  customer: { en: 'Customer / Receiver', sq: 'Blerësi / Pranon', sr: 'Kupac / Primaoc' },
  itemDescription: { en: 'Item', sq: 'Stavka', sr: 'Stavka' },
  qty: { en: 'Qty', sq: 'Sasia', sr: 'Količina' },
  unit: { en: 'Unit', sq: 'Njësia', sr: 'J.M.' },
  unitPrice: { en: 'Unit Price', sq: 'Çmimi per nj.', sr: 'Jed. Cijena' },
  price: { en: 'Price', sq: 'Çmimi', sr: 'Cijena' },
  discount: { en: 'Discount', sq: 'Zbritja', sr: 'Popust' },
  vat: { en: 'VAT (18%)', sq: 'TVSH (18%)', sr: 'PDV (18%)' },
  amount: { en: 'Amount', sq: 'Shuma', sr: 'Iznos' },
  subtotalNoDiscount: { en: 'Total without discount', sq: 'Totali pa zbritje', sr: 'Ukupno bez popusta' },
  withDiscount: { en: 'With discount', sq: 'Me zbritje', sr: 'Sa popustom' },
  vatBase: { en: 'VAT Base', sq: 'Baza e TVSH-së', sr: 'Osnovica PDV-a' },
  totalAmount: { en: 'Total Amount', sq: 'Shuma Totale', sr: 'Ukupno' },
  inWords: { en: 'IN WORDS', sq: 'ME SHKRONJA', sr: 'SLOVIMA' },
  invoiceNote: { en: 'Note: Complaints accepted within 2 days. Goods remain property of the seller until full payment.', sq: 'Vërejtje: Reklamimet pranohen brenda 2 ditëve. Malli mbetet në pronësi të shitësit deri në pagesën e plotë.', sr: 'Napomena: Reklamacije se uvažavaju u roku od 2 dana. Roba do isplate ostaje u vlasništvu prodavca.' },
  receivedBy: { en: 'Received By', sq: 'Pranoi', sr: 'Fakturu primio' },
  issuedBy: { en: 'Issued By', sq: 'Lëshoi', sr: 'Fakturu izdao' },
  bankInfo: { en: 'Bank Account', sq: 'Llogaria Bankare', sr: 'Žiro račun' },
  addressLabel: { en: 'Address', sq: 'Adresa', sr: 'Adresa' },
  cityLabel: { en: 'City', sq: 'Qyteti', sr: 'Grad' },
  
  // Home Page Additional
  freeShipping: { en: 'Free shipping over €150', sq: 'Transporti falas mbi €150', sr: 'Besplatna dostava preko €150' },
  returns: { en: '15-day returns', sq: 'Kthimi brenda 15 ditëve', sr: 'Povraćaj u roku od 15 dana' },
  fastDelivery: { en: 'Kosovo delivery 1-2 days', sq: 'Dërgesa në Kosovë 1-2 ditë', sr: 'Dostava na Kosovu 1-2 dana' },
  inStockShipEU: { en: 'In stock • Ships from EU warehouse', sq: 'Në stok • Dërgohet nga depoja e BE-së', sr: 'Na stanju • Šalje se iz EU skladišta' },
  allPartsDesc: { en: 'Everything you need for your CAR', sq: 'Gjithçka që ju nevojitet për automjetin tuaj', sr: 'Sve što vam treba za vaš automobil' },
  viewAllParts: { en: 'View all parts', sq: 'Shiko të gjitha pjesët', sr: 'Pogledaj sve delove' },
  bestsellers: { en: 'Bestsellers this week', sq: 'Më të shiturat e javës', sr: 'Najprodavanije ove nedelje' },
  bestsellersDesc: { en: 'Top performing parts trusted by thousands of professional drivers.', sq: 'Pjesët me performancë të lartë të besuara nga mijëra shoferë profesionistë.', sr: 'Vrhunski delovi kojima veruju hiljade profesionalnih vozača.' },
  cantFindPart: { en: "CAN'T FIND YOUR PART?", sq: "NUK PO E GJENI PJESËN TUAJ?", sr: "NE MOŽETE NAĆI DEO?" },
  weShipEU: { en: 'WE SHIP FROM EU.', sq: 'NE DËRGOJMË NGA BE.', sr: 'ŠALJEMO IZ EU.' },
  euOrderDesc: { en: 'Order any part that is not currently in our local Kosovo stock directly from our European partners. Guaranteed 3-10 days delivery to our Prizren store.', sq: 'Porositni çdo pjesë që nuk është aktualisht në stokun tonë lokal në Kosovë direkt nga partnerët tanë evropianë. Dërgesë e garantuar 3-10 ditë në dyqanin tonë në Prizren.', sr: 'Naručite bilo koji deo koji trenutno nije na našem lokalnom lageru na Kosovu direktno od naših evropskih partnera. Garantovana isporuka 3-10 dana u našu prodavnicu u Prizrenu.' },
  euOrderForm: { en: 'EU ORDER FORM', sq: 'FORMULARI I POROSISË BE', sr: 'EU FORMULAR ZA NARUDŽBU' },
  trustedPartners: { en: 'TRUSTED OEM & TIER-1 PARTNERS', sq: 'PARTNERË TË BESUAR OEM & TIER-1', sr: 'POUZDANI OEM I TIER-1 PARTNERI' },
  partsInStock: { en: '50,000+ parts', sq: '50,000+ pjesë', sr: '50,000+ delova' },
  inStockSub: { en: 'in stock', sq: 'në stok', sr: 'na stanju' },
  returnsSub: { en: 'no hassle', sq: 'pa mundim', sr: 'bez muke' },
  supportSub: { en: 'real mechanics', sq: 'mekanikë të vërtetë', sr: 'pravi mehaničari' },
  shippingSub: { en: '1-2 business days!', sq: '1-2 ditë pune!', sr: '1-2 radna dana!' },
  
  // Categories
  catEngine: { en: 'Engine', sq: 'Motori', sr: 'Motor' },
  catEngineDesc: { en: 'Filters, turbos, DPF', sq: 'Filtrat, turbot, DPF', sr: 'Filteri, turbina' },
  catBrakes: { en: 'Brakes', sq: 'Frenat', sr: 'Kočnice' },
  catBrakesDesc: { en: 'Discs, pads, sensors', sq: 'Disqet, pllakat, sensorët', sr: 'Diskovi, pločice' },
  catSuspension: { en: 'Suspension', sq: 'Amortizimi', sr: 'Vešanje' },
  catSuspensionDesc: { en: 'Air springs, shocks', sq: 'Sustat, amortizerët', sr: 'Amortizeri, opruge' },
  catTransmission: { en: 'Transmission', sq: 'Transmisioni', sr: 'Transmisija' },
  catTransmissionDesc: { en: 'Gearbox, clutch', sq: 'Mekanizmi, klluçi', sr: 'Menjač, kvačilo' },
  catElectrical: { en: 'Electrical', sq: 'Elektrika', sr: 'Elektrika' },
  catElectricalDesc: { en: 'Alternators, batteries', sq: 'Alternatorët, bateritë', sr: 'Alternatori, akumulatori' },
  catLighting: { en: 'Lighting', sq: 'Ndriçimi', sr: 'Osvetljenje' },
  catLightingDesc: { en: 'LED, headlights', sq: 'LED, dritat', sr: 'LED, farovi' },
  catExterior: { en: 'Exterior', sq: 'Jashtme', sr: 'Eksterijer' },
  catExteriorDesc: { en: 'Mirrors, racks', sq: 'Pasqyrat, mbajtëset', sr: 'Retrovizori, nosači' },
  catInterior: { en: 'Interior', sq: 'Brendshme', sr: 'Enterijer' },
  catInteriorDesc: { en: 'Seats, mats, trim', sq: 'Ulëset, qilimat, dekorimet', sr: 'Sedišta, patosnice' },
  
  // Admin Page
  dashboard: { en: 'Dashboard', sq: 'Paneli', sr: 'Kontrolna tabla' },
  inventory: { en: 'Inventory', sq: 'Inventari', sr: 'Inventar' },
  stockAlerts: { en: 'Stock Alerts', sq: 'Njoftimet e stokut', sr: 'Obaveštenja o lageru' },
  recentOrders: { en: 'Recent Orders', sq: 'Porositët e fundit', sr: 'Nedavne porudžbine' },
  accessDenied: { en: 'Access Denied', sq: 'Qasja u refuzua', sr: 'Pristup odbijen' },
  adminLoginRequired: { en: 'Please login with an administrator account.', sq: 'Ju lutem kyçuni me një llogari administruese.', sr: 'Molimo prijavite se sa administratorskim nalogom.' },
  syncCloud: { en: 'Sync Cloud', sq: 'Sinkronizo Cloud', sr: 'Sinhronizuj Cloud' },
  syncDefaults: { en: 'Sync Defaults', sq: 'Sinkronizo Parazgjedhjet', sr: 'Sinhronizuj podrazumevano' },
  addProduct: { en: 'Add Product', sq: 'Shto Produkt', sr: 'Dodaj Proizvod' },
  addVehicle: { en: 'Add Vehicle', sq: 'Shto Automjet', sr: 'Dodaj Vozilo' },
  edit: { en: 'Edit', sq: 'Ndrysho', sr: 'Izmeni' },
  delete: { en: 'Delete', sq: 'Fshi', sr: 'Obriši' },
  markProcessed: { en: 'Mark Processed', sq: 'Shëno si të procesuar', sr: 'Označi kao obrađeno' },
  completed: { en: 'Completed', sq: 'Përfunduar', sr: 'Završeno' },
  itemsSummary: { en: 'Items Summary', sq: 'Përmbledhja e artikujve', sr: 'Rezime stavki' },
  delivery: { en: 'Delivery', sq: 'Dërgesa', sr: 'Dostava' },
  revenueAnalytics: { en: 'Revenue Analytics', sq: 'Analitika e të hyrave', sr: 'Analitika prihoda' },
  categorySpread: { en: 'Category Spread', sq: 'Shpërndarja sipas kategorive', sr: 'Raspodela po kategorijama' },
  lowStock: { en: 'LOW STOCK', sq: 'PAK STOK', sr: 'MALI LAGER' },
  outOfStock: { en: 'OUT OF STOCK', sq: 'NUK KA STOK', sr: 'NEMA NA STANJU' },
  orderID: { en: 'Order ID', sq: 'ID e porosisë', sr: 'ID porudžbine' },
  vehicleDatabase: { en: 'Vehicle Database', sq: 'Baza e të dhënave të automjeteve', sr: 'Baza podataka vozila' },
  adminDashboard: { en: 'Admin Dashboard', sq: 'Paneli i Adminit', sr: 'Admin tabla' },
  
  // Contact & About
  sendUsMessage: { en: 'Send us a message', sq: 'Na dërgoni një mesazh', sr: 'Pošaljite nam poruku' },
  fullName: { en: 'Full Name', sq: 'Emri i plotë', sr: 'Ime i prezime' },
  emailAddress: { en: 'Email Address', sq: 'Adresa e email-it', sr: 'Email adresa' },
  subject: { en: 'Subject', sq: 'Subjekti', sr: 'Naslov' },
  message: { en: 'Your Message', sq: 'Mesazhi juaj', sr: 'Vaša poruka' },
  sendMessage: { en: 'Send Message', sq: 'Dërgo Mesazhin', sr: 'Pošalji poruku' },
  euSpecialOrders: { en: 'EU SPECIAL ORDERS', sq: 'POROSI SPECIALE NGA BE', sr: 'EU SPECIJALNE PORUDŽBINE' },
  euDistributionDesc: { en: 'Can\'t find a specific part in our local stock? We order directly from EU warehouses with 3-10 days delivery.', sq: 'Nuk mund ta gjeni një pjesë specifike në stokun tonë lokal? Ne porosisim direkt nga depot e BE-së me dërgesë brenda 3-10 ditëve.', sr: 'Ne možete pronaći određeni deo na našem lageru? Naručujemo direktno iz EU skladišta sa isporukom od 3-10 dana.' },
  storeSupportDesc: { en: 'Expert advice for choosing the right parts for your car model.', sq: 'Këshilla ekspertësh për zgjedhjen e pjesëve të duhura për modelin tuaj të makinës.', sr: 'Stručni saveti za odabir pravih delova za vaš model automobila.' },
  since1996: { en: 'Since 1996', sq: 'Që nga viti 1996', sr: 'Od 1996. godine' },
  prizrenKosovo: { en: 'Prizren, Kosovo', sq: 'Prizren, Kosovë', sr: 'Prizren, Kosovo' },
  builtOnTrust: { en: 'Built on Trust, Defined by Quality', sq: 'Ndërtuar mbi Besimin, Definon Cilësinë', sr: 'Izgrađeno na poverenju, definisano kvalitetom' },
  experienceDesc: { en: 'Three decades of specialized knowledge in automotive components and repair.', sq: 'Tri dekada njohuri të specializuara në komponentët e automobilave dhe riparimin.', sr: 'Tri decenije specijalizovanog znanja u automobilskim komponentama i popravci.' },
  qualityDesc: { en: 'Every part in our inventory undergoes strict quality control standards.', sq: 'Çdo pjesë në inventarin tonë i nënshtrohet standardeve të rrepta të kontrollit të cilësisë.', sr: 'Svaki deo u našem inventaru prolazi kroz stroge standarde kontrole kvaliteta.' },
  happyCustomers: { en: 'Happy Customers', sq: 'Klientë të kënaqur', sr: 'Zadovoljni kupci' },
  officialSupplier: { en: 'Official Supplier', sq: 'Furnizues Zyrtar', sr: 'Zvanični dobavljač' },
  
  // Profile
  myProfile: { en: 'My Profile', sq: 'Profili im', sr: 'Moj profil' },
  manageAccount: { en: 'Manage your account and track orders', sq: 'Menaxhoni llogarinë tuaj dhe përcillni porositë', sr: 'Upravljajte svojim nalogom i pratite porudžbine' },
  shippingDetail: { en: 'Shipping Detail', sq: 'Detajet e dërgesës', sr: 'Detalji isporuke' },
  orderedItems: { en: 'Ordered Items', sq: 'Artikujt e porositur', sr: 'Naručene stavke' },
  saveChanges: { en: 'Save Changes', sq: 'Ruaj Ndryshimet', sr: 'Sačuvaj izmene' },
  primaryAddress: { en: 'Primary Address', sq: 'Adresa Primare', sr: 'Primarna adresa' },
  addNewAddress: { en: 'Add New Address', sq: 'Shto Adresë të Re', sr: 'Dodaj novu adresu' },
  signOut: { en: 'Sign Out Account', sq: 'Çkyçuni nga llogaria', sr: 'Odjavite se' },
  
  // Shop / Cart
  cartTitle: { en: 'Shopping Cart', sq: 'Shporta e Blerjes', sr: 'Korpa za kupovinu' },
  items: { en: 'Items', sq: 'Artikuj', sr: 'Stavke' },
  summary: { en: 'Summary', sq: 'Përmbledhja', sr: 'Rezime' },
  
  // Filtering & Sorting
  popularity: { en: 'Popularity', sq: 'Populariteti', sr: 'Popularnost' },
  priceLowHigh: { en: 'Price: Low to High', sq: 'Çmimi: I ulët në të lartë', sr: 'Cena: Od niže ka višoj' },
  priceHighLow: { en: 'Price: High to Low', sq: 'Çmimi: I lartë në të ulët', sr: 'Cena: Od više ka nižoj' },
  newestArrival: { en: 'Newest Arrival', sq: 'Më të rejat', sr: 'Najnovije' },
  topRated: { en: 'Top Rated', sq: 'Më të vlerësuarat', sr: 'Najbolje ocenjeno' },
  showingParts: { en: 'Showing specialized parts', sq: 'Duke shfaqur pjesë të specializuara', sr: 'Prikazivanje specijalizovanih delova' },
  needExpertHelp: { en: 'Need expert help?', sq: 'Keni nevojë për ndihmë?', sr: 'Treba vam stručna pomoć?' },
  expertHelpDesc: { en: 'Our mechanics are available to help with exact fitment.', sq: 'Mekanikët tanë janë në dispozicion për t\'ju ndihmuar me montimin e saktë.', sr: 'Naši mehaničari su dostupni da vam pomognu oko tačnog uklapanja.' },
  resetFilters: { en: 'Reset all filters', sq: 'Rifillo të gjithë filtrat', sr: 'Resetuj sve filtere' },
  filteredFor: { en: 'Filtered for your', sq: 'Filtruar për tuajin', sr: 'Filtrirano za vaš' },
  catalogDesc: { en: 'Browse our catalog of 50,000+ specialized components.', sq: 'Shfletoni katalogun tonë me mbi 50,000 komponentë të specializuar.', sr: 'Pregledajte naš katalog od preko 50.000 specijalizovanih komponenti.' },
  vehicleSelector: { en: 'Vehicle Selector', sq: 'Zgjedhësi i Automjetit', sr: 'Selektor vozila' },
  upTo: { en: 'up to', sq: 'deri në', sr: 'do' },
  emptyCartDesc: { en: 'Looks like you haven\'t added any parts yet. Browse our professional catalog and find what you need.', sq: 'Duket se ende nuk keni shtuar asnjë pjesë. Shfletoni katalogun tonë profesional dhe gjeni atë që ju nevojitet.', sr: 'Izgleda da još niste dodali nijedan deo. Pregledajte naš profesionalni katalog i pronađite ono što vam treba.' },
  exploreProducts: { en: 'Explore Products', sq: 'Eksploro Produktet', sr: 'Istražite proizvode' },
  secureCheckout: { en: 'Secure Checkouts', sq: 'Pagesa të Sigurta', sr: 'Sigurno plaćanje' },
  placeOrder: { en: 'PLACE ORDER', sq: 'KRYEJ POROSINË', sr: 'NARUČITE' },
  cancel: { en: 'CANCEL', sq: 'ANULO', sr: 'OTKAŽI' },
  shippingAddress: { en: 'Shipping Address', sq: 'Adresa e dërgesës', sr: 'Adresa isporuke' },
  kosovoShipping: { en: 'Kosovo Shipping', sq: 'Dërgesat në Kosovë', sr: 'Isporuka na Kosovu' },
  euSpecialOrder: { en: 'EU SPECIAL ORDER (3-10 DAYS)', sq: 'POROSI SPECIALE NGA BE (3-10 DITË)', sr: 'EU SPECIJALNA NARUDŽBA (3-10 DANA)' },
  fitmentCheck: { en: 'Fitment Check', sq: 'Verifikimi i Përshtatshmërisë', sr: 'Provera kompatibilnosti' },
  fitmentConfirmed: { en: 'Confirmed: This fits your', sq: 'Konfirmuar: Kjo përshtatet me', sr: 'Potvrđeno: Ovo odgovara vašem' },
  fitmentWarning: { en: 'Warning: This may not fit your', sq: 'Paralajmërim: Kjo mund të mos përshtatet me', sr: 'Upozorenje: Ovo možda ne odgovara vašem' },
  requestFromEu: { en: 'REQUEST FROM EU (3-10 DAYS)', sq: 'KËRKO NGA BE (3-10 DITË)', sr: 'NARUČI IZ EU (3-10 DANA)' },
  findNearestShop: { en: 'FIND NEAREST SHOP', sq: 'GJEJ DYQANIN MË TË AFËRT', sr: 'PRONAĐI NAJBLIŽU PRODAVNICU' },
  extendedDelivery: { en: 'Extended Delivery', sq: 'Dërgesa e zgjatur', sr: 'Produžena isporuka' },
  euDeliveryTime: { en: '3-10 business days (Order)', sq: '3-10 ditë pune (Porosi)', sr: '3-10 radnih dana (Narudžbina)' },
  protection24m: { en: '24 Months Protection', sq: 'Mbrojtje 24-mujore', sr: '24 meseca zaštite' },
  orderEu: { en: 'ORDER (EU)', sq: 'POROSIT (BE)', sr: 'NARUČI (EU)' },
  daysDelivery: { en: '3-10 Days Delivery', sq: 'Dërgesa 3-10 Ditë', sr: '3-10 dana isporuka' },
  euSpecialLabel: { en: 'EU SPECIAL ORDER', sq: 'POROSI SPECIALE BE', sr: 'EU SPECIJALNA NARUDŽBINA' },
};
