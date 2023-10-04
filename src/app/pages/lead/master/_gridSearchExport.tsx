import { Button, TextField } from "@mui/material";

import WonIcon from "../../../../assets/icons/won-icon";
import LostIcon from "../../../../assets/icons/lost-icon";
import CustomDropdownExport from "../../../components/customDropdownBtn/customDropdownExport";
// import SearchIcon from '@mui/icons-material/Search';
import CustomMoreActionBtn from "../../../components/customDropdownBtn/customMoreActionBtn";
import React, { useState } from "react";

interface GridSearchExportProps {
  isRowSelected: boolean | null;
  rowSelectedStage: (option: React.SetStateAction<string>) => void;
  leadNameSearch: (leadName: string) => void;
}

const GridSearchExport:React.FC<GridSearchExportProps> = ({ isRowSelected, rowSelectedStage,leadNameSearch }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleInputChange = (newValue: string) => {
    setSearchValue(newValue);
    leadNameSearch(newValue); // Pass leadName to parent component
  };

  return (
    <div className="container mx-2 my-4">
      <div className="row justify-content-between mb-1">
        <div className="col-lg-4 col-md-12 col-sm-12 row">
          {isRowSelected && (
            <div className="col-12 row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <Button
             variant="contained"
             color="success"
            className="btnSuccessUI mr-2"
             startIcon={
               <WonIcon/>
             }
              onClick={()=>rowSelectedStage("Won")}
            >
              <span>Won</span>
            </Button>
       
            <Button
              variant="contained"
              className="btnErrorUI"
               color="error"
               startIcon={
                 <LostIcon/>
               }
              onClick={()=>rowSelectedStage("Lost")}
             
            >
              <span >Lost</span>
            </Button>
          </div>
          </div>
          )}
        </div>
        <div className="col-lg-8 col-md-12 col-sm-12 text-right ">
          <div className="row d-flex justify-content-end">
            <div className="col-lg-7 col-md-12 col-sm-12 my-md-3 mr-3">
              {/* <Autocomplete
                fullWidth
                freeSolo
                id="combo-box-demo"
                options={top100Films}
                onChange={(e) => handleInputChange(e.target.value)}
                sx={{'& .MuiOutlinedInput-root':{
                  padding: '4px'
                }}}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search lead name..."
                  />
                )}
              /> */}
              <TextField
                 fullWidth
                 sx={{'& .MuiOutlinedInput-root':{
                  padding: '4px'
                }}}
                value={searchValue}
              placeholder="Search lead name..."
              onChange={(e) => handleInputChange(e.target.value)}
              />
            </div>
            {isRowSelected &&(<div className="col-lg-2 mr-5">
              <CustomMoreActionBtn  rowSelectedStage={rowSelectedStage } />
            </div>)}
            <div className="col-lg-2 ">
              <CustomDropdownExport />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default GridSearchExport;

 