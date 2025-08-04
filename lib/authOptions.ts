import { NextAuthOptions } from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
import createConnection from "./dbConnection";
import { User } from "@/model/User";
import { Token } from "@/model/UserTokens";

const authOptions: NextAuthOptions = {
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID as string,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      })
   ],
   callbacks: {
      async signIn({ account, user, email }) {

         if (account?.provider === 'google') {
            const payload = {
               loginType: account.provider,
               expires_at: account.expires_at,
               username: user.name!,
               ...user,
               email: user.email,
               password: "",

               token: account.access_token!,
            };
            await createConnection();
            const { email, token, expires_at } = payload;

            const formattedExpireat = new Date(expires_at! * 1000)
            const isUserFound = await User.findOne({ email });
            if (!isUserFound) {
               //create user and get id;
               const newUser = await User.create({
                  ...payload,
                  loginType: payload.loginType,
                  password: ""
               });
               await Token.create({
                  token,
                  userId: newUser._id,
                  expires_at: formattedExpireat
               })


            } else {
               await Token.create({
                  token,
                  userId: isUserFound._id,
                  expires_at: formattedExpireat
               })
            }

            return true
         }

         return true
      },
      async session({ token, session }) {
         if (session) {

            return {
               ...session,
               user: {
                  ...session.user,
                  accessToken: token?.accessToken,
                  exptime: token?.exptime,
                  userId: token?.userId?.toString()

               }
            }
         }

         return session

      },

      async jwt({ user, token }) {

         if (user) {
            await createConnection();
            const userId = await User.findOne({ email: user.email });
            const currentUserToken = await Token.findOne({ userId: userId?._id });
            token.userId = userId?._id.toString()

            if (currentUserToken) {
               token.exptime = currentUserToken.expires_at
               token.accessToken = currentUserToken.token;
            }

            return token
         }

         return token
      },

   }
   ,
   pages: {
      signIn: "/login",
   },
   secret: process.env.NEXTAUTH_SECRET
};

export default authOptions;