import "@/styles/style.css";
import type { AppProps } from "next/app";

import AuthProvider from "@/app/components/providers/AuthProvider";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SessionProvider>
  );
}
