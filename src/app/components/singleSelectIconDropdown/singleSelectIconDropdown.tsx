import React, { useState } from 'react';
import {
  Avatar,
  FormControl,
  InputLabel,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface Option {
  name: string;
  avatarUrl: string;
}

interface SingleSelectIconDropdownProps {
  dataArr: Option[]; 
  label: string;
}

// const dropdownStyle = {
//   '& .MuiFormLabel-root .MuiAvatar-root':{
//     width:25, height:25
//   },
//   '& .MuiPaper-root .MuiAvatar-root':{
//     width:18, height:18
//   },
//   '& .MuiListItemAvatar-root':{minWidth:'30px'}
// }
const SelectIconDropdown: React.FC<SingleSelectIconDropdownProps> = ({
  dataArr, 
  label,
}) => {
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);

  const handleChange = (
    event: SelectChangeEvent<string | number | readonly string[]>
  ) => {
    const selectedIndex = event.target.value as string;
    if (selectedIndex !== undefined) {
      setSelectedItem(dataArr[parseInt(selectedIndex, 10)]);
    }
  };

  const renderMenuItem = (option: Option, index: number) => (
    <MenuItem key={index} value={index.toString()} sx={{'& .MuiListItemAvatar-root':{minWidth:'40px'}}}>
      <ListItemAvatar sx={{'& .MuiAvatar-root':{width:25, height:25}}}>
        <Avatar src={option.avatarUrl} alt={option.name} />
      </ListItemAvatar>
      <ListItemText sx={{'& .MuiTypography-root':{fontSize:'12px !important'}}} primary={option.name} />
    </MenuItem>
  );

  return (
    <FormControl variant="standard" className='mt-1 mb-2' sx={{ width: '100%', '& .MuiListItemAvatar-root':{minWidth:'30px'} }}>
      <InputLabel>{label}</InputLabel>
      <Select
        labelId="custom-select-label"
        id="custom-select"
        value={dataArr.indexOf(selectedItem as Option).toString()}
        onChange={handleChange}
        defaultValue=''
        fullWidth
        renderValue={() => (
          <div className='d-flex align-items-center'>
            {selectedItem && (
              <ListItemAvatar sx={{'& .MuiAvatar-root':{width:18, height:18}}}>
                <Avatar src={selectedItem.avatarUrl} alt={selectedItem.name} />
              </ListItemAvatar>
            )}
            {selectedItem && <span style={{fontSize:'12px'}}>{selectedItem.name}</span>}
          </div>
        )}
        MenuProps={{ disableScrollLock: true}}
      >
        {dataArr.map((option, index) => renderMenuItem(option, index))}
       
      </Select>
    </FormControl>
  );
};

export default SelectIconDropdown;
