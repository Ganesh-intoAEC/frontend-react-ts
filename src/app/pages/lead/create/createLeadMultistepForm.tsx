import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MuiTelInput } from "mui-tel-input";
import { useRouter } from "next/router";
import React, { useState } from "react";
import CustomInputText from "../../../components/customInputText/customInputText";
import ColorlibStepIcon from "../../../components/customStepper/colorStepicon";
import ImageUpload from "../../../components/profileImageUpload/profileImageUpload";
import SelectIconDropdown from "../../../components/singleSelectIconDropdown/singleSelectIconDropdown";

import { LeadCreateTypes } from "@/pages/leads/create";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "use-http";
import {
  AvatarArr,
  LeadSources,
  Priority,
  steps,
} from "../../../constants/constant";
import { leadSourcesTypes } from "../master/_filterFields";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 80,
      fontSize: "12px !important",
    },
  },
};

const CreateLeadForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<LeadCreateTypes>();
  const [isValidEmail, setIsValidEmail] = React.useState<boolean>(false);
  const [leadSources, setLeadSources] = React.useState<Array<leadSourcesTypes>>(
    []
  );
  const { post, response, error } = useFetch("/fetch");
  const {
    post: createPost,
    response: createResponse,
    error: createError,
  } = useFetch("/create");
  const [formBtnLoading, setFormBtnLoading] = React.useState(false);

  const { push, back } = useRouter();

  const fetchLeadSourceData = async () => {
    const requestData = {
      eventType: "GET_LEAD_SOURCES",
    };
    await post(requestData);

    if (response.ok) {
      const res = await response.json();
      setLeadSources(res?.body || []);
      console.log(res?.body);
    } else {
      // Handle error here
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    // Fetch data for lead sources
    fetchLeadSourceData();
  }, []);

  const createLead = async (queryParameters: Partial<LeadCreateTypes>) => {
    const requestData = {
      eventType: "CREATE_LEAD",

      ...queryParameters,
    };

    await createPost(requestData);

    if (createResponse?.ok) {
      const res = await createResponse.json();
      push("/leads/master?isActive=true");
      toast.success("Lead Added Successfully", { autoClose: 2500 });
      console.log(res?.body);
    } else {
      toast.error("An error occurred while creating the lead", {
        autoClose: 2500,
      });
      setFormBtnLoading(false);
      console.error("Error fetching data:", createError);
    }
  };
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

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return (
          formData?.leadName !== undefined &&
          formData?.leadName !== "" &&
          formData?.leadEmail !== undefined &&
          formData?.leadEmail !== "" &&
          formData?.leadAddress !== undefined &&
          formData?.leadAddress !== "" &&
          formData?.leadMobile !== undefined &&
          formData?.leadMobile !== "" &&
          formData?.leadZipcode !== undefined &&
          formData?.leadZipcode !== "" &&
          formData !== undefined
        );
      case 1:
        return (
          formData?.leadProjectType !== "" &&
          formData?.leadProjectType !== undefined
        );
      case 2:
        return (
          formData?.leadSource !== "" && formData?.leadSource !== undefined
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    console.log(formData);

    if (isStepValid()) {
      if (activeStep === steps.length - 1) {
        // Handle form submission here
        const queryParameters: Partial<LeadCreateTypes> = {
          leadName: formData?.leadName,
          leadEmail: formData?.leadEmail,
          leadMobile: formData?.leadMobile,
          leadAddress: formData?.leadAddress,
          leadCity: formData?.leadCity,
          leadState: formData?.leadState,
          leadZipcode: formData?.leadZipcode,
          leadSource: formData?.leadSource,
          leadProjectType: formData?.leadProjectType,
          estimatedRevenueFromLead: formData?.estimatedRevenueFromLead,
          estimatedProfitFromLead: formData?.estimatedProfitFromLead,
          createdBy: "Dev Test",
        };
        setFormBtnLoading(true);
        createLead(queryParameters)
          .then(() => {
            // toast.success('Lead stage updated successfully', { autoClose: 2500 });
          })
          .catch((error) => {
            toast.error("An error occurred while creating the lead", {
              autoClose: 2500,
            });
            console.error("API request error:", error);
          });

        console.log("Form submitted:", formData);
        // push("/leads/master?isActive=true");
      } else {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (name: string, value: string) => {
    console.log(formData);

    if (name === "leadEmail") {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailPattern.test(value)) {
        // Invalid email format, you can handle this accordingly
        setIsValidEmail(true);
        console.log("Invalid email format");
        // Optionally, you can set an error state or display an error message.
      } else {
        setIsValidEmail(false);
      }
    }
    if (name === "phoneNumber") {
      value = value.slice(0, 20); // Limit to 15 characters
    }

    setFormData((prevData: any) => ({
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
        backgroundImage: `url(/images/create-lead-Background.svg)`,
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
                                name="leadName"
                                type="text"
                                value={formData?.leadName}
                                onChange={(e: { target: { value: string } }) =>
                                  handleChange("leadName", e.target.value)
                                }
                                fullWidth
                                variant="standard"
                                helperText=" "
                                defaultValue={""}
                              />
                              <TextField
                                label="Email"
                                // placeholder="Email address"
                                name="leadEmail"
                                type="email"
                                onChange={(e: { target: { value: string } }) =>
                                  handleChange("leadEmail", e.target.value)
                                }
                                value={formData?.leadEmail}
                                fullWidth
                                variant="standard"
                                error={isValidEmail}
                                helperText={
                                  isValidEmail ? "Invalid email address" : " "
                                }
                                defaultValue={""}
                                // helperText=" "
                              />
                              {/* <TextField
                                label="Phone Number"
                                name="phoneNumber"
                                type="tel"
                                value={formData?.phoneNumber}
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                helperText=" "
                              /> */}
                              <MuiTelInput
                                label="Phone Number"
                                name="leadMobile"
                                fullWidth
                                variant="standard"
                                defaultCountry="IN"
                                onlyCountries={["IN", "US", "CA"]}
                                value={formData?.leadMobile}
                                onChange={(newPhone: string) =>
                                  handleChange("leadMobile", newPhone)
                                }
                                helperText=" "
                                MenuProps={{ disableScrollLock: true }}
                              />

                              <TextField
                                label="Address"
                                name="leadAddress"
                                helperText=" "
                                value={formData?.leadAddress}
                                onChange={(e: { target: { value: string } }) =>
                                  handleChange("leadAddress", e.target.value)
                                }
                                fullWidth
                                variant="standard"
                                defaultValue={""}
                              />
                              <TextField
                                label="City"
                                name="leadCity"
                                helperText=" "
                                value={formData?.leadCity}
                                fullWidth
                                onChange={(e: { target: { value: string } }) =>
                                  handleChange("leadCity", e.target.value)
                                }
                                variant="standard"

                                // SelectProps={{
                                //   MenuProps: { disableScrollLock: true },
                                // }}
                              >
                                {/* {cities.map((option) => (
                                  <MenuItem
                                    key={option.city}
                                    value={option.city}
                                  >
                                    {option.city}
                                  </MenuItem>
                                ))} */}
                              </TextField>
                              <TextField
                                select
                                label="State"
                                name="leadState"
                                value={formData?.leadState}
                                fullWidth
                                onChange={(e: { target: { value: string } }) =>
                                  handleChange("leadState", e.target.value)
                                }
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
                                label="Country"
                                name="leadCountry"
                                value={formData?.leadCountry}
                                fullWidth
                                onChange={(e: { target: { value: string } }) =>
                                  handleChange("leadCountry", e.target.value)
                                }
                                variant="standard"
                                helperText=" "
                              ></TextField>
                              <TextField
                                label="Zip Code"
                                name="leadZipcode"
                                helperText=" "
                                value={formData?.leadZipcode}
                                onChange={(e: { target: { value: string } }) =>
                                  handleChange("leadZipcode", e.target.value)
                                }
                                fullWidth
                                variant="standard"
                                defaultValue={""}
                              />
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
                                // value={formData?.projectLocation}
                                // onChange={(e: { target: { value: string; }; }) => handleChange("projectLocation", e.target.value)}
                                fullWidth
                                variant="standard"
                                helperText=" "
                              />
                              <TextField
                                // select
                                required
                                label="Project type "
                                name="leadProjectType" value={formData?.leadProjectType}
                                onChange={(e: { target: { value: string } }) =>
                                  handleChange(
                                    "leadProjectType",
                                    e.target.value
                                  )
                                }
                               
                                fullWidth
                                helperText=" "
                                variant="standard"
                                // SelectProps={{
                                //   MenuProps: { disableScrollLock: true },
                                // }}
                              >
                                {/* {ProjectTypes.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))} */}
                              </TextField>
                              <TextField
                                label="Description"
                                name="projectDescription"
                                multiline
                                helperText="Note: Maximum character limit is 250."
                                // onChange={(e: { target: { value: string; }; }) => handleChange("projectDescription", e.target.value)}
                                rows={4}
                                // value={formData?.projectDescription}
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
                                    checked={formData?.agreeToTerms}
                                    onChange={handleChange}
                                  />
                                }
                                label="I agree to the terms and conditions"
                              /> */}

                              <TextField
                                select
                                required
                                label="Lead Source"
                                name="leadSource"
                                value={formData?.leadSource}
                                onChange={(e: { target: { value: string } }) =>
                                  handleChange("leadSource", e.target.value)
                                }
                                fullWidth
                                helperText=" "
                                variant="standard"
                                SelectProps={{
                                  MenuProps: {
                                    ...MenuProps,
                                    disableScrollLock: true,
                                  },
                                }}
                              >
                                {leadSources.map((option) => (
                                  <MenuItem
                                    key={option.leadSourceId}
                                    value={option.leadSourceSubCategory}
                                  >
                                    {option.leadSourceSubCategory}
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
                                    <LoadingButton
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
                                      loading={formBtnLoading}
                                      loadingPosition="end"
                                      disabled={!isStepValid()}
                                    >
                                      {"Create Lead"}
                                    </LoadingButton>
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
      <ToastContainer />
    </div>
  );
};

export default CreateLeadForm;
