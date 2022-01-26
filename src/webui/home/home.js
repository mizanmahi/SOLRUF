import React from 'react';
import './home.css';
import Login from '../../login/checkuser.js';

import YellowButton from '../../components/YellowButton/YellowButton.js';
import LoginModal from '../../components/LoginModal/LoginModal';
import { Container } from '@mui/material';

function Home({ setShowDashboard, showDashboard }) {
   return (
      <Container maxWidth='xl' >
         <div className='homeContainer'>
         <div className='lorem'>
            <h1>Solruf</h1>
            <p>
               Lorem Ipsum is simply dummy text of <br /> the printing and
               typesetting industry.
            </p>
            <YellowButton style={{ fontSize: '1rem' }}>Learn More</YellowButton>
         </div>
         {/* {!showDashboard ? (
            <div className='login'>
               <Login setShowDashboard={setShowDashboard} />
            </div>
         ) : null} */}

         {/* <LoginModal>
            <div className='loginn'>
               <Login setShowDashboard={setShowDashboard} />
            </div>
         </LoginModal> */}
      </div>
      </Container>
   );
}

export default Home;
