import React from 'react';
import { Badge, Container, Typography, useMediaQuery } from '@mui/material';
import { Box, styled } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Wrapper = styled(Box)(({ theme }) => ({
   boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
   zIndex: 1000,
   position: 'sticky',
   top: 0,
   background: '#ffffff',
}));

const Header = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: '1rem 0',
   // boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
   zIndex: 100,
}));

const CartBox = styled('header')(({ theme }) => ({
   background: theme.palette.primary.main,
   padding: '.5rem 1rem',
   display: 'flex',
   alignItems: 'center',
   boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
   borderRadius: '5px',
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

const LogoBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   '& svg': {
      fontSize: '2rem',
      marginRight: '0.5rem',
   },
}));

const Logo = styled(Box)(({ theme }) => ({
   marginLeft: '1rem',
   marginRight: '4rem',
   '& img': {
      maxWidth: '170px',
      '@media (max-width: 400px)': {
         maxWidth: '150px',
      },
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

const logo1 = 'https://i.ibb.co/rpxqJQB/Sol-Ruf-animated-Logo-1.png';
// const logo2 = 'https://i.ibb.co/CzpgVFq/51.png';

const ProfileHeader = () => {
   // const matchMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
   // const matchSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
   return (
      <Wrapper>
         <Container maxWidth='xl'>
            <Header>
               <LogoBox>
                  <MenuIconBox
                     sx={{
                        display: {
                           xs: 'none',
                           md: 'none',
                        },
                     }}
                  >
                     <MenuIcon fontSize='1.6rem' />
                  </MenuIconBox>
                  {/* <Logo component={Link} to='/'>
                     <img src={logo1} alt='' />
                  </Logo> */}
               </LogoBox>
               <CartBox
                  sx={{
                     mr: 2,
                     ml: 1,
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
            </Header>
         </Container>
      </Wrapper>
   );
};

export default ProfileHeader;
