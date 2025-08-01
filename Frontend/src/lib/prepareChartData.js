
export function prepareChartData(data) {
  // Prezzo medio per marca
  const priceByBrandMap = {};
  const priceByBrand = [];

  data.forEach((item) => {
    if (!item.marca || !item.prezzo) return;
    if (!priceByBrandMap[item.marca]) {
      priceByBrandMap[item.marca] = { total: 0, count: 0 };
    }
    priceByBrandMap[item.marca].total += item.prezzo;
    priceByBrandMap[item.marca].count += 1;
  });

  for (const marca in priceByBrandMap) {
    const avg = priceByBrandMap[marca].total / priceByBrandMap[marca].count;
    priceByBrand.push({ marca, prezzo: Math.round(avg) });
  }

  // Distribuzione chilometraggio
  const kmDistribution = [
    { fascia: "0-10k", count: 0 },
    { fascia: "10k-20k", count: 0 },
    { fascia: "20k-30k", count: 0 },
    { fascia: "30k+", count: 0 }
  ];

  data.forEach((item) => {
    const km = item.km || 0;
    if (km < 10000) kmDistribution[0].count++;
    else if (km < 20000) kmDistribution[1].count++;
    else if (km < 30000) kmDistribution[2].count++;
    else kmDistribution[3].count++;
  });

  // Nuovo/Usato nel tempo
  const listingMap = {};
  const listingByType = [];

  data.forEach((item) => {
    if (!item.data_pubblicazione || !item.tipo_veicolo) return;
    const mese = item.data_pubblicazione.slice(0, 7); // YYYY-MM
    if (!listingMap[mese]) {
      listingMap[mese] = { Usato: 0, Nuovo: 0, Km0: 0 };
    }
    if (listingMap[mese][item.tipo_veicolo] !== undefined) {
      listingMap[mese][item.tipo_veicolo]++;
    }
  });

  for (const mese in listingMap) {
    listingByType.push({ mese, ...listingMap[mese] });
  }

  return { priceByBrand, kmDistribution, listingByType };
}
