import {
	Button,
	Kbd,
	Link,
	Input,
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/react";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useEffect, useCallback } from 'react';
import { Artist, Album, Track } from '@/context/dataProvider'
import { link as linkStyles } from "@nextui-org/theme";
import { secretKey } from '@/secret';
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { useData } from '@/context/dataProvider';

import { ThemeSwitch } from "@/components/theme-switch";
import {
	TwitterIcon,
	GithubIcon,
	DiscordIcon,
	HeartFilledIcon,
	SearchIcon,
} from "@/components/icons";

import { Logo } from "@/components/icons";
export const Navbar = () => {
	const [searchQuery, setSearchQuery] = useState<string>('');
  	// const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);

	const { artists, setArtists,tracks, setTracks, albums, setAlbums} = useData();
	const accessToken: string | undefined = secretKey.AccessToken;;

	const getType = useCallback(async (type: string|null) => {
		try {
		  if (!accessToken) return;
	
		  const response = await fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=${type}`, {
			method: "GET",
			headers: {
			  "Authorization": `Bearer ${accessToken}`
			},
		  });
	
		  const json = await response.json();
		//   console.log(json.artists.items)
		  const appendArtists = (json: { artists: { items: Artist[] } }) => {
			setArtists(prevArtists => [...prevArtists, ...json.artists.items]);
		  };		  
		  const appendTracks = (json: { tracks: { items: Track[] } }) => {
			setTracks(prevTracks => [...prevTracks, ...json.tracks.items]);
		  };		  
		  const appendAlbums = (json: { albums: { items: Album[] } }) => {
			setAlbums(prevAlbums => [...prevAlbums, ...json.albums.items]);
		  };		  
		  if(type=="artist"){
			appendArtists(json);
		  }
		  else if(type=="track"){
			appendTracks(json);
		  }
		  else if(type=="album"){
			appendAlbums(json);
		  }
		} catch (error) {
		  console.error("Error fetching data:", error);
		}
	  }, [accessToken,setArtists,searchQuery,setTracks,setAlbums]);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
	// Update searchQuery state with the input value
		if(localStorage.getItem('type')=="artist"){
			localStorage.setItem('search',"true");
		}
		else if(localStorage.getItem('type')=="artist"){
			localStorage.setItem('track_search',"true");
		}
		else if(localStorage.getItem('type')=="album"){
			localStorage.setItem('album_search',"true");
		}
		setSearchQuery(event.target.value);
	};
	const clearArtists = () => {			
		setArtists([]);
		// console.log(artists)
	};
	const clearTracks = () => {			
		setTracks([]);
	};
	const clearAlbums = () => {			
		setAlbums([]);
	};

	const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {		
		
		if(localStorage.getItem('type')=="artist"){
			clearArtists();
		}
		else if(localStorage.getItem('type')=="track"){
			clearTracks();
		}
		else if(localStorage.getItem('type')=="album"){
			clearAlbums();
		}
		event.preventDefault(); // Prevent form submission (if applicable)
		await getType(localStorage.getItem('type')); // Trigger API call when the user submits the search query
		// console.log(artists);
	};

	const searchInput = (
		<form onSubmit={handleSearchSubmit} className="flex items-center">
			<Input
			aria-label="Search"
			classNames={{
				inputWrapper: 'bg-default-100',
				input: 'text-sm',
			}}
			labelPlacement="outside"
			placeholder="Search..."
			startContent={
				<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
			}
			type="search"
			value={searchQuery}
			onChange={handleInputChange}
			/>
			<NavbarItem className="hidden md:flex ml-2">
				<Button
					type="submit"
					className="text-sm font-normal text-default-600 bg-default-100"
					variant="flat"
				>
					Search
				</Button>
			</NavbarItem>
		</form>
	);

	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<p className="font-bold text-inherit">SANGEET</p>
					</NextLink>
				</NavbarBrand>
				<div className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</div>
			</NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
				<NavbarItem className="hidden sm:flex gap-2">
					<Link isExternal href={siteConfig.links.twitter}>
						<TwitterIcon className="text-default-500" />
					</Link>
					<Link isExternal href={siteConfig.links.discord}>
						<DiscordIcon className="text-default-500" />
					</Link>
					<Link isExternal href={siteConfig.links.github}>
						<GithubIcon className="text-default-500" />
					</Link>
					<ThemeSwitch />
				</NavbarItem>
				<NavbarItem className="hidden lg:flex">
					{searchInput}
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
				<NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
				{searchInput}
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={
									index === 2
										? "primary"
										: index === siteConfig.navMenuItems.length - 1
										? "danger"
										: "foreground"
								}
								href="#"
								size="lg"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
