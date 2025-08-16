import Header from "@/components/Header";
import React from "react";

const MainLayoutProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="grid grid-cols-[20%_1fr] gap-5">
			<Header />
			<div className="p-2 h-full">{children}</div>
		</main>
	);
};

export default MainLayoutProvider;
