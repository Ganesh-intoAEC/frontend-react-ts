import Box from "@mui/material/Box";
import * as React from "react";

import Button from "@mui/material/Button";
import MultipleSelectDropdown from "../../../components/multiSelectDropdown/multiSelectDropdown";
import SelectIconDropdown from "../../../components/singleSelectIconDropdown/singleSelectIconDropdown";
import { AvatarArr } from "../../../constants/constant";
import FilterIcon from "../../../../assets/icons/filter-icon";

import CustomDateRangePicker from "@/app/components/CustomDateRangePicker";
import useFetch from "use-http";

export interface leadStatusesTypes {
  leadStatusId: string;
  leadStatusValue: string;
}
export interface leadSourcesTypes {
  leadSourceId: string;
  leadSourceSubCategory: string;
}

export default function FilterFields() {
  const [leadStatus, setLeadStatus] = React.useState<Array<leadStatusesTypes>>(
    []
  );
  const [leadSources, setLeadSources] = React.useState<Array<leadSourcesTypes>>(
    []
  );
  const { post, response, error } = useFetch('/fetch');

  React.useEffect(() => {
    // Fetch data for lead statuses
    fetchLeadStatusData().then(() => fetchLeadSourceData());

    // Fetch data for lead sources
  }, []);


  const fetchLeadStatusData = async () => {
    const requestData = {
      eventType: "GET_LEAD_STATUSES",
    };
    await post(requestData);

    if (response.ok) {
      const res = await response.json();

      setLeadStatus(res?.body || []);
    } else {
      // Handle error here
      console.error("Error fetching data:", error);
    }
  };

  const fetchLeadSourceData = async () => {
    const requestData = {
      eventType: "GET_LEAD_SOURCES",
    };
    await post(requestData);

    if (response.ok) {
      const res = await response.json();
      setLeadSources(res?.body || []);
    } else {
      // Handle error here
      console.error("Error fetching data:", error);
    }
  };

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
              dataArr={leadStatus.map((status) => ({
                id: status.leadStatusId,
                value: status.leadStatusValue,
              }))}
            />
          </div>
          <div className=" col-lg-2 col-md-6 col-sm-12 pr-2">
            <MultipleSelectDropdown
              label={"Lead Stage"}
              dataArr={leadStatus.map((status) => ({
                id: status.leadStatusId,
                value: status.leadStatusValue,
              }))}
            />
          </div>
          <div className="col-lg-2 col-md-6 col-sm-12 pr-2">
            <MultipleSelectDropdown
              label={"Lead Source"}
              dataArr={leadSources.map((status) => ({
                id: status.leadSourceId,
                value: status.leadSourceSubCategory,
              }))}
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
            <CustomDateRangePicker
              label="Lead created on"
              onApply={(st, end) => {
                console.log(st, end);
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
}
