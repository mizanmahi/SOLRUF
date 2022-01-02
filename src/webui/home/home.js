import React from 'react';
import './home.css';
import Login from '../../login/checkuser.js';

import YellowButton from '../../components/YellowButton/YellowButton.js';

function Home({ setShowDashboard, showDashboard }) {
   return (
      <div className='homeContainer'>
         <div className='lorem'>
            <h1>Solruf</h1>
            <p>
               Lorem Ipsum is simply dummy text of <br /> the printing and
               typesetting industry.
            </p>
            <YellowButton style={{ fontSize: '1rem' }}>Learn More</YellowButton>
         </div>
         {!showDashboard ? (
            <div className='login'>
               <Login setShowDashboard={setShowDashboard} />
            </div>
         ) : null}
      </div>
   );
}

export default Home;
