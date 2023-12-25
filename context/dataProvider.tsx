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
  album_type: string;
  artists: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
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
// Inside your context file (e.g., dataProvider.ts)

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    items: {
      added_at: string;
      added_by: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
      };
      is_local: boolean;
      primary_color: string | null;
      track: Track;
      video_thumbnail: {
        url: string | null;
      };
    }[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
  type: string;
  uri: string;
}

export interface Episode {
  audio_preview_url: string;
  description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  html_description: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
}

export interface Show {
  available_markets: string[];
  copyrights: string[];
  description: string;
  episodes: {
    href: string;
    items: Episode[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  html_description: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  total_episodes: number;
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
    playlists: Playlist[];
    setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
    shows: Show[];
    setShows: React.Dispatch<React.SetStateAction<Show[]>>;
// Add other arrays and setters as needed
}

// Create the context
const DataContext = createContext<DataArrays>({
    artists: [],
    setArtists: () => {}, // Initialize with empty function
    albums: [],
    setAlbums: () => {}, // Initialize with empty function
    tracks: [],
    setTracks: () => {}, 
    playlists: [],
    setPlaylists: () => {}, 
    shows: [],
    setShows: () => {}, 
});

// Create a context provider component
export const DataProvider: React.FC<DataProviderProps>= ({ children }) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [shows, setShows] = useState<Show[]>([]);
  // Initialize other arrays as needed

  return (
    <DataContext.Provider value={{ artists, albums, tracks, playlists, shows, setArtists, setAlbums, setTracks, setPlaylists, setShows }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the context
export const useData = () => {
  return useContext(DataContext);
};
