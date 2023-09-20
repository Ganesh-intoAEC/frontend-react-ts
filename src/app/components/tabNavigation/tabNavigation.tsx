import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import ActiveIcon from '../../../assets/icons/active-user';
import SnoozeIcon from '../../../assets/icons/snooze-icon';
import LostIcon from '../../../assets/icons/lost-icon';
import ArchiveIcon from '../../../assets/icons/archive-icon';
import WonIcon from '../../../assets/icons/won-icon';

export default function IconPositionTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs
    allowScrollButtonsMobile
    scrollButtons
      value={value}
      onChange={handleChange}
      aria-label="scrollable auto tabs example"
      sx={{
        '& .MuiButtonBase-root':{ minHeight:'48px'},
     '& .Mui-selected':{
      background: '#3ca2ff2e'
     },
     '& .Mui-selected svg':{
      fill: '#3CA2FF'
     }
      }}
    >
      <Tab icon={<SnoozeIcon style={{width:'20px', height:'20px'}}/>} label="Active" iconPosition="start" sx={{width:'150px',   textTransform:'Capitalize', borderBottom: 1, borderColor: 'divider'}}/>
      <Tab icon={<SnoozeIcon style={{width:'20px', height:'20px'}} />} iconPosition="start" label="Snoozed"  sx={{width:'150px',   textTransform:'Capitalize', borderBottom: 1, borderColor: 'divider'}}/>
      <Tab icon={<ArchiveIcon style={{width:'20px', height:'20px'}}/>} iconPosition="start" label="Archived" sx={{width:'150px',   textTransform:'Capitalize', borderBottom: 1, borderColor: 'divider'}} />
      <Tab icon={<WonIcon style={{width:'30px', height:'30px'}}/>} iconPosition="start" label="Won"  sx={{width:'150px',   textTransform:'Capitalize', borderBottom: 1, borderColor: 'divider'}}/>
      <Tab icon={<LostIcon style={{width:'30px', height:'30px'}} />} iconPosition="start" label="Lost"  sx={{width:'150px',   textTransform:'Capitalize', borderBottom: 1, borderColor: 'divider'}}/>
    </Tabs>

    
  );
}
