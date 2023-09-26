import React from "react";
import {
  Box,
  Typography,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  TableBody,
  Button,
} from "@mui/material";

import { useRouter } from "next/router";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import UploadIcon from "../../../../public/icons/upload-icon";



const UploadedLead: React.FC = () => {
  const { push, back } = useRouter();
  const data = [
    { sheetNo: "01", status: "Success", reason: "Lease uploaded successfully" },
    {
      sheetNo: "02",
      status: "Success",
      reason: "Lead number - ME 12 Duplicate",
    },
    { sheetNo: "03", status: "Success", reason: "Lease uploaded successfully" },
    { sheetNo: "04", status: "Success", reason: "Lease uploaded successfully" },
    {
      sheetNo: "05",
      status: "Success",
      reason: "Lead number - ME 12 Duplicate",
    },
    { sheetNo: "06", status: "Success", reason: "Lease uploaded successfully" },
    { sheetNo: "07", status: "Success", reason: "Lease uploaded successfully" },
    {
      sheetNo: "08",
      status: "Success",
      reason: "Lead number - ME 12 Duplicate",
    },
    { sheetNo: "09", status: "Success", reason: "Lease uploaded successfully" },
    // Add more data as needed
  ];
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
        <div className="col-lg-8 col-md-12 col-sm-12">
          <Box
            sx={{
              borderRadius: "10px",
              background: "#ffffff",
              boxShadow: "0px 8px 32px 0px rgba(0, 0, 0, 0.12)",
            }}
          >
            <Box>
              <div className="border-bottom pr-2 pt-2 row">
                <div className="col-lg-10 col-md-12 col-sm-12 pl-5 text-center">
                <Typography
                  variant="h5"
                  className="fw-500 pl-5 underline-on-hover"
                  gutterBottom
                >
                  {"Uploaded Lead(s)"}
                </Typography>
                </div>
               
                <div className="col-lg-2 col-md-12 col-sm-12">
                  <Button
                    variant="contained"
                    sx={{
                      width: "160px",
                      height: "42px",
                      background: "var(--Hover, #34AFF9)",
                      borderRadius: "4px",
                      boxShadow: "0px 4px 10px 0px rgba(16, 156, 241, 0.24)",
                    }}
                    startIcon={
                      <UploadIcon
                        style={{
                          width: "16px",
                          height: "16px",
                          fill: "#ffffff",
                        }}
                      />
                    }
                  >
                    {"Upload"}
                  </Button>
                </div>
              </div>
              <div className="container">
                <div className="row ">
                  <div className="col-12 px-4 ">
                    <div className="mt-3">
                      <Typography variant="caption">
                        {"Lease upload summery"}
                      </Typography>
                      <TableContainer className="my-3" sx={{ boxShadow:'0px 1px 10px rgba(0,0,0,12%)'}} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>No of Upload</TableCell>
                              <TableCell align="right">No of Upload</TableCell>
                              <TableCell align="right">Error</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                10
                              </TableCell>
                              <TableCell align="right">10</TableCell>
                              <TableCell align="right">0</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                    <div className="mt-3">
                      <Typography variant="caption">
                        {"Upload status"}
                      </Typography>
                      <Paper className="my-3" sx={{ width: "100%",boxShadow:'0px 1px 10px rgba(0,0,0,12%)' }}>
                        <TableContainer
                          sx={{ maxHeight: 440, overflowX: "hidden" }}
                        >
                          <Table
                            stickyHeader
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>Sheet row no</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Reason</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {data.map((row) => (
                                <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    {row.sheetNo}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.status=== 'Success' ? (<span style={{color:'#2ED47A'}}>{row.status}</span> ): (<span style={{color:'red'}}>{row.status}</span>) }
                                  </TableCell>
                                  <TableCell align="right">
                                  {row.status=== 'Success' ? (<span style={{color:'#2ED47A'}}>{row.reason}</span> ): (<span style={{color:'red'}}>{row.reason}</span>) }
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </div>
                    <div className="text-center mb-3">
                      <Button
                        variant="contained"
                        sx={{
                          width: "160px",
                          height: "42px",
                          background: "var(--Hover, #34AFF9)",
                          borderRadius: "4px",
                          boxShadow:
                            "0px 4px 10px 0px rgba(16, 156, 241, 0.24)",
                            
                        }}
                        onClick={() => push('/filter')}
                      >
                        {"View Lead"}
                      </Button>
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

export default UploadedLead;
