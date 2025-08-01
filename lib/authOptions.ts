import { NextAuthOptions } from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
const authOptions:NextAuthOptions= {
 providers: [
    GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
 ],
 pages: {
    signIn: "/login",
 },
 secret: process.env.NEXTAUTH_SECRET
};

export default authOptions;