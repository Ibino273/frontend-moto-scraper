
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X, Filter } from 'lucide-react';

const FilterPanel = ({ filters, setFilters }) => {
  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      marca: '',
      modello: '',
      annoMin: '',
      annoMax: '',
      prezzoMin: '',
      prezzoMax: '',
      kmMin: '',
      kmMax: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtri
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4 mr-1" />
              Pulisci
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 gap-3">
            <div>
              <Label htmlFor="marca" className="text-gray-300 text-sm">Marca</Label>
              <Input
                id="marca"
                placeholder="es. Yamaha, Honda..."
                value={filters.marca}
                onChange={(e) => updateFilter('marca', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label htmlFor="modello" className="text-gray-300 text-sm">Modello</Label>
              <Input
                id="modello"
                placeholder="es. R1, CBR..."
                value={filters.modello}
                onChange={(e) => updateFilter('modello', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-300 text-sm">Anno</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Da"
                type="number"
                value={filters.annoMin}
                onChange={(e) => updateFilter('annoMin', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
              <Input
                placeholder="A"
                type="number"
                value={filters.annoMax}
                onChange={(e) => updateFilter('annoMax', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-300 text-sm">Prezzo (€)</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Min"
                type="number"
                value={filters.prezzoMin}
                onChange={(e) => updateFilter('prezzoMin', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
              <Input
                placeholder="Max"
                type="number"
                value={filters.prezzoMax}
                onChange={(e) => updateFilter('prezzoMax', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-300 text-sm">Chilometri</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Min"
                type="number"
                value={filters.kmMin}
                onChange={(e) => updateFilter('kmMin', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
              <Input
                placeholder="Max"
                type="number"
                value={filters.kmMax}
                onChange={(e) => updateFilter('kmMax', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
