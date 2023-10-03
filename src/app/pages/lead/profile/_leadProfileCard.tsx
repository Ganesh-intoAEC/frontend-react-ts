import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import ImageUpload from "../../../components/profileImageUpload/profileImageUpload";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import EditIcon from "../../../../assets/icons/edit-icon";
import SnoozeIcon from "../../../../assets/icons/snooze-icon";
import ArchiveIcon from "../../../../assets/icons/archive-icon";
import TickIcon from "../../../../assets/icons/tick-icon";
import CloseIcon from "../../../../assets/icons/close-icon";
import { Tooltip } from "@mui/material";
import RibbonTextIcon from "../../../../assets/icons/ribbonText-icon";
import ArchiveTextIcon from "../../../../assets/icons/archivedText-icon";
import SnoozeTextIcon from "../../../../assets/icons/snoozedText-icon";
import SelectIconDropdown from "../../../components/singleSelectIconDropdown/singleSelectIconDropdown";
import { AvatarArr } from "../../../constants/constant";

interface Data {
  leadName: string;
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  tentativeStartDate: string;
  desiredCompletionDate: string;
  estimatedRevenue: string;
  estimatedBudget: string;
  estimatedProfit: string;
  projectLocation: string;
  projectType: string;
  projectDescription: string;
  leadSource: string;
  assignTo: string;
  priority: string;
  addedBy: string;
}

interface LeadProfileCardProps {
  data: Data;
  leadSelectedStatus: (action: string) => void;
  LeadCurrentStatus: string;
}

const nonEditLabel: React.CSSProperties = {
  color: "#818E9B",
  fontFamily: "Poppins",
  fontSize: "11px",
};
const nonEditValue: React.CSSProperties = {
  color: "#323C47",
  fontFamily: "Poppins",
  fontSize: "13px",
  marginBottom: "10px",
};

