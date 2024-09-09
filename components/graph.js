"use client"
import React from 'react';
import { BarChart,LineChart, Bar,Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Exemples de données à afficher

const CustomBarChart = ({title,data}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
        <h1 className='text-center mt-2 text-xl font-semibold'>{title}</h1>
        <BarChart
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis/>
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
        <Bar dataKey="amt" fill="#e8ff" />
        <Bar dataKey="b.b" fill='#334155' />

      </BarChart>
    </ResponsiveContainer>
  );
};
function CustomBarChartCercle({title,data}){
      return (
        <ResponsiveContainer width="100%" height="100%">
          <h1 className='text-center mt-2 text-xl font-semibold'>{title}</h1>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pu" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      );
    
  };

import { PieChart, Pie, Cell} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', "#FF5042",'#FA9140','#e8ff'];

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Composant pour afficher un graphique en camembert avec Tooltip
function Cercle({title,data}) {
  return (
    <ResponsiveContainer width="100%" height={400}>
        <h1 className='text-center mt-2 text-xl font-semibold'>{title}</h1>
      <PieChart width={400} height={400}>
        <Pie
          data={data}                    // Données à afficher
          cx="50%"                         // Position horizontale (centre)
          cy="50%"                         // Position verticale (centre)
          labelLine={false}                // Désactiver les lignes de connexion pour les étiquettes
          label={renderCustomizedLabel}    // Utiliser la fonction pour personnaliser les étiquettes
          outerRadius={80}                 // Rayon extérieur du graphique
          fill="#8884d8"                   // Couleur par défaut
          dataKey='repetition'                  // Clé des valeurs des données (ici "value")
        >
          {data.map((entry, index) => (
            // Cellule pour chaque portion du graphique avec une couleur associée
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {/* Tooltip ajouté ici pour afficher les informations au survol */}
        <Tooltip />
        <Legend verticalAlign="bottom" height={180} />
      </PieChart>
    </ResponsiveContainer>
  );
}




export default CustomBarChart;
export {CustomBarChartCercle,Cercle}