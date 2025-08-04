"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import type { Session } from "next-auth";
import AuthContext from "@/context/Auth";

const Provider = ({
	children,
	session,
}: {
	children: React.ReactNode;
	session?: Session | null;
}) => {
	return (
		<SessionProvider session={session}>
			<AuthContext>{children}</AuthContext>
		</SessionProvider>
	);
};

export default Provider;
