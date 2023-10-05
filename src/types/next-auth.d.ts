import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    sub: string;
    AccessToken: string;
    ExpiresIn: number;
    TokenType: string;
    RefreshToken: string;
    IdToken: string;
    id: string;
    exp: number;
    "custom:organization_name": string;
    "custom:organization_id": string;
    given_name: string;
    "custom:organization_type": string;
    auth_time: number;
    email: string;
  }
}
