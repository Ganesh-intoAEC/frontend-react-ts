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

const token =
  "eyJraWQiOiJKUnRCZ01KdlRUazJ1eUthQU9iR0I3RFZqYVRYUjJKNkg0T0lEaTg2XC95WT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI2OGU3Y2EwNS05MDc1LTQ1ZDEtOGVkMi0wYjQwZjkyYzc3NDYiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiY3VzdG9tOm9yZ2FuaXphdGlvbl9uYW1lIjoiQUVDIEFyY2hpdGVjdHMiLCJjdXN0b206b3JnYW5pemF0aW9uX2lkIjoiOTRhMTE1MTktMTU4Yi00NjRiLWEwOWUtZTk4M2I5OWI0ZGQzIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGgtMV9nUmM2Mjc3ZTgiLCJjb2duaXRvOnVzZXJuYW1lIjoiNjhlN2NhMDUtOTA3NS00NWQxLThlZDItMGI0MGY5MmM3NzQ2IiwiZ2l2ZW5fbmFtZSI6IkRhdmlkIiwib3JpZ2luX2p0aSI6ImVhN2I0NjQ4LTZhMzgtNDdlZC1iMjJmLWE5ZWNkYmU1MjdmYSIsImF1ZCI6IjMycmowYjFiMGs1ZzJodmZjMDRwaGY4OWdiIiwiZXZlbnRfaWQiOiI3MDgwZGM5ZC03OTY1LTQ0NDEtOWRlNy0wY2UxZGFlYzMxY2EiLCJ1cGRhdGVkX2F0IjoxNjk2MzE2NDk0LCJ0b2tlbl91c2UiOiJpZCIsImN1c3RvbTpvcmdhbml6YXRpb25fdHlwZSI6IkFSQ0hJVEVDVCxWRU5ET1IiLCJhdXRoX3RpbWUiOjE2OTYzNDY5NTgsInBob25lX251bWJlciI6Iis5MTkzMDk4MzIyMjMiLCJleHAiOjE2OTYzNTA1NTgsImlhdCI6MTY5NjM0Njk1OCwiZmFtaWx5X25hbWUiOiJBIiwianRpIjoiOWFjMjdlZTEtYzBmNy00ODBiLTgyNmUtYjA3YzUyN2MwOWVjIiwiZW1haWwiOiJkYXZpZDVAZW1haWwuY29tIn0.XNmiyej3eCvsvc0CTYJ2GTKlv2l8RYfxMAE0303XCbW9bY0Wa1yC_tawl4ggExkB5LytDT8Skf-a8fRp08nbgSaUnBMORlZNiWNyWMEg9qnRG-hpkp_8KFcqvBiWlp0YyVlOJw1Zjb9-ywyNZSdrbOqIXReeeGYtmeHbnytH45XRLKMpaKGChGZEgeUIL_3VDzh1JNAhT-SAvLSWHrPzUo4iU_4cleheNNIh6UqMomQALlWbyBqfyJckk6XtkWK-N8p2QCicwar0C0rn82tBvMtaCmGKWG_MVC7u67C5x1gMJEBEOzlQlccmsEsaxQWTkGbDwXUCIjGsDMWIAd65Yg";

export default function FilterFields() {
  const [leadStatus, setLeadStatus] = React.useState<Array<leadStatusesTypes>>(
    []
  );
  const [leadSources, setLeadSources] = React.useState<Array<leadSourcesTypes>>(
    []
  );
  const { post, response, error } = useFetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT_FETCH}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  React.useEffect(() => {
    // Fetch data for lead statuses
    fetchLeadStatusData().then(() => fetchLeadSourceData());

    // Fetch data for lead sources
  }, []);

  React.useEffect(() => {
    console.log(leadSources);
    console.log(leadStatus);
  }, [leadStatus, leadSources]);

  const fetchLeadStatusData = async () => {
    const requestData = {
      eventType: "GET_LEAD_STATUSES",
    };
    await post(requestData);

    if (response.ok) {
      const res = await response.json();
      console.log(res);

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
      console.log(res);
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
            <MultipleSelectDropdown label={"Lead Stage"} dataArr={leadStatus.map((status) => ({
                id: status.leadStatusId,
                value: status.leadStatusValue,
              }))} />
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
