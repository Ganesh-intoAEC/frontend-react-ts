import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '../../../assets/icons/edit-icon';
import SnoozeIcon from '../../../assets/icons/snooze-icon';
import ArchiveIcon from '../../../assets/icons/archive-icon';
import DeleteIcon from '../../../assets/icons/delete-icon';
import { useRouter } from 'next/router';


const buttonStyle: React.CSSProperties = {
  borderRadius: '4px 0px 0px 4px',
backgroundColor:'#3CA2FF',
border:'none',
padding:' 15px 0px',
color: "#ffffff",
margin:'3px -2px'
};


const dropdownStyle = {
  '& .MuiPaper-root': {
      width: '140px !important',
      left: "calc(100% - 150px) !important",
  },
  '& .MuiTypography-root':{
    fontSize:'13px'
  }

};

interface CustomDatagridDropdownProps {
  rowSelectedStage: (option: React.SetStateAction<string>) => void;
}

const CustomDatagridDropdown:React.FC<CustomDatagridDropdownProps> = ({rowSelectedStage }) =>{
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {push} = useRouter();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);

  };

  const handleClose = (value: string) => {
    if(value == 'userAdd'){
      push('/create-lead-form')
    }
    setAnchorEl(null);
    setIsMenuOpen(false);
  };

  return (
    <div>
      <IconButton style={buttonStyle} onClick={handleMenuClick} color="primary">
                      <MoreVertIcon/>
                    </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleClose}
        disableScrollLock={true}
        // anchorOrigin={{
        //   vertical: 'bottom',
        //   horizontal: 'left',
        // }}
        // transformOrigin={{
        //   vertical: 'top',
        //   horizontal: 'left',
        // }}
        // classes={{ paper: 'fixed-width-dropdown' }} 
         sx={dropdownStyle} 
      >
        <MenuItem onClick={() => push('/lead-profile')}>
          <ListItemIcon>
            <EditIcon style={{ width: '15px', height: '15px', fill:'#000000' }} />
          </ListItemIcon>
          <ListItemText>{'Edit'}</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => rowSelectedStage('Snooze')}>
          <ListItemIcon>
            <SnoozeIcon style={{ width: '15px', height: '15px' }} />
          </ListItemIcon>
          <ListItemText>{'Snooze'}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => rowSelectedStage('Archive')}>
          <ListItemIcon>
            <ArchiveIcon style={{ width: '15px', height: '15px' }} />
          </ListItemIcon>
          <ListItemText>{'Archive'}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleClose('')}>
          <ListItemIcon>
            <DeleteIcon style={{ width: '15px', height: '15px' }} />
          </ListItemIcon>
          <ListItemText color='error'>{'Delete'}</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CustomDatagridDropdown;
