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
    publisher: string;
    // Define other props here if needed
}

const ACard: React.FC<ACardProps> = (props)=>{
    return(
        <Link href={props.title}>
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
                <span className="ml-2">{props.publisher}</span>
            </Card>
        </Link>
    )
}


const Shows = () => {
  const { shows, setShows,accessToken, setAccessToken} = useData();
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

  const getShows = useCallback(async (id: string) => {
    try {
      if (!accessToken) return;

      const response = await fetch(`https://api.spotify.com/v1/shows/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        },
      });

      const json = await response.json();
      // console.log(json)
      setShows(prevShows => [...prevShows, json]);
      // console.log
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [accessToken,setShows]);

  useEffect(() => {

    getToken(); // Call getToken initially

    const intervalId = setInterval(() => {
      setTokenFetched(false);
      getToken(); // Call getToken every one hour (3600 seconds)
    }, 3600000); // 3600000 milliseconds = 1 hour 

    localStorage.setItem('type',"show");
    localStorage.setItem('show_search',"false");
    if(localStorage.getItem('show_search')==="false"){
      setShows([]);
      getShows("5Bxeb2qMO6RKNigC5Qjpn5");
      getShows("0Uyd6WsEPo6TjKPB8xLOFo");
      getShows("4F00VRiUAf3znpPJpvRMad");
      getShows("4H9S6JPs7GhSbcqEviBeoG");
      getShows("7dLZBeYQKnRvp0Viu4ryWd");
      getShows("0DEV2gUjx4tgwBLpJFlX7j");
      getShows("6l4XfkTRejrzZX4EdDYHVc");
    }
    // console.log(Shows)
  }, [getShows,setShows,getToken]);

  return (
    <>
      <Navbar/>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "60px", marginLeft: "70px" }}>
        {shows.map((show) => (
          <ACard
            key={show?.id ?? 'defaultId'}
            title={(show?.external_urls?.spotify) ? show.external_urls.spotify : "Shows"}
            name={show?.name ? show.name : "Not found"}
            publisher={show?.publisher ? show.publisher : "Not found"}
            img={show?.images?.length > 0 ? show.images[0].url : 'https://open.spotify.com/Show/4gzpq5DPGxSnKTe4SA8HAU'}
            />
        
        ))}
      </div>
    </>
  );
}

export default Shows
