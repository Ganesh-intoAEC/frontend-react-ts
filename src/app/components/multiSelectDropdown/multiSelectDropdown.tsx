import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 80,
      fontSize:'12px !important'
    },
  },
};


interface MultipleSelectDropdownProps {
  dataArr: string[]  ; 
  label: string
}



const  MultipleSelectDropdown:React.FC<MultipleSelectDropdownProps> = ({
  dataArr,
  label,
}) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(
    dataArr
  );
  const [selectAll, setSelectAll] = React.useState<boolean>(true);

  const handleChange = (
    event: SelectChangeEvent<typeof selectedOptions>
  ) => {
    const { target: { value } } = event;
    if (value.includes('selectAll')) {
      setSelectAll(!selectAll);
      setSelectedOptions(selectAll ? [] : dataArr);
    } else {
      setSelectedOptions(value as string[]);
      setSelectAll(value.length === dataArr.length);
    }
  };

  const renderValue = (selected: string[]) => {
    if (selected.length === 0) {
      return 'Tag';
    } else if (selected.includes('selectAll')) {
      return 'Select All';
    } else if (selected.length <= 2) {
      return selected.join(', ');
    } else {
      return `${selected.length} selected`;
    }
  };

  return (
    <div>
    <FormControl variant="standard" sx={{ m: 1, width: '100%'}}>
      <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={(selectedOptions)}
        onChange={handleChange}
        renderValue={renderValue}
        MenuProps={{...MenuProps,
          disableScrollLock: true,
        }}
        defaultValue={[]}
      >
        <MenuItem sx={{'& .MuiTypography-root':{fontSize:'12px'}, '& .MuiCheckbox-root':{padding:'4px'}}} value="selectAll">
          <Checkbox checked={selectAll} />
          <ListItemText primary="Select All" />
        </MenuItem>
        {dataArr.map((name) => (
          <MenuItem sx={{'& .MuiTypography-root':{fontSize:'12px'}, '& .MuiCheckbox-root':{padding:'4px'}}} key={name} value={name}>
            <Checkbox checked={selectedOptions.includes(name)} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
  );
}


export default MultipleSelectDropdown;