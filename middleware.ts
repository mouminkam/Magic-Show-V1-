import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');
  
  const pathname = request.nextUrl.pathname;

  // Redirect /cart to /shoping-cart (actual cart page)
  if (pathname === '/cart' || pathname.startsWith('/cart/')) {
    return NextResponse.redirect(new URL('/shoping-cart', request.url));
  }

  // Protected routes
  const protectedRoutes = ['/cart', '/checkout', '/profile', '/wishlist'];
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check localStorage token on client-side for auth routes
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    // Let client-side handle redirect if already logged in
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/cart',
    '/cart/:path*',
    '/checkout/:path*',
    '/profile/:path*',
    '/wishlist/:path*',
    '/login',
    '/register'
  ],
};
