import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/Layout/Provider";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { Roboto } from "next/font/google";
import { Toaster } from "sonner";

export const metadata: Metadata = {
	title: "Travel Booking",
	icons: {
		icon: "../public/travel.png",
	},
	description:
		"Discover and book unforgettable tours worldwide with Travel Booking. Explore destinations, compare packages, make secure bookings, and share your experiences by leaving ratings and reviews.",
};

const Robot = Roboto({
	weight: ["100", "200", "300", "400", "500", "600", "700"],
	style: "normal",
	subsets: ["latin"],
	variable: "--roboto",
});
export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession(authOptions);
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/travel.png" sizes="20" />
			</head>
			<body className={Robot.className}>
				<Provider session={session}>{children}</Provider>
				<Toaster />
			</body>
		</html>
	);
}
