import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SnoozeIcon from '../../../assets/icons/snooze-icon';
import ArchiveIcon from '../../../assets/icons/archive-icon';
import DeleteIcon from '../../../assets/icons/delete-icon';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';


const buttonStyle: React.CSSProperties = {
  borderRadius: '4px 0px 0px 4px',
border:'none',
color: "#3CA2FF",
};
const dropdownStyle = {
  '& .MuiPaper-root': {
      width: '130px !important',
  },
  '& .MuiTypography-root':{
    fontSize:'13px'
  }

};

interface CustomMoreActionBtnProps {
  rowSelectedStage: (option: React.SetStateAction<string>) => void;
}

const CustomMoreActionBtn:React.FC<CustomMoreActionBtnProps> = ({rowSelectedStage }) =>{
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
 <Button
    
        endIcon={isMenuOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        onClick={handleMenuClick}
        style={buttonStyle} // Apply the buttonStyle inline
      >
        <span style={{textTransform : 'capitalize'}}>More Action</span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleClose}
        disableScrollLock={true}
        sx={dropdownStyle}
      >

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

export default CustomMoreActionBtn;
