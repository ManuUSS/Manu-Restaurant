import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware( request: NextRequest ) {

    if( request.nextUrl.pathname.startsWith('/auth/login') ) {
        const a = request.cookies;
        
    }

    if( request.nextUrl.pathname.startsWith('/auth/register') ) {
        const a = request.cookies;
        
    }

    return NextResponse.redirect(new URL('/about-2', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/auth/login', '/auth/register'],
}