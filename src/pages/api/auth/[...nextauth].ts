import getRefreshToken from "@/lib/getRefreshToken";
import { parseJwt } from "@/lib/helpers";
import moment from "moment";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
export default NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(
          "https://dev-userhub.aecmultiverse.com/session",
          {
            method: "POST",
            body: JSON.stringify({
              eventType: "USER_LOGIN",
              userEmail: credentials?.username,
              userPassword: credentials?.password,
            }),
          }
        ).then((res) => res.json());

        if (res && res.code == "USER_SIGNIN_SUCCESSFUL") {
          return { ...res.body, id: credentials?.username };
        } else {
          throw new Error(res.message);
        }
      },
    }),
  ],
  events: {},
  callbacks: {
    async jwt({ token, user }: any) {
      let expires: any = {};
      let session: any = {};

      if (token?.IdToken) {
        expires = await parseJwt(token?.IdToken);

        if (
          moment(moment().unix() * 1000).isAfter(moment(expires.exp * 1000))
        ) {
          const refreshToken = await getRefreshToken(token.RefreshToken);
          if (refreshToken) {
            expires = await parseJwt(refreshToken?.IdToken);
          }
          session = { ...refreshToken };
        } else {
          session = { ...token };
        }
      } else if (user) {
        expires = await parseJwt(user?.IdToken);
        session = { ...user };
      }

      session = {
        ...session,
        exp: expires.exp,
        "custom:organization_name": expires["custom:organization_name"],
        "custom:organization_id": expires["custom:organization_id"],
        given_name: expires.given_name,
        "custom:organization_type": expires["custom:organization_type"],
        auth_time: expires.auth_time,
        email: expires.email,
      };

      return session;
    },
    async session({ token, session }: any) {
      session = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signIn",
    error: "/auth/signIn",
  },
});
