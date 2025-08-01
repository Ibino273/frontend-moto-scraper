import { supabase } from '@/lib/customSupabaseClient.js';

export const scrapeData = async () => {
  // Ora i dati vengono recuperati direttamente da Supabase
  const { data, error } = await supabase
    .from('moto_listings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Errore nel recupero dati da Supabase:', error);
    throw new Error('Impossibile caricare i dati dal database. Controlla la console per i dettagli.');
  }

  return data;
};