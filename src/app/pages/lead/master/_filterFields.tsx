import Box from "@mui/material/Box";
import * as React from "react";

import Button from "@mui/material/Button";
import MultipleSelectDropdown from "../../../components/multiSelectDropdown/multiSelectDropdown";
import SelectIconDropdown from "../../../components/singleSelectIconDropdown/singleSelectIconDropdown";
import {
  AvatarArr,
  LeadSources,
  LeadStages,
  ProjectTypes,
} from "../../../constants/constant";
import FilterIcon from "../../../../assets/icons/filter-icon";
 
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
           
            <CustomDateRangePicker label="Lead created on" onApply={(st,end)=>{
              console.log(st,end);
              
            }} />
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
