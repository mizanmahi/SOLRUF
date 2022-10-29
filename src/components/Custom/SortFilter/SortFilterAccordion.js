import { Accordion, Box, Chip, styled } from '@mui/material';
import React from 'react';
import { AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CustomizedAccordion = styled(Accordion)(({ theme }) => ({
   boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.1)',
   borderRadius: '10px',
   background: '#ffffff',
   '& .MuiButtonBase-root': {
      borderRadius: '22px',
   },
   '&::before': {
      // background: 'transparent',
   },
   '& .MuiAccordionSummary-root': {
      background: '#ffffff',
      padding: '0 .8rem',
      border: 0,
   },
   '& .Mui-expanded': {
      borderRadius: '5px',
   },
   '& .MuiPaper-rounded': {
      '&:last-of-type': {
         borderRadius: '0 0 10px 10px',
      },
   },
}));

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   width: '100%',
}));

const SortFilterAccordion = ({
   children,
   title,
   sortFilter,
   ...rest
}) => {
   return (
      <CustomizedAccordion {...rest} disableGutters elevation={0}>
         <AccordionSummary
            expandIcon={
               <ExpandMoreIcon sx={{ color: '#000000', fontSize: '1.5rem' }} />
            }
            aria-controls='panel1a-content'
            id='panel1a-header'
         >
            <Flex>
               <Typography
                  sx={{
                    color: "#4D4D4D",
                    fontSize: "18px",
                    fontWeight: "bold",
                }}
                >
                  {title}
               </Typography>
                <Chip
                    label={sortFilter[title] ? 'Ascending' : 'Descending'}
                    color='primary'
                />
            </Flex>
         </AccordionSummary>
         <AccordionDetails
            sx={{
                pt:0,
                background: '#ffffff',
                borderRadius: '0 0 10px 10px',
            }}
         >
            {children}
         </AccordionDetails>
      </CustomizedAccordion>
   );
};

export default SortFilterAccordion;