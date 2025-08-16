import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      name?: string | null
      role: string | null
      email?: string | null
      image?: string | null
      exptime?: string | null
      accessToken?: string
      userId?: string
    }
  }

  interface User {
    accessToken?: string
    userId?: string
    exptime?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    userId?: string
    exptime?: string | null
  }
}
