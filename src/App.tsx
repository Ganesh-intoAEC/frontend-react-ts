import Box from "@mui/material/Box";
import MiniDrawer  from "./app/components/sidebar/sidebarComponent";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from "../src/app/pages/dashboard/pages/dashboard";
import CreateLeads from "./app/pages/leads/pages/createLead/createLeadInitial";
import './assets/css/style.css'
import CreateLeadForm from "./app/pages/leads/pages/createLead/createLeadMultistepForm";

import MasterGridNavigation from "./app/pages/leads/pages/leadGridMaster/masterGridNavigation";
import LeadProfile from "./app/pages/leads/pages/leadProfilePage/leadProfile";

function App() {
  return (
    <Router >
      <Box sx={{ display: 'flex' ,fontFamily: 'poppins' }}>
        <CssBaseline />
        <MiniDrawer />
        <Box className="container  m-0 p-0" component="main" sx={{ flexGrow: 1, p: 3 , backgroundColor:'#F5F6F8'}}>
          <Routes>
            <Route path=""  Component={Dashboard} />
            <Route path="/create-lead" Component={CreateLeads} />
            <Route path="/create-lead-form" Component={CreateLeadForm} />
            <Route path="/filter" Component={MasterGridNavigation} />
            <Route path="/lead-profile" Component={LeadProfile} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
