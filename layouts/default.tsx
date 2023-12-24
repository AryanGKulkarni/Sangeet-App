import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import { Head } from "./head";
import {Genre} from "@/components/Genre";

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div className="relative flex flex-col h-screen">
				<Head />
				<Navbar />
				<Genre/>				
			</div>
		</>
	);
}
