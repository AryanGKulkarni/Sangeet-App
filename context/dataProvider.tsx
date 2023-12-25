import React, { createContext, useContext, useState } from 'react';

interface DataProviderProps {
    children: React.ReactNode;
}
// Define types for different arrays
export interface Artist {
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

export interface Album {
  id: string;
  title: string;
  // Add other properties as needed
}

export interface Track {
  album: {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  };
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
}

// Define the context type
interface DataArrays {
    artists: Artist[];
    setArtists: React.Dispatch<React.SetStateAction<Artist[]>>;
    albums: Album[];
    setAlbums: React.Dispatch<React.SetStateAction<Album[]>>;
    tracks: Track[];
    setTracks: React.Dispatch<React.SetStateAction<Track[]>>;
// Add other arrays and setters as needed
}

// Create the context
const DataContext = createContext<DataArrays>({
    artists: [],
    setArtists: () => {}, // Initialize with empty function
    albums: [],
    setAlbums: () => {}, // Initialize with empty function
    tracks: [],
    setTracks: () => {}, // Initialize with empty function
    // Initialize other arrays and setters
});

// Create a context provider component
export const DataProvider: React.FC<DataProviderProps>= ({ children }) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  // Initialize other arrays as needed

  return (
    <DataContext.Provider value={{ artists, albums, tracks, setArtists, setAlbums, setTracks }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the context
export const useData = () => {
  return useContext(DataContext);
};
