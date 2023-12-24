import React from 'react'
import {MCard} from "./Card"

export const Genre = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "60px", marginLeft: "70px" }}>
        <MCard title="Albums"/>
        <MCard title="Artists"/>
        <MCard title="Audiobooks"/>
        <MCard title="Categories"/>
        <MCard title="Chapters"/>
        <MCard title="Episodes"/>
        <MCard title="Genres"/>
        <MCard title="Markets"/>
        <MCard title="Player"/>
        <MCard title="Playlists"/>
        <MCard title="Show"/>
        <MCard title="Tracks"/>
    </div>
  )
}
