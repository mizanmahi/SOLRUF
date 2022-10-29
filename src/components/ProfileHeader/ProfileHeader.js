import React from 'react';
import { Badge, Box, Container, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import {
   activeHeaderMenuStyle,
   CartBox,
   CustomMenuItem,
   Header,
   LogoBox,
   MenuIconBox,
   Wrapper,
} from './profileHeader.style';

import { NavLink } from 'react-router-dom';

// const logo1 = 'https://i.ibb.co/rpxqJQB/Sol-Ruf-animated-Logo-1.png';
// const logo2 = 'https://i.ibb.co/CzpgVFq/51.png';

const ProfileHeader = () => {
   const navigate = useNavigate();
   const { cart } = useSelector((state) => state.cart);

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
               <Box display='flex' component='nav' alignItems='center'>
                  <CustomMenuItem
                     variant='body'
                     component={NavLink}
                     to='/portfolio/order-status'
                     color='textPrimary'
                     style={({ isActive }) =>
                        isActive ? activeHeaderMenuStyle : undefined
                     }
                  >
                     Order-Status
                  </CustomMenuItem>
                  <CartBox
                     onClick={() => navigate('/portfolio-checkout')}
                     sx={{
                        mr: 2,
                        ml: 1,
                        cursor: 'pointer',
                        '&:hover svg': { color: '#000000' },
                        '&:hover p': { color: '#000000' },
                     }}
                  >
                     <Badge
                        badgeContent={cart?.reduce(
                           (prev, curr) => prev + curr.quantity,

                           0
                        )}
                        sx={{
                           '& .MuiBadge-badge': {
                              background: '#4D4D4D',
                              color: '#ffffff',
                              fontWeight: 600,
                           },
                        }}
                     >
                        <ShoppingCartIcon color='action' />
                     </Badge>
                     <Typography sx={{ ml: 1 }}>Cart</Typography>
                  </CartBox>
               </Box>
            </Header>
         </Container>
      </Wrapper>
   );
};

export default ProfileHeader;
