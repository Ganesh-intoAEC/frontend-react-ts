import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { ReactNode, Suspense, useEffect, useState } from "react";

// import ActiveIcon from '../../../assets/icons/active-user';
import NextImage from "@/app/components/NextImage";
import RibbonIcon from "@/assets/icons/ribbon-icon";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormHelperText,
  Skeleton,
  TextField,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
import GridSearchExport from "./_gridSearchExport";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SkeletonMasterGrid from "./skeleton";
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
    query: { isActive: "true", leadStatus: JSON.stringify(["New", "Connected", "Followed-Up", "Scheduled Meeting", "Estimate Sent"])  },
  },
  {
    label: "Snoozed",
    Icon: SnoozeIcon,
    query: { isSnoozed: "true", leadStatus: JSON.stringify(["New", "Connected", "Followed-Up", "Scheduled Meeting", "Estimate Sent"]) },
  },
  {
    label: "Archive",
    Icon: ArchiveIcon,
    query: { isActive: "false", leadStatus: JSON.stringify(["New", "Connected", "Followed-Up", "Scheduled Meeting", "Estimate Sent"]) },
  },
  {
    label: "Won",
    Icon: WonIcon,
    query: { leadStatus: JSON.stringify(["Won"]) },
  },
  {
    label: "Lost",
    Icon: LostIcon,
    query: { leadStatus:JSON.stringify(["Lost"]) },
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

export default function MasterGridNavigation() {
  const isSmallScreen = useMediaQuery("(max-width: 959.95px)");
  const router = useRouter();
  const [tabIndex, setTabIndex] = React.useState<number>(0);
  const [leadsData, setLeadsData] = useState<Array<LeadsTypes>>([]);
  const [isRowSelected, setIsRowSelected] = React.useState<boolean>(false);

  const [rowStageModal, setRowStageModal] = React.useState(false);
  const [rowStageSelected, setRowStageSelected] = React.useState("");

  const [selectedLead, setSelectedLead] = React.useState<string[]>([]);

  const rowSelectedStage = (option: React.SetStateAction<string>) => {
    setRowStageSelected(option);
    setRowStageModal(true);
  };

  //update stage modal API

  const {
    post: updatePost,
    response: updateResponse,
    error: updateError,
  } = useFetch("/update");
  const updateLead = async (
    queryParameters: Partial<string | string[] | any>
  ) => {
    const requestData = {
      eventType: "UPDATE_LEADS_STATUS",
      updatedBy: "david",
      ...queryParameters,
    };

    await updatePost(requestData);

    if (updateResponse?.ok) {
      const res = await updateResponse.json();
      toast.success("Lead Stage updated successfully", { autoClose: 2500 });
      console.log(res?.body);
    } else {
      toast.error("An error occurred while creating the lead", {
        autoClose: 2500,
      });
      console.error("Error fetching data:", updateError);
    }
  };

  const updateStageModal = (
    rowStageSelected: string,
    selectedLead: string[] | []
  ) => {
    const queryParameters: Partial<string | string[] | any> = {
      leadStatus: rowStageSelected,
      leads: selectedLead,
    };
    updateLead(queryParameters).then(rowStageModalClose) ;
  };

  const selectedLeadUpdate = (option: React.SetStateAction<string[]>) => {
    setSelectedLead(option);
    console.log(selectedLead);
  };
  const selectedRowProps = (option: React.SetStateAction<boolean>) => {
    setIsRowSelected(option);
  };

  const rowStageModalClose = () => {
    setRowStageModal(false);
  };

  // const rowSelectedStage = (option: React.SetStateAction<string>) => {
  //   setRowStageSelected(option);
  //   setRowStageModal(true);
  // };
  const { post, response, loading, error } = useFetch("/fetch");

  const jsonCheck = (value: any) => {
    try {
      const parsed = JSON.parse(value);
      return parsed;
    } catch (error: any) {
      return value;
    }
  };

  const fetchData = async (queryParameters: any) => {
    const query:any = {};
    const intialLoad=Object.keys(queryParameters).every((value)=>value=="isActive"||value=="leadStatus")

    for (const [key,value] of Object.entries(queryParameters)) {
      query[key]=jsonCheck(value)
    }
    const requestData = {
      eventType: "GET_LEADS",
      filters: {
        ...query,
      },
      pageNumber: 1,
      pageCount: 10,
    };

    await post(requestData);

    if (response.ok) {
      const res = await response.json();
      setLeadsData(res?.body?.result || []);
      if(intialLoad && res?.body?.result?.totalCount == 0){
        router.push('/leads/initial')
      }
    } else {
      // Handle error here
      console.error("Error fetching data:", error);
    }
  };

  const onLeadGridSearch = (leadName: string) => {
    if (leadName.length >= 3 || leadName.length === 0) {
      const queryParameters: Record<string, string | string[]> = {
        ...router.query,
        leadName: leadName,
      };
      console.log(queryParameters);
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
                    <div>
                      <GridSearchExport
                        isRowSelected={isRowSelected}
                        rowSelectedStage={rowSelectedStage}
                        leadNameSearch={onLeadGridSearch}
                      />
                    </div>
                    <Suspense fallback={<SkeletonMasterGrid />}>
                      <>
                        {leadsData.length > 0 ? (
                          <div className="mt-5 ">
                            <div>
                              <CustomDatagrid
                                isRowSelected={isRowSelected}
                                rowSelectedStage={rowSelectedStage}
                                selectedPropsPass={selectedRowProps}
                                // leadNameSearch={onLeadGridSearch}
                                selectedLeadProps={selectedLeadUpdate}
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
                      </>
                    </Suspense>
                  </div>
                </div>
              </Box>
            </Box>
          </div>
        </div>

        {/* Dialog modal for stage and other model */}

        <div>
          <Dialog
            open={rowStageModal}
            onClose={rowStageModalClose}
            maxWidth={"xs"}
            sx={{ textAlign: "center" }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            {rowStageSelected !== "Snooze" && rowStageSelected !== "Archive" ? (
              <>
                <DialogTitle id="alert-dialog-title">
                  {"Are you sure you want to Update "}

                  {rowStageSelected == "Won" || rowStageSelected == "Lost" ? (
                    <>
                      <span>{`Lead Stage as ${rowStageSelected} (`} </span>
                      <span>
                        <Tooltip
                          title={rowStageSelected}
                          arrow
                          placement="right"
                          key={rowStageSelected}
                        >
                          {rowStageSelected === "Won" ? (
                            <WonIcon
                              style={{
                                width: "30px",
                                height: "30px",
                                fill: "#2ED47A",
                                transform: "scale(1.5)",
                                margin: " -4px 1px -8px -4px",
                              }}
                            />
                          ) : (
                            <LostIcon
                              style={{
                                width: "30px",
                                height: "30px",
                                fill: "#F7685B",
                                transform: "scale(1.5)",
                                margin: " -4px 1px -8px -4px",
                              }}
                            />
                          )}
                        </Tooltip>
                      </span>
                      <span>{`)`} </span>
                    </>
                  ) : (
                    <>
                      <span>{"Lead Stage as"}</span>
                      <Tooltip
                        title={rowStageSelected}
                        arrow
                        placement="right"
                        key={rowStageSelected}
                      >
                        <RibbonIcon
                          style={{
                            width: "30px",
                            height: "15px",
                            stroke: "#fff",
                            strokeWidth: "0.5px",
                            transform: "scale(1.5)",
                            fill:
                              rowStageSelected === "New"
                                ? "#00ADD3"
                                : rowStageSelected === "Connected"
                                ? "#FFB946"
                                : rowStageSelected === "Followed-Up"
                                ? "#3CA2FF"
                                : rowStageSelected === "Scheduled Meeting"
                                ? "#885AF8"
                                : rowStageSelected === "Estimate Sent"
                                ? "#2ECAD4"
                                : "#000000", // Default color
                          }}
                        />
                      </Tooltip>
                    </>
                  )}

                  {/* {`for selected (${selectedRows.length})?`} */}
                </DialogTitle>
                <DialogContent></DialogContent>
              </>
            ) : (
              <>
                <DialogTitle id="alert-dialog-title" className="d-inline-block">
                  {/* {selectedRows.length == 0 ? (
                  <>
                    {rowStageSelected === "Snooze" && (
                      <span className="underline-on-hover">{`Snooze Lead`}</span>
                    )}
                    {rowStageSelected === "Archive" && (
                      <span className="">{`Are you sure you want to Archive the Lead ?`}</span>
                    )}
                  </>
                ) : (
                  <>
                    <span>{`Are you sure you want to ${rowStageSelected}`}</span>
                    <span
                      style={{
                        color:
                          rowStageSelected === "Snooze"
                            ? "#109CF1"
                            : rowStageSelected === "Archive"
                            ? "#FF3C5F"
                            : "inherit",
                      }}
                    >
                      {` ${selectedRows.length} `}
                    </span>
                    <span>{`Leads ?`}</span>
                  </>
                )} */}
                </DialogTitle>
                <Divider />
                <DialogContent>
                  {rowStageSelected === "Snooze" && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        className="my-2"
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            helperText: "",
                            required: true,
                          },
                        }}
                        label="Tentative start date"
                      />
                    </LocalizationProvider>
                  )}

                  <TextField
                    label="Description"
                    name="projectDescription"
                    multiline
                    rows={4}
                    fullWidth
                  />
                  <FormHelperText style={{ color: "red" }}>
                    Note: Maximum character limit is 250.
                  </FormHelperText>
                </DialogContent>
              </>
            )}
            <div>
              <DialogActions
                sx={{ justifyContent: "center", marginBottom: "20px" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: "174px", height: "48px", background: "#109CF1" }}
                  onClick={rowStageModalClose}
                >
                  {"No"}
                </Button>
                <Button
                  variant="outlined"
                  color={
                    rowStageSelected === "Won" || rowStageSelected === "Lost"
                      ? "primary"
                      : "error"
                  }
                  sx={{
                    width: "174px",
                    height: "48px",
                    color:
                      rowStageSelected === "Won" || rowStageSelected === "Lost"
                        ? "#109CF1"
                        : "#FF3C5F",
                  }}
                  onClick={() =>
                    updateStageModal(rowStageSelected, selectedLead)
                  }
                >
                  Yes
                </Button>
              </DialogActions>
            </div>
          </Dialog>
        </div>
        <ToastContainer />
      </div>
      {/* )} */}
    </>
  );
}
