import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MainHeader from '../../components/MainHeader/MainHeader';
import sun from './assets/sun.svg';
import layer1 from './assets/layer1.svg';
import layer2 from './assets/layer2.svg';
import layer3 from './assets/layer3.svg';
import layer4 from './assets/layer4.svg';
import layer5 from './assets/layer5.svg';
import layer6 from './assets/layer6.svg';
import layer7 from './assets/layer7.svg';
import layer8 from './assets/layer8.svg';
import layer9 from './assets/layer9.svg';
import layer10 from './assets/layer10.svg';
import layer11 from './assets/layer11.svg';
import leaves from './assets/leaves.svg';

import './parallax.css';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

const Parallax404 = () => {
   const [mouse, setMouse] = useState({});

   useEffect(() => {
      window.addEventListener('mousemove', (event) => {
         setMouse(event);
      });
   }, []);

   const parallax = (movementAmount = 1) => {
      if (Object.keys(mouse).length) {
         return {
            transform: `translateX(${
               (mouse.clientX / 50) * movementAmount
            }px) translateY(${(mouse.clientY / 50) * movementAmount}px)`,
         };
      }
   };

   return (
      <>
         <MainHeader />
         <Box>
            <div className='parallax_page'>
               <Box
                  sx={{
                     position: 'absolute',
                     right: '5%',
                     bottom: '20%',
                     zIndex: 1,
                  }}
               >
                  <Typography
                     sx={{
                        color: 'rgb(5,72,97)',
                        fontWeight: 300,
                        fontSize: '3rem',
                     }}
                     color='primary.main'
                     mt={3}
                  >
                     Take a breath.
                  </Typography>
                  <Typography
                     sx={{
                        color: 'rgb(5,72,97)',
                     }}
                  >
                     That page does not exist but you can <br /> explore our{' '}
                     <Link
                        to='/blogs'
                        style={{
                           color: 'rgb(5,72,97)',
                           textDecoration: 'underline',
                           fontWeight: 600,
                        }}
                     >
                        Blog
                     </Link>
                     .
                  </Typography>
                  <Typography
                     sx={{
                        color: 'rgb(5,72,97)',
                     }}
                  >
                   Error 404
                  </Typography>
               </Box>

               <Box className='image-container' style={parallax(0)}>
                  <img src={sun} alt='' />
               </Box>
               <div className='image-container' style={parallax(-0.9)}>
                  <img src={layer11} alt='' />
               </div>
               <div className='image-container' style={parallax(-1)}>
                  <img src={layer10} alt='' />
               </div>
               <div className='image-container' style={parallax(-1.1)}>
                  <img src={layer9} alt='' />
               </div>
               <div className='image-container' style={parallax(-1.2)}>
                  <img src={layer8} alt='' />
               </div>
               <div className='image-container' style={parallax(-1.3)}>
                  <img src={layer7} alt='' />
               </div>
               <div className='image-container' style={parallax(-1.4)}>
                  <img src={layer6} alt='' />
               </div>
               <div className='image-container' style={parallax(-1.5)}>
                  <img src={layer5} alt='' />
               </div>
               <div className='image-container' style={parallax(-1.6)}>
                  <img src={layer5} alt='' />
               </div>
               <div className='image-container' style={parallax(-1.7)}>
                  <img src={layer4} alt='' />
               </div>
               <div className='image-container' style={parallax(-1)}>
                  <img src={layer3} alt='' />
               </div>
               <div className='image-container' style={parallax(-1)}>
                  <img src={layer2} alt='' />
               </div>
               <div className='image-container' style={parallax(-3)}>
                  <img id='tree' src={layer1} alt='' />
               </div>
               <div className='image-container ' style={parallax(-3)}>
                  <img src={leaves} alt='' />
               </div>
            </div>
         </Box>
         <Footer />
      </>
   );
};

export default Parallax404;
