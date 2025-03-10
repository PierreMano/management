import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public paths that don't require authentication
  const publicPaths = ["/login", "/register"]
  const isPublicPath = publicPaths.includes(pathname)

  // Check if the path is an API route
  const isApiPath = pathname.startsWith("/api")

  // If it's a public path or API path, allow access
  if (isPublicPath || isApiPath) {
    return NextResponse.next()
  }

  // Check for the token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Redirect to login if not authenticated
  if (!token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /_next (Next.js internals)
     * 2. /fonts, /images (static files)
     * 3. /favicon.ico, /sitemap.xml (static files)
     */
    "/((?!_next|fonts|images|favicon.ico|sitemap.xml).*)",
  ],
}

