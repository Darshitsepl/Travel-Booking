"use client";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
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
		<main
			className={`grid ${
				isOpen ? "grid-cols-[20%_80%]" : "grid-cols-[1fr]"
			} gap-5 overflow-x-hidden`}
		>
			<div>
				<Header />
			</div>
			<div className="m-12 px-6	 py-6 overflow-x-hidden  shadow-[0_3px_8px_rgba(0,0,0,0.24)]">
				{children}
			</div>
		</main>
	);
};

export default MainLayoutProvider;
