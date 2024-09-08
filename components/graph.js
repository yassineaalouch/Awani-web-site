"use client"
import React from 'react';
import { BarChart,LineChart, Bar,Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Exemples de données à afficher

const CustomBarChart = ({title,data}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
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
        <Bar dataKey="b.b"  />

      </BarChart>
    </ResponsiveContainer>
  );
};
function CustomBarChartCercle({title,data}){
      return (
        <ResponsiveContainer width="100%" height="100%">
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
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      );
    
  };

import { PieChart, Pie, Cell} from 'recharts';

// Exemple de données à afficher dans le graphique
const data1 = [
  { name: 'Group A', value: 400 },  // Groupe A avec une valeur de 400
  { name: 'Group B', value: 300 },  // Groupe B avec une valeur de 300
  { name: 'Group C', value: 300 },  // Groupe C avec une valeur de 300
  { name: 'Group D', value: 200 },  // Groupe D avec une valeur de 200
  { name: 'Group E', value: 100 },
  { name: 'Group F', value: 800 },
];

// Liste de couleurs associées à chaque groupe
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', "#FF5042",'#FA9140','#e8ff'];

// Fonction pour personnaliser les étiquettes du graphique
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
          data={data1}                    // Données à afficher
          cx="50%"                         // Position horizontale (centre)
          cy="50%"                         // Position verticale (centre)
          labelLine={false}                // Désactiver les lignes de connexion pour les étiquettes
          label={renderCustomizedLabel}    // Utiliser la fonction pour personnaliser les étiquettes
          outerRadius={80}                 // Rayon extérieur du graphique
          fill="#8884d8"                   // Couleur par défaut
          dataKey="value"                  // Clé des valeurs des données (ici "value")
        >
          {data1.map((entry, index) => (
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