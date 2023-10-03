import React from "react";

import Box from "@mui/material/Box";

import { Typography } from "@mui/material";
import {
  Button

} from "@mui/material";
import router from "next/router";
import TickIcon from "../../../../../public/icons/tick-icon";

const PasswordChanged: React.FC = () => {

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "poppins",
        backgroundImage: 'url("/images/Passwor-ChangeBg.svg")',
        backgroundPosition: "0px -70px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className="container mt-5 pt-5 w-100 m-0"
        style={{ backgroundImage: 'url("/images/signup-bg.png")' }}
      >
        <div className="row ">
          <div className=" col-lg-4 col-md-12 col-sm-12 mx-auto ">
            <Box
              className="mx-5  bg-white rounded"
              sx={{
                borderRadius: "20px",
                boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.10)",
                display: "flex",
                color: "#000000",
              }}
            >
              <Box className="col-lg-12 col-md-12 px-2 py-2">
                <Box className="my-3  text-center">
                  <TickIcon
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "#2ED47A",
                      fill: "#ffffff",
                      padding: "10px",
                      borderRadius: "40px",
                    }}
                  />
                  <Typography
                    variant="h6"
                    className="my-2"
                    fontWeight={600}
                    textAlign={"center"}
                  >
                    {" "}
                    {"Password Changed!"}
                  </Typography>
                  <span
                    className="text-center"
                    style={{
                      fontWeight: "400",
                      lineHeight: "20px",
                      letterSpacing: " 0.1px",
                    }}
                  >
                    {"Your Password has been changed successfully."}
                  </span>
                </Box>

                <Box className="my-2 text-center">
                  <Button
                    onClick={() => router.push("/signIn")}
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
                    {"Sign in"}
                  </Button>
                </Box>
              </Box>
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

export default PasswordChanged;
