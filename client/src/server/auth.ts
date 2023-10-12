import { type GetServerSidePropsContext } from "next";
import { getServerSession, type NextAuthOptions, type User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "~/env.mjs";
import { fetchAPI } from "~/utils/FetchAPI";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
        role: token.role ?? session.user?.role ?? "",
      },
    }),
    jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60, // 24 hours
  },
  providers: [
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { login, password } = credentials as {
          login: string;
          password: string | null;
        };

        const respLogin = await fetchAPI("login", {
          method: "POST",
          body: JSON.stringify({ email: login, password }),
          headers: { "Content-Type": "application/json" },
        })
          .then((resp) => {
            if (resp.status === 200) {
              return resp.json();
            } else {
              throw new Error("Login failed");
            }
          })
          .then((data) => {
            return data as {
              id: number;
              name: string;
              email: string;
              role: string;
            };
          })
          .catch((err) => {
            console.error(err);
            return null;
          });

        const user: User = {
          id: respLogin?.id.toString() ?? "",
          name: respLogin?.name ?? "",
          email: respLogin?.email ?? "",
          image: "",
          role: respLogin?.role ?? "",
        };
        if (respLogin) return user;
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  debug: true,
  secret: env.NEXTAUTH_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
