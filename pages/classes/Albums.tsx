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
    date: string;
    // Define other props here if needed
}

const ACard: React.FC<ACardProps> = (props)=>{
    // const formattedValue = formatNumber(props.followers);
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
                <span className="ml-2">{props.date}</span>
            </Card>
        </a>
    )
}


const Albums = () => {
  const { albums, setAlbums} = useData();

  const getAlbums = useCallback(async (id: string) => {
    try {

      const response = await fetch(`/api/callApi?id=${id}&type=albums`);

      const json = await response.json();
      // console.log(json)
      setAlbums(prevAlbums => [...prevAlbums, json]);
      // console.log
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [setAlbums]);

  useEffect(() => { 

    localStorage.setItem('type',"album");
    localStorage.setItem('album_search',"false");
    if(localStorage.getItem('album_search')==="false"){
      setAlbums([]);
      getAlbums("4JPguzRps3kuWDD5GS6oXr");
      getAlbums("1ne2D0NxoGyZd31gAM4HNd");
      getAlbums("4QLAtpLNUsHEYrcHXmMIZZ");
      getAlbums("6ijGiBcBfUwkoyHn5VUHU2");
      getAlbums("0h2knr6qpiAq0tV5ri5JMF");
      getAlbums("2SWwDDBZG7UfECbPWQ2t4h");
      getAlbums("0VaHnwzDug4AcDkejYDUl5");
      getAlbums("5lKlFlReHOLShQKyRv6AL9");
      getAlbums("1Q9SnHWPNEjVM0LrBFvJ1q");
      getAlbums("0mZIUXje90JtHxPNzWsJNR");
      getAlbums("2ZaX1FdZCwchXl1QZiD4O4");
      getAlbums("2oU2YsoVW3KG0jIlDXWIkx");
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
