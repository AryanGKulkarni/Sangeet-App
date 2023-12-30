import React from 'react';
import {Code} from "@nextui-org/react";
import { Navbar } from "@/components/navbar";

const AboutPage: React.FC = () => {
  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center pt-20 pb-8 h-screen text-xl">
      <div className="max-w-6xl p-4">
        <p>
            Welcome to our Spotify Aggregator App built on Next.js and Next UI! Our platform aims to provide an intuitive interface for Spotify users to explore various music-related categories, including artists, albums, tracks, playlists, shows, and more.
        </p>

        <h2 className="my-3">How to Use</h2>
        <ul>
            <li className='my-2'>
            <strong>Categories:</strong> Explore different categories by clicking on the respective cards displayed on the homepage.
            </li>
            <li className='my-2'>
            <strong>Search:</strong> Use the search functionality to find your favorite artists, songs, albums, or playlists.
            </li>
            <li className='my-2'>
            <strong>APIs Used:</strong> Our app integrates several Spotify APIs to fetch data, including:
            <ul>
                <li className='my-3'>Search Tracks: <Code>GET https://api.spotify.com/v1/search?q=your_query_here&type=track</Code></li>
                <li className='my-3'>Get Artists: <Code>GET https://api.spotify.com/v1/artists?ids=artist_id_here</Code></li>
                <li className='my-3'>Get Albums: <Code>GET https://api.spotify.com/v1/albums?ids=album_id_here</Code></li>
                <li className='my-3'>Get Playlists: <Code>GET https://api.spotify.com/v1/playlists?ids=playlist_id_here</Code></li>
                <li className='my-3'>Get Shows: <Code>GET https://api.spotify.com/v1/shows?ids=show_id_here</Code></li>
                <li className='my-3'>Access Token: <Code>POST https://accounts.spotify.com/api/token</Code></li>
            </ul>
            </li>
        </ul>

        <h2 className="my-3">Tech Stack</h2>
        <ul>
            <li className='my-2'><strong>Framework:</strong> Next.js + Next UI</li>
            <li className='my-2'><strong>Languages:</strong> HTML, CSS, TypeScript</li>
        </ul>

        <p>
            Feel free to explore the app, search for your favorite music content, and enjoy the rich Spotify experience with our platform!
        </p>
      </div>
    </div>
    </>
  );
};

export default AboutPage;
