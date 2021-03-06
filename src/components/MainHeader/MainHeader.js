import {
   Badge,
   Container,
   Divider,
   Drawer,
   styled,
   Typography,
   useMediaQuery,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import YellowButton from '../YellowButton/YellowButton';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import {
   openLoginModal,
   // setLoginRedirect,
} from '../../redux/slices/loginModalSlice';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { removeUser } from '../../redux/slices/userSlice';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LoginModal from '../LoginModal/LoginModal';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useEffect } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';

import LogoutIcon from '@mui/icons-material/Logout';
import ArticleIcon from '@mui/icons-material/Article';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AuthGuard from '../AuthGuard/AuthGuard';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router';
// import ContactPageIcon from '@mui/icons-material/ContactPage';

const Wrapper = styled(Box)(({ theme }) => ({
   boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
   zIndex: 1000,
   position: 'sticky',
   top: 0,
}));

const Header = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: '1rem 0',
   // boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
}));

const Logo = styled(Box)(({ theme }) => ({
   marginRight: '1rem',
   marginLeft: '.5rem',
   '& img': {
      maxWidth: '170px',
      '@media (max-width: 400px)': {
         maxWidth: '150px',
      },
      '@media (max-width: 350px)': {
         // display: 'none',
      },
   },
}));

const Nav = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
}));

const CustomMenuItem = styled(Typography)(({ theme }) => ({
   margin: '0 1rem',
   fontSize: '1.1rem',
   textDecoration: 'none',
   transition: 'all 0.2s ease',
   borderBottom: '2px solid transparent',
   cursor: 'pointer',
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
   flex: '0 0 35%',
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
      width: '80%',
      padding: '5px 1rem',
      fontFamily: 'inherit',

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
const LogoBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   '& svg': {
      fontSize: '2rem',
      marginRight: '0.5rem',
   },
}));

const DashboardMenu = styled(Box)(({ theme }) => ({
   width: '90%',
   marginLeft: 'auto',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   marginTop: theme.spacing(2),
}));

const DashboardMenuLink = styled(NavLink)(({ theme }) => ({
   width: '100%',
   display: 'flex',
   flexDirection: 'row',
   alignItems: 'center',
   padding: theme.spacing(1.5),
   marginBottom: theme.spacing(3),
   borderRadius: '50px 0 0 50px',
   color: 'black',
   textDecoration: 'none',
   fontWeight: 'bold',
   '&:hover': {
      background: 'gray',
      color: '#000',
      textDecoration: 'none',
   },
   '& svg': {
      marginRight: theme.spacing(1),
   },
}));

const activeStyle = {
   background: '#ffd05b',
};

const LogoBoxInDrawer = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   background: '#2D2B2B',
   padding: '2rem .5rem',
}));

const CartBox = styled('header')(({ theme }) => ({
   background: theme.palette.primary.main,
   padding: '.5rem 1rem',
   margin: '0 1rem',
   display: 'flex',
   alignItems: 'center',
   boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
   borderRadius: '5px',
   '@media (max-width: 600px)': {
      margin: '0 0',
   },
   '@media (max-width: 400px)': {
      padding: '.3rem .5rem',
      display: 'none',
   },
   '& p': {
      color: '#4D4D4D',
      fontWeight: 'bold',
   },
   '& svg': {
      color: '#4D4D4D',
   },
}));

const MenuIconBox = styled(Box)(({ theme }) => ({
   background: '#ffd05b',
   height: '3rem',
   width: '3rem',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
   borderRadius: '50%',
   cursor: 'pointer',
   '& svg': {
      marginRight: 0,
   },
   '@media only screen and (max-width: 400px)': {
      width: '2.8rem',
      height: '2.8rem',
   },
}));

const DrawerFooter = styled(Box)(({ theme }) => ({
   position: 'absolute',
   bottom: 0,
   width: '100%',
}));

const FooterMenus = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-around',
   alignItems: 'center',
}));

const FooterMenu = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   textDecoration: 'none',
   cursor: 'pointer',
   '&:hover': {
      textDecoration: 'none',
   },
   '& svg': {
      color: '#4D4D4D',
   },
}));

