"use client";
import { useAuth } from "@/context/Auth";
import React from "react";

const Header = () => {
  const {onLogOut} = useAuth()

	return (
		<div>
			<button type="button" onClick={onLogOut}>
				Log out
			</button>
		</div>
	);
};

export default Header;
