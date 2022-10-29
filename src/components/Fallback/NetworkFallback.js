import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import PrimaryButton from '../Custom/PrimaryButton/PrimaryButton';
import networkFb from '../../assets/networkFb.gif';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MainHeader from '../MainHeader/MainHeader';
import { Link } from 'react-router-dom';

const NetworkFallback = () => {
   const theme = useTheme();
   return (
      <>
         <MainHeader />
         <Box
         
            p={4}
            height='100%'
            display='flex'
            alignItems='center'
            flexDirection='column'
            justifyContent='center'
            mt={4}
         >
            <Box
               sx={{
                  width: '100%',
                  maxWidth: '600px',
               }}
            >
               <img src={networkFb} width='100%' alt='Error 404' />
            </Box>
            <Typography
               sx={{
                  color: theme.palette.primary.dark,
                  fontWeight: 300,
                  fontSize: '3rem',
               }}
               color='primary.main'
               mt={3}
            >
               Take a breath.
            </Typography>
            <Typography color='text.disabled' fontWeight='500'>
               That page does not exist but you can <br /> explore our{' '}
               <Link to='/blogs'>Blog</Link> .
            </Typography>
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  columnGap: 2,
                  mt: 3,
               }}
            >
               <PrimaryButton
                  // component={Link}
                  to='/'
                  sx={{
                     fontWeight: 600,
                     px: 2,
                     '&:hover': {
                        color: theme.palette.primary.dark,
                     },
                  }}
               >
                  Go Home
               </PrimaryButton>
               <PrimaryButton
                  // component={Link}
                  variant='secondary'
                  to='/'
                  sx={{
                     fontWeight: 600,
                     px: 2,
                     '&:hover': {
                        color: theme.palette.primary.dark,
                     },
                  }}
                  IconStart={ArrowBackIcon}
               >
                  Back
               </PrimaryButton>
            </Box>
         </Box>
      </>
   );
};

export default NetworkFallback;
