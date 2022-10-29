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
      padding: '0 0.8rem',
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
   '& .MuiAccordionDetails-root': {
      position: 'absolute',
      zIndex: '5000',
   },
}));

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   width: '100%',
}));

const RangeAccordion = ({
   children,
   title,
   noPadding,
   paddingOff,
   open,
   titleStyle,
   pt,
   priceRange,
   ...rest
}) => {
   return (
      <CustomizedAccordion
         {...rest}
         disableGutters
         elevation={0}
         sx={{
            boxShadow: '0px 4px 24px 0  rgba(0, 69, 184, 0.15)',
         }}
      >
         <AccordionSummary
            expandIcon={
               <ExpandMoreIcon
                  sx={{ color: 'rgba(0,0,0,0.7)', fontSize: '1.5rem' }}
               />
            }
            aria-controls='panel1a-content'
            id='panel1a-header'
         >
            <Flex>
               <Typography
                  variant='body1'
                  sx={{ fontWeight: 600, ...titleStyle, fontSize: '14px' }}
               >
                  {title}
               </Typography>
               <Chip
                  label={`${priceRange.from ? priceRange.from : 0} ~ ${
                     priceRange.to ? priceRange.to : 0
                  }`}
                  color='primary'
               />
            </Flex>
         </AccordionSummary>
         <AccordionDetails
            sx={{
               padding: noPadding ? '1rem 0' : '8px 16px 16px',
               p: paddingOff && !pt ? 0 : pt ? '.5rem 0 0 0' : '8px 16px 16px',

               background: '#ffffff',
               borderRadius: '0 0 10px 10px',
            }}
         >
            {children}
         </AccordionDetails>
      </CustomizedAccordion>
   );
};

export default RangeAccordion;
