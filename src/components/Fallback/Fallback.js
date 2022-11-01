// import { Box, Container, Typography } from '@mui/material';
import React from 'react';
// import PrimaryButton from '../Custom/PrimaryButton/PrimaryButton';
import { useNetwork } from '../../hooks/useNetwork';
import NetworkFallback from './NetworkFallback';
// import MainHeader from '../MainHeader/MainHeader';
// import buildingSite from '../../assets/building-website.svg';
// import { Link } from 'react-router-dom';
import ErrorPage from '../../pages/404';


const Fallback = () => {
   const { networkStatus } = useNetwork();

   if (!networkStatus.online) {
      return <NetworkFallback />;
   }

   return <ErrorPage />;

   // return (
   //    <>
   //       <MainHeader />
   //       <Container maxWidth='xl'>
   //          <Box
   //             display='flex'
   //             sx={{
   //                height: '80vh',
   //                alignItems: 'center',
   //                justifyContent: 'center',
   //                columnGap: 2,
   //                mt: 3,

   //                '@media (max-width: 600px)': {
   //                   flexDirection: 'column',
   //                },
   //             }}
   //          >
   //             <Box>
   //                <Typography
   //                   sx={{
   //                      fontWeight: 300,
   //                      fontSize: '6rem',
   //                      color: 'primary.main',
   //                      '@media (max-width: 600px)': {
   //                         fontSize: '3rem',
   //                      },
   //                   }}
   //                   mt={3}
   //                >
   //                   Sorry!
   //                </Typography>
   //                <Typography
   //                   sx={{
   //                      fontWeight: 600,
   //                      fontSize: '3.5rem',
   //                      color: 'primary.main',
   //                      '@media (max-width: 600px)': {
   //                         fontSize: '2rem',
   //                      },
   //                   }}
   //                >
   //                   Something went wrong on our end.
   //                </Typography>
   //                <Typography color='text.disabled' fontWeight='500'>
   //                   You weren't supposed to see this. please go back or{' '}
   //                   <Link
   //                      style={{
   //                         color: 'blueviolet',
   //                         fontWeight: 700,
   //                         textDecoration: 'underline',
   //                      }}
   //                      to='/'
   //                   >
   //                      go to Solruf's home page
   //                   </Link>
   //                </Typography>

   //                <PrimaryButton
   //                   variant='secondary'
   //                   onClick={() => window.location.reload(false)}
   //                   sx={{
   //                      fontWeight: 600,
   //                      mt: 5,
   //                      '@media (max-width: 600px)': {
   //                         mt: 3,
   //                         mb: 3,
   //                      },
   //                   }}
   //                >
   //                   Refresh The Page
   //                </PrimaryButton>
   //             </Box>
   //             <Box
   //                sx={{
   //                   '@media (max-width: 600px)': {
   //                      order: -1,
   //                   },
   //                }}
   //             >
   //                <img
   //                   src={buildingSite}
   //                   alt='something went wrong'
   //                   style={{
   //                      width: '100%',
   //                      maxWidth: '600px',
   //                   }}
   //                />
   //             </Box>
   //          </Box>
   //       </Container>
   //    </>
   // );
};

export default Fallback;
