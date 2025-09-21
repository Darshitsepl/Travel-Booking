"use client";
import Header from "@/components/Header";
import PasswordAlertPopUp from "@/components/PasswordAlertPopUp";
import { useAuth } from "@/context/Auth";
import React, { useEffect } from "react";

const MainLayoutProvider = ({ children }: { children: React.ReactNode }) => {
	const { isOpen,setIsOpen } = useAuth();

   useEffect(() => {
  if (window.innerWidth < 786) {
      console.log('running');
      setIsOpen!(false);
    }
}, []);



	return (
		<PasswordAlertPopUp>
			<main
				className={`grid 
					 transition-all duration-300 ease-in-out
					${
					isOpen ? "grid-cols-[20%_75%]" : "grid-cols-[1fr]"
				} gap-5 overflow-x-hidden`}
			>
				<div>
					<Header />
				</div>

				<section  className="m-0 md:m-6 p-2 md:p-6 max-w-full mx-auto bg-white rounded-2xl shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] overflow-y-auto">
					{children}
				</section>
			</main>
		</PasswordAlertPopUp>
	);
};

export default MainLayoutProvider;
