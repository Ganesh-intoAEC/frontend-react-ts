import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import UserAdd from '../../../assets/icons/user-add';
import UserUpload from '../../../assets/icons/user-upload';
import { useNavigate } from 'react-router-dom';
import UserCircle from '../../../assets/icons/user-circle';

const buttonStyle: React.CSSProperties = {
  minWidth: '150px',
  borderRadius: '4px',
backgroundColor:'#3CA2FF',
border:'none',
padding:' 10px',
color: "#ffffff",
boxShadow: '0px 4px 10px 0px rgba(16, 156, 241, 0.24)'
};


const dropdownStyle = {
    '& .MuiPaper-root': {
        width: '160px !important',
    },
    '& .MuiTypography-root':{
      fontSize:'13px'
    }
  
  };

const CustomDropdownBtn: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);

  };

  const handleClose = (value: string) => {
    if(value == 'userAdd'){
      navigate('/create-lead-form')
    }
    setAnchorEl(null);
    setIsMenuOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<UserCircle style={{ width: '15px', height: '15px', fill:'#323C47',marginLeft:'10px' }} />}
        endIcon={isMenuOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        onClick={handleMenuClick}
        style={buttonStyle} // Apply the buttonStyle inline
      >
        <span style={{textTransform : 'capitalize'}}>Create Lead</span>
      </Button>
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
        <MenuItem onClick={() => handleClose('userAdd')}>
          <ListItemIcon>
            <UserAdd style={{ width: '15px', height: '15px', fill:'#323C47' }} />
          </ListItemIcon>
          <ListItemText>Create Lead</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleClose('')}>
          <ListItemIcon>
            <UserUpload style={{ width: '15px', height: '15px', fill:'#323C47' }} />
          </ListItemIcon>
          <ListItemText>Upload Lead</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CustomDropdownBtn;
