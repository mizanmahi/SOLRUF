import { Container, Grid, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import YellowButton from '../YellowButton/YellowButton';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginModal } from '../../redux/slices/loginModalSlice';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { removeUser } from '../../redux/slices/userSlice';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LoginModal from '../LoginModal/LoginModal';
import Login from '../../login/checkuser'

const Wrapper = styled(Box)(({ theme }) => ({
   //    background: '#f3f3f3',
   boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
}));
const Header = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: '1rem 0',
   // boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
}));

const Logo = styled(Box)(({ theme }) => ({
   marginRight: '5rem',
}));

const Nav = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'flex-end',
   alignItems: 'center',
   marginLeft: '5rem',
}));

const CustomMenuItem = styled(Typography)(({ theme }) => ({
   margin: '0 1rem',
   fontSize: '1.1rem',
   textDecoration: 'none',
   transition: 'all 0.2s ease',
   borderBottom: '2px solid transparent',
   '&:hover': {
      color: '#000000',
      borderBottom: '2px solid #ffd05b',
      textDecoration: 'none',
   },
}));

const SearchBox = styled(Box)(({ theme }) => ({
   border: '3px solid #ffd05b',
   borderRadius: '6px',
   display: 'flex',
   alignItems: 'stretch',
   overflow: 'hidden',
   flex: '1',
   boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.10)',
   '&:hover': {
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.10)',
   },
   '& input': {
      border: 'none',
      outline: 'none',
      fontSize: '1.2rem',
      color: '#000',
      fontWeight: 'bold',
      width: '70%',
      padding: '5px 1rem',
      fontFamily: 'inherit',
      borderRadius: '6px',

      '&::placeholder': {
         fontFamily: 'inherit',
         fontWeight: '400',
         fontSize: '1.2rem',
      },
   },
}));

const SearchIconBox = styled(Box)(({ theme }) => ({
   background: '#ffd05b',
   width: '30%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   cursor: 'pointer',
   '&:hover': {},
   '& svg': {
      fontSize: '2rem',
      color: '#4d4d4d',
      marginRight: '0.5rem',
   },
}));

const MainHeader = () => {
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.user);

   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleLogout = () => {
      setAnchorEl(null);
      dispatch(removeUser());
   };

   return (
      <Wrapper>
         <Container maxWidth='xl'>
            <Header>
               <Logo component={Link} to='/'>
                  <img
                     src='https://i.ibb.co/rpxqJQB/Sol-Ruf-animated-Logo-1.png'
                     alt=''
                  />
               </Logo>
               <SearchBox>
                  <input
                     type='text'
                     placeholder='Search solar panel, batteries...'
                  />
                  <SearchIconBox>
                     <SearchIcon />
                     <Typography variant='h6' color='#4d4d4d'>
                        Search
                     </Typography>
                  </SearchIconBox>
               </SearchBox>
               <Nav>
                  {user && (
                     <CustomMenuItem
                        variant='h6'
                        component={Link}
                        to='/dashboard'
                        color='textPrimary'
                     >
                        Dashboard
                     </CustomMenuItem>
                  )}
                  <CustomMenuItem
                     variant='h6'
                     component={Link}
                     to='/about'
                     color='textPrimary'
                  >
                     Profile
                  </CustomMenuItem>
                  <CustomMenuItem
                     variant='h6'
                     component={Link}
                     to='/adminPortfolio'
                     color='textPrimary'
                  >
                     Portfolio
                  </CustomMenuItem>
                  {user ? (
                     <>
                        <Avatar
                           sx={{ bgcolor: 'primary.main' }}
                           onClick={handleClick}
                           aria-controls={open ? 'basic-menu' : undefined}
                           aria-haspopup='true'
                           aria-expanded={open ? 'true' : undefined}
                        >
                           <PersonIcon sx={{ color: '#666F73' }} />
                        </Avatar>
                        <div>
                           <Menu
                              id='basic-menu'
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              MenuListProps={{
                                 'aria-labelledby': 'basic-button',
                              }}
                           >
                              <MenuItem
                                 onClick={handleClose}
                                 component={Link}
                                 to='/about'
                              >
                                 Profile
                              </MenuItem>
                              {/* <MenuItem onClick={handleClose}>
                                 My account
                              </MenuItem> */}
                              <MenuItem onClick={handleLogout}>Logout</MenuItem>
                           </Menu>
                        </div>
                     </>
                  ) : (
                     <>
                        <YellowButton
                           style={{ margin: '0 1rem', padding: '0.5rem 1rem' }}
                           onClick={() => dispatch(openLoginModal())}
                        >
                           Sign Up
                        </YellowButton>
                        <YellowButton
                           style={{ padding: '0.5rem 1rem' }}
                           onClick={() => dispatch(openLoginModal())}
                        >
                           Log In
                        </YellowButton>
                     </>
                  )}
               </Nav>
            </Header>
         </Container>

         <LoginModal>
            <div className='loginn'>
               <Login />
            </div>
         </LoginModal>
      </Wrapper>
   );
};

export default MainHeader;
