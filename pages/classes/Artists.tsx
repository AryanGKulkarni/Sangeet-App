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
    followers: number;
    // Define other props here if needed
}

const ACard: React.FC<ACardProps> = (props)=>{
    const formattedValue = formatNumber(props.followers);
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
                <div className="flex items-center text-gray-600 hover:text-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="ml-2">{formattedValue}</span>
                </div>
            </Card>
        </Link>
    )
}


const Artists = () => {
  const { artists, setArtists} = useData();
  const accessToken: string | undefined = process.env.NEXT_PUBLIC_ACESS_TOKEN;

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
  }, [accessToken,setArtists]);

  useEffect(() => {
    localStorage.setItem('type',"artist");
    localStorage.setItem('search',"false");
    console.log("hi"+process.env.NEXT_PUBLIC_ACESS_TOKEN);
    if(localStorage.getItem('search')==="false"){
      setArtists([]);
      getArtists("64KEffDW9EtZ1y2vBYgq8T");
      getArtists("04gDigrS5kc9YWfZHwBETP");
      getArtists("6VuMaDnrHyPL1p4EHjYLi7");
      getArtists("23fqKkggKUBHNkbKtXEls4");
      getArtists("1uNFoZAHBGtllmzznpCI3s");
      getArtists("1vCWHaC5f2uS3yhpwWbIA6");
      getArtists("2CIMQHirSU0MQqyYHq0eOx");
    }
    // console.log(artists)
  }, [getArtists,setArtists]);

  return (
    <>
      <Navbar/>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "60px", marginLeft: "70px" }}>
        {artists.map((artist) => (
          <ACard
            key={artist.id}
            title={artist.external_urls.spotify}
            name={artist.name}
            followers={artist.followers.total}
            img={artist.images.length > 0 ? artist.images[0].url : 'https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU'}
          />
        ))}
      </div>
    </>
  );
}

export default Artists
