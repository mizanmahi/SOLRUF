import React, { useState, useEffect } from 'react';
import './header.css';
import Home from '../home/home';
import Products from '../allproducts/allproduct';
import Core from '../coreproduct';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from '../images/ORIGINAL_SOLRUF_ANIMATED_LOGO1.gif';
import Installer from '../../installer/installerform/installerform';
import Addproject from '../../installer/addproject/Addproject';
import Gridform from '../../installer/grid/gridform/gridform';
import UserPortfolioProfile from '../../portfolio/UserPortfolioProfile';
import { Button, Container } from '@mui/material';
import MyPortfolio from '../../pages/MyPortfolio/MyPortfolio';
import ProjectsPage from '../../pages/ProjectsPage/ProjectsPage';
import AddProject from '../../pages/AddProject/AddProject';
import BookProductInAdvancePage from '../../pages/BookProductInAdvancePage/BookProductInAdvancePage';
import ProjectDetails from '../../pages/ProjectDetails/ProjectDetails';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Dashboard from '../../pages/Dashboard/Dashboard';
import ProfileSharingPage from '../../pages/ProfileSharingPage/ProfileSharingPage';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeUser, setUser } from '../../redux/slices/userSlice';
import SearchProduct from '../../pages/SearchProduct/SearchProduct';

function Header() {
   const [user, setUser] = useLocalStorage('user', null);
   const [showDashboard, setShowDashboard] = useState(false);

   // const { user } = useSelector((state) => state.user);
   // const dispatch = useDispatch();
   
   console.log(user);

   const [model, setModel] = useState(false);

   function handleModal() {
      setModel(!model);
   }

   return (
      <Container maxWidth='xl'>
         <Router>
            <div className='header_container'>
               <Link className='nav-link' to='/'>
                  <div className='weblogo'>
                     <img
                        src={logo}
                        alt='web browser logo'
                        className='logogif'
                     />
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

            <Routes>
               <Route
                  exact
                  path='/'
                  element={
                     <>
                        {' '}
                        <Home
                           setShowDashboard={setShowDashboard}
                           showDashboard={showDashboard}
                        />
                        <Products />
                     </>
                  }
               />
               <Route exact path='/dashboard' element={<Dashboard />} />
               <Route
                  exact
                  path='/profileSharing/:profileId'
                  element={<ProfileSharingPage />}
               />

               <Route
                  exact
                  path='/book-product-in-advance'
                  element={<BookProductInAdvancePage />}
               />
            </Routes>
            <Routes>
               <Route
                  exact
                  path='/about'
                  element={
                     <>
                        <UserPortfolioProfile />
                     </>
                  }
               />
               <Route
                  exact
                  path='/searchProduct'
                  element={
                     <>
                        <SearchProduct />
                     </>
                  }
               />
               <Route
                  exact
                  path='/myPortfolio'
                  element={
                     <>
                        <MyPortfolio />
                     </>
                  }
               />
               <Route
                  exact
                  path='/projects'
                  element={
                     <>
                        <ProjectsPage />
                     </>
                  }
               />
               <Route
                  exact
                  path='/about/project/details'
                  element={
                     <>
                        <ProjectDetails />
                     </>
                  }
               />

               <Route
                  exact
                  path='/addProject'
                  element={
                     <>
                        <Container maxWidth='xl'>
                           <AddProject />
                        </Container>
                     </>
                  }
               />
            </Routes>
            <Routes>
               <Route
                  exact
                  path='/product'
                  element={
                     <>
                        <Installer />
                        <Addproject />
                        <Gridform />
                     </>
                  }
               />
            </Routes>
            <Routes>
               <Route exact path='/coreproduct' element={<Core />} />
            </Routes>
         </Router>
      </Container>
   );
}

export default Header;
