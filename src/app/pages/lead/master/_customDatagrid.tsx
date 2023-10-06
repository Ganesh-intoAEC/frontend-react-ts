import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import CustomTablePagination from "../../../components/customTablePagination/customTablePagination";
// import TablePagination from '@mui/material/TablePagination';
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TableSortLabel from "@mui/material/TableSortLabel";
import CustomDatagridDropdown from "../../../components/customDropdownBtn/cutomDropdownDataGrid";
import AscIcon from "../../../../assets/icons/ascending-icon";
import DscIcon from "../../../../assets/icons/descending-icon";
import RibbonIcon from "../../../../assets/icons/ribbon-icon";

import GridSearchExport from "@/app/pages/lead/master/_gridSearchExport";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormHelperText,
  TextField,
  Tooltip,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter } from "next/router";
import { dropdownOptions } from "../../../constants/constant";
import LostIcon from "../../../../assets/icons/lost-icon";
import WonIcon from "../../../../assets/icons/won-icon";
import { LeadsTypes } from "@/pages/leads/master";

interface Row {
  id: number;
  leadName: string;
  stage: string;
  projectType: string;
  leadSource: string;
  leadCreated: string;
  estimation: string;
}
type Column = keyof Row;

function createData(
  id: number,
  leadName: string,
  stage: string,
  projectType: string,
  leadSource: string,
  leadCreated: string,
  estimation: string
): Row {
  return {
    id,
    leadName,
    stage,
    projectType,
    leadSource,
    leadCreated,
    estimation,
  };
}

const rows: Row[] = [
  createData(
    1,
    "John",
    "New",
    "Architecture",
    "Social media",
    "14-08-2023",
    "₹ 1,20,000"
  ),
  createData(
    2,
    "Bob",
    "Connected",
    "3D Rendering",
    "Social media",
    "05-04-2023",
    "₹ 1,20,000"
  ),
  createData(
    3,
    "Mathew",
    "Followed up",
    "Architecture",
    "Facebook",
    "28-08-2023",
    "₹ 3,10,000"
  ),
  createData(
    4,
    "Cupcake",
    "Connected",
    "Architecture",
    "Social media",
    "14-08-2023",
    "₹ 1,10,000"
  ),
  createData(
    5,
    "Lucy",
    "Estimate Sent",
    "Architecture",
    "Social media",
    "07-04-2023",
    "₹ 1,20,000"
  ),
];
interface CustomDatagridTypes {
  leadsData: Array<LeadsTypes> | null | undefined;
  isRowSelected: boolean;
  rowSelectedStage: (option: React.SetStateAction<string>) => void;
  selectedPropsPass: (option: boolean) => void;

  selectedLeadProps:(option: React.SetStateAction<string[]>) => void;
}

