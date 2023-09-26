import React, { useState, useMemo, useCallback } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import router from "next/router";
import CloseIcon from "@/assets/icons/close-icon";
import TickIcon from "@/assets/icons/tick-icon";

const ResetPassword = () => {
  const isSmallScreen = useMediaQuery("(min-width: 990.95px)");

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [invalidPassword, setInvalidPassword] = useState(false); // Define invalidPassword state

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

  const handleContinueClick = () => {
    console.log(password);
    console.log(newPassword);
    if (password === newPassword) {
      const isPasswordValid =
        checkLength &&
        checkUppercase &&
        checkLowercase &&
        checkSymbol &&
        checkNumber;
      console.log(isPasswordValid);
      if (isPasswordValid) {
        console.log(isPasswordValid);

        router.push("/sign-in/password-changed");
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "poppins",
        backgroundImage: 'url("/images/Reset-PasswordBg.svg")',
        backgroundPosition: "0px -70px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container signInUI  w-100 m-0">
        <div className="row ">
          <div className=" col-lg-7 col-md-12 col-sm-12 mx-auto ">
            <Box
              className="mx-5  bg-white rounded"
              sx={{
                borderRadius: "20px",
                boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.10)",
                display: "flex",
                color: "#000000",
              }}
            >
              <Box className="col-lg-10 col-md-12 px-2">
                <Box className="my-3 pt-2">
                  <Typography
                    variant="h6"
                    className="mb-1"
                    fontWeight={600}
                    textAlign={"center"}
                  >
                    {" "}
                    {"Reset Password?"}
                  </Typography>
                  <p
                    className="text-center"
                    style={{
                      fontWeight: "500",
                      lineHeight: "20px",
                      letterSpacing: " 0.1px",
                      color: "#3CA2FF",
                    }}
                  >
                    {"john@gmail.com"}
                  </p>
                </Box>
                <Box className="my-2">
                  {" "}
                  <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
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
                  <div className="ml-2" style={{ fontSize: "11px" }}>
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
                </Box>
                <Box className="my-2">
                  {" "}
                  <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
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
                      type={showNewPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showNewPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box
                  className="ml-2"
                  sx={{ "& .MuiTypography-root": { fontSize: "11px" } }}
                >
                  {!passwordsMatch && (
                    <Typography variant="body2" color="error">
                      Passwords do not match. Please try again.
                    </Typography>
                  )}
                  {/* Helper text for invalid password */}
                  {invalidPassword && (
                    <Typography variant="body2" color="error">
                      Password does not meet the criteria.
                    </Typography>
                  )}
                </Box>

                <Box className="my-2 text-center">
                  <Button
                    onClick={handleContinueClick}
                    sx={{
                      width: "160px",
                      height: "42px",
                      fontSize: "13px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      borderRadius: "4px",
                      background: "#3CA2FF",
                      boxShadow: "0px 4px 10px 0px rgba(16, 156, 241, 0.24)",
                    }}
                    variant="contained"
                    color="primary"
                  >
                    {"Continue"}
                  </Button>
                </Box>
              </Box>
              {isSmallScreen && (
                <Box className="col-lg-7 d-flex justify-content-center align-items-center px-2">
                  <img
                    src={"/images/reset-passwordImg.svg"}
                    srcSet={"/images/reset-passwordImg.svg"}
                    style={{ width: "300px", height: "auto" }}
                    alt={"logo"}
                    loading="lazy"
                  />
                </Box>
              )}
            </Box>
          </div>
        </div>

        <div className="signIn-footer  row">
          <div className="col-lg-10 col-md-12 col-sm-12">
            <span> {"Support call: "}</span>
            <span className="fw-600">
              {"+1(844) 334-46666 / +44 20 7993 6661"}
            </span>
            <span>{" | Mail Id:"}</span>
            <span className="fw-600">{"support@intoaec.com / Chat"}</span>
          </div>
          <div className="col-lg-2 col-md-12 col-sm-12">
            <span>{"Powered by IntoAEC Solutions"}</span>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ResetPassword;
