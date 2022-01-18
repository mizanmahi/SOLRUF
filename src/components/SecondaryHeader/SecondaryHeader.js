import { Badge, Container, styled, Typography } from '@mui/material';
import React from 'react';
import Logo from '../../media/animatedLogoDark.gif';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { increase } from '../../redux/slices/counterSlice';
import { useNavigate } from 'react-router';

const Header = styled('header')(({ theme }) => ({
   background: '#ffffff',
   padding: '1rem 0',
}));
const Flex = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
}));
const LogoBox = styled('header')(({ theme }) => ({
   cursor: 'pointer',
}));
const CartBox = styled('header')(({ theme }) => ({
   background: theme.palette.primary.main,
   padding: '.8rem 1.3rem',
   display: 'flex',
   alignItems: 'center',
   boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
   borderRadius: '5px',
}));

const SecondaryHeader = () => {
   const count = useSelector((state) => state.count.count);
   const navigate = useNavigate()

   return (
      <Header>
         <Container maxWidth='xl'>
            <Flex>
               <LogoBox>
                  <img src={Logo} alt='logo' style={{ width: '200px' }} onClick={() => navigate('/')} />
                  
               </LogoBox>
               <CartBox>
                  <Badge badgeContent={count} color='secondary'>
                     <ShoppingCartIcon color='action' />
                  </Badge>
                  <Typography sx={{ ml: 1 }}>Cart</Typography>
               </CartBox>
            </Flex>
         </Container>
      </Header>
   );
};

export default SecondaryHeader;
