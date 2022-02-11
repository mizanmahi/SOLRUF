import React from 'react';
import './home.css';
import { useLocation } from 'react-router-dom';

import YellowButton from '../../components/YellowButton/YellowButton.js';
import { Container, Typography } from '@mui/material';

function Home({ setShowDashboard, showDashboard }) {

   const location = useLocation()
   console.log(location);

   return (
      <Container maxWidth='xl'>
         <div className='homeContainer'>
            <div className='lorem'>
               <Typography variant='h2' sx={{fontWeight: 600}}>Solruf</Typography>
               <Typography>
                  Lorem Ipsum is simply dummy text of <br /> the printing and
                  typesetting industry.
               </Typography>
               <YellowButton style={{ fontSize: '1rem' }}>
                  Learn More
               </YellowButton>
            </div>
         </div>
      </Container>
   );
}

export default Home;
