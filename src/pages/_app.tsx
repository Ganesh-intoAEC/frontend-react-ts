import "@/styles/style.css";
import type { AppProps } from "next/app";

import AuthProvider from "@/app/components/providers/AuthProvider";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { DialogProvider } from "@/app/components/providers/DialogProvider";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <DialogProvider>
          <Component {...pageProps} />
        </DialogProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
