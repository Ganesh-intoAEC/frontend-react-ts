import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import ExportIcon from '../../../assets/icons/export-icon';
import PdfIcon from '../../../assets/icons/pdf-icon';
import ExcelIcon from '../../../assets/icons/excel-icon';

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
        width: '150px !important',
    },
    '& .MuiTypography-root':{
      fontSize:'13px'
    }
  
  };

const CustomDropdownExport: React.FC = () => {
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
        variant="contained"
        startIcon={<ExportIcon style={{width:'15px',height:'15px'}}/>}
        endIcon={isMenuOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        onClick={handleMenuClick}
        style={buttonStyle} // Apply the buttonStyle inline
      >
        <span style={{textTransform : 'capitalize'}}>{'Export'}</span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleClose}
        disableScrollLock={true}

        sx={dropdownStyle} 
      >
        <MenuItem onClick={() => handleClose('userAdd')}>
          <ListItemIcon>
            <PdfIcon style={{ width: '25px', height: '25px', fill:'#F7685B' }} />
          </ListItemIcon>
          <ListItemText sx={{fontSize:'13px'}}>Pdf</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleClose('')}>
          <ListItemIcon>
            <ExcelIcon style={{ width: '25px', height: '25px', fill:'#2ED47A' }} />
          </ListItemIcon>
          <ListItemText sx={{fontSize:'13px !important'}}>Excel</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CustomDropdownExport;
