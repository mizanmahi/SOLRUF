import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Chip,
   Typography,
} from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// const CustomizedAccordion = styled(Accordion)(({ theme }) => ({

// }));

const CustomAccordion = ({
   children,
   title,
   noPadding,
   bigTitle,
   chipTitle,
   defaultExpanded,
   resetHandler,
   sx,
   ...rest
}) => {
   return (
      <Accordion
         sx={{ ...sx }}
         disableGutters
         elevation={0}
         {...rest}
         // defaultExpanded={defaultExpanded}
      >
         <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
         >
            <Typography
               variant={bigTitle ? 'h4' : 'h6'}
               sx={{ justifyContent: 'flex-end' }}
            >
               {title}
            </Typography>

            {chipTitle && (
               <Typography sx={{ marginLeft: 'auto' }}>
                  <Chip label={chipTitle} color='primary' onDelete={resetHandler} />
               </Typography>
            )}
         </AccordionSummary>
         <AccordionDetails
            sx={{
               padding: noPadding ? '1rem 0' : '8px 16px 16px',
               // position: 'relative',
               // backgroundColor: 'red',
            }}
         >
            {children}
         </AccordionDetails>
      </Accordion>
   );
};

export default CustomAccordion;
