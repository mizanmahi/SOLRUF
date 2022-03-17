import { Grid, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useRef } from 'react';
import BookProduct from './BookProduct/BookProduct';
import { motion } from 'framer-motion';
import LeftProductFilter from '../../components/LeftProductFilter/LeftProductFilter';
import HorizontalBookProduct from '../../components/HorizontalBookProduct/HorizontalBookProduct';

const BookProducts = ({ scrollIntoView = true, setShowProducts }) => {
   const productsRef = useRef(null);
   const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

   const [gridView, setGridView] = React.useState(true);

   // useEffect(() => {
   //    if (scrollIntoView) {
   //       setTimeout(() => {
   //          productsRef.current.scrollIntoView({ behavior: 'smooth' });
   //       }, 1000);
   //    }
   // }, [scrollIntoView]);

   const categories = [
      'Solar Panels',
      'Solar invertors',
      'Solar roofing',
      'Solar water heater',
      'Solar water tanks',
      'Solar water pipes',
   ];

   return (
      <motion.div
         initial={{ x: '100vw', opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         transition={{ duration: 1, delay: 0.1 }}
      >
         <Box sx={{ mt: 2, mb: 5 }} ref={productsRef}>
            <Grid container spacing={3}>
               <Grid item xs={12} md={4} lg={3}>
                  <LeftProductFilter />
               </Grid>

               <Grid
                  item
                  container
                  spacing={2}
                  xs={12}
                  md={8}
                  lg={9}
                  rowSpacing={3}
               >
                  {gridView && (
                     <>
                        <Grid item xs={12} md={6} lg={4}>
                           <BookProduct bookingOn={true} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                           <BookProduct bookingOn={true} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                           <BookProduct bookingOn={true} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                           <BookProduct bookingOn={true} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                           <BookProduct bookingOn={true} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                           <BookProduct bookingOn={true} />
                        </Grid>
                     </>
                  )}
                  {!gridView && (
                     <>
                        <Grid item xs={12}>
                           <HorizontalBookProduct />
                        </Grid>
                        <Grid item xs={12}>
                           <HorizontalBookProduct />
                        </Grid>
                        <Grid item xs={12}>
                           <HorizontalBookProduct />
                        </Grid>
                     </>
                  )}
               </Grid>
            </Grid>
         </Box>
      </motion.div>
   );
};

export default BookProducts;
