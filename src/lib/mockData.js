
// Dati mock per simulare il scraping da Subito.it
const marche = [
  'Yamaha', 'Honda', 'Kawasaki', 'Suzuki', 'Ducati', 'BMW', 'KTM', 'Aprilia', 
  'Triumph', 'Harley-Davidson', 'Benelli', 'MV Agusta', 'Moto Guzzi', 'Husqvarna'
];

const modelli = {
  'Yamaha': ['R1', 'R6', 'MT-07', 'MT-09', 'YZF-R125', 'Tracer 900', 'XSR700', 'Tenere 700'],
  'Honda': ['CBR1000RR', 'CBR600RR', 'CB650R', 'CB500F', 'Africa Twin', 'Hornet', 'VFR800', 'CBR125R'],
  'Kawasaki': ['Ninja ZX-10R', 'Ninja ZX-6R', 'Z900', 'Z650', 'Versys 650', 'Ninja 400', 'Z400', 'ER-6N'],
  'Suzuki': ['GSX-R1000', 'GSX-R600', 'GSX-S750', 'SV650', 'V-Strom 650', 'Bandit 650', 'GSR750', 'GSX-R125'],
  'Ducati': ['Panigale V4', 'Panigale V2', 'Monster 821', 'Scrambler', 'Multistrada', 'Diavel', 'SuperSport', 'Hypermotard'],
  'BMW': ['S1000RR', 'S1000R', 'F900R', 'G310R', 'R1250GS', 'F750GS', 'R nineT', 'C400X'],
  'KTM': ['1290 Super Duke R', '890 Duke R', '690 Duke', '390 Duke', '1290 Adventure', '890 Adventure', 'RC 390', '250 Duke'],
  'Aprilia': ['RSV4', 'Tuono V4', 'RS 660', 'Tuono 660', 'Shiver 900', 'Dorsoduro 900', 'RS4 125', 'SX 125'],
  'Triumph': ['Speed Triple', 'Street Triple', 'Bonneville', 'Tiger 900', 'Daytona 675', 'Rocket 3', 'Scrambler 900', 'Trident 660'],
  'Harley-Davidson': ['Sportster', 'Street 750', 'Iron 883', 'Forty-Eight', 'Fat Boy', 'Road King', 'Street Glide', 'Pan America'],
  'Benelli': ['TNT 600', 'Leoncino 500', 'TRK 502', '302R', 'TNT 125', 'Imperiale 400', 'TNT 899', 'BN 125'],
  'MV Agusta': ['F3 800', 'Brutale 800', 'F4', 'Dragster 800', 'Turismo Veloce', 'Rivale 800', 'F3 675', 'Brutale 675'],
  'Moto Guzzi': ['V7', 'V85 TT', 'V9', 'Griso', 'California', 'Audace', 'MGX-21', 'V11'],
  'Husqvarna': ['Vitpilen 701', 'Svartpilen 701', 'Vitpilen 401', 'Svartpilen 401', 'Norden 901', 'TE 300', 'FE 350', '701 Enduro']
};

const cittaPiemonte = [
  'Torino', 'Alessandria', 'Asti', 'Biella', 'Cuneo', 'Novara', 'Verbania', 'Vercelli',
  'Ivrea', 'Pinerolo', 'Moncalieri', 'Collegno', 'Rivoli', 'Settimo Torinese', 'Nichelino',
  'Grugliasco', 'Chieri', 'Carmagnola', 'Orbassano', 'Beinasco', 'Venaria Reale', 'Caselle Torinese'
];

const generateRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateRandomPrice = (anno, marca) => {
  let basePrice = 5000;
  
  // Fattore anno (più recente = più costoso)
  const ageFactor = Math.max(0.3, (anno - 2000) / 24);
  
  // Fattore marca (alcune marche sono più costose)
  const brandMultiplier = {
    'Ducati': 1.4,
    'BMW': 1.3,
    'MV Agusta': 1.5,
    'Triumph': 1.2,
    'Harley-Davidson': 1.3,
    'Aprilia': 1.1,
    'Yamaha': 1.0,
    'Honda': 1.0,
    'Kawasaki': 1.0,
    'Suzuki': 0.9,
    'KTM': 1.1,
    'Benelli': 0.8,
    'Moto Guzzi': 1.1,
    'Husqvarna': 1.0
  };
  
  basePrice *= ageFactor;
  basePrice *= (brandMultiplier[marca] || 1.0);
  
  // Aggiungi variazione casuale
  const variation = 0.7 + Math.random() * 0.6; // ±30%
  basePrice *= variation;
  
  // Arrotonda a centinaia
  return Math.round(basePrice / 100) * 100;
};

const generateRandomKm = (anno) => {
  const age = 2024 - anno;
  const avgKmPerYear = 3000 + Math.random() * 7000; // 3k-10k km/anno
  const totalKm = age * avgKmPerYear;
  
  // Aggiungi variazione
  const variation = 0.5 + Math.random() * 1.0;
  return Math.round(totalKm * variation / 1000) * 1000; // Arrotonda a migliaia
};

export const generateMockData = (count = 100) => {
  const data = [];
  const now = new Date();
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  for (let i = 0; i < count; i++) {
    const marca = marche[Math.floor(Math.random() * marche.length)];
    const modelliMarca = modelli[marca] || ['Modello'];
    const modello = modelliMarca[Math.floor(Math.random() * modelliMarca.length)];
    const anno = 2010 + Math.floor(Math.random() * 15); // 2010-2024
    const citta = cittaPiemonte[Math.floor(Math.random() * cittaPiemonte.length)];
    const prezzo = generateRandomPrice(anno, marca);
    const km = generateRandomKm(anno);
    const likes = Math.floor(Math.random() * 50); // 0-49 likes
    const dataPubblicazione = generateRandomDate(oneMonthAgo, now);
    
    data.push({
      id: `moto_${i + 1}`,
      marca,
      modello,
      anno,
      prezzo,
      km,
      likes,
      citta,
      dataPubblicazione: dataPubblicazione.toISOString(),
      link: `https://www.subito.it/moto/torino/moto_${i + 1}.htm`
    });
  }
  
  return data.sort((a, b) => new Date(b.dataPubblicazione) - new Date(a.dataPubblicazione));
};
