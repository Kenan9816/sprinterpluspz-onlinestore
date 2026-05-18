import { Vehicle } from '../types';

export const VEHICLE_DATA: Vehicle[] = [
  // Mercedes Sprinter
  { id: 'm-s-2006-211-cdi', make: 'Mercedes-Benz', model: 'Sprinter', year: '2006-2009', engine: '211 CDI (906)' },
  { id: 'm-s-2006-311-cdi', make: 'Mercedes-Benz', model: 'Sprinter', year: '2006-2009', engine: '311 CDI (906)' },
  { id: 'm-s-2009-313-cdi', make: 'Mercedes-Benz', model: 'Sprinter', year: '2009-2013', engine: '313 CDI (906)' },
  { id: 'm-s-2013-316-cdi', make: 'Mercedes-Benz', model: 'Sprinter', year: '2013-2018', engine: '316 CDI (906)' },
  { id: 'm-s-2018-314-cdi', make: 'Mercedes-Benz', model: 'Sprinter', year: '2018-2024', engine: '314 CDI (907)' },
  { id: 'm-s-2018-319-cdi', make: 'Mercedes-Benz', model: 'Sprinter', year: '2018-2024', engine: '319 CDI (907)' },

  // VW Transporter
  { id: 'vw-t-2003-1.9-tdi', make: 'Volkswagen', model: 'Transporter T5', year: '2003-2009', engine: '1.9 TDI' },
  { id: 'vw-t-2003-2.5-tdi', make: 'Volkswagen', model: 'Transporter T5', year: '2003-2009', engine: '2.5 TDI' },
  { id: 'vw-t-2010-2.0-tdi', make: 'Volkswagen', model: 'Transporter T5 Facelift', year: '2010-2015', engine: '2.0 TDI' },
  { id: 'vw-t-2015-2.0-tdi', make: 'Volkswagen', model: 'Transporter T6', year: '2015-2019', engine: '2.0 TDI' },
  { id: 'vw-t-2019-2.0-tdi', make: 'Volkswagen', model: 'Transporter T6.1', year: '2019-2024', engine: '2.0 TDI' },

  // Ford Transit
  { id: 'f-t-2006-2.2-tdci', make: 'Ford', model: 'Transit', year: '2006-2011', engine: '2.2 TDCi' },
  { id: 'f-t-2006-2.4-tdci', make: 'Ford', model: 'Transit', year: '2006-2011', engine: '2.4 TDCi' },
  { id: 'f-t-2011-2.2-tdci', make: 'Ford', model: 'Transit', year: '2011-2014', engine: '2.2 TDCi' },
  { id: 'f-t-2014-2.0-tdci', make: 'Ford', model: 'Transit', year: '2014-2019', engine: '2.0 TDCi' },
  { id: 'f-t-2014-2.2-tdci', make: 'Ford', model: 'Transit', year: '2014-2019', engine: '2.2 TDCi' },

  // common passenger cars
  // Volkswagen expanded
  { id: 'vw-golf-8-2020-2.0-tdi', make: 'Volkswagen', model: 'Golf VIII', year: '2020-2024', engine: '2.0 TDI' },
  { id: 'vw-polo-2017-1.0-tsi', make: 'Volkswagen', model: 'Polo', year: '2017-2024', engine: '1.0 TSI' },
  { id: 'vw-caddy-2020-2.0-tdi', make: 'Volkswagen', model: 'Caddy', year: '2020-2024', engine: '2.0 TDI' },
  { id: 'vw-tiguan-2016-2.0-tdi', make: 'Volkswagen', model: 'Tiguan', year: '2016-2024', engine: '2.0 TDI' },
  { id: 'vw-touareg-2018-3.0-tdi', make: 'Volkswagen', model: 'Touareg', year: '2018-2024', engine: '3.0 TDI' },
  { id: 'vw-arteon-2017-2.0-tdi', make: 'Volkswagen', model: 'Arteon', year: '2017-2024', engine: '2.0 TDI' },
  { id: 'vw-t-roc-2017-1.5-tsi', make: 'Volkswagen', model: 'T-Roc', year: '2017-2024', engine: '1.5 TSI' },
  { id: 'vw-t-cross-2019-1.0-tsi', make: 'Volkswagen', model: 'T-Cross', year: '2019-2024', engine: '1.0 TSI' },
  { id: 'vw-id3-2020-pro', make: 'Volkswagen', model: 'ID.3', year: '2020-2024', engine: 'Electric (150kW)' },
  { id: 'vw-id4-2021-pro', make: 'Volkswagen', model: 'ID.4', year: '2021-2024', engine: 'Electric (150kW)' },
  { id: 'vw-crafter-2017-2.0-tdi', make: 'Volkswagen', model: 'Crafter', year: '2017-2024', engine: '2.0 TDI' },
  { id: 'vw-up-2016-1.0', make: 'Volkswagen', model: 'up!', year: '2016-2024', engine: '1.0' },
  { id: 'vw-sharan-2010-2.0-tdi', make: 'Volkswagen', model: 'Sharan', year: '2010-2024', engine: '2.0 TDI' },
  { id: 'vw-touran-2015-1.6-tdi', make: 'Volkswagen', model: 'Touran', year: '2015-2024', engine: '1.6 TDI' },
  { id: 'vw-amarok-2016-3.0-v6', make: 'Volkswagen', model: 'Amarok', year: '2016-2024', engine: '3.0 V6 TDI' },

  { id: 'vw-g7-2013-1.6-tdi', make: 'Volkswagen', model: 'Golf VII', year: '2013-2020', engine: '1.6 TDI' },
  { id: 'vw-g7-2013-2.0-tdi', make: 'Volkswagen', model: 'Golf VII', year: '2013-2020', engine: '2.0 TDI' },
  { id: 'vw-p-2015-2.0-tdi', make: 'Volkswagen', model: 'Passat B8', year: '2015-2023', engine: '2.0 TDI' },
  { id: 'audi-a4-2016-2.0-tdi', make: 'Audi', model: 'A4 (B9)', year: '2016-2024', engine: '2.0 TDI' },
  { id: 'audi-a6-2014-3.0-tdi', make: 'Audi', model: 'A6 (C7)', year: '2014-2018', engine: '3.0 TDI' },
  { id: 'bmw-3-2012-320d', make: 'BMW', model: '3 Series (F30)', year: '2012-2019', engine: '320d' },
  { id: 'bmw-5-2017-530d', make: 'BMW', model: '5 Series (G30)', year: '2017-2023', engine: '530d' },
];

export const getMakes = () => Array.from(new Set(VEHICLE_DATA.map(v => v.make))).sort();
export const getModels = (make: string) => Array.from(new Set(VEHICLE_DATA.filter(v => v.make === make).map(v => v.model))).sort();
export const getYears = (make: string, model: string) => Array.from(new Set(VEHICLE_DATA.filter(v => v.make === make && v.model === model).map(v => v.year))).sort((a, b) => b.localeCompare(a));
export const getEngines = (make: string, model: string, year: string) => Array.from(new Set(VEHICLE_DATA.filter(v => v.make === make && v.model === model && v.year === year).map(v => v.engine))).sort();
export const getVehicleId = (make: string, model: string, year: string, engine: string) => VEHICLE_DATA.find(v => v.make === make && v.model === model && v.year === year && v.engine === engine)?.id;
