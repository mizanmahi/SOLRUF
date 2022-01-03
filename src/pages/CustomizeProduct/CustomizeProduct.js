import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import CustomAccordion from '../../components/CustomAccordion/CustomAccordion';
import SingleProduct from '../../components/SingleProduct/SingleProduct';
import SolrufTextField from '../../components/TextField/TextField';

const CustomizeProduct = () => {
   return (
      <div>
         <Container maxWidth='lg'>
            <Box
               sx={{ maxWidth: '1000px', width: '100%', margin: '2rem auto' }}
            >
               <SingleProduct />
            </Box>

            <CustomAccordion title='Pricing Details'>
               <Grid container spacing={3}>
                  <Grid item sm={12} md={6}>
                     <SolrufTextField
                        label='Price'
                        iconText={<Typography variant='body2'>INR</Typography>}
                     />
                  </Grid>
                  <Grid item sm={12} md={6}>
                     <SolrufTextField
                        label='Price Per Watt'
                        iconText={<Typography variant='body2'>INR</Typography>}
                     />
                  </Grid>
               </Grid>
            </CustomAccordion>
         </Container>
      </div>
   );
};

export default CustomizeProduct;
