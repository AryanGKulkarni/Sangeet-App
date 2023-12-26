# Sangeet App

This is a Spotify aggregator app built on Next.js, designed to explore various Spotify categories such as artists, songs, albums, playlists, shows, and more.

## Description

The app allows users to search for their favorite artists, songs, albums, or playlists. It leverages the Spotify API to fetch data and display information about different categories available on Spotify.

## Features

- Search for artists, songs, albums, playlists, and shows.
- Explore details about specific artists, albums, or playlists.
- Navigate through different categories available on Spotify.

## Framework and Languages Used

- Framework: Next.js + NextUI
- Languages: HTML, CSS, TypeScript

## List of APIs Used

### Search
GET https://api.spotify.com/v1/search?q={query}&type={type}

### Artist
GET https://api.spotify.com/v1/artists?ids={id}

### Album
GET https://api.spotify.com/v1/albums?ids={id}

### Playlist
GET https://api.spotify.com/v1/playlists?ids={id}

### Show
GET https://api.spotify.com/v1/shows?ids={id}

### Access Token
POST https://accounts.spotify.com/api/token



## How to Use

1. Clone the repository.
2. Install dependencies using `npm install` or `yarn install`.
3. Run the app using `npm run dev` or `yarn dev`.
4. Open the app in your browser and explore different Spotify categories.

Feel free to contribute or provide feedback. Happy exploring Spotify!

