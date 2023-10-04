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
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      return { ...token, ...user };
    },
    async session({ token, session }) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signIn",
  },
});
