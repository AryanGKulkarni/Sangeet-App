import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, type } = req.query;
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID ? process.env.NEXT_PUBLIC_CLIENT_ID : 'default_client_id';
    const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET ? process.env.NEXT_PUBLIC_CLIENT_SECRET : 'default_client_id';
    let data1: any;
  
    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);
  
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      data1 = await response.json();
    } catch (error) {
      console.error('There was an error with the request:', error);
    }
    if(data1.access_token){
        const response = await fetch(`https://api.spotify.com/v1/${type}/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${data1.access_token}`
            },
        });
        const data = await response.json();
        res.status(200).json(data);
    }
    else{
        res.status(500).json({ error: 'Internal server error' });
    }
}
  
