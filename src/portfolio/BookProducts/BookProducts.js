import { Button, Grid, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useRef } from 'react';
import BookProduct from './BookProduct/BookProduct';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BookProducts = ({ scrollIntoView = true, setShowProducts }) => {
   const productsRef = useRef(null);

   const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

   useEffect(() => {
      if (scrollIntoView) {
         setTimeout(() => {
            productsRef.current.scrollIntoView({ behavior: 'smooth' });
         }, 1000);
      }
   }, [scrollIntoView]);

   return (
      <motion.div
         initial={{ x: '100vw', opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         transition={{ duration: 1, delay: 0.1 }}
      >
         <Box sx={{ mt: 2, mb: 5 }} ref={productsRef}>
            <Box sx={{ mb: 3, position: 'relative' }}>
               <Typography
                  textAlign='center'
                  variant='h4'
                  sx={{
                     backgroundImage:
                        'linear-gradient(to right,rgba(246, 211, 101, .8) 0%, rgba(253, 160, 133, .8) 100%)',
                     py: 3,
                     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                     fontSize: ['1.5rem', '2rem', '2.5rem'],
                  }}
               >
                  Book Products in Advance
               </Typography>
               {!matches && (
                  <Button
                     startIcon={<ArrowBackIcon sx={{fontWeight: 'bold'}} />}
                     sx={{ color: 'secondary.main', mt: 2, fontWeight: 'bold' }}
                     onClick={() => setShowProducts(false)}
                  >
                     Back To Portfolio
                  </Button>
               )}
            </Box>
            <Grid container spacing={3}>
               <Grid item xs={12} sm={6} lg={4}>
                  <BookProduct />
               </Grid>
               <Grid item xs={12} sm={6} lg={4}>
                  <BookProduct />
               </Grid>
               <Grid item xs={12} sm={6} lg={4}>
                  <BookProduct />
               </Grid>
               <Grid item xs={12} sm={6} lg={4}>
                  <BookProduct />
               </Grid>
               <Grid item xs={12} sm={6} lg={4}>
                  <BookProduct />
               </Grid>
               <Grid item xs={12} sm={6} lg={4}>
                  <BookProduct />
               </Grid>
            </Grid>
         </Box>
      </motion.div>
   );
};

export default BookProducts;
