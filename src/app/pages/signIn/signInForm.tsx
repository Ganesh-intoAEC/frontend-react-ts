import React, { useEffect, useState } from "react";

import NextImage from "@/app/components/NextImage";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";
const SignInCard: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width: 990.95px)");
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    try {
      if (password && username) {
        const user = await signIn("credentials", {
          username,
          password,
          callbackUrl: "/dashboard",
        });
        if (user) {
          toast.success("Signin successfull");
        } else {
          console.log("signin::::",user);
          toast.error("Please check your credentials");
        }
      }
    } catch (error: any) {
      console.log("signin::::",error);
      
      toast.error(error?.message, { autoClose: 2500 });
    }
  };

  return (
    <Box
      className="flex-content-center"
      sx={{
        height: "100vh",
        fontFamily: "poppins",
        backgroundImage: 'url("/images/sign-in-bg.png")',
        backgroundPosition: "0px -70px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container signInUI  w-100 m-0">
        <div className="row ">
          {!isSmallScreen && (
            <div className="col-lg-7 text-center">
              <NextImage
                src={"/images/signin-conceptImg.svg"}
                width={"75%"}
                alt={"signin-conceptImg"}
              />
            </div>
          )}
          <div className=" col-lg-5 col-md-12 col-sm-12  text-center">
            <Box
              className="mx-5 col-lg-10 bg-white rounded"
              sx={{
                borderRadius: "20px",
                boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.10)",
                display: "flex",
                color: "#000000",
              }}
            >
              <Box className="w-100 px-2">
                <Box className="my-3 py-5">
                  <NextImage
                    src={"/images/logo.png"}
                    alt={"logo"}
                    width={"250px"}
                    loading="lazy"
                  />
                </Box>
                <Box className="my-3 d-flex rounded">
                  {" "}
                  <TextField
                    label={
                      <span>
                        Email/Mobile Number{" "}
                        <span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    placeholder="Enter your email"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    value={username}
                    sx={{
                      m: 1,
                      color: "#000000",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                  />
                </Box>
                <Box className="mt-3  d-flex rounded">
                  {" "}
                  <FormControl
                    sx={{
                      m: 1,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                    fullWidth
                    variant="outlined"
                  >
                    <InputLabel
                      className="  bg-white px-1"
                      shrink
                      htmlFor="outlined-adornment-password"
                    >
                      {" Password "}
                      <span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      value={password}
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
                    />
                  </FormControl>
                </Box>
                <Box className=" px-4 d-flex justify-content-between">
                  {" "}
                  <FormControlLabel
                    control={<Checkbox />}
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "10px",
                      },
                    }}
                    label="Remember me"
                  />
                  <Link
                    style={{ fontSize: "10px", textDecoration: "none" }}
                    href="/signIn/forgetPassword"
                    passHref
                  >
                    {"Forgot Password?"}
                  </Link>
                </Box>
                <Box className="my-5">
                  <Button
                    onClick={() => handleLogin()}
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
                    {"Sign in "}
                  </Button>
                </Box>
                <Box className="my-3 mb-5 pb-3">
                  <span>
                    {"Don’t have an account? "}
                    <Link
                      style={{
                        textDecoration: "none",
                        fontWeight: "600",
                        color: "#109CF1",
                      }}
                      href="auth/signUp"
                    >
                      {"Sign Up"}
                    </Link>
                  </span>
                </Box>
              </Box>
            </Box>

            <div className="my-3 pb-3">
              <Link
                style={{
                  textDecoration: "none",
                  fontWeight: "600",
                  color: "#109CF1",
                }}
                href="#"
              >
                {"What’s New?"}
              </Link>
            </div>
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

export default SignInCard;
