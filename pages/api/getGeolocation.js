// // pages/api/geolocation.js
// export const config = {
//     runtime: 'edge',
//   };
// import axios from 'axios';
// import { NextResponse } from 'next/server';
// // Remplacez par votre propre token IPinfo

// export default async function handler(req, res) {
//   try {
//     const ip = req.query.ip || ''; // IP à rechercher, ou vide pour obtenir les données de l'adresse IP de l'appelant
//     const url = `https://ipinfo.io/${ip}/json?token=${process.env.NEXT_PUBLIC_TOKEN_LOCATION_IP_INFO}`;

//     const request = await fetch("https://ipinfo.io/json?token=1fb3c55e233452")
//     const jsonResponse = await request.json()
//     // Faire la requête à IPinfo
//     // const response = await axios.get(url);
//     // if (!response.ok) {
//     //     throw new Error('Erreur de récupération des données de géolocalisation');
//     // }
//     // Transmettre la réponse au client
//     console.log('response',jsonResponse)
//     // const data = await jsonResponse.json();
//     return NextResponse.json(jsonResponse);
//     // res.status(200).json(response.data);
//   } catch (error) {
//         console.error('Error details:', {
//             message: error.message,
//             code: error.code,
//             config: error.config,
//             request: error.request,
//             response: error.response ? {
//                 status: error.response.status,
//                 statusText: error.response.statusText,
//                 headers: error.response.headers,
//                 data: error.response.data,
//             } : null,
//             stack: error.stack,
//         });
//         res.status(500).json({ error: 'Error fetching geolocation' });
//     }
//   }
// pages/api/getGeolocation.js
export const config = {
    runtime: 'edge',
  };
  
  export default async function handler(req) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(' ')[1]; // Extraire le token "Bearer ..."
  
      if (authHeader && authHeader.startsWith('Bearer ')&&token === process.env.NEXT_PUBLIC_API_KEY_PROTECTION) {
      const ip = req.headers.get('x-forwarded-for') || '';
      const response = await fetch(`https://ipinfo.io/${ip}/json?token=${process.env.NEXT_PUBLIC_TOKEN_LOCATION_IP_INFO}`);
      const data = await response.json();
      console.log('response',data)

      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });}
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Error fetching geolocation', details: error.message }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }
  