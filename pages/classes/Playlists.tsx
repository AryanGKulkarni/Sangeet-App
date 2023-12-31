import React, { useEffect, useState, useCallback } from 'react';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { formatNumber } from '@/numberFormatter';
import { useData } from '@/context/dataProvider';


interface ACardProps {
    title: string;
    name: string;
    img: string;
    followers: number;
    // Define other props here if needed
}

const ACard: React.FC<ACardProps> = (props)=>{
    const formattedValue = formatNumber(props.followers);
    return(
        <a href={props.title} target="_blank" rel="noreferrer">
            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">{props.name}</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={props.img}
                    width={270}
                    />
                </CardBody>
                <div className="flex items-center text-gray-600 hover:text-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="ml-2">{formattedValue}</span>
                </div>
            </Card>
        </a>
    )
}


const Playlists = () => {
  const { playlists, setPlaylists,accessToken, setAccessToken} = useData();
  // const [accessToken,setAccessToken]= useState("");
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID ? process.env.NEXT_PUBLIC_CLIENT_ID : 'default_client_id';
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET ? process.env.NEXT_PUBLIC_CLIENT_SECRET : 'default_client_id';

  const [tokenFetched, setTokenFetched] = useState(false);

  const getToken = useCallback(async () => {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);

    if(!tokenFetched){
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
  
        const data = await response.json();
        // console.log(clientId);
        // Handle the response data
        // localStorage.setItem('accessToken', data.access_token);
        setAccessToken(data.access_token);
      } catch (error) {
        // Handle errors
        console.error('There was an error with the request:', error);
      }
      setTokenFetched(true);
    }
  }, [clientId, clientSecret, setAccessToken,tokenFetched]);

  const getPlaylists = useCallback(async (id: string) => {
    try {
      if (!accessToken) return;

      const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        },
      });

      const json = await response.json();
      // console.log(json)
      setPlaylists(prevPlaylists => [...prevPlaylists, json]);
      // console.log
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [accessToken,setPlaylists]);

  useEffect(() => {
    getToken(); // Call getToken initially

    const intervalId = setInterval(() => {
      setTokenFetched(false);
      getToken(); // Call getToken every one hour (3600 seconds)
    }, 3600000); // 3600000 milliseconds = 1 hour 

    localStorage.setItem('type',"playlist");
    localStorage.setItem('playlist_search',"false");
    if(localStorage.getItem('playlist_search')==="false"){
      setPlaylists([]);
      getPlaylists("37i9dQZEVXbMDoHDwVN2tF");
      getPlaylists("5ABHKGoOzxkaa28ttQV9sE");
      getPlaylists("37i9dQZEVXbLZ52XmnySJg");
      getPlaylists("2u2anpUoKHfRoUhiUyXz7y");
    }
    // console.log(Playlists)
  }, [getPlaylists,setPlaylists,getToken]);

  return (
    <>
      <Navbar/>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "60px", marginLeft: "70px" }}>
        {playlists.map((playlist) => (
          <ACard
            key={playlist.id}
            title={playlist.external_urls.spotify}
            name={playlist.name}
            followers={playlist.followers ? playlist.followers.total : 0}
            img={playlist.images.length > 0 ? playlist.images[0].url : 'https://open.spotify.com/Playlist/4gzpq5DPGxSnKTe4SA8HAU'}
          />
        ))}
      </div>
    </>
  );
}

export default Playlists
