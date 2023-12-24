import React, { useEffect, useState, useCallback } from 'react';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import dotenv from 'dotenv'; 
dotenv.config(); 


interface ACardProps {
    title: string;
    name: string;
    img: string;
    // Define other props here if needed
}

const ACard: React.FC<ACardProps> = (props)=>{
    return(
        <Link href={props.title}>
            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">{props.name}</p>
                    <small className="text-default-500">12 Tracks</small>
                    <h4 className="font-bold text-large">Frontend Radio</h4>
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

interface Artist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

const Artists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const accessToken: string | undefined = "BQDnT3kUOsQsHs-hj71zdlf2BE4C8ZRfgk6Rpfi1a0CJuEqPzhPfrHL31GaqFZWaKK1ZX6NMApf3Yxsei0aDCsaAM2QAdIy_3NXVxQaLY91z7ST6cXM";

  const getArtists = useCallback(async (id: string) => {
    try {
      if (!accessToken) return;

      const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        },
      });

      const json = await response.json();
      // console.log(json)
      setArtists(prevArtists => [...prevArtists, json]);
      // console.log
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [accessToken]);

  useEffect(() => {
    getArtists("1vCWHaC5f2uS3yhpwWbIA6");
    getArtists("04gDigrS5kc9YWfZHwBETP");
    getArtists("6VuMaDnrHyPL1p4EHjYLi7");
    getArtists("3Nrfpe0tUJi4K4DXYWgMUX");
    getArtists("1uNFoZAHBGtllmzznpCI3s");
    getArtists("1vCWHaC5f2uS3yhpwWbIA6");
    getArtists("2CIMQHirSU0MQqyYHq0eOx");
    // console.log(artists)
  }, [getArtists]);

  return (
    <>
      <Navbar/>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "60px", marginLeft: "70px" }}>
        {artists.map((artist) => (
          <ACard
            key={artist.id}
            title={artist.external_urls.spotify}
            name={artist.name}
            img={artist.images[0].url}
          />
        ))}
      </div>
    </>
  );
}

export default Artists
