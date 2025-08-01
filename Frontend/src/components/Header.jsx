
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RefreshCw, Bike, Clock, Database } from 'lucide-react';

const Header = ({ totalMoto, filteredMoto, lastUpdate, onRefresh, isLoading }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString('it-IT', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <header className="glass-effect border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Bike className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Moto Scraper Piemonte</h1>
                <p className="text-sm text-gray-400">Monitoraggio mercato moto da Subito.it</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2 glass-effect px-3 py-2 rounded-lg">
                <Database className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">
                  {filteredMoto !== totalMoto ? `${filteredMoto} / ` : ''}{totalMoto} moto
                </span>
              </div>
              
              <div className="flex items-center space-x-2 glass-effect px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">
                  Aggiornato: {formatTime(lastUpdate)}
                </span>
              </div>
            </div>

            <Button
              onClick={onRefresh}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Aggiornando...' : 'Aggiorna'}
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
