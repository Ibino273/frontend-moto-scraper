import { supabase } from '@/lib/customSupabaseClient.js';

// Recupera i dati degli annunci da Supabase e normalizza i campi.
//
// La tabella ``moto_listings`` su Supabase espone i campi con nomi
// snake_case, ad esempio ``data_pubblicazione`` e ``link_annuncio``.
// Tuttavia i componenti front‑end dell'applicazione utilizzano
// convenzioni camelCase come ``dataPubblicazione`` e ``link``.  Se non
// vengono normalizzati, alcune funzionalità – come l'ordinamento per
// data, la visualizzazione del link dell'annuncio e l'analisi
// statistica – ricevono ``undefined`` e producono comportamenti errati
// (ad esempio, “Invalid Date” nelle schede e link non aperti).  Per
// evitare questi problemi, mappiamo i campi in camelCase prima di
// restituire i dati.

export const scrapeData = async () => {
  // Recupero dati dal database Supabase. Ordiniamo per data di
  // inserimento in modo da ottenere prima gli annunci più recenti.
  const { data, error } = await supabase
    .from('moto_listings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Errore nel recupero dati da Supabase:', error);
    throw new Error('Impossibile caricare i dati dal database. Controlla la console per i dettagli.');
  }

  // Normalizza i campi per adattarli ai componenti front‑end.  Se un
  // determinato campo camelCase esiste già (ad esempio quando i dati
  // provengono da una versione precedente del database), viene
  // mantenuto.  In caso contrario, si usa l'equivalente snake_case.
  const normalized = (data || []).map((moto) => ({
    ...moto,
    dataPubblicazione: moto.dataPubblicazione ?? moto.data_pubblicazione,
    link: moto.link ?? moto.link_annuncio,
  }));

  return normalized;
};
