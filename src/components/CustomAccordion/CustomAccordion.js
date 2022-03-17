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

const CustomAccordion = ({ children, title, noPadding, bigTitle, ...rest }) => {
   return (
      <CustomizedAccordion {...rest} disableGutters elevation={0}>
         <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
         >
            <Typography variant={bigTitle ? 'h4' : 'h6'}>{title}</Typography>
         </AccordionSummary>
         <AccordionDetails sx={{padding: noPadding ? '1rem 0' : '8px 16px 16px'}}>{children}</AccordionDetails>
      </CustomizedAccordion>
   );
};

export default CustomAccordion;
