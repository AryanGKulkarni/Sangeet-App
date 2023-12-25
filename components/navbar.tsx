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
import { Artist, Album } from '@/context/dataProvider'
import { link as linkStyles } from "@nextui-org/theme";

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
interface SearchResult {
	id: string;
	name: string;
}
export const Navbar = () => {
	const [searchQuery, setSearchQuery] = useState<string>('');
  	// const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);

	const { artists, setArtists} = useData();
	const accessToken: string | undefined = "BQDG8Fpx_rc8yzHF-h-Ra0PqA4sAQpg6VQEb6YNhcrfdnKIJSm028cZMCjUgFyUXD6DWv_2LkPH6QS7zPKWN8txWUwvr7p1d1T2L4IyzR4FdDtsyGL0";

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
		  console.log(json.artists.items)
		  const appendArtists = (json: { artists: { items: Artist[] } }) => {
			setArtists(prevArtists => [...prevArtists, ...json.artists.items]);
		  };		  
		  if(type=="artist"){
			// clearArtists();
			appendArtists(json);
			// console.log(artists);
		  }
		  // console.log
		} catch (error) {
		  console.error("Error fetching data:", error);
		}
	  }, [accessToken,setArtists,searchQuery]);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
	// Update searchQuery state with the input value
		localStorage.setItem('search',"true");
		setSearchQuery(event.target.value);
	};
	const clearArtists = () => {			
		setArtists([]);
		// console.log(artists)
	};

	const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {		
		clearArtists();
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
				{/* <NavbarItem className="hidden md:flex">
					<Button
						type="submit"
						className="text-sm font-normal text-default-600 bg-default-100"
						variant="flat"
					>
						Search
					</Button>
				</NavbarItem> */}
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
