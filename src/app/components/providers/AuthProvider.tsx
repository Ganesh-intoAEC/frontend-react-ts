import useAuth from "@/app/hooks/useAuth";
import { Box, CssBaseline } from "@mui/material";
import { ReactNode } from "react";
import MiniDrawer from "../sidebar/sidebarComponent";
import { useRouter } from "next/router";
interface Props {
  children: ReactNode;
}
const AuthProvider = ({ children }: Props) => {
  const { session, status } = useAuth();
  const {pathname} = useRouter();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      {session && !pathname.includes("auth")? (
        <Box sx={{ display: "flex", fontFamily: "poppins" }}>
          <CssBaseline />
          <MiniDrawer />
          <Box
            className="container  m-0 p-0"
            component="main"
            sx={{ flexGrow: 1, p: 3, backgroundColor: "#F5F6F8" }}
          >
            {children}
          </Box>
        </Box>
      ) : (
        children
      )}
    </>
  );
};

export default AuthProvider;
