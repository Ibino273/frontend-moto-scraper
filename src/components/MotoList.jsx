import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import FilterPanel from '@/components/FilterPanel.jsx';
import { Heart, ExternalLink, Calendar, Gauge, Euro, MapPin, Clock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast.js';

const MotoList = ({ data, filters, setFilters }) => {
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Ordina i dati
  const sortedData = [...data].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.prezzo - b.prezzo;
      case 'price-desc':
        return b.prezzo - a.prezzo;
      case 'year-desc':
        return b.anno - a.anno;
      case 'year-asc':
        return a.anno - b.anno;
      case 'km-asc':
        return a.km - b.km;
      case 'km-desc':
        return b.km - a.km;
      case 'likes':
        return b.likes - a.likes;
      case 'date':
      default:
        return new Date(b.dataPubblicazione) - new Date(a.dataPubblicazione);
    }
  });

  // Paginazione
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleViewAnnuncio = (link) => {
    toast({
      title: "🚧 Funzionalità non implementata",
      description: "Questa funzione non è ancora implementata—ma non preoccuparti! Puoi richiederla nel tuo prossimo prompt! 🚀",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4">
          <FilterPanel filters={filters} setFilters={setFilters} />
        </div>

        <div className="lg:w-3/4 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 glass-effect p-4 rounded-lg">
            <div>
              <h2 className="text-xl font-bold text-white">Elenco Moto</h2>
              <p className="text-gray-400 text-sm">
                {data.length} moto trovate in Piemonte
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Ordina per:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10">
                  <SelectItem value="date">Data pubblicazione</SelectItem>
                  <SelectItem value="price-asc">Prezzo crescente</SelectItem>
                  <SelectItem value="price-desc">Prezzo decrescente</SelectItem>
                  <SelectItem value="year-desc">Anno decrescente</SelectItem>
                  <SelectItem value="year-asc">Anno crescente</SelectItem>
                  <SelectItem value="km-asc">KM crescenti</SelectItem>
                  <SelectItem value="km-desc">KM decrescenti</SelectItem>
                  <SelectItem value="likes">Più apprezzate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {paginatedData.map((moto, index) => (
              <motion.div
                key={moto.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="glass-effect border-white/10 card-hover h-full">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg">
                          {moto.marca} {moto.modello}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                          <MapPin className="w-3 h-3" />
                          <span>{moto.citta}</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-pink-500/20 text-pink-400 border-pink-500/30">
                        <Heart className="w-3 h-3 mr-1" />
                        {moto.likes}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>Anno:</span>
                        </div>
                        <span className="text-white font-medium">{new Date(moto.data_pubblicazione).toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-gray-400">
                          <Gauge className="w-3 h-3" />
                          <span>KM:</span>
                        </div>
                        <span className="text-white font-medium">{moto.km.toLocaleString()}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>Pubblicato:</span>
                        </div>
                        <span className="text-white font-medium">{formatDate(moto.dataPubblicazione)}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Euro className="w-4 h-4 text-green-400" />
                          <span className="text-2xl font-bold text-green-400">
                            {moto.prezzo.toLocaleString()}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleViewAnnuncio(moto.link)}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Vedi
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                Precedente
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                  if (pageNum > totalPages) return null;
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={currentPage === pageNum 
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0" 
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                      }
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                Successiva
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MotoList;