const MainHeader = () => {
   const dispatch = useDispatch();
   const { user, role } = useSelector((state) => state.user);
   const matchMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
   const matchSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));

   console.log(role);

   const [anchorEl, setAnchorEl] = React.useState(null);
   const openMenu = Boolean(anchorEl);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   const handleLogout = () => {
      setAnchorEl(null);
      dispatch(removeUser());
   };
   const [openDrawer, setOpenDrawer] = useState(false);
   const [open, setOpen] = useState(false);

   const handleClose = () => {
      setOpen(false);
   };
   useEffect(() => {
      setOpenDrawer(false);
   }, [matchMd]);

   const drawer = (
      <DashboardMenu>
         {user && role === 'Vendor' && (
            <DashboardMenuLink
               to='/dashboard'
               style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
               <DashboardIcon />
               Dashboard
            </DashboardMenuLink>
         )}

         {user && role === 'Administrator' && (
            <DashboardMenuLink
               to='/admin/create/new'
               style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
               <DashboardIcon />
               Admin Page
            </DashboardMenuLink>
         )}

         <DashboardMenuLink
            to='/blogs'
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
         >
            <ArticleIcon />
            Blogs
         </DashboardMenuLink>
      </DashboardMenu>
   );

   const logo1 = 'https://i.ibb.co/rpxqJQB/Sol-Ruf-animated-Logo-1.png';
   const logo2 = 'https://i.ibb.co/CzpgVFq/51.png';

   const navigate = useNavigate();

   // const portfolioRouteHandler = () => {
   //    if (!user) {
   //       dispatch(openLoginModal());
   //       dispatch(setLoginRedirect('/profile'));
   //    } else {
   //       navigate('/profile');
   //    }
   // };

   console.log(role);

   return (
      <Wrapper
         sx={{
            paddingBottom: matchMd ? 2 : 0,
            background: matchSm ? '#4D4D4D' : '#ffffff',
         }}
      >
         <Container maxWidth='xl'>
            <Header>
               <LogoBox>
                  <MenuIconBox
                     onClick={() => setOpenDrawer(!openDrawer)}
                     sx={{
                        display: {
                           xs: 'flex',
                           md: 'none',
                        },
                     }}
                  >
                     <MenuIcon fontSize='1.6rem' />
                  </MenuIconBox>
                  <Logo component={Link} to='/'>
                     <img src={matchSm ? logo2 : logo1} alt='' />
                  </Logo>
               </LogoBox>
               {!matchMd && (
                  <SearchBox>
                     <input
                        type='text'
                        placeholder='ex: solar panel, batteries..'
                     />
                     <SearchIconBox>
                        <SearchIcon />

                        <Typography
                           variant='h6'
                           color='#4d4d4d'
                           sx={{ display: { xs: 'none', lg: 'block' } }}
                        >
                           Search
                        </Typography>
                     </SearchIconBox>
                  </SearchBox>
               )}
               <Nav sx={{ display: { xs: 'none', md: 'flex' } }}>
                  {user && role === 'Vendor' && (
                     <CustomMenuItem
                        variant='h6'
                        component={Link}
                        to='/dashboard'
                        color='textPrimary'
                     >
                        Dashboard
                     </CustomMenuItem>
                  )}

                  {user && role === 'Administrator' && (
                     <CustomMenuItem
                        variant='h6'
                        component={Link}
                        to='/admin/create/new'
                        color='textPrimary'
                     >
                        Admin Page
                     </CustomMenuItem>
                  )}

                  <CustomMenuItem
                     variant='h6'
                     component={Link}
                     to='/blogs'
                     color='textPrimary'
                     sx={{}}
                  >
                     Blogs
                  </CustomMenuItem>
                  <CartBox
                     sx={{
                        margin: '0 1rem',
                        cursor: 'pointer',
                        '&:hover svg': { color: '#000000' },
                        '&:hover p': { color: '#000000' },
                     }}
                  >
                     <Badge badgeContent={0}>
                        <ShoppingCartIcon color='action' />
                     </Badge>
                     <Typography sx={{ ml: 1 }}>Cart</Typography>
                  </CartBox>
                  {user ? (
                     <>
                        <Avatar
                           sx={{
                              bgcolor: 'primary.main',
                              cursor: 'pointer',
                              ml: '1rem',
                              '&:hover svg': { color: '#000' },
                              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                           }}
                           onClick={handleClick}
                           aria-controls={open ? 'basic-menu' : undefined}
                           aria-haspopup='true'
                           aria-expanded={open ? 'true' : undefined}
                        >
                           <PersonIcon sx={{ color: '#4D4D4D' }} />
                        </Avatar>
                        <div>
                           <Menu
                              id='basic-menu'
                              anchorEl={anchorEl}
                              open={openMenu}
                              onClose={handleMenuClose}
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

                              <MenuItem onClick={handleLogout}>Logout</MenuItem>
                           </Menu>
                        </div>
                     </>
                  ) : (
                     <>
                        <YellowButton
                           style={{
                              padding: '0.5rem 1rem',
                              fontWeight: 'bold',
                           }}
                           onClick={() => dispatch(openLoginModal())}
                        >
                           Login or Register
                        </YellowButton>
                     </>
                  )}
               </Nav>
               {matchMd && (
                  <CartBox>
                     <Badge badgeContent={0} color='secondary'>
                        <ShoppingCartIcon color='action' />
                     </Badge>
                     <Typography sx={{ ml: 1 }}>Cart</Typography>
                  </CartBox>
               )}
            </Header>
            {matchMd && (
               <SearchBox>
                  <input
                     type='text'
                     placeholder='Search solar panel, batteries...'
                  />
                  <SearchIconBox>
                     <SearchIcon />
                     <Typography
                        variant='h6'
                        color='#4d4d4d'
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                     >
                        Search
                     </Typography>
                  </SearchIconBox>
               </SearchBox>
            )}
         </Container>

         <LoginModal>
            <AuthGuard />
         </LoginModal>

         {/* <CustomDrawer open={mobileOpen} handleToggle={handleDrawerToggle} /> */}
         {/* ============ drawer ============ */}
         <Drawer
            anchor='left'
            open={openDrawer && matchMd}
            onClose={() => setOpenDrawer(false)}
         >
            <Box
               sx={{
                  bgcolor: '#F3F3F3',
                  height: '100vh',
                  minWidth: '250px',
                  position: 'relative',
               }}
            >
               <ArrowBackIosIcon
                  sx={{
                     position: 'absolute',
                     color: '#ffffff',
                     fontSize: '1.2rem',
                     top: '10px',
                     right: '10px',
                     cursor: 'pointer',
                  }}
                  onClick={() => setOpenDrawer(false)}
               />
               <LogoBoxInDrawer>
                  <img
                     src='https://i.ibb.co/kmDKGGw/51-1.png'
                     alt=''
                     style={{ maxWidth: '200px' }}
                  />
               </LogoBoxInDrawer>
               {drawer}
               <DrawerFooter>
                  <Divider />
                  <FooterMenus sx={{ p: '1rem 0' }}>
                     {user && (
                        <>
                           <FooterMenu component={Link} to='profile'>
                              <PersonIcon />
                              <Typography
                                 fontWeight={600}
                                 sx={{ color: '#000' }}
                              >
                                 Profile
                              </Typography>
                           </FooterMenu>

                           <FooterMenu onClick={handleLogout}>
                              <LogoutIcon />
                              <Typography
                                 fontWeight={600}
                                 sx={{ color: '#000' }}
                              >
                                 Logout
                              </Typography>
                           </FooterMenu>
                        </>
                     )}

                     {!user && (
                        <FooterMenu onClick={() => dispatch(openLoginModal())}>
                           <LoginIcon />
                           <Typography fontWeight={600} sx={{ color: '#000' }}>
                              Login or Register
                           </Typography>
                        </FooterMenu>
                     )}
                  </FooterMenus>
               </DrawerFooter>
            </Box>
         </Drawer>
      </Wrapper>
   );
};

export default MainHeader;
