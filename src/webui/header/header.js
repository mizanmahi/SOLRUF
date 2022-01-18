import React, { useState } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import logo from '../images/ORIGINAL_SOLRUF_ANIMATED_LOGO1.gif';
import { Container } from '@mui/material';
import { useLocalStorage } from '../../hooks/useLocalStorage';

function Header() {
   const [user, setUser] = useLocalStorage('user', null);
   const [showDashboard, setShowDashboard] = useState(false);

   // const { user } = useSelector((state) => state.user);
   // const dispatch = useDispatch();

   console.log(user);

   return (
      <Container maxWidth='xl'>
         <div className='header_container'>
            <Link className='nav-link' to='/'>
               <div className='weblogo'>
                  <img src={logo} alt='web browser logo' className='logogif' />
               </div>
            </Link>
            <div className='header_items'>
               {user || showDashboard ? (
                  <Link className='nav-link' to='/dashboard'>
                     <div style={{ color: 'black' }} className='about'>
                        Dashboard
                     </div>
                  </Link>
               ) : null}
               <Link className='nav-link' to='/myPortfolio'>
                  <div style={{ color: 'black' }} className='about'>
                     My Portfolio
                  </div>
               </Link>
               <Link className='nav-link' to='/about'>
                  <div style={{ color: 'black' }} className='about'>
                     About Us
                  </div>
               </Link>
               <Link className='nav-link' to='/product'>
                  <div style={{ color: 'black' }} className='products'>
                     Products
                  </div>
               </Link>
               <Link className='nav-link' to='/coreproduct'>
                  <div style={{ color: 'black' }} className='core_product'>
                     Core Product Offering
                  </div>
               </Link>
            </div>
         </div>
      </Container>
   );
}

export default Header;
