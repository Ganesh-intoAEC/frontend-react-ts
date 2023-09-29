import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FilterIcon from "../../../assets/icons/filter-icon";
import MultipleSelectDropdown from "../../../app/components/multiSelectDropdown/multiSelectDropdown";
import {
  filterData,
  ProjectTypes,
  LeadStages,
  LeadSources,
  AvatarArr,
} from "../../../app/constants/constant";
import SelectIconDropdown from "../../../app/components/singleSelectIconDropdown/singleSelectIconDropdown";
import CustomDateRangePicker from "@/app/components/CustomDateRangePicker";

const FilterFields: React.FC = () => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="container m-0">
        <div className="row">
          <div className="col-lg-2 col-md-6 col-sm-12 pr-2">
            <MultipleSelectDropdown
              label={"Project Type"}
              dataArr={ProjectTypes}
            />
          </div>
          <div className=" col-lg-2 col-md-6 col-sm-12 pr-2">
            <MultipleSelectDropdown label={"Lead Stage"} dataArr={LeadStages} />
          </div>
          <div className="col-lg-2 col-md-6 col-sm-12 pr-2">
            <MultipleSelectDropdown
              label={"Lead Source"}
              dataArr={LeadSources}
            />
          </div>
          <div className="col-lg-2 col-md-6 col-sm-12 pr-2">
            {/* <TextField
              id="standard-select-currency"
              select
              label="Assigned to "
              helperText=" "
              variant="standard"
              SelectProps={{ MenuProps: { disableScrollLock: true } }}
            >
              {filterData.map((option) => (
                <MenuItem key={option.assigned} value={option.assigned}>
                  {option.assigned}
                </MenuItem>
              ))}
            </TextField> */}
            <SelectIconDropdown dataArr={AvatarArr} label="Assigned to" />
          </div>
          <div className=" col-lg-2 col-md-6 col-sm-12 pr-2">
            {/* <TextField
              id="standard-select-currency"
              select
              label="Lead Created On"
              helperText=" "
              variant="standard"
              SelectProps={{ MenuProps: { disableScrollLock: true } }}
            >
              {filterData.map((option) => (
                <MenuItem key={option.assigned} value={option.assigned}>
                  {option.assigned}
                </MenuItem>
              ))}
            </TextField> */}
          <CustomDateRangePicker
            onApply={(start, end) => {
              console.log(start, end);
            }}
          />
          </div>
          <div>
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
      </div>
    </Box>
  );
};

export default FilterFields;
