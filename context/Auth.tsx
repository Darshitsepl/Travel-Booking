"use client";
import Loading from "@/components/Loading";
import { GetUserProfile } from "@/lib/graphql/Query";
import { GetUserProfileResponse, UserProfile } from "@/lib/graphql/type";
import { useQuery } from "@apollo/client/react";
import { signOut, useSession } from "next-auth/react";
import React, {
	createContext,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { toast } from "sonner";

interface AuthContextProps {
	onLogOut: () => void;
	isOpen: boolean;
	setIsLoading?: React.Dispatch<SetStateAction<boolean>>;
	setIsOpen?: React.Dispatch<SetStateAction<boolean>>;
}
const authContext = createContext<AuthContextProps>({
	onLogOut: () => {},
	isOpen: false,
});
const AuthContext = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const [isOpen, setIsOpen] = useState(true);

		//const { data:userData, loading } = useQuery<GetUserProfileResponse>(GetUserProfile);
	
	
	const [isLoading, setIsLoading] = useState(true);
	const { data, status } = useSession();

		useEffect(() => {
     window.addEventListener('resize', (e) => {
		if(window.innerWidth < 786) {
			console.log('running')
			setIsOpen!(false);
		}
	 })
	}, [])
	

	const handlerLogOut = async () => {
		try {
			const newData: any = { ...data };
			const userId = newData?.user
				? (newData?.user.userId as string)
				: "";
			const response = await (
				await fetch("/api/signout", {
					method: "POST",
					body: JSON.stringify({
						userId,
					}),
				})
			).json();
			if (response.status) {
				try {
					await signOut({
						redirect: true,
						callbackUrl: "/login",
					});
				} catch (error: any) {
					toast(error?.message);
				}
			}
		} catch (error: any) {
			toast(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (data && data?.user && data?.user.exptime) {
			/**ExpTime */
			const expTime = new Date(data?.user.exptime);
			if (expTime.getTime() < new Date().getTime()) {
				handlerLogOut();
			} else {
				setIsLoading(false);
			}
		} else {
			setIsLoading(false);
		}
	}, [data]);

	const ctx: AuthContextProps = {
		onLogOut: handlerLogOut,
		setIsOpen,
		setIsLoading,
		isOpen,
	};
	return (
		<authContext.Provider value={ctx}>
			{isLoading || status === "loading"  ? <Loading /> : children}
		</authContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(authContext);
};
export default AuthContext;
