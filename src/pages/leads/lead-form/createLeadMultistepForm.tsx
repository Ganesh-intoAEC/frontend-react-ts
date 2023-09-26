import React, { useState } from "react";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  MenuItem,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import ColorlibStepIcon from "../../../app/components/customStepper/colorStepicon";
import ProjectEye from "../../../assets/icons/project-eye";
import UsersInfo from "../../../assets/icons/users-info";
import SuccessTick from "../../../assets/icons/success-tick";
import CustomInputText from "../../../app/components/customInputText/customInputText";
import ImageUpload from "../../../app/components/profileImageUpload/profileImageUpload";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { MuiTelInput } from "mui-tel-input";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  ProjectTypes,
  LeadSources,
  AvatarArr,
  Priority,
} from "../../../app/constants/constant";
import SelectIconDropdown from "../../../app/components/singleSelectIconDropdown/singleSelectIconDropdown";
import { useRouter } from "next/router";

const CreateLeadForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    LeadName: "",
    Address: "",
    email: "",
    phoneNumber: "",
    city: "",
    state: "",
    country: "",
    projectLocation: "",
    projectDescription: "",
    leadSource: "",
    assignTo: "",
    priority: "",
    isValidEmail: true,
  });

  const {push,back} = useRouter();

  const cities = [
    {
      city: "Chennai sdf sdfsfs",
      state: "Tamil Nadu",
      country: "India",
    },
    {
      city: "New York",
      state: "New York",
      country: "USA",
    },
    {
      city: "Parissd fd s",
      state: "Île-de-France",
      country: "France",
    },
  ];

  const steps = [
    {
      label: "Lead",
      icon: <UsersInfo style={{ width: "30px", height: "30px" }} />,
    },
    {
      label: "Project",
      icon: <ProjectEye style={{ width: "30px", height: "30px" }} />,
    },
    {
      label: "Success",
      icon: <SuccessTick style={{ width: "30px", height: "30px" }} />,
    },
  ];

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return (
          formData.LeadName !== "" &&
          formData.Address !== "" 
          // &&
          // formData.phoneNumber !== ""
        );
      case 1:
        return (
          formData.projectLocation !== "" && formData.projectDescription !== ""
        );
      case 2:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid()) {
      if (activeStep === steps.length - 1) {
        // Handle form submission here
        console.log("Form submitted:", formData);
        push("/leads/lead-master");
      } else {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const handleChange = (name: string, value: string) => {
    if (name === "phoneNumber") {
      value = value.slice(0, 20); // Limit to 15 characters
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleTelInputChange = (value: string) => {
  //   // You can access the selected value (string) and info here
  //   // and perform any necessary operations
  //   handleChange;
  // };
  return (
    <div
      className="container mt-5 pt-5"
      style={{
        backgroundImage: `url(images/create-lead-Background.svg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100%",
      }}
    >
      <div className="ml-2 mt-2">
        <IconButton
          className="backButtonUI"
          onClick={() => back()}
          aria-label="delete"
        >
          <ArrowBackIosNewIcon />
          <span className="ml-1">{"Back"}</span>
        </IconButton>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <Box
            sx={{
              borderRadius: "10px",
              background: "#ffffff",
              boxShadow: "0px 8px 32px 0px rgba(0, 0, 0, 0.12)",
            }}
          >
            <Box>
              <div className="border-bottom text-center pt-2">
                <Typography
                  variant="h5"
                  className="fw-500 underline-on-hover"
                  gutterBottom
                >
                  Create Lead
                </Typography>
              </div>
              <div className="container">
                <div className="row ">
                  <div className="col-12 px-4 ">
                    <div className="mt-3">
                      <Stepper alternativeLabel activeStep={activeStep}>
                        {steps.map((step, index) => (
                          <Step key={index}>
                            <StepLabel
                              StepIconComponent={ColorlibStepIcon}
                              StepIconProps={{ icon: step.icon }}
                            >
                              {step.label}
                            </StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </div>

                    <div>
                      {activeStep === steps.length ? (
                        <div>
                          {/* Display a thank you message or redirect here */}
                        </div>
                      ) : (
                        <div>
                          {activeStep === 0 && (
                            <div>
                              <div className="text-center">
                                <ImageUpload />
                              </div>

                              <TextField
                                required
                                label="Lead name"
                                name="LeadName"
                                type="text"
                                value={formData.LeadName}
                                onChange={(e: { target: { value: string; }; }) => handleChange("LeadName", e.target.value)}
                                fullWidth
                                variant="standard"
                                helperText=" "
                              />
                              <TextField
                                label="Email"
                                // placeholder="Email address"
                                name="email"
                                type="email"
                                onChange={(e: { target: { value: string; }; }) => handleChange("email", e.target.value)}
                                value={formData.email}
                                fullWidth
                                variant="standard"
                                // error={!formData.isValidEmail}
                                // helperText={
                                //   !formData.isValidEmail
                                //     ? "Invalid email address"
                                //     : " "
                                // }
                                helperText=" "
                              />
                              {/* <TextField
                                label="Phone Number"
                                name="phoneNumber"
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                helperText=" "
                              /> */}
                              <MuiTelInput
                                label="Phone Number"
                                name="phoneNumber"
                                fullWidth
                                variant="standard"
                                defaultCountry="IN"
                               onlyCountries={['IN', 'US', 'CA']}
                               value={formData.phoneNumber}

                                onChange={(newPhone: string) => handleChange("phoneNumber", newPhone)}
                                helperText=" "
                                MenuProps={{ disableScrollLock: true }}
                              />

                              <TextField
                                label="Address"
                                name="Address"
                                helperText=" "
                                value={formData.Address}
                                onChange={(e: { target: { value: string; }; }) => handleChange("Address", e.target.value)}
                                fullWidth
                                variant="standard"
                              />
                              <TextField
                                select
                                label="City"
                                name="city"
                                helperText=" "
                                value={formData.city}
                                fullWidth
                                onChange={(e: { target: { value: string; }; }) => handleChange("city", e.target.value)}
                                variant="standard"
                                defaultValue="Small"
                                SelectProps={{
                                  MenuProps: { disableScrollLock: true },
                                }}
                              >
                                {cities.map((option) => (
                                  <MenuItem
                                    key={option.city}
                                    value={option.city}
                                  >
                                    {option.city}
                                  </MenuItem>
                                ))}
                              </TextField>
                              <TextField
                                select
                                label="State"
                                name="state"
                                value={formData.state}
                                fullWidth
                                onChange={(e: { target: { value: string; }; }) => handleChange("state", e.target.value)}
                                variant="standard"
                                helperText=" "
                                SelectProps={{
                                  MenuProps: { disableScrollLock: true },
                                }}
                              >
                                {cities.map((option) => (
                                  <MenuItem
                                    key={option.state}
                                    value={option.state}
                                  >
                                    {option.state}
                                  </MenuItem>
                                ))}
                              </TextField>
                              <TextField
                                select
                                label="Country"
                                name="country"
                                value={formData.country}
                                fullWidth
                                onChange={(e: { target: { value: string; }; }) => handleChange("country", e.target.value)}
                                variant="standard"
                                helperText=" "
                                SelectProps={{
                                  MenuProps: { disableScrollLock: true },
                                }}
                              >
                                {cities.map((option) => (
                                  <MenuItem
                                    key={option.country}
                                    value={option.country}
                                  >
                                    {option.country}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </div>
                          )}
                          {activeStep === 1 && (
                            <div>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  className="my-2"
                                  slotProps={{
                                    textField: {
                                      variant: "standard",
                                      fullWidth: true,
                                      helperText: "",
                                      required: true,
                                    },
                                  }}
                                  label="Tentative start date"
                                />
                              </LocalizationProvider>
                              <CustomInputText label="Estimated revenue" />
                              <CustomInputText label="Estimated budget" />
                              <CustomInputText label="Estimated profit" />
                              <TextField
                                required
                                label="Project location"
                                name="projectLocation"
                                value={formData.projectLocation}
                                onChange={(e: { target: { value: string; }; }) => handleChange("projectLocation", e.target.value)}
                                fullWidth
                                variant="standard"
                                helperText=" "
                              />
                              <TextField
                                select
                                required
                                label="Project type "
                                fullWidth
                                helperText=" "
                                variant="standard"
                                SelectProps={{
                                  MenuProps: { disableScrollLock: true },
                                }}
                              >
                                {ProjectTypes.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </TextField>
                              <TextField
                                label="Description"
                                name="projectDescription"
                                multiline
                                helperText="Note: Maximum character limit is 250."
                                onChange={(e: { target: { value: string; }; }) => handleChange("projectDescription", e.target.value)}
                                rows={4}
                                value={formData.projectDescription}
                                variant="standard"
                                fullWidth
                              />
                            </div>
                          )}
                          {activeStep === 2 && (
                            <div>
                              {/* <FormControlLabel
                                control={
                                  <Checkbox
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange}
                                  />
                                }
                                label="I agree to the terms and conditions"
                              /> */}

                              <TextField
                                select
                                required
                                label="Lead Source"
                                fullWidth
                                helperText=" "
                                variant="standard"
                                SelectProps={{
                                  MenuProps: { disableScrollLock: true },
                                }}
                              >
                                {LeadSources.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </TextField>
                              {/* <TextField
                                select
                                required
                                label="Assign to"
                                fullWidth
                                helperText=" "
                                variant="standard"
                              >
                                {LeadStages.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </TextField> */}
                              <SelectIconDropdown
                                dataArr={AvatarArr}
                                label="Assign to"
                              />
                              {/* <TextField
                                select
                                required
                                label="Priority"
                                fullWidth
                                helperText=" "
                                variant="standard"
                                SelectProps={{
                                  MenuProps: { disableScrollLock: true },
                                }}
                              >
                                {LeadStages.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </TextField> */}
                              <SelectIconDropdown
                                dataArr={Priority}
                                label="priority"
                              />
                            </div>
                          )}
                          <div className="container mb-3">
                            <div className="row justify-content-center">
                              <div className="mr-3">
                                <Button
                                  sx={{
                                    width: "160px",
                                    height: "42px",
                                    fontSize: "13px",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                  }}
                                  variant="outlined"
                                  disabled={activeStep === 0}
                                  onClick={handleBack}
                                >
                                  Previous
                                </Button>
                              </div>
                              <div>
                                {activeStep === steps.length - 1 ? (
                                  <>
                                    <Button
                                      sx={{
                                        width: "160px",
                                        height: "42px",
                                        fontSize: "13px",
                                        fontStyle: "normal",
                                        fontWeight: "600",
                                        bordeRadius: "4px",
                                        background: "#3CA2FF",
                                        boxShadow:
                                          "0px 4px 10px 0px rgba(16, 156, 241, 0.24)",
                                      }}
                                      variant="contained"
                                      color="primary"
                                      onClick={handleNext}
                                      disabled={!isStepValid()} // Disable the button if the step is not valid
                                    >
                                      {"Create Lead"}
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      sx={{
                                        width: "160px",
                                        height: "42px",
                                        fontSize: "13px",
                                        fontStyle: "normal",
                                        fontWeight: "600",
                                        bordeRadius: "4px",
                                        background: "#3CA2FF",
                                        boxShadow:
                                          "0px 4px 10px 0px rgba(16, 156, 241, 0.24)",
                                      }}
                                      variant="contained"
                                      color="primary"
                                      onClick={handleNext}
                                      disabled={!isStepValid()} // Disable the button if the step is not valid
                                    >
                                      {"Next "}
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default CreateLeadForm;
