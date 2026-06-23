import { NextRequest, NextResponse } from 'next/server'

// Convert payload-token cookie to Authorization: Bearer header.
// Payload's cookie auth requires Sec-Fetch-Site: same-origin (CSRF guard),
// which is absent in some browser contexts (LAN IP, Playwright CDP, etc).
// Bearer auth has no such restriction, so we re-inject the token as a header
// before the request reaches any route handler.
export function middleware(request: NextRequest) {
  const token = request.cookies.get('payload-token')?.value

  if (token && !request.headers.get('authorization')) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('authorization', `Bearer ${token}`)
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
    '/portal/:path*',
  ],
}
