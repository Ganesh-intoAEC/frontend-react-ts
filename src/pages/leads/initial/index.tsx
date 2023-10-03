import React from 'react'
import CreateLeads from '../../../app/pages/lead/initial/createLeadInitial'
import MiniDrawer from '@/app/components/sidebar/sidebarComponent'
import { Box } from '@mui/material'

export default function Home () {
  return (
    <Box sx={{ display: "flex", fontFamily: "poppins" }}>
          <MiniDrawer />
          <Box
            className="container  m-0 p-0"
            component="main"
            sx={{ flexGrow: 1, p: 3, backgroundColor: "#F5F6F8" }}
          >
              <CreateLeads/>
          </Box>
        </Box>
  
  )
}
