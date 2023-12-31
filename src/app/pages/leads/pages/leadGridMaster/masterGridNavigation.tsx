import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ThemeProvider, createTheme } from '@mui/material/styles';

// import ActiveIcon from '../../../assets/icons/active-user';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SnoozeIcon from "../../../../../assets/icons/snooze-icon";
import ArchiveIcon from "../../../../../assets/icons/archive-icon";
import WonIcon from "../../../../../assets/icons/won-icon";
import LostIcon from "../../../../../assets/icons/lost-icon";
import CustomDropdownBtn from "../../../../components/customDropdownBtn/customDropdownBtn";
import FilterFields from "./_filterFields";
import CustomDatagrid from "../../../../components/customTableGrid/customTableGrid";
import waitingtoSearch from "../../../../../assets/images/waiting-to-search.svg";
import noDataFoundImg from "../../../../../assets/images/no-data-img.svg";
import Chip from "@mui/material/Chip";
import TripOriginIcon from "@mui/icons-material/TripOrigin";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Define your custom theme
const theme = createTheme({
  // Your custom theme settings here
  // For example, you can define primary and secondary colors
  palette: {
    primary: {
      main: '#E5F3FF', // Change this to your desired primary color
    },
    secondary: {
      main: '#E2E6EB', // Change this to your desired primary color
    },
    warning:{
      main:'#FFE5C7'
    },
    success:{
      main:'#E8FFF3'
    },
    error:{
      main:'#FFE4E1'
    }
    // Add more custom colors if needed
  },
});

// Define a function to determine the label text color based on the chip color
const getLabelColor = (color: string) => {
  switch (color) {
    case 'primary':
      return '#3CA2FF'; 
    case 'secondary':
      return 'black'; 
      case 'warning':
        return '#F7AF5B';
        case 'success':
        return '#2ED47A';
        case 'error':
        return '#F7685B';
    default:
      return 'inherit'; // Default text color
  }
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MasterGridNavigation() {
  const [value, setValue] = React.useState(0);

  const tabNames = [
    {
      count: "20",
      colorCode: "primary",
    },
    {
      count: "5",
      colorCode: "secondary",
    },
    {
      count: "2",
      colorCode: "warning",
    },
    {
      count: "5",
      colorCode: "success",
    },
    {
      count: "10",
      colorCode: "error",
    },
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="container mx-2 mt-5 pt-3">
      <div className="row mt-5 justify-content-between mb-1">
        <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
          <div className="row align-item-center">
            <div className="mr-3">
              <Typography variant="h5" className="fw-500 " gutterBottom>
                {`All Leads`}
              </Typography>
            </div>
            <div >
            <ThemeProvider theme={theme}>
              <Chip
                sx={{
                  borderRadius: "3px",
                  marginTop:'4px',
                  boxShadow:
                      "0px 0px 6px 0px rgba(48, 143, 229, 0.16) !important",
                  "& .MuiChip-root.MuiChip-colorPrimary": {
                    color: "#3CA2FF !important",
                    boxShadow:
                      "0px 0px 6px 0px rgba(48, 143, 229, 0.16) !important",
                  },
                  color: getLabelColor(tabNames[value].colorCode), // Set the label text color dynamically
                }}
                size="small"
                icon={<TripOriginIcon />}
                color={
                  tabNames[value].colorCode as
                    | "primary"
                    | "default"
                    | "secondary"
                    | "error"
                    | "info"
                    | "success"
                    | "warning"
                }
                label={`${tabNames[value].count} Leads`}
                
              />
              </ThemeProvider>

            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 text-right">
          <CustomDropdownBtn />
        </div>
      </div>
      <div>
        <div>
          <Box>
            <Tabs
              allowScrollButtonsMobile
              scrollButtons
              value={value}
              onChange={handleChange}
              aria-label="scrollable auto tabs example"
              sx={{
                "& .MuiButtonBase-root": { minHeight: "48px" },
                "& .Mui-selected": {
                  background: "#3ca2ff2e",
                },
                "& .Mui-selected svg": {
                  fill: "#3CA2FF",
                },
              }}
            >
              <Tab
                {...a11yProps(0)}
                icon={<SnoozeIcon style={{ width: "20px", height: "20px" }} />}
                label="Active"
                iconPosition="start"
                sx={{
                  width: "150px",
                  textTransform: "Capitalize",
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              />
              <Tab
                {...a11yProps(1)}
                icon={<SnoozeIcon style={{ width: "20px", height: "20px" }} />}
                iconPosition="start"
                label="Snoozed"
                sx={{
                  width: "150px",
                  textTransform: "Capitalize",
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              />
              <Tab
                {...a11yProps(2)}
                icon={<ArchiveIcon style={{ width: "20px", height: "20px" }} />}
                iconPosition="start"
                label="Archived"
                sx={{
                  width: "150px",
                  textTransform: "Capitalize",
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              />
              <Tab
                {...a11yProps(3)}
                icon={<WonIcon style={{ width: "30px", height: "30px" }} />}
                iconPosition="start"
                label="Won"
                sx={{
                  width: "150px",
                  textTransform: "Capitalize",
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              />
              <Tab
                {...a11yProps(4)}
                icon={<LostIcon style={{ width: "30px", height: "30px" }} />}
                iconPosition="start"
                label="Lost"
                sx={{
                  width: "150px",
                  textTransform: "Capitalize",
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              />
            </Tabs>

            <CustomTabPanel value={value} index={0}>
              <div>
                <div className="mt-4">
                  <div>
                    <FilterFields />
                  </div>
                </div>
                <div className="mt-5 ">
                  <div>
                    <CustomDatagrid />
                  </div>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div>
                <div className="mt-4">
                  <div>
                    <FilterFields />
                  </div>
                </div>
                <div className="mt-5 ">
                  <div>
                    <CustomDatagrid />
                  </div>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <div>
                <div className="mt-4">
                  <div>
                    <FilterFields />
                  </div>
                </div>
                <div className="mt-5 ">
                  <div>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        "& > :not(style)": {
                          m: 1,
                          width: "100%",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={waitingtoSearch}
                          srcSet={waitingtoSearch}
                          style={{ width: "500px", height: "auto" }}
                          alt={"logo"}
                          loading="lazy"
                        />
                        <div>
                          <span>{"Waiting to search"}</span>
                        </div>
                      </Box>
                    </Box>
                  </div>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <div>
                <div className="mt-4">
                  <div>
                    <FilterFields />
                  </div>
                </div>
                <div className="mt-5 ">
                  <div>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        "& > :not(style)": {
                          m: 1,
                          width: "100%",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={noDataFoundImg}
                          srcSet={noDataFoundImg}
                          style={{ width: "500px", height: "auto" }}
                          alt={"logo"}
                          loading="lazy"
                        />
                        <div>
                          <span>{"No Data Found"}</span>
                        </div>
                      </Box>
                    </Box>
                  </div>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
              <div>
                <div className="mt-4">
                  <div>
                    <FilterFields />
                  </div>
                </div>
                <div className="mt-5 ">
                  <div></div>
                </div>
              </div>
            </CustomTabPanel>
          </Box>
        </div>
      </div>
    </div>
  );
}
