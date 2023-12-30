export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "SANGEET",
	description: "Find your favorite music",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
    // {
    //   label: "Docs",
    //   href: "/docs",
    // },
    // {
    //   label: "Pricing",
    //   href: "/pricing",
    // },
    // {
    //   label: "Blog",
    //   href: "/blog",
    // },
    {
      label: "About",
      href: "/About",
    }
	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Projects",
			href: "/projects",
		},
		{
			label: "Team",
			href: "/team",
		},
		{
			label: "Calendar",
			href: "/calendar",
		},
		{
			label: "Settings",
			href: "/settings",
		},
		{
			label: "Help & Feedback",
			href: "/help-feedback",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
	links: {
		github: "https://github.com/AryanGKulkarni",
		twitter: "https://twitter.com/aryan10761",
		docs: "https://nextui-docs-v2.vercel.app",
		discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev"
	},
};
