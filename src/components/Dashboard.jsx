import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import FilterPanel from '@/components/FilterPanel.jsx';
import { TrendingUp, Heart, Euro, Calendar, Gauge } from 'lucide-react';

const Dashboard = ({ data, filters, setFilters }) => {
  // Calcola statistiche
  const stats = {
    totalMoto: data.length,
    prezzoMedio: data.length > 0 ? Math.round(data.reduce((sum, moto) => sum + moto.prezzo, 0) / data.length) : 0,
    annoMedio: data.length > 0 ? Math.round(data.reduce((sum, moto) => sum + moto.anno, 0) / data.length) : 0,
    kmMedio: data.length > 0 ? Math.round(data.reduce((sum, moto) => sum + moto.km, 0) / data.length) : 0,
    totalLikes: data.reduce((sum, moto) => sum + moto.likes, 0)
  };

  // Dati per grafici
  const marcheData = data.reduce((acc, moto) => {
    acc[moto.marca] = (acc[moto.marca] || 0) + 1;
    return acc;
  }, {});

  const chartMarcheData = Object.entries(marcheData)
    .map(([marca, count]) => ({ marca, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const prezziPerAnno = data.reduce((acc, moto) => {
    const anno = moto.anno;
    if (!acc[anno]) {
      acc[anno] = { anno, prezzi: [], count: 0 };
    }
    acc[anno].prezzi.push(moto.prezzo);
    acc[anno].count++;
    return acc;
  }, {});

  const chartPrezziData = Object.values(prezziPerAnno)
    .map(item => ({
      anno: item.anno,
      prezzoMedio: Math.round(item.prezzi.reduce((sum, p) => sum + p, 0) / item.prezzi.length),
      count: item.count
    }))
    .sort((a, b) => a.anno - b.anno)
    .slice(-10);

  const COLORS = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#6366F1'];

  const motoPopulari = data
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Totale Moto</p>
                  <p className="text-2xl font-bold text-white">{stats.totalMoto}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Euro className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Prezzo Medio</p>
                  <p className="text-2xl font-bold text-white">€{stats.prezzoMedio.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Anno Medio</p>
                  <p className="text-2xl font-bold text-white">{stats.annoMedio}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Gauge className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">KM Medi</p>
                  <p className="text-2xl font-bold text-white">{stats.kmMedio.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-pink-500/20 rounded-lg">
                  <Heart className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Totale Like</p>
                  <p className="text-2xl font-bold text-white">{stats.totalLikes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Marche Più Popolari</CardTitle>
              <CardDescription className="text-gray-400">
                Distribuzione delle moto per marca
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartMarcheData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="marca" 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(30, 41, 59, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Prezzi Medi per Anno</CardTitle>
              <CardDescription className="text-gray-400">
                Andamento dei prezzi negli ultimi anni
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartPrezziData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="anno" 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(30, 41, 59, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(value) => [`€${value.toLocaleString()}`, 'Prezzo Medio']}
                  />
                  <Bar dataKey="prezzoMedio" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <FilterPanel filters={filters} setFilters={setFilters} />

          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Moto Più Apprezzate</CardTitle>
              <CardDescription className="text-gray-400">
                Ordinate per numero di like
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {motoPopulari.map((moto, index) => (
                <motion.div
                  key={moto.id}
                  className="flex items-center justify-between p-3 glass-effect rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex-1">
                    <p className="font-medium text-white text-sm">
                      {moto.marca} {moto.modello}
                    </p>
                    <p className="text-xs text-gray-400">
                      {moto.anno} • {moto.km.toLocaleString()} km
                    </p>
                    <p className="text-sm font-bold text-green-400">
                      €{moto.prezzo.toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-pink-500/20 text-pink-400 border-pink-500/30">
                    <Heart className="w-3 h-3 mr-1" />
                    {moto.likes}
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;