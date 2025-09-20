"use client";
import { ApolloProvider } from "@apollo/client/react";

import { SessionProvider } from "next-auth/react";
import React from "react";
import type { Session } from "next-auth";
import AuthContext from "@/context/Auth";
import { client } from "@/lib/graphql/config";

const Provider = ({
	children,
	session,
}: {
	children: React.ReactNode;
	session?: Session | null;
}) => {
	return (
		<SessionProvider session={session}>
			<ApolloProvider client={client}>
				<AuthContext>{children}</AuthContext>
			</ApolloProvider>
		</SessionProvider>
	);
};

export default Provider;
