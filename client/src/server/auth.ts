import { type GetServerSidePropsContext } from "next";
import {
  type User,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "~/env.mjs";
import { fetchAPI } from "~/utils/FetchAPI";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

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
      },
    }),
    jwt({ token }) {
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
            // if (resp.status === 200) {

            return resp.json();
            // } else {
            //   throw new Error("Login failed");
            // }
          })
          .then((data) => {
            console.log(data);
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
          // role: respLogin?.role ?? "",
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
