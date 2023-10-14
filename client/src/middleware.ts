import withAuth from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (!token) {
        return false;
      }
      // `/admin` requires admin role
      if (
        ["/promocoes", "/clients", "/discount"].includes(req.nextUrl.pathname)
      ) {
        //redirect to home if user is not admin
        return !!token?.role && token.role === "admin";
      }

      if (["/cart", "/checkout"].includes(req.nextUrl.pathname)) {
        return !!token?.role && token.role === "user";
      }
      // `/me` only requires the user to be logged in
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/", "/((?!login|api|static|icons|.*\\..*|_next).*)"],
};
