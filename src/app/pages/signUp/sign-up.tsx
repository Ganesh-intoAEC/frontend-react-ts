import React, { useCallback, useEffect, useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { MenuItem, Typography, useMediaQuery } from "@mui/material";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import router from "next/router";
import CarouselSignup from "./carousel";
import { MuiTelInput } from "mui-tel-input";
import TickIcon from "@/assets/icons/tick-icon";
import CloseIcon from "@/assets/icons/close-icon";
import { organiationTypes } from "@/app/constants/constant";

const SignupCard: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width: 990.95px)");

  //form Data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    organizationName: "",
    organizationType: "",
    country: "",
    password: "",
    confirmPassword: "",
    agreeTermsAndCondition: false,
  });
  //For Password
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [passwordsMatch, setPasswordsMatch] = React.useState(true);
  const [invalidPassword, setInvalidPassword] = React.useState(false);
  const [showpasswordRule, setShowpasswordRule] = React.useState(false);
//For Email OTP hide/show
  const [isEmailDisabled, setIsEmailDisabled] = React.useState(true);
  const [isEmailOTPDisabled, setIsEmailOTPDisabled] = React.useState(true);
  const [showEmailOTPField, setShowEmailOTPField]= React.useState(false);
  const [verifyEmailButtonText, setVerifyEmailButtonText] = useState("Verify");

  //For Mobile OTP hide/show
  const [isMobileDisabled, setIsMobileDisabled] = React.useState(true);
  const [isMobileOTPDisabled, setIsMobileOTPDisabled] = React.useState(true);
  const [showMobileOTPField, setShowMobileOTPField]= React.useState(false);
  const [verifyMobileButtonText, setVerifyMobileButtonText] = useState("Verify");

  const [emailtimer, setEmailTimer] = useState<number | null>(null);
  const [mobiletimer, setMobileTimer] = useState<number | null>(null);

  const [signupBtnClicked, setSignupBtnClicked] = React.useState(false)


  // Timer duration (in seconds)
  const timerDuration = 60;

  useEffect(() => {
    // This effect runs when showEmailOTPField changes
    if (showEmailOTPField) {
      // Start the timer when showEmailOTPField is true
      setEmailTimer(timerDuration);
      setVerifyEmailButtonText("Verify")
      // Create an interval to decrement the timer
      const interval = setInterval(() => {
        setEmailTimer((prevTimer) => {
          if (prevTimer === null) {
            // Timer already cleared, stop the interval
            clearInterval(interval);
            return null;
          }
          if (prevTimer === 1) {
            // Timer reached 0, reset and change button text
            setVerifyEmailButtonText("Re-Verify")
            clearInterval(interval);
            setIsEmailOTPDisabled(true);
            setShowEmailOTPField(false);
            return null;
          }
          // Decrement timer
          return prevTimer - 1;
        });
      }, 1000);

      // Clean up the interval when component unmounts or showEmailOTPField changes
      return () => {
        clearInterval(interval);
        setEmailTimer(null);
      };
    }
  }, [showEmailOTPField]);

  
  useEffect(() => {
    if (showMobileOTPField) {
      // Start the timer when showEmailOTPField is true
      setMobileTimer(timerDuration);
      setVerifyMobileButtonText("Verify")
      // Create an interval to decrement the timer
      const interval = setInterval(() => {
        setMobileTimer((prevTimer) => {
          if (prevTimer === null) {
            // Timer already cleared, stop the interval
            clearInterval(interval);
            return null;
          }
          if (prevTimer === 1) {
            // Timer reached 0, reset and change button text
            setVerifyMobileButtonText("Re-Verify")
            clearInterval(interval);
            setIsMobileOTPDisabled(true);
            setShowMobileOTPField(false);
            return null;
          }
          // Decrement timer
          return prevTimer - 1;
        });
      }, 1000);

      // Clean up the interval when component unmounts or showEmailOTPField changes
      return () => {
        clearInterval(interval);
        setMobileTimer(null);
      };
    }

  }, [showMobileOTPField]);
  const handleChange = (name: string, value: string | boolean) => {
    if (name === "mobileNumber") {
      value = typeof value === "string" ? value.slice(0, 20) : value; // Limit to 15 characters if it's a string
      setIsMobileDisabled(false);
    }
    if (name === "email") {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      setIsEmailDisabled(!re.test(String(value).toLowerCase()));
    }
    const regex = /^[0-9\b]+$/;
    if (name === "emailOTP" && typeof value === "string" && value.length === 6 && regex.test(value)) {
      setIsEmailOTPDisabled(false);
    } else {
      setIsEmailOTPDisabled(true);
    }
  
    if (name === "agreeTermsAndCondition") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value as boolean,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value as string,
      }));
    }
  };
  


  const checkLength = useMemo(
    () => password.length >= 8 && password.length <= 16,
    [password]
  );
  const checkUppercase = useMemo(() => /[A-Z]/.test(password), [password]);
  const checkLowercase = useMemo(() => /[a-z]/.test(password), [password]);
  const checkSymbol = useMemo(() => /\W|_/.test(password), [password]);
  const checkNumber = useMemo(() => /[0-9]/.test(password), [password]);

  const handleClickShowPassword = useCallback(
    () => setShowPassword((show) => !show),
    []
  );
  const handleClickShowNewPassword = useCallback(
    () => setShowNewPassword((show) => !show),
    []
  );

  const handleMouseDownPassword = useCallback(
    (event: { preventDefault: () => unknown }) => event.preventDefault(),
    []
  );

  const TickIconStyle = {
    width: "10px",
    height: "10px",
    fill: "#ffffff",
    background: "#42D28A",
    borderRadius: "20px",
    padding: "3px",
  };
  const closeIconStyle = {
    width: "10px",
    height: "10px",
    fill: "#ffffff",
    background: "#F14534",
    borderRadius: "20px",
    padding: "3px",
  };

  const handleSignupClick = () => {
    setSignupBtnClicked(true)
    if (password === newPassword) {
      const isPasswordValid =
        checkLength &&
        checkUppercase &&
        checkLowercase &&
        checkSymbol &&
        checkNumber;
      if (isPasswordValid) {
        router.push("/signUp/registerSuccessful");
      } else {
        setPasswordsMatch(true);
        setInvalidPassword(true);
      }
    } else {
      setPasswordsMatch(false);
      setInvalidPassword(false);
    }
  };

  return (
    <div className="container signUpUI bg-white w-100  ">
      <div className="row ">
        <div className=" col-lg-6 col-md-12 col-sm-12  text-center">
          <Box
            className="mx-5 col-lg-10 bg-white rounded"
            sx={{
              display: "flex",
              color: "#000000",
            }}
          >
            <Box className="w-100 mt-5 px-2">
              <Box className="">
                <img
                  src={"/images/logo.png"}
                  srcSet={"/images/logo.png"}
                  style={{ width: "250px", height: "auto" }}
                  alt={"logo"}
                  loading="lazy"
                />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={600} textAlign={"left"}>
                  {"Signup"}
                </Typography>
              </Box>
              <Box className="my-3  ">
                <TextField
                  label={
                    <span>
                      Full Name <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  placeholder="Enter your Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  helperText={
                    (signupBtnClicked && formData.fullName === '') ? (
                      <span style={{ color: "red" }}>
                        Enter a Full name
                      </span>
                    ) : (
                      ""
                    )
                  }
                />
              </Box>
              <Box className="my-3 ">
                <TextField
                  label={
                    <span>
                      Email <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  placeholder="Enter your email"
                  onChange={(e) => handleChange("email", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={formData.email}
                  helperText={
                    (signupBtnClicked && formData.email === '') ? (
                      <span style={{ color: "red" }}>
                        Verify the Email address
                      </span>
                    ) : (
                      ""
                    )
                  }
                  InputProps={{
                    endAdornment: (
                      <Button
                        variant="contained"
                        sx={{width:'125px',background:(verifyEmailButtonText==='Verify') ? "#3CA2FF " : "#F7685B ",'&:hover': {
                          background: (verifyEmailButtonText === 'Verify') ? "#3398E6" : "#F65A4A", },}}
                        onClick={() => {
                          if (!isEmailDisabled && !showEmailOTPField) {
                            // Start the timer and show email OTP field
                            setShowEmailOTPField(true);
                          }
                        }}
                        // Disable the button if isDisabled is true or the timer is active
                        disabled={isEmailDisabled || emailtimer !== null}
                      >
                  {verifyEmailButtonText}
                      </Button>
                    ),
                  }}
                  disabled={showEmailOTPField}
                />
                { emailtimer === null ? '': <p style={{color:'#F7685B'}}>{`Please enter verification code sent to your inbox. Your code will expire in 00:${emailtimer}`}</p>}
              </Box>
              {showEmailOTPField &&(<Box className="my-3 ">
                <TextField
                  placeholder="Enter your OTP  "
                  name="emailOTP"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => handleChange("emailOTP", e.target.value)}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          // Handle the verification logic here
                          // This can be triggered when the "Verify" button is clicked
                          // You can access the email value from the 'email' state
                          if (!isEmailOTPDisabled) {
                            // Perform the verification action
                            // Example: send a verification email
                          }
                        }}
                        // Disable the button if isDisabled is true
                        disabled={isEmailOTPDisabled}
                      >
                        Submit
                      </Button>
                    ),
                  }}
                />
              </Box>)}
              <Box className="my-3  ">
                <MuiTelInput
                  label={
                    <span>
                      Mobile Number <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="mobileNumber"
                  fullWidth
                  defaultCountry="IN"
                  value={formData.mobileNumber}
                  onChange={(newPhone: string) =>
                    handleChange("mobileNumber", newPhone)
                  }
                  helperText={
                    (signupBtnClicked && formData.mobileNumber === '') ? (
                      <span style={{ color: "red" }}>
                        Verify the Mobile number
                      </span>
                    ) : (
                      ""
                    )
                  }
                  MenuProps={{ disableScrollLock: true }}
                  InputProps={{
                    endAdornment: (
                      <Button
                        variant="contained"
                        sx={{width:'135px',background:(verifyMobileButtonText==='Verify') ? "#3CA2FF " : "#F7685B ", '&:hover': {
                          background: (verifyMobileButtonText === 'Verify') ? "#3398E6" : "#F65A4A", },}}
                        onClick={() => {
                          if (!isMobileDisabled && !showMobileOTPField) {
                            // Start the timer and show email OTP field
                            setShowMobileOTPField(true);
                          }
                        }}
                        // Disable the button if isDisabled is true or the timer is active
                        disabled={isMobileDisabled || mobiletimer !== null}
                      >
                  {verifyMobileButtonText}
                      </Button>
                    ),
                  }}
                  disabled={showMobileOTPField}
                />
               { mobiletimer === null ? '': <p style={{color:'#F7685B'}}>{`Please enter verification code sent to your inbox. Your code will expire in 00:${mobiletimer}`}</p>}
              </Box>
              {showMobileOTPField &&(<Box className="my-3 ">
                <TextField
                  placeholder="Enter your OTP  "
                  name="mobileOTP"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => handleChange("mobileOTP", e.target.value)}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          // Handle the verification logic here
                          // This can be triggered when the "Verify" button is clicked
                          // You can access the email value from the 'email' state
                          if (!isMobileOTPDisabled) {
                            // Perform the verification action
                            // Example: send a verification email
                          }
                        }}
                        // Disable the button if isDisabled is true
                        disabled={isMobileOTPDisabled}
                      >
                        Submit
                      </Button>
                    ),
                  }}
                />
              </Box>)}
              <Box className="col-lg-12 row">
                <Box className=" col-lg-6 col-md-12 col-sm-12 mb-2 d-flex rounded">
                  {" "}
                  <TextField
                    label={
                      <span>
                        Organization name{" "}
                        <span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    placeholder="Enter your Organization name"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={formData.organizationName}
                    onChange={(e) =>
                      handleChange("organizationName",  e.target.value)
                    }
                    helperText={
                      (signupBtnClicked && formData.organizationName === '') ? (
                        <span style={{ color: "red" }}>
                          Enter Organization name
                        </span>
                      ) : (
                        ""
                      )
                    }
                    sx={{ paddingRight: "10px" }}
                  />
                </Box>
                <Box className="col-lg-6 col-md-12 col-sm-12 ">
                  {" "}
                  <TextField
                    select
                    label={
                      <span>
                        Organization Type{" "}
                        <span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    sx={{textAlign:'left'}}
                    placeholder="Select Organization type"
                    InputLabelProps={{ shrink: true }}
                    value={formData.organizationType}
                    onChange={(e: { target: { value: string } }) =>
                      handleChange("organizationType", e.target.value)
                    }
                    SelectProps={{
                      MenuProps: { disableScrollLock: true },
                    }}
                    helperText={
                      (signupBtnClicked && formData.organizationType === '') ? (
                        <span style={{ color: "red" }}>
                          Select Organization type
                        </span>
                      ) : (
                        ""
                      )
                    }
                    fullWidth
                  >
                    {organiationTypes.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>

              <Box className="my-2">
                {" "}
                <FormControl fullWidth variant="outlined">
                  <InputLabel
                    className="  bg-white px-1"
                    shrink
                    htmlFor="password"
                  >
                    {" Password "}
                    <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <OutlinedInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your Password"
                    onFocus={() => setShowpasswordRule(true)}
                    onBlur={() => setShowpasswordRule(false)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                {showpasswordRule && (
                  <div className="ml-2 text-left" style={{ fontSize: "11px" }}>
                    <div>
                      <Typography variant="subtitle2">
                        {"Your password must have:"}
                      </Typography>
                    </div>
                    <div className="d-flex justify-content-start align-items-center">
                      {checkNumber ? (
                        <TickIcon style={TickIconStyle} />
                      ) : (
                        <CloseIcon style={closeIconStyle} />
                      )}
                      <span className="ml-1 my-1">Numeral (0-9)</span>
                    </div>
                    <div className="d-flex justify-content-start align-items-center">
                      {checkLowercase ? (
                        <TickIcon style={TickIconStyle} />
                      ) : (
                        <CloseIcon style={closeIconStyle} />
                      )}
                      <span className="ml-1 my-1">Lower case letter (a-z)</span>
                    </div>
                    <div className="d-flex justify-content-start align-items-center">
                      {checkUppercase ? (
                        <TickIcon style={TickIconStyle} />
                      ) : (
                        <CloseIcon style={closeIconStyle} />
                      )}
                      <span className="ml-1 my-1">Upper case letter (A-Z)</span>
                    </div>
                    <div className="d-flex justify-content-start align-items-center">
                      {checkLength ? (
                        <TickIcon style={TickIconStyle} />
                      ) : (
                        <CloseIcon style={closeIconStyle} />
                      )}
                      <span className="ml-1 my-1">
                        Must be at least 8-16 characters.
                      </span>
                    </div>
                    <div className="d-flex justify-content-start align-items-center">
                      {checkSymbol ? (
                        <TickIcon style={TickIconStyle} />
                      ) : (
                        <CloseIcon style={closeIconStyle} />
                      )}
                      <span className="ml-1 my-1">
                        Special character (!@#$...)
                      </span>
                    </div>
                  </div>
                )}
              </Box>
              <Box className="my-2">
                {" "}
                <FormControl fullWidth variant="outlined">
                  <InputLabel
                    className="  bg-white px-1"
                    shrink
                    htmlFor="new-password"
                  >
                    {" Confirm Password "}
                    <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <OutlinedInput
                    id="new-password"
                    placeholder="Enter your Confirm Password"
                    type={showNewPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Box
                className="ml-2 text-left"
                sx={{ "& .MuiTypography-root": { fontSize: "11px" } }}
              >
                {!passwordsMatch && (
                  <span  style={{fontSize:'11px', color:'#ff0000'}} >
                    Passwords do not match. Please try again.
                  </span>
                )}
                {/* Helper text for invalid password */}
                {invalidPassword && (
                  <span style={{fontSize:'11px', color:'#ff0000'}}  >
                    Password does not meet the criteria.
                  </span>
                )}
              </Box>
              <Box className="d-flex justify-content-between">
              
                <FormControlLabel
                control={<Checkbox checked={formData.agreeTermsAndCondition} onChange={(e) => handleChange("agreeTermsAndCondition", e.target.checked)} />}
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "10px",
                    },
                  }}
                  name="agreeTermsAndCondition"
               
                  label={
                    <span>
                      I accept our and Privacy Policy{" "}
                      <span style={{ color: "#3CA2FF" }}>Terms of Service</span>{" "}
                      and{" "}
                      <span style={{ color: "#3CA2FF" }}>Privacy Policy</span>
                    </span>
                  }
                />
                   
              </Box>
              {(signupBtnClicked && formData.agreeTermsAndCondition === false) && (
                  <p className="text-left" style={{fontSize:'11px', color:'#ff0000'}}  >
                    Please check to procceed
                  </p>
                )}
              <Box className="my-5">
                <Button
                  onClick={handleSignupClick}
                  sx={{
                    width: "160px",
                    height: "42px",
                    fontSize: "13px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    bordeRadius: "4px",
                    background: "#3CA2FF",
                    boxShadow: "0px 4px 10px 0px rgba(16, 156, 241, 0.24)",
                    textTransform: "Capitalize",
                  }}
                  variant="contained"
                  color="primary"
                >
                  {"Sign up "}
                </Button>
              </Box>
            </Box>
          </Box>
        </div>
        {!isSmallScreen && (
          <div
            className="col-lg-6 text-center flex-content-center"
            style={{
              background: "#3CA2FF",
              minHeight: "100vh",
              backgroundImage: 'url("/images/Sign-up-Bg.svg")',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <CarouselSignup />
          </div>
        )}
      </div>

      {/* <div className="signIn-footer  row" >
        <div className="col-lg-10 col-md-12 col-sm-12">
          <span> {'Support call: '}</span>
          <span className="fw-600">
          {'+1(844) 334-46666 / +44 20 7993 6661'}
          </span>
          <span>
            {' | Mail Id:'}
          </span>
          <span className="fw-600">
            {'support@intoaec.com / Chat'}
          </span>
        </div>
        <div className="col-lg-2 col-md-12 col-sm-12">
          <span>
            {'Powered by IntoAEC Solutions'}
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default SignupCard;
