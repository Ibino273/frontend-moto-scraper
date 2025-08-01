import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import FilterPanel from '@/components/FilterPanel.jsx';
import { Heart, ExternalLink, Calendar, Gauge, Euro, MapPin, Clock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast.js';

// Elenco Moto
// Questo componente mostra la lista delle motociclette recuperate dal database,
// permettendo di ordinarle, paginarle e filtrarle. È stato modificato per
// risolvere due problemi:
//  1. Il pulsante "Vedi" ora apre il link dell'annuncio in una nuova scheda
//     invece di mostrare un messaggio di funzionalità non implementata.
//  2. Le date di pubblicazione vengono fornite dal backend in camelCase
//     (``dataPubblicazione``) grazie alla normalizzazione in ``scraper.js``.

const MotoList = ({ data, filters, setFilters }) => {
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Ordina i dati in base al criterio selezionato
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

  // Calcola gli indici per la paginazione
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  // Formatta la data in formato gg/mm/aaaa
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Gestisce il click sul pulsante "Vedi".  Se il link è definito,
  // apre l'annuncio in una nuova scheda.  In questo modo si
  // rimuove il messaggio di funzionalità non implementata che veniva
  // mostrato precedentemente.
  const handleViewAnnuncio = (link) => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4">
          <FilterPanel filters={filters} setFilters={setFilters} />
        </div>
        <div className="lg:w-3/4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Elenco Moto</h2>
            <span className="text-sm text-gray-400">{data.length} moto trovate in Piemonte</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <span>Ordina per:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
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
          {/* Lista delle moto */}
          {paginatedData.map((moto, index) => (
            <Card key={index} className="bg-white/5 border-white/10 text-white hover:bg-white/10">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">
                    {moto.marca} {moto.modello}
                  </div>
                  <Badge variant="outline">{moto.citta}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1"><Heart size={16} /> {moto.likes}</div>
                  <div className="flex items-center gap-1"><Calendar size={16} /> {moto.anno}</div>
                  <div className="flex items-center gap-1"><Gauge size={16} /> {moto.km.toLocaleString()} km</div>
                  <div className="flex items-center gap-1"><Clock size={16} /> Pubblicato: {formatDate(moto.dataPubblicazione)}</div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xl font-semibold text-green-400">€{moto.prezzo.toLocaleString()}</div>
                  <Button onClick={() => handleViewAnnuncio(moto.link)} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
                    Vedi
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {/* Controlli di paginazione */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                Precedente
              </Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                if (pageNum > totalPages) return null;
                return (
                  <Button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={currentPage === pageNum ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}>
                    {pageNum}
                  </Button>
                );
              })}
              <Button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="bg-white/5 border-white/10 text-white hover:bg-white/10">
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
