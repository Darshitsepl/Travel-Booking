import { HttpLink } from "@apollo/client";
import { InMemoryCache, ApolloClient } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_URL as string
});

/**
 * Run before every request and merge token into header
 */

const authLink = new SetContextLink(async ({ headers }) => {
    // get the authentication token from local storage if it exists
    const session = await getSession();
    console.log(session?.user.accessToken, 'access token')
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: session?.user.accessToken ? `Bearer ${session?.user.accessToken}` : "",
        },
    };
});


export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink
})