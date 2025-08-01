import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Toaster } from '@/components/ui/toaster.jsx';
import { toast } from '@/components/ui/use-toast.js';
import Dashboard from '@/components/Dashboard.jsx';
import MotoList from '@/components/MotoList.jsx';
import Analytics from '@/components/Analytics.jsx';
import Settings from '@/components/Settings.jsx';
import Header from '@/components/Header.jsx';
import { BarChart3, List, TrendingUp, Settings as SettingsIcon, Bike, Database } from 'lucide-react';
import { scrapeData } from '@/lib/scraper.js';

function App() {
  const [motoData, setMotoData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    marca: '',
    modello: '',
    annoMin: '',
    annoMax: '',
    prezzoMin: '',
    prezzoMax: '',
    kmMin: '',
    kmMax: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30);

  const fetchData = async (isRefreshing = false) => {
    setIsLoading(true);
    if (isRefreshing) {
      toast({
        title: "🔄 Aggiornamento in corso...",
        description: "Sto sincronizzando con il database...",
      });
    }

    try {
      const data = await scrapeData();
      setMotoData(data);
      setLastUpdate(new Date());
      toast({
        title: "✅ Dati sincronizzati!",
        description: `Caricati ${data.length} annunci dal database Supabase.`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "❌ Errore di connessione al Database",
        description: error.message,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;

    const intervalId = setInterval(() => fetchData(true), refreshInterval * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [autoRefresh, refreshInterval]);

  useEffect(() => {
    let filtered = [...motoData];

    if (filters.marca) {
      filtered = filtered.filter(moto => 
        moto.marca.toLowerCase().includes(filters.marca.toLowerCase())
      );
    }

    if (filters.modello) {
      filtered = filtered.filter(moto => 
        moto.modello.toLowerCase().includes(filters.modello.toLowerCase())
      );
    }

    if (filters.annoMin) {
      filtered = filtered.filter(moto => moto.anno >= parseInt(filters.annoMin));
    }

    if (filters.annoMax) {
      filtered = filtered.filter(moto => moto.anno <= parseInt(filters.annoMax));
    }

    if (filters.prezzoMin) {
      filtered = filtered.filter(moto => moto.prezzo >= parseInt(filters.prezzoMin));
    }

    if (filters.prezzoMax) {
      filtered = filtered.filter(moto => moto.prezzo <= parseInt(filters.prezzoMax));
    }

    if (filters.kmMin) {
      filtered = filtered.filter(moto => moto.km >= parseInt(filters.kmMin));
    }

    if (filters.kmMax) {
      filtered = filtered.filter(moto => moto.km <= parseInt(filters.kmMax));
    }

    setFilteredData(filtered);
  }, [motoData, filters]);

  const refreshData = () => {
    fetchData(true);
  };

  if (isLoading && motoData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Helmet>
          <title>Moto Scraper Piemonte - Caricamento...</title>
          <meta name="description" content="Caricamento dati delle moto in vendita in Piemonte da Supabase" />
        </Helmet>
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full mx-auto"
            />
            <Database className="w-8 h-8 text-green-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold gradient-text">Connessione a Supabase...</h2>
            <p className="text-gray-400">Recupero dei dati degli annunci...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Moto Scraper Piemonte - Analisi Mercato Moto</title>
        <meta name="description" content="Monitora e analizza il mercato delle moto in Piemonte con dati in tempo reale da Supabase." />
      </Helmet>

      <Header 
        totalMoto={motoData.length}
        filteredMoto={filteredData.length}
        lastUpdate={lastUpdate}
        onRefresh={refreshData}
        isLoading={isLoading}
      />

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 glass-effect">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              Elenco Moto
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <SettingsIcon className="w-4 h-4" />
              Impostazioni
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="dashboard" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Dashboard 
                  data={filteredData} 
                  filters={filters}
                  setFilters={setFilters}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="list" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MotoList 
                  data={filteredData}
                  filters={filters}
                  setFilters={setFilters}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Analytics data={filteredData} />
              </motion.div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Settings 
                  autoRefresh={autoRefresh}
                  setAutoRefresh={setAutoRefresh}
                  refreshInterval={refreshInterval}
                  setRefreshInterval={setRefreshInterval}
                  onRefresh={refreshData}
                />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </main>

      <Toaster />
    </div>
  );
}

export default App;