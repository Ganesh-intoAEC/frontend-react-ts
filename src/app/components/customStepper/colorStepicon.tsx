import React from 'react';
import { StepIconProps, Typography } from '@mui/material';
import {styled} from '@mui/material/styles';

import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';



// Define the custom connector style
const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    left:'-110px',
    width:'100%'
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#3CA2FF"
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#3CA2FF"
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    zIndex:'-99',
    width:'100%',
    backgroundColor:
      theme.palette.mode === 'dark' ? '#ffffff00' : '#C2CFE0',
    borderRadius: 1,
    position: 'relative',
    right: '-108px'
  },
  '& .MuiStepConnector-root .MuiStepConnector-line':{
    borderColor:'#ffffff !important'
  }
}));


const Root = styled('div')<{
  active?: boolean;
  completed?: boolean;
}>(({  active, completed }) => ({
  backgroundColor: '#C2CFE0',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(active && {
    backgroundColor: "#3CA2FF",
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(completed && {
    backgroundColor: "#3CA2FF"
  }),
}));


const ColorlibStepIcon: React.FC<StepIconProps & { label: string; icon: React.ReactNode }> = (props) => {
  const { active, completed, className, label, icon } = props;

  return (
    <Root active={active}  sx={{
      '& .MuiStep-root div.MuiStepConnector-lineHorizontal':{
        display:'none',
        borderColor:'#ffffff !important'
      }
    }} completed={completed} className={className}>
      <CustomStepConnector
      sx={{
        '& .MuiStep-alternativeLabel .Mui-disabled':{
          display:'none',
          borderColor:'#ffffff !important'
        }
      }} />
      {/* Icons */}
     
          {icon}
  
      {/* Label */}
      <Typography variant="caption" style={{ marginTop: '8px' }}>
        {label}
      </Typography>
    </Root>
  );
};

export default ColorlibStepIcon;