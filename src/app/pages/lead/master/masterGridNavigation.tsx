import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { ReactNode, useEffect, useState } from "react";

// import ActiveIcon from '../../../assets/icons/active-user';
import NextImage from "@/app/components/NextImage";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useFetch } from "use-http";
import ArchiveIcon from "../../../../assets/icons/archive-icon";
import LostIcon from "../../../../assets/icons/lost-icon";
import SnoozeIcon from "../../../../assets/icons/snooze-icon";
import WonIcon from "../../../../assets/icons/won-icon";
import { LeadsTypes } from "../../../../pages/leads/master";
import CustomDropdownBtn from "../../../components/customDropdownBtn/customDropdownBtn";
import CustomDatagrid from "./_customDatagrid";
import FilterFields from "./_filterFields";

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
      main: "#E5F3FF", // Change this to your desired primary color
    },
    secondary: {
      main: "#E2E6EB", // Change this to your desired primary color
    },
    warning: {
      main: "#FFE5C7",
    },
    success: {
      main: "#E8FFF3",
    },
    error: {
      main: "#FFE4E1",
    },
    // Add more custom colors if needed
  },
});

// Define a function to determine the label text color based on the chip color
const getLabelColor = (color: string) => {
  switch (color) {
    case "primary":
      return "#3CA2FF";
    case "secondary":
      return "black";
    case "warning":
      return "#F7AF5B";
    case "success":
      return "#2ED47A";
    case "error":
      return "#F7685B";
    default:
      return "inherit"; // Default text color
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

const tabs = [
  {
    label: "Active",
    Icon: SnoozeIcon,
    query: { isActive: "true" },
  },
  {
    label: "Snoozed",
    Icon: SnoozeIcon,
    query: { isSnoozed: "true" },
  },
  {
    label: "Archive",
    Icon: ArchiveIcon,
    query: { isActive: "false" },
  },
  {
    label: "Won",
    Icon: WonIcon,
    query: { leadStatus: "Won" },
  },
  {
    label: "Lost",
    Icon: LostIcon,
    query: { leadStatus: "Lost" },
  },
];

const LeadsTab = ({
  index,
  label,
  Icon,
  onClick,
  selected,
}: {
  index: number;
  label: string;
  Icon: any;
  query?: any;
  selected: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) => (
  <Tab
    {...a11yProps(index)}
    icon={<Icon style={{ width: "20px", height: "20px" }} />}
    label={label}
    className={selected ? "Mui-selected" : ""}
    iconPosition="start"
    sx={{
      width: "150px",
      textTransform: "Capitalize",
      borderBottom: 1,
      borderColor: "divider",
    }}
    onClick={onClick}
  />
);

export interface MasterGridNavigationTypes {
  leadsData: Array<LeadsTypes> | null | undefined;
  leadNameSearch: (leadName: string) => void;
}

export default function MasterGridNavigation() {
  const isSmallScreen = useMediaQuery("(max-width: 959.95px)");
  const router = useRouter();
  const [leadsData, setLeadsData] = useState<Array<LeadsTypes>>([]);
  const { post, response, loading, error } = useFetch("/fetch");

  const fetchData = async (
    queryParameters: Record<string, string | string[]>
  ) => {
    const requestData = {
      eventType: "GET_LEADS",
      leadOwnerId: "07edeeb1-c4da-41fd-a8ec-8014320b1ef6",
      filters: {
        organizationId: "d7d019ae-d059-46f6-b88e-d1e719bc1fe6",
        ...queryParameters,
      },
      pageNumber: 1,
      pageCount: 10,
    };

    await post(requestData);

    if (response.ok) {
      const res = await response.json();
      setLeadsData(res?.body?.result || []);
    } else {
      // Handle error here
      console.error("Error fetching data:", error);
    }
  };

  const onLeadGridSearch = (leadName: string) => {
    if (leadName.length >= 0) {
      const queryParameters: Record<string, string | string[]> = {
        leadName: leadName, // Add leadName to queryParameters
      };
      fetchData(queryParameters);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchData(router.query as Record<string, string | string[]>);
    })();
  }, [router.query]);

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
    <>
      {/* {loading || status == "loading" ? (
        <SkeletonMasterGrid />
      ) : ( */}
      <div className="container mx-2 mt-5 pt-3">
        <div className="row mt-5 justify-content-between mb-1">
          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
            <div className="row align-item-center">
              <div className="mr-3">
                <Typography variant="h5" className="fw-500 " gutterBottom>
                  {`All Leads`}
                </Typography>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <Chip
                    sx={{
                      borderRadius: "3px",
                      marginTop: "4px",
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
                    label={`${leadsData?.length} Leads`}
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
                value={value}
                onChange={handleChange}
                variant={isSmallScreen ? "scrollable" : "standard"}
                scrollButtons={isSmallScreen ? true : false}
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
                {tabs.map((data, index) => (
                  <LeadsTab
                    key={`simple-tab-${index}`}
                    Icon={data.Icon}
                    index={index}
                    selected={value == index}
                    label={data.label}
                    onClick={() => {
                      router.push({ query: data.query });
                      setValue(index);
                    }}
                  />
                ))}
              </Tabs>

              <Box>
                <div>
                  <div className="mt-4">
                    <div>
                      <FilterFields />
                    </div>
                  </div>
                  <div className="mt-5 ">
                    {leadsData.length > 0 ? (
                      <div className="mt-5 ">
                        <div>
                          <CustomDatagrid
                            leadNameSearch={onLeadGridSearch}
                            leadsData={leadsData}
                          />
                        </div>
                      </div>
                    ) : (
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
                            <NextImage
                              width={"500px"}
                              src={"/images/no-data-img.svg"}
                              alt={"no-data"}
                              loading="lazy"
                            />
                            <div>
                              <span>{"No Data Found"}</span>
                            </div>
                          </Box>
                        </Box>
                      </div>
                    )}
                  </div>
                </div>
              </Box>
            </Box>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
}
