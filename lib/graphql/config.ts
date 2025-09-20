import { HttpLink } from "@apollo/client";
import { InMemoryCache, ApolloClient } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import {ErrorLink } from '@apollo/client/link/error';
 import {
   CombinedGraphQLErrors,
   CombinedProtocolErrors,
 } from "@apollo/client/errors";

import { getSession, signOut } from "next-auth/react";
import { toast } from "sonner";

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL as string
});


 const errorLink = new ErrorLink(({ error, operation }) => {
   if (CombinedGraphQLErrors.is(error)) {
     error.errors.forEach(({ message }) =>
       toast.error(message)
     );
   } else if (CombinedProtocolErrors.is(error)) {
     error.errors.forEach(({ message, extensions }) =>
       toast.error(message)
    );
   } else {
       toast.error(error.message)

     console.error(`[Network error]: ${error}`);
   }
 });

/**
 * Run before every request and merge token into header
 */

const authLink = new SetContextLink(async ({ headers }) => {
    // get the authentication token from local storage if it exists
    const session = await getSession();
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
    link:errorLink.concat(authLink.concat(httpLink))
})