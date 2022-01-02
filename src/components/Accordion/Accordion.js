import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid } from '@mui/material';
import SolrufTextField from '../TextField/TextField';
import { styled } from '@mui/material/styles';

const CustomAccordion = styled(Accordion)(({ theme }) => ({
   '& .MuiButtonBase-root': {
      borderBottom: '1px solid gray',
   }
}));

const Textarea = styled('textarea')(({ theme }) => {
   return {
      width: '100%',
      margin: '1rem auto',
      border: '2px solid #FFD05B',
      borderRadius: '10px',
      outline: 'none',
      padding: '1rem',
      fontFamily: theme.typography.fontFamily,
   };
});

const SolrufAccordion = () => {
   return (
      <>
         <CustomAccordion disableGutters elevation={0}>
            <AccordionSummary
               expandIcon={<ExpandMoreIcon />}
               aria-controls='panel1a-content'
               id='panel1a-header'
            >
               <Typography>Project Cost and Return On Investment</Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Grid container columnSpacing={3}>
                  <Grid item sm={12} md={6} lg={4}>
                     <SolrufTextField
                        label='Project Cost'
                        type='text'
                        iconText={<Typography variant='body2'>INR</Typography>}
                     />
                  </Grid>
                  <Grid item sm={12} md={6} lg={4}>
                     <SolrufTextField
                        label='Period Of Return'
                        type='text'
                     />
                  </Grid>
                  <Grid item sm={12} md={6} lg={4}>
                     <SolrufTextField
                        label='Amount of Return'
                        type='text'
                        iconText={<Typography variant='body2'>INR</Typography>}
                     />
                  </Grid>
               </Grid>
            </AccordionDetails>
         </CustomAccordion>
         <CustomAccordion disableGutters elevation={0}>
            <AccordionSummary
               expandIcon={<ExpandMoreIcon />}
               aria-controls='panel2a-content'
               id='panel2a-header'
            >
               <Typography>Location</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Grid container columnSpacing={3}>
                  <Grid item sm={12} md={6} lg={4}>
                     <SolrufTextField
                        label='State'
                        type='text'
                     />
                  </Grid>
                  <Grid item sm={12} md={6} lg={4}>
                     <SolrufTextField
                        label='City/District'
                        type='text'
                     />
                  </Grid>
                  <Grid item sm={12} md={6} lg={4}>
                     <SolrufTextField
                        label='Pin Code'
                        type='text'
                        iconText={<Typography variant='body2'>INR</Typography>}
                     />
                  </Grid>
               </Grid>
            </AccordionDetails>
         </CustomAccordion>
         <CustomAccordion disableGutters elevation={0}>
            <AccordionSummary
               expandIcon={<ExpandMoreIcon />}
               aria-controls='panel2a-content'
               id='panel2a-header'
            >
               <Typography>Customer Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Grid container columnSpacing={3}>
                  <Grid item sm={12} md={6} lg={4}>
                     <SolrufTextField
                        label='Customer Name'
                        type='text'
                     />
                  </Grid>
                  <Grid item sm={12}>
                  <Textarea rows='5' placeholder='Customer Review'></Textarea>
                  </Grid>
                  
               </Grid>
            </AccordionDetails>
         </CustomAccordion>
      </>
   );
};

export default SolrufAccordion;
