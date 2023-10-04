import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      sub: string;
      idToken: string;
      AccessToken: string;
      RefreshToken: string;
    };
  }
}
