import React from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { Typography, useMediaQuery } from "@mui/material";
import {
  Button
} from "@mui/material";

import router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Image from 'next/image'


const ForgotPassword: React.FC = () => {
  const isSmallScreen = useMediaQuery("(min-width: 990.95px)");
  const [isValidEmail,setIsValidEmail] = React.useState(false);
  const [sendBtnClicked, setSendBtnClicked] = React.useState(false)
    //form Data
    const [formData, setFormData] = React.useState({
      email: "",
    });

  const handleSendClick = () => {
    setSendBtnClicked(true)
if(isValidEmail){
  router.push('/signIn/resetPassword');
 
}
else{
  toast.error("Enter a Valid Email/Mobile Number ", { autoClose: 2500 });
  return
}
 
    
  };

  const handleChange = (name: string, value: string) => {
    const regx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regx.test(String(value).toLowerCase())){
      setIsValidEmail(true)
    }else{
      setIsValidEmail(false)
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "poppins",
        backgroundImage: 'url("/images/Forget password bg.svg")',
        backgroundPosition: "0px -70px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className="container signInUI mt-5 w-100 m-0"
      >
        <div className="row ">
          <div className=" col-lg-6 col-md-12 col-sm-12 mx-auto ">
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
                <Box className="my-3 pt-5">
                  <Typography
                    variant="h6"
                    className="mb-2"
                    fontWeight={600}
                    textAlign={"center"}
                  >
                    {" "}
                    {"Forgot Password?"}
                  </Typography>
                  <span
                    className="text-left"
                    style={{
                      fontWeight: "400",
                      lineHeight: "20px",
                      letterSpacing: " 0.1px",
                    }}
                  >
                    {
                      "Enter the Email address or Mobile number associated with your account. You will receive a link to create a new password via email."
                    }
                  </span>
                </Box>
                <Box className="my-2">
                  {" "}
                  <TextField
                    label={
                      <span>
                        Email/Mobile Number{" "}
                        <span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    name="email"
                    value={formData.email}
                    placeholder="Enter your email"
                    inputRef={(input) => input && input.focus()}
                    onChange={(e) => handleChange("email", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    sx={{ m: 1, color: "#000000" }}
                    helperText={
                      (!isValidEmail && sendBtnClicked ) ? (
                        <span style={{ color: "red" }}>
                          Enter a valid email address
                        </span>
                      ) : (
                        ""
                      )
                    }
                  />
                </Box>
           
                <Box className="my-2 text-center">
                  <Button
                    onClick={handleSendClick}
                    sx={{
                      width: "160px",
                      height: "42px",
                      fontSize: "13px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      bordeRadius: "4px",
                      background: "#3CA2FF",
                      boxShadow: "0px 4px 10px 0px rgba(16, 156, 241, 0.24)",
                    }}
                    variant="contained"
                    color="primary"
                  >
                    {"Send"}
                  </Button>
                </Box>
              </Box>
              {isSmallScreen && (
                <Box className="col-lg-7 px-2">
                  <Image
                    src={"/images/forget-passwordImg.svg"}
                    style={{ width: "300px", height: "auto" }}
                    alt={"forget-passwordImg"}
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
      <ToastContainer />
    </Box>
  );
};

export default ForgotPassword;
