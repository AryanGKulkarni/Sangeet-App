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
                <span className="ml-2">{props.publisher}</span>
            </Card>
        </a>
    )
}


const Shows = () => {
  const { shows, setShows} = useData();

  const getShows = useCallback(async (id: string) => {
    try {

      const response = await fetch(`/api/callApi?id=${id}&type=shows`);

      const json = await response.json();
      // console.log(json)
      setShows(prevShows => [...prevShows, json]);
      // console.log
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [setShows]);

  useEffect(() => {
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
  }, [getShows,setShows]);

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
