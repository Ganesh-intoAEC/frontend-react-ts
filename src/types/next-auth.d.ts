import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      sub: string;
      IdToken: string;
      AccessToken: string;
      RefreshToken: string;
    };
  }
}
