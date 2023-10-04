import CustomTablePagination from "@/app/components/customTablePagination/customTablePagination";
import SelectIconDropdown from "@/app/components/singleSelectIconDropdown/singleSelectIconDropdown";
import { AvatarArr, LeadSources } from "@/app/constants/constant";
import CallIcon from "@/assets/icons/Call-icon";
import CallincomingIcon from "@/assets/icons/call-incoming";
import DeleteIcon from "@/assets/icons/delete-icon";
import EditIcon from "@/assets/icons/edit-icon";
import FilterIcon from "@/assets/icons/filter-icon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import CustomDateRangePicker from "@/app/components/CustomDateRangePicker";
import NextImage from "@/app/components/NextImage";
import DatepickerIcon from "@/assets/icons/datepicker-icon";
import { v4 as uuidv4 } from "uuid";

interface CallLog {
  id: string; // Use UUID as a unique identifier field
  value: string;
  comment: string;
  createdDate: Date;
  editedDate?: Date;
}

const dropdownStyle = {
  "& .MuiPaper-root": {
    width: "120px !important",
    left: "calc(100% - 150px) !important",
  },
  "& .MuiTypography-root": {
    fontSize: "13px",
  },
};

export default function CallLog() {
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]); // Use string array for selectedLogs
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(""); // Add type string
  const [comment, setComment] = useState("");
  const [editedValue, setEditedValue] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const [editedIndex, setEditedIndex] = useState<number | null>(null); // Use number for editedIndex
  const [isSaveBtnClicked, setIsSaveBtnClicked] = useState(false);

  // more action dropdown
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMoreActionMenuOpen, setIsMoreActionMenuOpen] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsMoreActionMenuOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsMoreActionMenuOpen(false);
  };

  // more action dropdown

  const addCallLog = (log: CallLog) => {
    // Generate a unique ID for the new log
    log.id = uuidv4();

    setCallLogs([...callLogs, log]);
    handleAddDialogClose();
  };

  const editCallLog = (id: string, updatedLog: CallLog) => {
    const updatedLogs = callLogs.map((log) =>
      log.id === id ? updatedLog : log
    );
    setCallLogs(updatedLogs);
    handleEditDialogClose();
  };

  const deleteCallLog = (
    idToDelete: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
    const clickedId = e.currentTarget.getAttribute("id");
    console.log("Clicked ID:", clickedId);
    console.log("Before deletion - callLogs:", callLogs);
    console.log("Before deletion - selectedLogs:", selectedLogs);

    // Filter out the log with the specified ID from callLogs
    const updatedLogs = callLogs.filter((log) => log.id !== idToDelete);

    // Update the callLogs state with the filtered logs
    setCallLogs(updatedLogs);

    // Filter out the ID from selectedLogs
    const updatedSelectedLogs = selectedLogs.filter(
      (selectedId) => selectedId !== idToDelete
    );

    // Update the selectedLogs state with the filtered selectedLogs
    setSelectedLogs(updatedSelectedLogs);

    // Close the menu
    handleClose();
  };

  const deleteSelectedLogs = () => {
    // Use the IDs of selected call logs for filtering
    const updatedLogs = callLogs.filter(
      (_, index) => !selectedLogs.includes(callLogs[index].id)
    );
    setCallLogs(updatedLogs);
    setSelectedLogs([]);
  };

  const toggleSelectLog = (id: string) => {
    if (selectedLogs.includes(id)) {
      setSelectedLogs(selectedLogs.filter((i) => i !== id));
    } else {
      setSelectedLogs([...selectedLogs, id]);
    }
  };

  const handleAddDialogOpen = () => {
    setOpenAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
    setSelectedValue(""); // Clear selected value
    setComment("");
  };

  const handleEditDialogOpen = (index: number) => {
    handleClose();
    setOpenEditDialog(true);
    setEditedIndex(index);
    setEditedValue(callLogs[index].value);
    setEditedComment(callLogs[index].comment);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setEditedValue("");
    setEditedComment("");
    setEditedIndex(null);
  };

  const handleSaveNewLog = () => {
    setIsSaveBtnClicked(true);
    if (selectedValue && comment) {
      addCallLog({
        id: uuidv4(), // Generate a unique ID
        value: selectedValue,
        comment,
        createdDate: new Date(),
      });
      setIsSaveBtnClicked(false);
    }
  };

  const handleSaveEditedLog = () => {
    if (editedIndex !== null && editedValue && editedComment) {
      editCallLog(callLogs[editedIndex].id, {
        // Use the ID from callLogs
        id: callLogs[editedIndex].id,
        value: editedValue,
        comment: editedComment,
        createdDate: callLogs[editedIndex].createdDate,
        editedDate: new Date(),
      });
    }
  };

  return (
    <div>
      <div className="text-right mb-4">
        <Button
          variant="contained"
          startIcon={<CallincomingIcon />}
          className="btnPrimaryUI mr-2"
          onClick={handleAddDialogOpen}
        >
          <span> Add Call Log</span>
        </Button>
      </div>
      <div className="d-flex">
        <div className="col-lg-5 col-md-6 col-sm-12 pr-2">
          <SelectIconDropdown dataArr={AvatarArr} label="Assigned to" />
        </div>
        <div className="col-lg-5 col-md-6 col-sm-12 pr-2">
          <CustomDateRangePicker
            label={"Added on"}
            onApply={(st, end) => {
              console.log(st, end);
            }}
          />
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
        <div className="col-lg-6 col-md-12 col-sm-12 text-right">
          {selectedLogs.length > 0 && (
            <Button
              variant="contained"
              startIcon={<DeleteIcon style={{ fill: "#ffffff" }} />}
              className="btnPrimaryUI mr-2"
              onClick={deleteSelectedLogs}
              disabled={selectedLogs.length === 0}
            >
              Delete
            </Button>
          )}
        </div>
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
      </div>
      <div></div>

      <div>
        {callLogs.map((log, index) => (
          <Card
            id={log.id}
            key={index}
            sx={{
              boxShadow: "0px 6px 18px 0px rgba(0, 0, 0, 0.06)",
              "& .MuiCardContent-root": { padding: "0" },
            }}
            className="mb-2 pt-1 pb-2"
          >
            <CardContent>
              <Box className="d-flex justify-content-between border-bottom px-2">
                <Box className="d-flex align-items-center">
                  <Checkbox
                    className="pl-0 mr-3"
                    checked={selectedLogs.includes(log.id)}
                    onChange={() => toggleSelectLog(log.id)}
                  />
                  <CallIcon
                    style={{ width: "18px", height: "18px", fill: "#000" }}
                  />
                  <span
                    className="ml-1"
                    style={{
                      color: "#334D6E",
                      fontFamily: "poppins",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {"Call log by Esther Howard"}
                  </span>
                </Box>

                <Box>
                  <IconButton onClick={handleMenuClick}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={isMoreActionMenuOpen}
                    onClose={handleClose}
                    disableScrollLock={true}
                    sx={dropdownStyle}
                  >
                    <MenuItem
                      className=""
                      onClick={() => handleEditDialogOpen(index)}
                    >
                      <EditIcon
                        className="mr-1"
                        style={{ width: "12px", height: "12px", fill: "#000" }}
                      />
                      <span>{"Edit"}</span>
                    </MenuItem>
                    <MenuItem
                      id={log.id}
                      onClick={(e) => deleteCallLog(log.id, e)}
                    >
                      <DeleteIcon
                        className="mr-1"
                        style={{
                          width: "12px",
                          height: "12px",
                          fill: "#FF3C5F",
                        }}
                      />
                      <span style={{ color: "#FF3C5F" }}>{"Delete"}</span>
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>

              <Box className=" border-bottom mb-1 pt-1 px-2">
                <Typography
                  sx={{
                    color: "#334D6E",
                    fontFamily: "poppins",
                    fontSize: "17px",
                    fontWeight: "600",
                  }}
                >
                  {log.value}
                </Typography>
                <Typography
                  sx={{
                    color: "#192A3E",
                    fontFamily: "poppins",
                    fontSize: "16px",
                    opacity: 0.6,
                    minHeight: "100px",
                  }}
                >
                  {log.comment}
                </Typography>
              </Box>

              <Box className="d-flex justify-content-end px-2">
                {log.editedDate && (
                  <Tooltip
                    arrow
                    placement="top"
                    className="mr-2"
                    title={`Edited by John on ${log.editedDate.toLocaleString()}`}
                  >
                    <Typography>
                      <span
                        style={{
                          color: "#192A3E",
                          fontFamily: "poppins",
                          fontSize: "16px",
                          opacity: 0.6,
                        }}
                      >
                        {"Edited"}
                      </span>
                    </Typography>
                  </Tooltip>
                )}
                <Typography
                  className="d-flex align-items-center"
                  sx={{
                    color: "#192A3E",
                    fontFamily: "poppins",
                    fontSize: "16px",
                    opacity: 0.6,
                  }}
                >
                  <DatepickerIcon
                    className="mr-1"
                    style={{ width: "16px", height: "16px ", fill: "#192A3E" }}
                  />
                  {log.createdDate.toLocaleString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
        {callLogs.length === 0 && (
          <div>
            <NextImage
              width={"100%"}
              src={"/images/no-data-found-1.svg"}
              alt={"no-data"}
              loading="lazy"
            />
          </div>
        )}
      </div>
      <div>
        <CustomTablePagination displayUI=" d-flex row-reverse" />
      </div>

      {/* Add Call Log Dialog */}
      <Dialog
        open={openAddDialog}
        disableScrollLock
        onClose={handleAddDialogClose}
      >
        <div className="text-center border-bottom">
          <DialogTitle className="underline-on-hover   my-2">
            Add Call Log
          </DialogTitle>
        </div>
        <DialogContent>
          <div className="text-center">
            <DialogContentText className="fw-500" sx={{ color: "#34AFF9" }}>
              {"+91 9565446434"}
            </DialogContentText>
          </div>

          <Box>
            <Box className="my-3">
              <TextField
                select
                value={selectedValue}
                fullWidth
                variant="standard"
                label="What happen to call log"
                placeholder="select "
                helperText={
                  selectedValue === "" && isSaveBtnClicked ? (
                    <span style={{ color: "red" }}>Select Call log</span>
                  ) : (
                    ""
                  )
                }
                onChange={(e) => setSelectedValue(e.target.value)}
              >
                <MenuItem value="Good Discussion">Good Discussion</MenuItem>
                <MenuItem value="Call Later">Call Later</MenuItem>
                <MenuItem value="Not Answered">Not Answered</MenuItem>
                <MenuItem value="Not Inserted">Not Inserted</MenuItem>
              </TextField>
            </Box>
            <Box className="my-3">
              <TextField
                value={comment}
                variant="standard"
                placeholder="Leave a comment here"
                onChange={(e) => setComment(e.target.value)}
                label="Comment"
                InputLabelProps={{ shrink: true }}
                multiline
                rows={4}
                fullWidth
                helperText={
                  comment === "" && isSaveBtnClicked ? (
                    <span style={{ color: "red" }}>Enter comments</span>
                  ) : (
                    ""
                  )
                }
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="justify-content-center mb-1">
          <Button className="btnErrorUI mx-2" onClick={handleAddDialogClose}>
            Cancel
          </Button>
          <Button className="btnPrimaryUI mx-2" onClick={handleSaveNewLog}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Call Log Dialog */}
      <Dialog
        open={openEditDialog}
        disableScrollLock
        onClose={handleEditDialogClose}
      >
        <div className="text-center border-bottom">
          <DialogTitle className="underline-on-hover   my-2">
            Edit Call Log
          </DialogTitle>
        </div>
        <DialogContent>
          <div className="text-center">
            <DialogContentText className="fw-500" sx={{ color: "#34AFF9" }}>
              {"+91 9565446434"}
            </DialogContentText>
          </div>
          <Box>
            <Box className="my-3">
              <TextField
                select
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
                fullWidth
                variant="standard"
                label="What happen to call log"
                placeholder="select "
                helperText={
                  selectedValue === "" && isSaveBtnClicked ? (
                    <span style={{ color: "red" }}>Select Call log</span>
                  ) : (
                    ""
                  )
                }
              >
                <MenuItem value="Good Discussion">Good Discussion</MenuItem>
                <MenuItem value="Call Later">Call Later</MenuItem>
                <MenuItem value="Not Answered">Not Answered</MenuItem>
                <MenuItem value="Not Inserted">Not Inserted</MenuItem>
              </TextField>
            </Box>
            <Box className="my-3">
              <TextField
                variant="standard"
                placeholder="Leave a comment here"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                label="Comment"
                InputLabelProps={{ shrink: true }}
                multiline
                rows={4}
                fullWidth
                helperText={
                  comment === "" && isSaveBtnClicked ? (
                    <span style={{ color: "red" }}>Enter comments</span>
                  ) : (
                    ""
                  )
                }
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="justify-content-center mb-1">
          <Button className="btnErrorUI mx-2" onClick={handleEditDialogClose}>
            Cancel
          </Button>
          <Button className="btnPrimaryUI mx-2" onClick={handleSaveEditedLog}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
