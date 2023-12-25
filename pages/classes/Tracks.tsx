import React, { useEffect, useState, useCallback } from 'react';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { formatNumber } from '@/numberFormatter';
import { useData } from '@/context/dataProvider';
import { secretKey } from '@/secret';


interface TCardProps {
    title: string;
    name: string;
    img: string;
    // Define other props here if needed
}

const ACard: React.FC<TCardProps> = (props)=>{
    // const formattedValue = formatNumber(props.followers);
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
            </Card>
        </Link>
    )
}


const Tracks = () => {
  const { tracks, setTracks } = useData();
  const accessToken: string | undefined = process.env.NEXT_PUBLIC_ACESS_TOKEN;

  const getTracks = useCallback(async (id: string) => {
    try {
      if (!accessToken) return;

      const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        },
      });

      const json = await response.json();
      // console.log(json)
      setTracks(prevTracks => [...prevTracks, json]);
      // console.log
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [accessToken,setTracks]);

  useEffect(() => {
    localStorage.setItem('type',"track");
    localStorage.setItem('track_search',"false");
    if(localStorage.getItem('track_search')==="false"){
      setTracks([]);
      getTracks("24Yi9hE78yPEbZ4kxyoXAI");
      getTracks("0nrRP2bk19rLc0orkWPQk2");
      getTracks("7C6793WroNKEOt137WKFY0");
      getTracks("6habFhsOp2NvshLv26DqMb");
    }
    // console.log(artists)
  }, [getTracks,setTracks]);

  return (
    <>
      <Navbar/>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "60px", marginLeft: "70px" }}>
        {tracks.map((track) => (
          <ACard
            key={track.id}
            title={track.external_urls.spotify}
            name={track.name}
            img={track.album.images.length > 0 ? track.album.images[0].url : 'https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU'}
          />
        ))}
      </div>
    </>
  );
}

export default Tracks
