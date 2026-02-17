import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - login page
     * - api/auth routes
     * - static files
     * - favicon
     */
    "/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
