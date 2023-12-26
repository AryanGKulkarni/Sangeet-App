import React from 'react'
import {MCard} from "./Card"
import { useEffect } from 'react';

export const Genre = () => {
  
  useEffect(() => {
    localStorage.setItem('type',"track");
    localStorage.setItem('track_search',"false");
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "60px", marginLeft: "70px" }}>
        <MCard title="Albums"/>
        <MCard title="Artists"/>
        <MCard title="Tracks"/>
        <MCard title="Playlists"/>
        <MCard title="Shows"/>
        <MCard title="Audiobooks"/>
        <MCard title="Categories"/>
        <MCard title="Chapters"/>
        <MCard title="Episodes"/>
        <MCard title="Genres"/>
        <MCard title="Markets"/>
        <MCard title="Player"/>
    </div>
  )
}
