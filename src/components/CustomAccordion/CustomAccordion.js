import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   styled,
   Typography,
} from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CustomizedAccordion = styled(Accordion)(({ theme }) => ({
   '& .MuiButtonBase-root': {
      borderBottom: '1px solid gray',
   },

}));

const CustomAccordion = ({ children, title, ...rest }) => {
   return (
      <CustomizedAccordion {...rest} disableGutters elevation={0}>
         <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
         >
            <Typography>{title}</Typography>
         </AccordionSummary>
         <AccordionDetails>{children}</AccordionDetails>
      </CustomizedAccordion>
   );
};

export default CustomAccordion;
