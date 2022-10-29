import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { styled } from '@mui/system';

const TabPanel = styled(Tabs)(({ theme }) => ({
   borderRadius: theme.spacing(0.7),
   margin: `${theme.spacing(2)} 0`,
   '& .MuiButtonBase-root': {
      fontSize: '1.2rem',
      paddingLeft: '2.5rem',
      paddingRight: '2.5rem',
   },
   '& .Mui-selected': {
      fontWeight: 'bold',
      color: '#000000',
   },
   '& .MuiTabs-flexContainer': {
      justifyContent: 'space-around',
   },
}));

const SolrufTabPanel = ({ handleTabChange, activeTab, tabs, sx }) => {
   return (
      <TabPanel
         value={activeTab}
         onChange={handleTabChange}
         centered
         sx={{ ...sx }}
      >
         {tabs.map((tab, index) => (
            <Tab key={index} label={tab} />
         ))}
      </TabPanel>
   );
};

export default SolrufTabPanel;
