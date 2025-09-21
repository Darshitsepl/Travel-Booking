"use client";
import Loading from "@/components/Loading";
import { client } from "@/lib/graphql/config";
import { GetUserProfile } from "@/lib/graphql/Query";
import { GetUserProfileResponse, UserProfile } from "@/lib/graphql/type";
import { useApolloClient, useQuery } from "@apollo/client/react";
import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

interface MainWrapperContextProps {
	user: null | UserProfile;
}
const mainWrapper = createContext<MainWrapperContextProps>({
	user: null,
});
const MainWrapperContext = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
const { data, loading } = useQuery<GetUserProfileResponse>(GetUserProfile, {
  fetchPolicy: "cache-first", // only fetch from network if not in cache
});



	const ctx: MainWrapperContextProps = {
		user:data?.GetUserProfile ?? null,
	};
	return <mainWrapper.Provider value={ctx}>{loading ? <Loading/> : children}</mainWrapper.Provider>;
};

export const useMainWrapper = () => {
	return useContext(mainWrapper);
};
export default MainWrapperContext;
