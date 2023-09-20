import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import NotepadPenIcon from '../../../assets/icons/notepadPen-icon';
import DatepickerIcon from '../../../assets/icons/datepicker-icon';
import PlusSquareIcon from '../../../assets/icons/plusSquare-icon';
import CallIcon from '../../../assets/icons/Call-icon';
import NoteIcon from '../../../assets/icons/note-icon';
import PlusChatIcon from '../../../assets/icons/plusChat-icon';

export default function CustomTabCard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box      sx={{
      '& .MuiButtonBase-root':{ minHeight:'48px', color:'#192a3e52'},
      '& .MuiButtonBase-root svg':{ fill:'#192a3e52'},
   '& .Mui-selected':{
    color:'#192A3E !important'
   },
   '& .Mui-selected svg':{
    fill: '#192A3E'
   },
   '& .MuiTabs-indicator':{
    backgroundColor: '#192A3E'
   },
    bgcolor: 'background.paper' 
    }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{boxShadow: '0px 6px 18px 0px rgba(0, 0, 0, 0.06)'}}
      >
        <Tab  icon={<NotepadPenIcon style={{width:'20px', height:'20px'}}/> } iconPosition="start" label="Questionnaire" />
        <Tab  icon={<NotepadPenIcon style={{width:'20px', height:'20px'}}/> } iconPosition="start" label="Proposal" />
        <Tab  icon={<DatepickerIcon style={{width:'20px', height:'20px'}}/> } iconPosition="start" label="BOQ" />
        <Tab  icon={<DatepickerIcon style={{width:'20px', height:'20px'}}/> } iconPosition="start" label="Event" />
        <Tab  icon={<NotepadPenIcon style={{width:'20px', height:'20px'}}/> } iconPosition="start" label="Communication" />
        <Tab  icon={<PlusSquareIcon style={{width:'20px', height:'20px'}}/> } iconPosition="start" label="File Upload" />
        <Tab  icon={<CallIcon style={{width:'20px', height:'20px'}}/> } iconPosition="start" label="Call Log" />
        <Tab  icon={<NoteIcon style={{width:'20px', height:'20px'}}/> } iconPosition="start" label="Notes" />
        <Tab  icon={<PlusChatIcon style={{width:'20px', height:'20px'}}/> } iconPosition="start" label="Activity" />
      </Tabs>
    </Box>
  );
}
