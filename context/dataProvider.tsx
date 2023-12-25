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

// Define the context type
interface DataArrays {
    artists: Artist[];
    setArtists: React.Dispatch<React.SetStateAction<Artist[]>>;
    albums: Album[];
    setAlbums: React.Dispatch<React.SetStateAction<Album[]>>;
// Add other arrays and setters as needed
}

// Create the context
const DataContext = createContext<DataArrays>({
    artists: [],
    setArtists: () => {}, // Initialize with empty function
    albums: [],
    setAlbums: () => {}, // Initialize with empty function
    // Initialize other arrays and setters
});

// Create a context provider component
export const DataProvider: React.FC<DataProviderProps>= ({ children }) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  // Initialize other arrays as needed

  return (
    <DataContext.Provider value={{ artists, albums /* Add other arrays here */, setArtists, setAlbums /* Add other setters */ }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the context
export const useData = () => {
  return useContext(DataContext);
};
