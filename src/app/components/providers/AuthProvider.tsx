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
      request: async ({ options }) => {
        // const expires = session?.exp ?? 1;
        // if (moment(moment().unix() * 1000).isAfter(moment(expires * 1000))) {
        //   const result = await fetch(
        //     "https://dev-userhub.aecmultiverse.com/session",
        //     {
        //       method: "POST",
        //       body: JSON.stringify({
        //         eventType: "REFRESH_TOKEN",
        //         previousRefreshToken: session?.RefreshToken,
        //       }),
        //     }
        //   ).then((res) => res.json());
        //   if (result && result.code == "REFRESH_TOKEN_REQUEST_SUCCESSFUL") {
        //     const newJwt = await parseJwt(result?.body?.IdToken);
        //     const sess = await update((prev: any) => ({
        //       ...prev,
        //       ...newJwt,
        //       ...result?.body,
        //     }));
        //     console.log("TImEOUT:::afterupdate", sess);
        //     options.headers = {
        //       Authorization: `Bearer ${sess?.IdToken}`,
        //     };
        //     return options;
        //   } else {
        //     return options;
        //   }
        // } else {
        options.headers = {
          Authorization: `Bearer ${session?.IdToken}`,
        };
        // }
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
