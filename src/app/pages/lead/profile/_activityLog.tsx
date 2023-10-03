import React  from "react";

import {
  Button,
  TextField,
  Autocomplete,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Table,
  Paper,
  Link,
  Checkbox,
} from "@mui/material";

import CustomTablePagination from "@/app/components/customTablePagination/customTablePagination";
import FilterIcon from "@/assets/icons/filter-icon";
import SelectIconDropdown from "@/app/components/singleSelectIconDropdown/singleSelectIconDropdown";
 
import { AvatarArr, LeadSources } from "@/app/constants/constant";
import CustomDropdownExport from "@/app/components/customDropdownBtn/customDropdownExport";
import CustomDateRangePicker from "@/app/components/CustomDateRangePicker";

function ActivityLog() {
 
 
  function createData(
    date: string,
    user: string,
    activity: string,
    timeStamp: string,
    reason: string
  ) {
    return { date, user, activity, timeStamp, reason };
  }

  const rows = [
    createData("14/08/2023", "Jack (admin)", "Sent Questionnaire", "22-08-23 12.10am", " -"),
    createData("14/08/2023", "Jack (admin)", "Scheduled Meeting", "22-08-23 12.10am", " -"),
    createData("14/08/2023", "Jack (admin)", "Sent Proposal", "22-08-23 12.10am", " -"),
    createData("14/08/2023", "Jack (admin)", "Edit Profile", "22-08-23 12.10am", " -"),
    createData("14/08/2023", "Jack (admin)", "Sent Questionnaire", "22-08-23 12.10am", " -"),
  ];

  return (
    <div>
      <div></div>

      <div className="d-flex mt-3">
        <div className="col-lg-4 col-md-6 col-sm-12 pr-2">
          <SelectIconDropdown dataArr={AvatarArr} label="User Role" />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 pr-2">
          <SelectIconDropdown dataArr={AvatarArr} label="Activity" />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 pr-2">
        <CustomDateRangePicker label={"Activity between"} onApply={(st,end)=>{
              console.log(st,end);
              
            }} />
        </div>
        <div className="col-lg-2 col-md-6 col-sm-12 pr-2 text-right">
          <Button
            sx={{
              width: "110px",
              height: "35px",
              backgroundColor: "#3CA2FF",
              textTransform: "capitalize",
            }}
            variant="contained"
            className="mt-2"
            startIcon={
              <FilterIcon
                style={{ width: "20px", height: "20px", fill: "#ffffff" }}
              />
            }
          >
            Apply
          </Button>
        </div>
      </div>
      <div>
        <CustomTablePagination displayUI=" d-flex row-reverse" />
      </div>
      <div className="d-flex  mb-2">
        <div className="col-lg-4 col-md-12 col-sm-12"></div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <Autocomplete
            freeSolo
            id="combo-box-demo"
            options={LeadSources}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px",
              },
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Search lead name..." />
            )}
          />
          
        </div>
        <div className="col-lg-2 col-md-12 col-sm-12 text-right">
        <CustomDropdownExport />
        </div>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead
              sx={{
                backgroundColor: "#3CA2FF",
                "&:MuiTableCell-head": { color: "#FFFFFF !important" },
              }}
            >
              <TableRow   sx={{
                  "& .MuiTableCell-root": {
                    color: "#ffffff",
                  },
                }}>
                     <TableCell padding="checkbox">
                  <Checkbox
                    checked={false}
                   />
                </TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">User (Role)</TableCell>
                <TableCell align="center">Activity</TableCell>
                <TableCell align="center">Time stamp</TableCell>
                <TableCell align="center">Reason</TableCell>
                <TableCell align="center">Change History</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.date}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                    <TableCell padding="checkbox">
                    <Checkbox
                      checked={false}
                     />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell align="center">{row.user}</TableCell>
                  <TableCell align="center">{row.activity}</TableCell>
                  <TableCell align="center">{row.timeStamp}</TableCell>
                  <TableCell align="center">{row.reason}</TableCell>
                  <TableCell align="center"><Link><span>{'View Change Log'}</span></Link></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* {cards.length === 0 && (
            <div>
           
            <img
                src={"/images/no-data-found-1.svg"}
                srcSet={"/images/no-data-found-1.svg"}
                style={{ width: "100%", height: "auto" }}
                alt={"logo"}
                loading="lazy"
              />
               
            </div>
        )} */}
      <div>
        <CustomTablePagination displayUI=" d-flex row-reverse" />
      </div>
    </div>
  );
}

export default ActivityLog;
