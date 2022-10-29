import React, { useEffect, useState } from 'react';
// import "./home.css";

import { Container, Stack, Typography, useMediaQuery } from '@mui/material';
import { Box, styled } from '@mui/system';

// import useAuth from "../../hooks/useAuth";
import MetaAdder from '../../components/Custom/MetaAdder/MetaAdder';
import { Link as LinkScroll, Element } from 'react-scroll';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ProductCategories from './productsCategories/productsCategories';
import UserFlow from './UserFlow/UserFlow';
import MarketplaceFeature from './MarketplaceFeature/MarketplaceFeature';
import PrimaryButton from '../../components/Custom/PrimaryButton/PrimaryButton.js';
import { InlineWidget } from 'react-calendly';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginModal } from '../../redux/slices/loginModalSlice';
import KwattPopup from './kwattPopup';

const HeroBox = styled(Box)(({ theme }) => ({
   height: '100%',
   width: '100%',
   position: 'absolute',
   top: '0',
   backgroundColor: 'rgba(0,0,0,0.4)',
   display: 'flex',
   flexDirection: 'column',
   color: 'white',
}));

const videoStyle = {
   height: '100%',
   width: '100%',
   objectFit: 'cover',
};

function Home({ register }) {
   const navigate = useNavigate();
   const matchSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.user);
   const [kwattPopup, setKwattPopup] = useState(true);

   useEffect(() => {
      !user && register && dispatch(openLoginModal());
      user && navigate('/');
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <>
         <Box
            sx={{
               position: 'relative',
               color: 'red',
               height: 'calc(100vh - 94px)',
               '@media (max-width: 900px)': {
                  height: 'calc(100vh - 137px)',
               },
            }}
         >
            {kwattPopup && <KwattPopup setKwattPopup={setKwattPopup} />}
            <video
               src='https://solruf.s3.ap-south-1.amazonaws.com/Homepage_video_rb1hf9+(2).webm'
               muted
               loop
               autoPlay
               style={videoStyle}
            ></video>

            {/* placing background video */}
            <HeroBox sx={{}}>
               <Stack
                  sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     justifyContent: 'center',
                     height: '100%',

                     ml: '10%',
                     '@media screen and (max-width: 600px)': {
                        alignItems: 'center',
                        ml: '0',
                     },
                  }}
                  padding={2}
                  rowGap={{ xs: 3, sm: 4, md: 5 }}
               >
                  <Typography
                     sx={{
                        fontWeight: 600,
                        fontSize: {
                           xs: '2rem',
                           md: '3rem',
                           lg: '3.5rem',
                        },
                        lineHeight: '90px',
                        '@media (max-width: 900px)': {
                           lineHeight: '45px',
                        },
                     }}
                     color='white'
                  >
                     India's 1<sup>st</sup> Specialized <br /> Solar Marketplace{' '}
                     <br />
                     for Installers
                  </Typography>

                  <Box
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: '100%',
                     }}
                  >
                     <Typography
                        variant='h4'
                        color='white'
                        sx={{
                           fontSize: {
                              xs: '1.1rem',
                              md: '1.4rem',
                              lg: '1.5rem',
                           },
                           mb: 1,
                        }}
                     >
                        Procure from nation-wide & verified manufacturers &
                        distributors! <br />
                     </Typography>

                     <Typography
                        variant='h4'
                        color='white'
                        sx={{
                           fontSize: {
                              xs: '1.1rem',
                              md: '1.4rem',
                              lg: '1.5rem',
                           },
                        }}
                     >
                        Create shareable solar portfolios for your business!
                     </Typography>
                  </Box>

                  <Box>
                     <PrimaryButton
                        onClick={() => {
                           navigate('/products');
                        }}
                        sx={{
                           fontSize: {
                              xs: '1rem',
                              md: '1.3rem',
                              lg: '1.5rem',
                           },
                           width: {
                              xs: '130px',
                              md: '150px',
                              lg: '180px',
                           },

                           padding: '5px',
                           color: 'black',
                        }}
                     >
                        SHOP NOW
                     </PrimaryButton>
                  </Box>
               </Stack>
               <Box
                  sx={{
                     width: '100%',
                     display: 'flex',
                     justifyContent: 'center',
                     marginBottom: '50px',
                     '@media (max-width: 600px)': {
                        marginBottom: '70px',
                     },
                  }}
                  className='animate__animated animate__bounce animate__repeat-2 animate__slow animate__delay-3s'
               >
                  <LinkScroll to='main' spy={true} smooth={true} duration={250}>
                     <ExpandMoreIcon
                        sx={{
                           fontSize: 70,
                           color: '#FFD05B',
                        }}
                     ></ExpandMoreIcon>
                  </LinkScroll>
               </Box>
            </HeroBox>
         </Box>

         <div>
            <InlineWidget
               url='https://calendly.com/solruf/demo'
               styles={{
                  height: matchSm ? '1300px' : '700px',
               }}
            />
         </div>

         <Element style={{ paddingTop: '0' }} name='main'>
            <Box sx={{ height: '150px', width: '100%', mt: 5 }}></Box>
            <ProductCategories />
            <UserFlow />
            <MarketplaceFeature />
            <Container maxWidth='xl'>
               <MetaAdder
                  title='Home'
                  description="India's Biggest solar market place"
               />
            </Container>
         </Element>
      </>
   );
}

export default Home;
