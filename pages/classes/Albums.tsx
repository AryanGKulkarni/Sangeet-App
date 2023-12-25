import React, { useEffect, useState, useCallback } from 'react';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { formatNumber } from '@/numberFormatter';
import { useData } from '@/context/dataProvider';
import { secretKey } from '@/secret';


interface ACardProps {
    title: string;
    name: string;
    img: string;
    date: string;
    // Define other props here if needed
}

const ACard: React.FC<ACardProps> = (props)=>{
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
                <span className="ml-2">{props.date}</span>
            </Card>
        </Link>
    )
}


const Albums = () => {
  const { albums, setAlbums} = useData();
  const accessToken: string | undefined = process.env.NEXT_PUBLIC_ACESS_TOKEN;

  const getAlbums = useCallback(async (id: string) => {
    try {
      if (!accessToken) return;

      const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        },
      });

      const json = await response.json();
      // console.log(json)
      setAlbums(prevAlbums => [...prevAlbums, json]);
      // console.log
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [accessToken,setAlbums]);

  useEffect(() => {
    localStorage.setItem('type',"album");
    localStorage.setItem('album_search',"false");
    if(localStorage.getItem('album_search')==="false"){
      setAlbums([]);
      getAlbums("1ne2D0NxoGyZd31gAM4HNd");
      getAlbums("0h2knr6qpiAq0tV5ri5JMF");
      getAlbums("1bcvtuHyO79DNAOOhHEkEm");
      getAlbums("1IKRstg3XuCuLWeCg3oaAW");
      getAlbums("6Fr2rQkZ383FcMqFyT7yPr");
      getAlbums("4hlAdqONoJhkjf8u9XMjQr");
      getAlbums("1Li4rADxSxjT2g4xqUcMYh");
    }
    // console.log(artists)
  }, [getAlbums,setAlbums]);

  return (
    <>
      <Navbar/>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "60px", marginLeft: "70px" }}>
        {albums.map((album) => (
          <ACard
            key={album.id}
            title={album.external_urls.spotify}
            name={album.name}
            date={album.release_date}
            img={album.images.length > 0 ? album.images[0].url : 'https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU'}
          />
        ))}
      </div>
    </>
  );
}

export default Albums
