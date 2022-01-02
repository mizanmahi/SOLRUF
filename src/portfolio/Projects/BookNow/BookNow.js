import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import YellowButton from '../../../components/YellowButton/YellowButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom"

const useStyle = makeStyles((theme) => {
   return {
      bannerBox: {
         width: '100%',
         height: '200px',
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         backgroundImage:
            "linear-gradient(to right,rgba(246, 211, 101, .8) 0%, rgba(253, 160, 133, .8) 100%), url('https://i.ibb.co/5Mw8r2k/book-Now-Banner.png') ",
         borderRadius: '20px 0 0 20px',
         boxShadow: '7px 7px 30px rgba(0, 0, 0, 0.13)',
         '@media (max-width: 600px)': {
            flexDirection: 'column',
            alignItems: 'center',
            flexBasis: '100%',
            borderRadius: '20px'
         },
      },
      buttonBox: {
         width: '100%',
         height: '100%',
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         borderRadius: '0 20px 20px 0',
         background: '#F3F3F3',
         boxShadow: '7px 7px 30px rgba(0, 0, 0, 0.13)',
      },
   };
});

const BookNow = ({ setShowProducts }) => {
   const classes = useStyle();
   const navigate = useNavigate();

   const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

   const clickHandler = () => {
      setShowProducts(true);
   };
   const clickHandlerOnMobile = (e) => {
      e.preventDefault();
      console.log('clicked mobile handler');
      navigate('/book-product-in-advance');
   }

   return (
      <Box sx={{ mb: 10 }}>
         <Grid container sx={{display: ['none', 'flex']}} rowSpacing={2}>
            <Grid item sm={12} md={9} lg={8}>
               <Box className={classes.bannerBox}>
                  <Typography
                     variant='h4'
                     sx={{ fontWeight: 600, color: '#000', fontSize: ['1rem'], }}
                  >
                     Book a Product in Advance
                  </Typography>
               </Box>
            </Grid>
            <Grid item sm={12} md={3} lg={4}>
               <Box
                  className={classes.buttonBox}
                  sx={{ display: ['none', 'flex'], }}
               >
                  <YellowButton onClick={clickHandler}>Book Now</YellowButton>
               </Box>
            </Grid>
         </Grid>
         
         {
            matches && (
               <Box className={classes.bannerBox}>
                  <Typography
                     variant='h4'
                     sx={{ fontWeight: 600, color: '#000', fontSize: ['1rem'], mb: 2 }}
                  >
                     Book a Product in Advance
                  </Typography>
                  {matches && (
                     <YellowButton onClick={clickHandlerOnMobile} style={{background: '#F3F3F3'}}>
                        Book Now
                     </YellowButton>
                  )}
               </Box>
            )
         }

      </Box>
   );
};

export default BookNow;
