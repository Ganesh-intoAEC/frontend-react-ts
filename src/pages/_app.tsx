import MiniDrawer from '@/app/components/sidebar/sidebarComponent'
import '@/styles/style.css'
import { Box, CssBaseline } from '@mui/material'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return( <>
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
  </>)
}
