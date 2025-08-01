import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { TrendingUp, Target, Award, Zap } from 'lucide-react';

const Analytics = ({ data }) => {
  // Analisi prezzi per marca
  const prezziPerMarca = data.reduce((acc, moto) => {
    if (!acc[moto.marca]) {
      acc[moto.marca] = { prezzi: [], count: 0 };
    }
    acc[moto.marca].prezzi.push(moto.prezzo);
    acc[moto.marca].count++;
    return acc;
  }, {});

  const chartPrezziMarca = Object.entries(prezziPerMarca)
    .map(([marca, data]) => ({
      marca,
      prezzoMedio: Math.round(data.prezzi.reduce((sum, p) => sum + p, 0) / data.prezzi.length),
      prezzoMin: Math.min(...data.prezzi),
      prezzoMax: Math.max(...data.prezzi),
      count: data.count
    }))
    .filter(item => item.count >= 3)
    .sort((a, b) => b.prezzoMedio - a.prezzoMedio)
    .slice(0, 8);

  // Analisi correlazione anno-prezzo
  const correlazioneAnnoPrezzo = data
    .filter(moto => moto.anno >= 2010)
    .map(moto => ({
      anno: moto.anno,
      prezzo: moto.prezzo,
      km: moto.km
    }));

  // Analisi distribuzione chilometri
  const distribuzioneKm = data.reduce((acc, moto) => {
    const range = Math.floor(moto.km / 10000) * 10000;
    const key = `${range.toLocaleString()}-${(range + 9999).toLocaleString()}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const chartDistribuzioneKm = Object.entries(distribuzioneKm)
    .map(([range, count]) => ({ range, count }))
    .sort((a, b) => parseInt(a.range) - parseInt(b.range))
    .slice(0, 8);

  // Trend temporale pubblicazioni
  const pubblicazioniPerMese = data.reduce((acc, moto) => {
    const date = new Date(moto.dataPubblicazione);
    const mese = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    acc[mese] = (acc[mese] || 0) + 1;
    return acc;
  }, {});

  const chartTrendPubblicazioni = Object.entries(pubblicazioniPerMese)
    .map(([mese, count]) => ({ mese, count }))
    .sort((a, b) => a.mese.localeCompare(b.mese))
    .slice(-12);

  // Top modelli per likes
  const modelliPerLikes = data.reduce((acc, moto) => {
    const key = `${moto.marca} ${moto.modello}`;
    if (!acc[key]) {
      acc[key] = { totalLikes: 0, count: 0, avgPrezzo: 0, prezzi: [] };
    }
    acc[key].totalLikes += moto.likes;
    acc[key].count++;
    acc[key].prezzi.push(moto.prezzo);
    return acc;
  }, {});

  const topModelliLikes = Object.entries(modelliPerLikes)
    .map(([modello, data]) => ({
      modello,
      avgLikes: Math.round(data.totalLikes / data.count),
      totalLikes: data.totalLikes,
      count: data.count,
      avgPrezzo: Math.round(data.prezzi.reduce((sum, p) => sum + p, 0) / data.prezzi.length)
    }))
    .filter(item => item.count >= 2)
    .sort((a, b) => b.avgLikes - a.avgLikes)
    .slice(0, 10);

  const COLORS = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#6366F1'];

  return (
  <div className="space-y-6">
    <MotoCharts
      priceByBrand={[
        { marca: "BMW", prezzo: 12000 },
        { marca: "Ducati", prezzo: 18000 },
        { marca: "Yamaha", prezzo: 7500 }
      ]}
      kmDistribution={[
        { fascia: "0-10k", count: 5 },
        { fascia: "10k-20k", count: 8 },
        { fascia: "20k+", count: 4 }
      ]}
      listingByType={[
        { mese: "2025-08", Usato: 10, Nuovo: 2, Km0: 1 }
      ]}
    />
  </div>
);
};

export default Analytics;