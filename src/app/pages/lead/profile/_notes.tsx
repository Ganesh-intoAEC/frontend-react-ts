import React, { useState } from "react";

import dynamic from "next/dynamic";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Box,
  Autocomplete,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DatepickerIcon from "@/assets/icons/datepicker-icon";
import NoteIcon from "@/assets/icons/note-icon";
import CustomTablePagination from "@/app/components/customTablePagination/customTablePagination";
import FilterIcon from "@/assets/icons/filter-icon";
import SelectIconDropdown from "@/app/components/singleSelectIconDropdown/singleSelectIconDropdown";
 
import { AvatarArr, LeadSources } from "@/app/constants/constant";
import CustomDateRangePicker from "@/app/components/CustomDateRangePicker";

interface CardProps {
  title: string;
  content: string;
  created: number;
  edited: number;
}

function Notes() {
  const [addCardTitle, setAddCardTitle] = useState<string>("");
  const [addCardValue, setAddCardValue] = useState<string>("");
  const [editCardTitle, setEditCardTitle] = useState<string>("");
  const [editCardValue, setEditCardValue] = useState<string>("");
  const [cards, setCards] = useState<CardProps[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteConfirmIndex, setDeleteConfirmIndex] = useState<number | null>(
    null
  );
 
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      [{ color: [] }, { background: [] }],
    ],
  };

  const dropdownStyle = {
    "& .MuiPaper-root": {
      width: "120px !important",
      left: "calc(100% - 150px) !important",
    },
    "& .MuiTypography-root": {
      fontSize: "13px",
    },
  };

  const handleSaveClick = () => {
    const now = Date.now();
    if (editIndex !== null) {
      const updatedCards = [...cards];
      updatedCards[editIndex] = {
        title: editCardTitle,
        content: editCardValue,
        created: updatedCards[editIndex].created,
        edited: now,
      };
      setCards(updatedCards);
      setEditIndex(null);
      setEditCardTitle("");
      setEditCardValue("");
    } else if (addCardValue) {
      const newCard: CardProps = {
        title: addCardTitle,
        content: addCardValue,
        created: now,
        edited: now,
      };
      setCards([...cards, newCard]);
      setAddCardTitle("");
      setAddCardValue("");
    }
  };

  // const handleEditClick = (index: number) => {
  //   const cardToEdit = cards[index];
  //   setEditCardTitle(cardToEdit.title);
  //   setEditCardValue(cardToEdit.content);
  //   setEditIndex(index);
  // };

  const handleCancelClick = () => {
    setEditIndex(null);
    setEditCardTitle("");
    setEditCardValue("");
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditButtonClick = (index: number) => {
    handleClose();
    const cardToEdit = cards[index];
    setEditCardTitle(cardToEdit.title);
    setEditCardValue(cardToEdit.content);
    setEditIndex(index);
  };

  const handleDeleteButtonClick = (index: number) => {
    handleClose();
    setDeleteConfirmIndex(index);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmIndex !== null) {
      const updatedCards = [...cards];
      updatedCards.splice(deleteConfirmIndex, 1);
      setCards(updatedCards);
      setDeleteConfirmIndex(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmIndex(null);
  };

  return (
    <div>
      <div>
        <div
          className="top-card bg-white"
          style={{
            boxShadow: "0px 6px 18px 0px rgba(0, 0, 0, 0.06)",
            borderRadius: "4px",
          }}
        >
          <TextField
            placeholder="Title"
            variant="standard"
            className="mt-2 px-2  pb-2 border-bottom"
            fullWidth
            value={addCardTitle}
            onChange={(e) => setAddCardTitle(e.target.value)}
            InputProps={{
              disableUnderline: true,
            }}
          />
          <div>
            <ReactQuill
              placeholder="Leave a note here."
              className="bg-white border-bottom mb-2"
              modules={modules}
              value={addCardValue}
              onChange={setAddCardValue}
            />
          </div>

          <div className="text-right pb-2">
            <Button
              variant="contained"
              className="btnPrimaryUI mx-2"
              color="primary"
              onClick={handleSaveClick}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <Typography variant="h6">{"All Notes"}</Typography>
      </div>
      <div className="d-flex mt-3">
        <div className="col-lg-5 col-md-6 col-sm-12 pr-2">
          <SelectIconDropdown dataArr={AvatarArr} label="Assigned to" />
        </div>
        <div className="col-lg-5 col-md-6 col-sm-12 pr-2">
        <CustomDateRangePicker label={"Added on"} onApply={(st,end)=>{
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
      <div>
        {cards.map((card, index) => (
          <Card
            key={index}
            className={`mt-3 p-0 saved-content-card ${
              editIndex === index ? "editing" : ""
            }`}
          >
            <CardContent className="px-0 pb-2">
              {editIndex === index ? (
                <div>
                  <TextField
                    className="mt-2 px-2  pb-2 border-bottom"
                    variant="standard"
                    fullWidth
                    value={editCardTitle}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    onChange={(e) => setEditCardTitle(e.target.value)}
                  />
                  <ReactQuill
                    className="bg-white border-bottom "
                    modules={modules}
                    value={editCardValue}
                    onChange={setEditCardValue}
                  />
                  <div className="text-right pt-2">
                    <Button
                      variant="contained"
                      className="btnErrorUI mr-2 "
                      color="secondary"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      className="btnPrimaryUI mr-2"
                      color="primary"
                      onClick={handleSaveClick}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-0">
                  <div className="px-2 pb-1 d-flex align-items-center justify-content-between border-bottom">
                    <div>
                      <NoteIcon
                        className="mr-1"
                        style={{
                          width: "12px ",
                          height: "12px",
                          fill: "#555555",
                        }}
                      />
                      <span>{"Note by Esther "}</span>
                    </div>
                    <div className="d-flex align-items-center card-actions">
                      <Box className="mr-3 d-flex align-items-center ">
                        {card.edited !== card.created && (
                          <Tooltip
                            arrow
                            placement="top"
                            className="mr-2"
                            title={`Edited by John on ${new Date(
                              card.edited
                            ).toLocaleString()}`}
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
                            style={{
                              width: "16px",
                              height: "16px ",
                              fill: "#192A3E",
                            }}
                          />
                          {new Date(card.created).toLocaleString()}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton
                          aria-controls={`card-menu-${index}`}
                          aria-haspopup="true"
                          onClick={(e) => handleClick(e)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id={`card-menu-${index}`}
                          anchorEl={anchorEl}
                          keepMounted
                          disableScrollLock
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                          sx={dropdownStyle}
                        >
                          <MenuItem
                            onClick={() => handleEditButtonClick(index)}
                          >
                            <EditIcon
                              className="mr-1"
                              style={{
                                width: "12px",
                                height: "12px",
                                fill: "#000",
                              }}
                            />
                            <span>{"Edit"}</span>
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleDeleteButtonClick(index)}
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
                    </div>
                  </div>
                  <div className="card-header px-2">
                    <Typography variant="h6" component="div">
                      {card.title}
                    </Typography>
                  </div>
                  <div
                    className="viewNoteContainer px-2 "
                    dangerouslySetInnerHTML={{ __html: card.content }}
                  />
                  {/* <Button
                  onClick={() => handleEditClick(index)}
                  variant="outlined"
                  color="primary"
                >
                  Edit
                </Button> */}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        <Dialog open={deleteConfirmIndex !== null} onClose={handleDeleteCancel}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this card?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {cards.length === 0 && (
            <div>
           
            <img
                src={"/images/no-data-found-1.svg"}
                srcSet={"/images/no-data-found-1.svg"}
                style={{ width: "100%", height: "auto" }}
                alt={"logo"}
                loading="lazy"
              />
               
            </div>
        )}
      <div>
        <CustomTablePagination displayUI=" d-flex row-reverse" />
      </div>
    </div>
  );
}

export default Notes;
