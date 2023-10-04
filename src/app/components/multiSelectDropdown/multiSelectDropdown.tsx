import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import {
  // leadSourcesTypes,
  // leadStatusesTypes,
} from "@/app/pages/lead/master/_filterFields";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 80,
      fontSize: "12px !important",
    },
  },
};

interface MultipleSelectDropdownProps {
  dataArr: { id: string; value: string }[];
  label: string;
}

const MultipleSelectDropdown: React.FC<MultipleSelectDropdownProps> = ({
  dataArr,
  label,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(
    []
    // (Array.isArray(dataArr) && dataArr[0] instanceof Object) ?
    // dataArr.map((item: leadStatusesTypes | leadSourcesTypes) => item.leadStatusValue) :
    // dataArr as unknown as string[]
  );
  // const [selectAll, setSelectAll] = React.useState<boolean>(true);

  const handleChange = (event: SelectChangeEvent<typeof selectedOptions>) => {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const value:any= event.target.value;

    console.log("selectChangeValue:::::",value);
    
    setSelectedOptions(value)
    // if (value.includes('selectAll')) {
    //   setSelectAll(!selectAll);
    //   setSelectedOptions(selectAll ? [] : dataArr as unknown as string[]);

    // } else {
    //   setSelectedOptions(value as string[]);
    //   setSelectAll(value.length === dataArr.length);
    // }
  };

  const renderValue = (selected: string[]) => {
    if (selected.length === 0) {
      return "Tag";
    } else if (selected.includes("selectAll")) {
      return "Select All";
    } else if (selected.length <= 2) {
      return selected.join(", ");
    } else {
      return `${selected.length} selected`;
    }
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedOptions}
          onChange={handleChange}
          renderValue={renderValue}
          MenuProps={{ ...MenuProps, disableScrollLock: true }}
          defaultValue={[]}
        >
          <MenuItem
            sx={{
              "& .MuiTypography-root": { fontSize: "12px" },
              "& .MuiCheckbox-root": { padding: "4px" },
            }}
            value="selectAll"
          >
            <Checkbox checked={true} />
            <ListItemText primary="Select All" />
          </MenuItem>
          {(Array.isArray(dataArr) ? dataArr : []).map((item) => (
            <MenuItem
              sx={{
                "& .MuiTypography-root": { fontSize: "12px" },
                "& .MuiCheckbox-root": { padding: "4px" },
              }}
              key={item.id}
              value={item.id}
            >
              <Checkbox
                checked={selectedOptions.includes(item.id)}
              />
              <ListItemText
                primary={item.value}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelectDropdown;
