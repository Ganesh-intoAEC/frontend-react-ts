import { Box, CssBaseline } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { IncomingOptions, Provider } from "use-http";
import MiniDrawer from "../sidebar/sidebarComponent";
interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const { pathname } = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const options: IncomingOptions = {
    interceptors: {
      request: async ({ options, path }) => {
        if (!path?.includes("session")) {
          options.headers = {
            Authorization: `Bearer ${session?.IdToken}`,
          };
        }

        return options;
      },
      response: async ({ response }) => {
        return response;
      },
    },
  };

  return (
    <>
      {!pathname.includes("auth") ? (
        <Provider url={process.env.NEXT_PUBLIC_ENDPOINT} options={options}>
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
        </Provider>
      ) : (
        children
      )}
    </>
  );
};

export default AuthProvider;
