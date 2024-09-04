// pages/api/geolocation.js
import axios from 'axios';

// Remplacez par votre propre token IPinfo

export default async function handler(req, res) {
  try {
    const ip = req.query.ip || ''; // IP à rechercher, ou vide pour obtenir les données de l'adresse IP de l'appelant
    const url = `https://ipinfo.io/${ip}?token=${NEXT_PUBLIC_TOKEN_LOCATION_IP_INFO}`;

    // Faire la requête à IPinfo
    const response = await axios.get(url);

    // Transmettre la réponse au client
    res.status(200).json(response.data);
  } catch (error) {
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            config: error.config,
            request: error.request,
            response: error.response ? {
                status: error.response.status,
                statusText: error.response.statusText,
                headers: error.response.headers,
                data: error.response.data,
            } : null,
            stack: error.stack,
        });
        res.status(500).json({ error: 'Error fetching geolocation' });
    }
  }
