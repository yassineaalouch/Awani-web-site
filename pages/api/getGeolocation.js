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
  