export default function CustomDatagrid({
  leadsData,
  isRowSelected,
  rowSelectedStage,
  selectedPropsPass,
  selectedLeadProps
}: CustomDatagridTypes) {
  // const [page] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number | null>();
  const { push } = useRouter();
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [orderBy, setOrderBy] = React.useState<Column | "">("");
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [hoveredRow, setHoveredRow] = React.useState<number | null>(null);

  // const [selectedDropdownValue, setSelectedDropdownValue] =
  //   React.useState("New");

  //Date format convert from string
  const formatDate = (timestampString: string): string => {
    const timestamp: number = parseInt(timestampString, 10);
    const date: Date = new Date(timestamp);

    const day: string = String(date.getDate()).padStart(2, "0");
    const month: string = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year: number = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  //Amount format convert from string
  const formatAmount = (amountString: string): string => {
    const amountNumber = parseFloat(amountString); // Convert to a number if it's a string
    const formattedAmount = amountNumber.toLocaleString("en-IN"); // Use 'en-IN' locale for Indian number formatting
    return formattedAmount;
  };

  const handleRowHover = (rowIndex: number) => {
    setHoveredRow(rowIndex);
  };

  const handleRowLeave = () => {
    setHoveredRow(null);
  };

  const handleRowSelection = (name: string) => {
   
    
    if (name === "Select All" && leadsData) {
      console.log("Selected Rows length", selectedRows.length);
      console.log("rows length", leadsData.length)
      console.log("select All:::::", selectedRows.length === leadsData.length);
      // If the name is "Select All", toggle all checkboxes
      const allSelected = selectedRows.length === leadsData.length;
      if (allSelected) {
        setSelectedRows([]);
      
      } else {
          setSelectedRows(leadsData?.map((row) => row.leadId));
        // selectedPropsPass(isRowSelected = true);
      }
    } else {
      // If it's a regular row, toggle that row's checkbox

      const selectedIndex = selectedRows.indexOf(name);
      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = [...selectedRows, name];

      } else {
        newSelected = [
          ...selectedRows.slice(0, selectedIndex),
          ...selectedRows.slice(selectedIndex + 1),
        ];
 
      }
      if (newSelected.length <= 0) {
        selectedPropsPass(newSelected.length < 0);
        setRowsPerPage(newSelected.length);
      } else {
        selectedPropsPass(newSelected.length > 0);
        setRowsPerPage(newSelected.length);
      }
      selectedLeadProps(newSelected)
      setSelectedRows(newSelected);
      // setIsRowSelected(newSelected.length > 0);
    }
  };

  //Sorting Logic
  const handleSort = (column: Column) => {
    if (orderBy === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(column);
      setOrder("asc");
    }
  };

  // const sortedRows = React.useMemo(() => {
  //   if (orderBy && order) {
  //     return [...rows].sort((a, b) => {
  //       const isAsc = order === "asc";

  //       const valueA =
  //         typeof a[orderBy] === "number" ? a[orderBy] : a[orderBy].toString();
  //       const valueB =
  //         typeof b[orderBy] === "number" ? b[orderBy] : b[orderBy].toString();

  //       if (typeof valueA === "number" && typeof valueB === "number") {
  //         return isAsc ? valueA - valueB : valueB - valueA;
  //       } else if (typeof valueA === "string" && typeof valueB === "string") {
  //         return isAsc
  //           ? valueA.localeCompare(valueB, undefined, {
  //               numeric: true,
  //               sensitivity: "base",
  //             })
  //           : valueB.localeCompare(valueA, undefined, {
  //               numeric: true,
  //               sensitivity: "base",
  //             });
  //       }
  //       return 0; // Return 0 for other types
  //     });
  //   }
  //   return rows;
  // }, [orderBy, order]);

  //Sorting Logic

  const goToProfile = () => {
    push("/leads/profile");
  };

  //Dropdown logic Stages
  const handleDropdownChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    console.log(event.target.value);
  };

  // row selected action

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };
  return (
    <div>
      <div>
        <CustomTablePagination displayUI=" d-flex row-reverse" />
      </div>
      {/* <div>
        <GridSearchExport
          isRowSelected={isRowSelected}
          rowSelectedStage={rowSelectedStage}
          leadNameSearch={onLeadGridSearch}
        />
      </div> */}
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead
              sx={{
                backgroundColor: "#3CA2FF",
                "&:MuiTableCell-head": { color: "#FFFFFF" },
              }}
            >
              <TableRow
                sx={{
                  "& .MuiTableCell-root": {
                    color: "#ffffff",
                  },
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={(selectedRows.length === leadsData?.length)? true: false}
                    onChange={() => handleRowSelection("Select All")} // Pass "Select All" to indicate it's the header checkbox
                  />
                </TableCell>
                {!isRowSelected ? (
                  <>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "leadName"}
                        direction={orderBy === "leadName" ? order : "asc"}
                        onClick={() => handleSort("leadName")}
                        IconComponent={order === "asc" ? DscIcon : AscIcon}
                      >
                        Lead name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sx={{ width: "100px", textAlign: "center" }}
                      align="right"
                    >
                      Stage
                    </TableCell>
                    <TableCell align="center">
                      {"Project type"}
                      <TableSortLabel
                        active={orderBy === "projectType"}
                        direction={orderBy === "projectType" ? order : "asc"}
                        onClick={() => handleSort("projectType")}
                        IconComponent={order === "asc" ? DscIcon : AscIcon}
                      ></TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                      {"Lead source"}
                      <TableSortLabel
                        active={orderBy === "leadSource"}
                        direction={orderBy === "leadSource" ? order : "asc"}
                        onClick={() => handleSort("leadSource")}
                        IconComponent={order === "asc" ? DscIcon : AscIcon}
                      ></TableSortLabel>
                    </TableCell>
                    <TableCell
                      sx={{ width: "100px", textAlign: "center" }}
                      align="right"
                    >
                      Assign to
                    </TableCell>

                    <TableCell align="center">
                      {"Lead created"}
                      <TableSortLabel
                        active={orderBy === "leadCreated"}
                        direction={orderBy === "leadCreated" ? order : "asc"}
                        onClick={() => handleSort("leadCreated")}
                        IconComponent={order === "asc" ? DscIcon : AscIcon}
                      ></TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                      {"Estimation"}
                      <TableSortLabel
                        active={orderBy === "estimation"}
                        direction={orderBy === "estimation" ? order : "asc"}
                        onClick={() => handleSort("estimation")}
                        IconComponent={order === "asc" ? DscIcon : AscIcon}
                      ></TableSortLabel>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell colSpan={8}>
                      <div className="row">
                        <div className="col-lg-6 col-md-12">
                          <span className="mr-3">{`${selectedRows.length} row(s) selected`}</span>
                          <span
                            onClick={() => handleRowSelection("Select All")}
                            style={{
                              cursor: "pointer",
                              textDecoration: "underline",
                            }}
                          >
                            {selectedRows.length === rowsPerPage
                              ? "Clear All"
                              : "Select All"}
                          </span>
                        </div>
                        <div className="col-lg-6 col-md-12">
                          <div className="d-flex justify-content-end">
                            <span className="mr-4">Stages</span>
                            {dropdownOptions.map((option) => (
                              <Tooltip
                                title={option.value}
                                arrow
                                placement="top"
                                key={option.value}
                              >
                                <IconButton
                                  key={option.value}
                                  size="small"
                                  onClick={() => rowSelectedStage(option.value)}
                                >
                                  <RibbonIcon
                                    style={{
                                      width: "30px",
                                      height: "15px",
                                      stroke: "#fff",
                                      strokeWidth: "0.5px",
                                      transform: "scale(1.5)",
                                      fill:
                                        option.value === "New"
                                          ? "#00ADD3"
                                          : option.value === "Connected"
                                          ? "#FFB946"
                                          : option.value === "Followed up"
                                          ? "#3CA2FF"
                                          : option.value === "Meeting Scheduled"
                                          ? "#885AF8"
                                          : option.value === "Estimate Sent"
                                          ? "#2ECAD4"
                                          : "#000000", // Default color
                                    }}
                                  />
                                </IconButton>
                              </Tooltip>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {leadsData?.map((lead, rowIndex) => (
                <TableRow
                  key={lead.leadId}
                  onMouseEnter={() => handleRowHover(rowIndex)}
                  onMouseLeave={handleRowLeave}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.includes(lead.leadId)}
                      onChange={() => handleRowSelection(lead.leadId)}
                    />
                  </TableCell>

                  <TableCell
                    sx={{ fontWeight: "700", cursor: "Pointer" }}
                    onClick={goToProfile}
                    component="th"
                    scope="row"
                  >
                    {lead.leadName}
                  </TableCell>
                  <TableCell sx={{ padding: "0px" }}>
                    <Select
                      value={
                        lead.leadStatus === "NEW" ? "New" : lead.leadStatus
                      }
                      onChange={handleDropdownChange}
                      sx={{ "& .MuiSelect-select": { padding: "5px" } }}
                      inputProps={{ "aria-label": "Select" }}
                      style={{ width: 180 }}
                      MenuProps={{
                        disableScrollLock: true,
                      }}
                      // IconComponent={() => null} // Hide the select icon
                    >
                      {dropdownOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          <RibbonIcon
                            style={{
                              width: "25px ",
                              height: "12px",
                              fill:
                                option.value === "New"
                                  ? "#00ADD3"
                                  : option.value === "Connected"
                                  ? "#FFB946"
                                  : option.value === "Followed up"
                                  ? "#3CA2FF"
                                  : option.value === "Meeting Scheduled"
                                  ? "#885AF8"
                                  : option.value === "Estimate Sent"
                                  ? "#2ECAD4"
                                  : "#000000", // Default color
                            }}
                          />
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell align="center">{lead.leadProjectType}</TableCell>
                  <TableCell align="center">{lead.leadSource}</TableCell>
                  <TableCell align="center" sx={{ width: "200px" }}>
                    <Stack direction="row" spacing={2}>
                      <Avatar
                        alt="Remy Sharp"
                        sx={{ width: "30px", height: "30px" }}
                        src={"/images/image.png"}
                      />
                      <p>{"Lindsey Shroud"}</p>
                    </Stack>
                  </TableCell>

                  <TableCell align="center">
                    {formatDate(lead.createdAt)}
                  </TableCell>
                  <TableCell align="center">
                    {formatAmount(lead.estimatedProfitFromLead)}
                  </TableCell>

                  {hoveredRow === rowIndex && (
                    <div
                      style={{ position: "absolute", right: "20px" }}
                      className="menu-button-container"
                    >
                      <CustomDatagridDropdown
                        rowSelectedStage={rowSelectedStage}
                      />
                    </div>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <CustomTablePagination displayUI="float-right" />
      </div>

      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </div>
  );
}
