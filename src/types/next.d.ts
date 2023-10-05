declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL?: string;
      VERCEL?: "1";
      NEXTAUTH_SECRET?:string;
      NEXT_PUBLIC_ENDPOINT_FETCH?:string;
      NEXT_PUBLIC_ENDPOINT?:string;
      NEXT_AUTH_ENDPOINT?:string;
    }
  }
}
