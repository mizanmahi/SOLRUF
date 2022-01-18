import {
   Button,
   Chip,
   FormControl,
   FormControlLabel,
   FormLabel,
   Grid,
   Radio,
   RadioGroup,
   styled,
   Typography,
   useMediaQuery,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useRef } from 'react';
import BookProduct from './BookProduct/BookProduct';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LeftProductFilter from '../../components/LeftProductFilter/LeftProductFilter';
import HorizontalBookProduct from '../../components/HorizontalBookProduct/HorizontalBookProduct';

const BookProducts = ({ scrollIntoView = true, setShowProducts }) => {
   const productsRef = useRef(null);
   const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

   const [gridView, setGridView] = React.useState(true);

   useEffect(() => {
      if (scrollIntoView) {
         setTimeout(() => {
            productsRef.current.scrollIntoView({ behavior: 'smooth' });
         }, 1000);
      }
   }, [scrollIntoView]);

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
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     mt: 2,
                  }}
               >
                  {!matches && (
                     <Button
                        startIcon={
                           <KeyboardBackspaceIcon
                              sx={{ fontWeight: 'bold', fontSize: 40 }}
                           />
                        }
                        sx={{
                           color: 'secondary.main',
                           mt: 2,
                           fontWeight: 'bold',
                           fontSize: '1.2rem',
                        }}
                        onClick={() => setShowProducts(false)}
                     >
                        Back To Portfolio
                     </Button>
                  )}
                  {
                     !matches && (<Box>
                        <img
                           src='https://i.ibb.co/PNbr5Ph/grid.png'
                           alt=''
                           style={{ marginRight: '1rem', cursor: 'pointer' }}
                           onClick={() => setGridView(true)}
                        />
                        <img
                           src='https://i.ibb.co/DRjD3hm/list.png'
                           alt=''
                           onClick={() => setGridView(false)}
                           style={{ cursor: 'pointer' }}
                        />
                     </Box>)
                  }
               </Box>
            </Box>
            <Grid container spacing={3}>
              {!matches && <Grid item xs={12} md={4} lg={3}>
                  <LeftProductFilter />
               </Grid>}
               <Grid item container spacing={2} xs={12} md={8} lg={9} rowSpacing={3}>
                  {gridView && (
                     <>
                        <Grid item xs={12} md={6} lg={4}>
                           <BookProduct />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                           <BookProduct />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                           <BookProduct />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                           <BookProduct />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                           <BookProduct />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                           <BookProduct />
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
