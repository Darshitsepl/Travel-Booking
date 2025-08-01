import { NextAuthOptions } from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
const authOptions:NextAuthOptions= {
 providers: [
    GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
 ],
 callbacks: {
  async signIn(params) {
     console.log(params.credentials,'params');
     console.log(params.account,'params');
     console.log(params.email,'params');
     console.log(params.profile,'params');
     console.log(params.user,'params');


     return true
  },
 },
 pages: {
    signIn: "/login",
 },
 secret: process.env.NEXTAUTH_SECRET
};

export default authOptions;