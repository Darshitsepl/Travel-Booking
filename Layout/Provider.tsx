"use client";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import React from "react";
import type { Session } from "next-auth";
import AuthContext from "@/context/Auth";
import { client } from "@/lib/graphql/config";
import theme from "@/lib/theme";

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
				<ThemeProvider theme={theme}>
					<AuthContext>{children}</AuthContext>
				</ThemeProvider>
			</ApolloProvider>
		</SessionProvider>
	);
};

export default Provider;
