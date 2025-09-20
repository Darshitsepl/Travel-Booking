import { NextAuthOptions } from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import createConnection from "./dbConnection";
import { User } from "@/model/User";
import { Token } from "@/model/UserTokens";
import jwt from 'jsonwebtoken';

const authOptions: NextAuthOptions = {
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID as string,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      }),
      CredentialsProvider({
         name: "credentials",
         credentials: {
            username: { label: "User Name", type: "text" },
            email: { label: "Email", type: "text" },
            loginType: {label: "Login Type", type: "text"},
            password: { label: "Password", type: "text" },
            token: { label: "Token", type: 'text' },
            exptime: { label: "Expiry Time", type: 'text' },
            role: { label: 'Role', type: "text" },
            image: { label: 'image', type: "text" },
            userId: {label: "User Id", type: "text"}


         },
         async authorize(credentials) {
            if (credentials) {
               const { exptime } = credentials;
               if (new Date(exptime).getTime() < new Date().getTime()) {
                  return null
               }

               return {
                  ...credentials,
                  id:credentials.userId,
                  loginType: 'credentials'
               };
            }

            return null
         },
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

               token: account.access_token!,
            };
            console.log(process.env.NEXT_PUBLIC_SECERT_JWT_KEY,'process.env.SECERT_JWT_KEY')
            await createConnection();
            const { email, expires_at } = payload;

            const formattedExpireat = new Date(expires_at! * 1000)
            const isUserFound = await User.findOne({ email,isactive: true });
                 
            if (!isUserFound) {
               //create user and get id;
               const newUser = await User.create({
                  ...payload,
                  loginType: payload.loginType,
                  password: ""
               });
               const token = jwt.sign({
                    userId:isUserFound._id,
                    role:isUserFound.role
                }, process.env.NEXT_PUBLIC_SECERT_JWT_KEY as string)
               await Token.create({
                  token,
                  userId: newUser._id,
                  expires_at: formattedExpireat
               })


            } else {
               const token = jwt.sign({
                    userId:isUserFound._id,
                    role:isUserFound.role
                }, process.env.NEXT_PUBLIC_SECERT_JWT_KEY as string)
               await Token.findOneAndUpdate({ userId: isUserFound._id },
                  { token, expires_at: formattedExpireat },
                  { upsert: true, new: true })
            }

            return true
         }

         
         return true
      },
      async jwt({ user, token }) {
         
         if (user) {
            await createConnection();
            const userId = await User.findOne({ email: user.email,isactive: true });
            const currentUserToken = await Token.findOne({ userId: userId?._id });
            token.userId = userId?._id.toString()
            token.name = userId?.username;
            token.role = userId?.role;
            
            if (currentUserToken) {
               console .log(currentUserToken.token,'currentUserToken.token')
               token.exptime = currentUserToken.expires_at
               token.accessToken = currentUserToken.token;
            }

            return token
         }

         return token
      },
      async session({ token, session }) {
         if (session) {

            return {
               ...session,
               user: {
                  ...session.user,
                  name: token.name ?? session.user.name,
                  role: token.role,
                  accessToken: token?.accessToken,
                  exptime: token?.exptime,
                  userId: token?.userId?.toString()

               }
            }
         }

         return session

      },

     

   }
   ,
   pages: {
      signIn: "/login",
   },
   secret: process.env.NEXTAUTH_SECRET
};

export default authOptions;