import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });


    const { pathname } = req.nextUrl;
    const ignorePaths = ['/login', '/signup'];

       if (pathname.startsWith('/api')) {
        return NextResponse.next();
    }

    // Allow access to ignored paths
    if (ignorePaths.includes(pathname)) {
        return NextResponse.next();
    }

    // Redirect to login if no token (not authenticated)
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // User is authenticated, continue
    return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        "/((?!api|static|.*\\..*|_next).*)",
    ]
}