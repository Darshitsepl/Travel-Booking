'use client'
import Loading from '@/components/Loading';
import { signOut, useSession } from 'next-auth/react';
import React, { createContext, SetStateAction, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';

interface AuthContextProps {
    onLogOut: () => void;
	isOpen: boolean;
	setIsOpen?: React.Dispatch<SetStateAction<boolean>>
}
const authContext = createContext<AuthContextProps>({
	onLogOut: () => { },
	isOpen: false,
})
const AuthContext = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
		const [isOpen, setIsOpen] = useState(false);
	
    const [isLoading, setIsLoading] = useState(true)
    const {data,status} = useSession()

    
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
    
    const ctx:AuthContextProps ={
        onLogOut: handlerLogOut,
		setIsOpen,
		isOpen
    }
  return (
   <authContext.Provider value={ctx}>
    {isLoading || status === 'loading' ? <Loading/> : children}
   </authContext.Provider>
  )
}


export const useAuth = () => {
    return useContext(authContext)
}
export default AuthContext