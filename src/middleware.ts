import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware to protect /dashboard routes
export function middleware(request: NextRequest) {
    const isLoggedIn = Boolean(request.cookies.get('session-token'));
    const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard');

    if (isProtectedRoute && !isLoggedIn) {
        // Redirect unauthenticated users to /login
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Allow request to proceed
    return NextResponse.next();
}

// Specify the matcher for middleware to only run on /dashboard routes
export const config = {
    matcher: ['/dashboard/:path*'],
}; 