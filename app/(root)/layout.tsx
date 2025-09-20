"use client";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import PasswordAlertPopUp from "@/components/PasswordAlertPopUp";
import { useAuth } from "@/context/Auth";
import { GetUserProfile } from "@/lib/graphql/Query";
import { GetUserProfileResponse } from "@/lib/graphql/type";
import { useQuery } from "@apollo/client/react";
import React, { useEffect } from "react";

const MainLayoutProvider = ({ children }: { children: React.ReactNode }) => {
	const { isOpen, setUser } = useAuth();
	const { data, loading } = useQuery<GetUserProfileResponse>(GetUserProfile);

	useEffect(() => {
		if (data && setUser) {
			setUser(data?.GetUserProfile);
		}
	}, [data]);

	if (loading) {
		return <Loading />;
	}

	return (
		<PasswordAlertPopUp>
			<main
				className={`grid ${
					isOpen ? "grid-cols-[20%_80%]" : "grid-cols-[1fr]"
				} gap-5 overflow-x-hidden`}
			>
				<div>
					<Header />
				</div>

				<div className="m-2 md:m-12 px-2 py-6 md:px-4 overflow-x-hidden  shadow-[0_3px_8px_rgba(0,0,0,0.24)]">
					{children}
				</div>
			</main>
		</PasswordAlertPopUp>
	);
};

export default MainLayoutProvider;
