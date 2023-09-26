import Box from "@mui/material/Box";
import CustomTabCard from "../../../app/components/tabNavigation/customTabCard";
import LeadProfileCard from "./_leadProfileCard";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import WonIcon from "../../../assets/icons/won-icon";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormHelperText,
  TextField,
  Tooltip,
} from "@mui/material";
import LostIcon from "../../../assets/icons/lost-icon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter } from "next/router";

const LeadProfile: React.FC = () => {
  const [leadStatus, setLeadStatus] = React.useState("New");
  const [leadStatusModal, setleadStatusModal] = React.useState(false);
  const [leadCurrentStatus, setLeadCurrentStatus] = React.useState("");

  const { back } = useRouter();

  const initialData = {
    leadName: "Abrams ",
    email: "jane.doe@gmail.com ",
    mobile: "+91 987654321 ",
    address: "Greet technology, Perused ",
    city: "Chennai ",
    state: "Tamil Nadu ",
    country: "India ",
    zipCode: "600 041 ",
    tentativeStartDate: "14-08-2023 ",
    desiredCompletionDate: "August 23, 2023 ",
    estimatedRevenue: "₹ 1,00, 2000 ",
    estimatedBudget: "₹ 1,20, 2000 ",
    estimatedProfit: "₹ 20, 2000 ",
    projectLocation: "Chennai ",
    projectType: "3D Rendering",
    projectDescription:
      "Lorem ipsum dolor sit amet ConnectEDU. Enid quit Turpin lore Mathis. ",
    leadSource: "Client Referrals ",
    assignTo: "Abrams ",
    priority: "High ",
    addedBy: "Jane Doe ",
  };

  const leadSelectedStatus = (option: React.SetStateAction<string>) => {
    setLeadStatus(option);
    setleadStatusModal(true);
  };

  const leadStatusModalClose = () => {
    setleadStatusModal(false);
  };

  const UpdateLeadStatus = () => {
    if (leadStatus === "Won") {
      setLeadCurrentStatus("Won");
      setleadStatusModal(false);
      toast.success("Lead stage updated successfully", { autoClose: 2500 });
    }
    if (leadStatus === "Lost") {
      setLeadCurrentStatus("Lost");
      setleadStatusModal(false);
      toast.success("Lead stage updated successfully", { autoClose: 2500 });
    }
    if (leadStatus === "Snooze") {
      setLeadCurrentStatus("Snooze");
      setleadStatusModal(false);
    }
    if (leadStatus === "Archive") {
      setLeadCurrentStatus("Archive");
      setleadStatusModal(false);
    }
  };

  return (
    <div className="mt-5 pt-5 mx-2">
      <div className="col-12 row  pt-3 mb-2">
        <div className="col-lg-6 col-md-12 col-sm-12 pl-2">
          <IconButton
            className="backButtonUI"
            onClick={() => back()}
            aria-label="delete"
          >
            <ArrowBackIosNewIcon />
            <span className="ml-1">{"Back"}</span>
          </IconButton>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 pr-2 d-flex justify-content-end ">
          <Button
            variant="contained"
            color="success"
            className="btnSuccessUI mr-2"
            startIcon={<WonIcon />}
            onClick={() => leadSelectedStatus("Won")}
          >
            <span>Won</span>
          </Button>
          <Button
            variant="contained"
            className="btnErrorUI"
            color="error"
            startIcon={<LostIcon />}
            onClick={() => leadSelectedStatus("Lost")}
          >
            <span>Lost</span>
          </Button>
        </div>
      </div>
      <div className="col-10 d-flex justify-content-end mb-2 pr-3">
        <CustomTabCard />
      </div>

      <div className="container ">
        <div className="row">
          <div className="col-lg-3 col-md-12">
            <LeadProfileCard
              LeadCurrentStatus={leadCurrentStatus}
              leadSelectedStatus={leadSelectedStatus}
              data={initialData}
            />
          </div>

          <div className="col-lg-9 col-md-12 px-2">
            <Card
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 1,
                  width: "100%",
                  height: "100vh",
                },
                boxShadow: "0px 6px 18px 0px rgba(0, 0, 0, 0.06)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <img
                  src={"/images/Coming soon page img.svg"}
                  srcSet={"/images/Coming soon page img.svg"}
                  style={{ width: "280px", height: "auto" }}
                  alt={"logo"}
                  loading="lazy"
                />
                <div>
                  <span>{"Coming Soon..."}</span>
                </div>
              </Box>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialog modal for stage and other model */}

      <div>
        <Dialog
          open={leadStatusModal}
          onClose={leadStatusModalClose}
          maxWidth={"xs"}
          sx={{ textAlign: "center" }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className="d-inline-block">
            {(leadStatus === "Won" || leadStatus == "Lost") && (
              <>
                <span className="">{"Are you sure you want to Update "}</span>
                <span>{`Lead Status as ${leadStatus} (`} </span>
                <span>
                  <Tooltip
                    title={leadStatus}
                    arrow
                    placement="right"
                    key={leadStatus}
                  >
                    {leadStatus === "Won" ? (
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
                <span>{`) for this Lead ?`} </span>
              </>
            )}
            {leadStatus === "Snooze" && (
              <span className="underline-on-hover">{`Snooze Lead`}</span>
            )}
            {leadStatus === "Archive" && (
              <span className="">{`Are you sure you want to Archive the Lead ?`}</span>
            )}
          </DialogTitle>
          <Divider />
          {!(leadStatus === "Won" || leadStatus == "Lost") && (
            <DialogContent>
              {leadStatus === "Snooze" && (
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
          )}


            <DialogActions sx={{justifyContent:'center', marginBottom:'20px'}} >
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "174px", height: "48px", background: "#109CF1" }}
                onClick={leadStatusModalClose}
              >
                {"No"}
              </Button>
              <Button
                variant="outlined"
                color={
                  leadStatus === "Won" || leadStatus === "Lost"
                    ? "primary"
                    : "error"
                }
                sx={{
                  width: "174px",
                  height: "48px",
                  color:
                    leadStatus === "Won" || leadStatus === "Lost"
                      ? "#109CF1"
                      : "#FF3C5F",
                }}
                onClick={UpdateLeadStatus}
              >
                Yes
              </Button>
            </DialogActions>
       
        </Dialog>
      </div>

      <ToastContainer />
    </div>
  );
};
export default LeadProfile;
