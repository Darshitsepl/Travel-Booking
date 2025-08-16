'use client'
import Header from "@/components/Header";
import { useAuth } from "@/context/Auth";
import React from "react";

const MainLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const {isOpen} = useAuth()
	return (
		<main className={`grid ${isOpen ? 'grid-cols-[20%_1fr]' : "grid-cols-[1fr]"} gap-5`}>
			<Header />
			<div className="p-2 h-full">{children}</div>
		</main>
	);
};

export default MainLayoutProvider;