const LeadProfileCard: React.FC<LeadProfileCardProps> = ({
  data,
  leadSelectedStatus,
  LeadCurrentStatus,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Data>(data);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Update the old data with the edited data
    setEditedData(editedData);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="row ">
        <div className="col-12">
          <Card sx={{ boxShadow: "0px 6px 18px 0px rgba(0, 0, 0, 0.06)" }}>
            <CardContent>
              {isEditing ? (
                <div>
                  <div style={{ textAlign: "right" }}>
                    <IconButton
                      className="btnSaveUI mr-1"
                      onClick={handleSaveClick}
                    >
                      <TickIcon />
                    </IconButton>
                    <IconButton
                      className="btnCancelUI"
                      onClick={handleCancelClick}
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                  <Box sx={{ textAlign: "center" }}>
                    <ImageUpload />
                  </Box>
                  <div>
                    <TextField
                      label="Lead name"
                      name="leadName"
                      value={editedData.leadName}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                    <TextField
                      label="Email"
                      name="email"
                      value={editedData.email}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                    <TextField
                      label="Mobile number"
                      name="mobile"
                      value={editedData.mobile}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                    <TextField
                      label="Address"
                      name="address"
                      value={editedData.address}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                    <TextField
                      label="City"
                      name="city"
                      value={editedData.city}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                    <TextField
                      label="State"
                      name="state"
                      value={editedData.state}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                    <TextField
                      label="Country"
                      name="country"
                      value={editedData.country}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                    <TextField
                      label="Zip code"
                      name="zipCode"
                      value={editedData.zipCode}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                    <TextField
                      label="Tentative start date "
                      name="tentativeStartDate"
                      value={editedData.tentativeStartDate}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                    <TextField
                      label="Desired completion date"
                      name="desiredCompletionDate"
                      value={editedData.desiredCompletionDate}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                    <TextField
                      label="Estimated revenue"
                      name="estimatedRevenue"
                      value={editedData.estimatedRevenue}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                    <TextField
                      label="Estimated budget"
                      name="estimatedBudget"
                      value={editedData.estimatedBudget}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                    <TextField
                      label="Estimated profit"
                      name="estimatedProfit"
                      value={editedData.estimatedProfit}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                    <TextField
                      label="Estimated revenue"
                      name="estimatedRevenue"
                      value={editedData.estimatedRevenue}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                    <TextField
                      label="Project location"
                      name="projectLocation"
                      value={editedData.projectLocation}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                    <TextField
                      label="Project type "
                      name="projectType"
                      value={editedData.projectType}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                    <TextField
                      label="Description"
                      name="projectDescription"
                      value={editedData.projectDescription}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                    <TextField
                      label="Lead source"
                      name="leadSource"
                      value={editedData.leadSource}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                    <TextField
                      label="Assign to "
                      name="assignTo"
                      value={editedData.assignTo}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                         <SelectIconDropdown dataArr={AvatarArr} label="Assign to"/>
                    <TextField
                      label="Priority"
                      name="priority"
                      value={editedData.priority}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                    <TextField
                      label="Added by"
                      name="addedBy"
                      value={editedData.addedBy}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                      helperText=" "
                    />
                  </div>
                </div>
              ) : (
                <div>
                     <div className="col-lg-12 row justify-content-between">
                        <div className="col-lg-4 ml-2 d-flex justify-content-start">
                        {LeadCurrentStatus === "Won" && (
                          <img
                            src={"/images/won.gif"}
                            alt="Won-Lead"
                            style={{
                              width: "20px",
                              height: "20px",
                              objectFit: "cover",
                              transform: 'scale(2.5)'
                            }}
                          />
                        )}
                        {LeadCurrentStatus === "Lost" && (
                          <img
                            src={"/images/lost.gif"}
                            alt="Won-Lead"
                            style={{
                              width: "20px",
                              height: "20px",
                              objectFit: "cover",
                              transform: 'scale(2.5)'
                            }}
                          />
                        )}
                        </div>
                        <div  className="col-lg-6 d-flex justify-content-end">
                        {LeadCurrentStatus === "Snooze" && (
                        <SnoozeTextIcon style={{width:'117px', height:'30px'}}/>
                        )}
                        {LeadCurrentStatus === "Archive" && (
                        <ArchiveTextIcon style={{width:'117px', height:'30px'}}/>
                        )}
                        </div>
                        
                      </div>
                  <div className="d-flex justify-content-center">
                    <Box
                      sx={{
                        "& .MuiButtonBase-root": {
                          display: "none",
                        },
                      }}
                    >
                    
                      <ImageUpload />
                      <div className="text-center mt-1 mb-2">
                        <span>{"John Doe"}</span>
                      </div>
                    </Box>
                  </div>
                  <div className="text-center mb-2">
                    <div>
                    {(LeadCurrentStatus === ""  || LeadCurrentStatus === "Snooze" || LeadCurrentStatus === "Archive" ) &&(
                          <RibbonTextIcon
                          RibbonLabel="New"
                          style={{ fill: "#00ADD3" }}
                        />
                        )}
                       {LeadCurrentStatus === "Lost" && (
                          <RibbonTextIcon
                          RibbonLabel="Lost"
                          style={{ fill: "#F7685B" }}
                        />
                        )}
                         {LeadCurrentStatus === "Won" && (
                          <RibbonTextIcon
                          RibbonLabel="Won"
                          style={{ fill: "#2ED47A" }}
                        />
                        )}
                    </div>
                  </div>
                  <div className="text-center">
                    <Stack
                      sx={{ justifyContent: "center" }}
                      direction="row"
                      spacing={2}
                    >
                      <Tooltip arrow placement="bottom" title={"Edit"}>
                        <IconButton
                          onClick={handleEditClick}
                          aria-label="edit"
                          className="btnCircleUI"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <div  onClick={() => leadSelectedStatus("Snooze")}>
                      <Tooltip
                       
                        arrow
                        placement="bottom"
                        title={"Snooze"}
                      >
                        <IconButton aria-label="snooze" className="btnCircleUI">
                          <SnoozeIcon />
                        </IconButton>
                      </Tooltip>
                      </div>
                      <div onClick={() => leadSelectedStatus("Archive")}>
                      <Tooltip
                        
                        arrow
                        placement="bottom"
                        title={"Archive"}
                      >
                        <IconButton
                          aria-label="archive"
                          className="btnCircleUI"
                        >
                          <ArchiveIcon />
                        </IconButton>
                      </Tooltip>
                      </div>
                      
                    </Stack>
                  </div>
                  <Divider className="mt-2"></Divider>

                  <div className="mt-3">
                    <div>
                      <span style={nonEditLabel}>{"Lead name "}</span>
                      <p style={nonEditValue}>{editedData.leadName}</p>
                    </div>
                    <div>
                      <span style={nonEditLabel}>{"Email"}</span>
                      <p style={nonEditValue}>{editedData.email}</p>
                    </div>
                    <div>
                      <span style={nonEditLabel}>{"Mobile number"}</span>
                      <p style={nonEditValue}>{editedData.mobile}</p>
                    </div>
                    <div>
                      <span style={nonEditLabel}>{"Address"}</span>
                      <p style={nonEditValue}>{editedData.address}</p>
                    </div>
                    <div>
                      <span style={nonEditLabel}>{"City"}</span>
                      <p style={nonEditValue}>{editedData.city}</p>
                    </div>
                    <div>
                      <span style={nonEditLabel}>{"State"}</span>
                      <p style={nonEditValue}>{editedData.state}</p>
                    </div>
                    <div>
                      <span style={nonEditLabel}>{"Country"}</span>
                      <p style={nonEditValue}>{editedData.country}</p>
                    </div>
                    <div>
                      <span style={nonEditLabel}>{"Zip code"}</span>
                      <p style={nonEditValue}>{editedData.zipCode}</p>
                    </div>
                    <div>
                      <span style={nonEditLabel}>{"Tenative start date"}</span>
                      <p style={nonEditValue}>
                        {editedData.tentativeStartDate}
                      </p>
                    </div>
                    <div>
                      <span style={nonEditLabel}>
                        {"Desired completion date"}
                      </span>
                      <p style={nonEditValue}>
                        {editedData.desiredCompletionDate}
                      </p>
                    </div>
                    <div>
                      <span style={nonEditLabel}>{"Estimated revenue"}</span>
                      <p style={nonEditValue}>{editedData.estimatedRevenue}</p>
                    </div>
                    <div>
                      <span style={nonEditLabel}>{"Estimated budget"}</span>
                      <p style={nonEditValue}>{editedData.estimatedBudget}</p>
                    </div>
                    <div>
                      <span style={nonEditLabel}>{"Estimated profit"}</span>
                      <p style={nonEditValue}>{editedData.estimatedProfit}</p>
                    </div>
                    <div>
                      <span style={nonEditLabel}>{"Project location"}</span>
                      <p style={nonEditValue}>{editedData.projectLocation}</p>
                    </div>
                    <div>
                      <span style={nonEditLabel}>{"Project type"}</span>
                      <p style={nonEditValue}>{editedData.projectType}</p>
                    </div>
                    <div>
                      <span style={nonEditLabel}>{"Description"}</span>
                      <p style={nonEditValue}>
                        {editedData.projectDescription}
                      </p>
                    </div>
                    <div>
                      <span style={nonEditLabel}>{"Lead source"}</span>
                      <p style={nonEditValue}>{editedData.leadSource}</p>
                    </div>
                    <div>
                      <span style={nonEditLabel}>{"Priority"}</span>
                      <p style={nonEditValue}>{editedData.priority}</p>
                    </div>
                    <div>
                      <span style={nonEditLabel}>{"Added by"}</span>
                      <p style={nonEditValue}>{editedData.addedBy}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeadProfileCard;
