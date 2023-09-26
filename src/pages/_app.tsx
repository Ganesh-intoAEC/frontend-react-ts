import MiniDrawer from "@/app/components/sidebar/sidebarComponent";
import "@/styles/style.css";
import { Box, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if the isLoggedIn query parameter exists and set the state accordingly
      if (router.query.isLoggedIn) {
        setIsLoggedIn(router.query.isLoggedIn === "true");
      }
    }
  }, [router.query.isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <Box sx={{ display: "flex", fontFamily: "poppins" }}>
          <CssBaseline />
          <MiniDrawer />
          <Box
            className="container  m-0 p-0"
            component="main"
            sx={{ flexGrow: 1, p: 3, backgroundColor: "#F5F6F8" }}
          >
            <Component {...pageProps} />
          </Box>
        </Box>
      ) : (
        <>
          <Component {...pageProps} />
        </>
      )}
    </>
  );
}
