
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const MotoCharts = ({ priceByBrand, kmDistribution, listingByType }) => {
  return (
    <div className="space-y-6">
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle>Prezzo Medio per Marca (Top 10)</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceByBrand}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="marca" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="prezzo" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle>Distribuzione Chilometraggio</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={kmDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fascia" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#facc15" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle>Rapporto Moto Nuove/Usate nel Tempo</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={listingByType}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mese" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Usato" stackId="a" fill="#f43f5e" />
              <Bar dataKey="Nuovo" stackId="a" fill="#34d399" />
              <Bar dataKey="Km0" stackId="a" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default MotoCharts;
