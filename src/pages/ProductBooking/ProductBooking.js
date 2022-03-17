import { Container, Grid, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import React from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import HorizontalBookProduct from '../../components/HorizontalBookProduct/HorizontalBookProduct';
import { useNavigate } from 'react-router-dom';
import ProfileFooter from '../../components/ProfileFooter/ProfileFooter';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import LeftProductFilter from '../../components/LeftProductFilter/LeftProductFilter';
import BookProduct from '../../portfolio/BookProducts/BookProduct/BookProduct';

const Wrapper = styled(Box)(({ theme }) => ({
   backgroundColor: theme.palette.primary.light,
}));
const Nav = styled(Box)(({ theme }) => ({
   padding: '1rem 0',
}));

const ProductBooking = () => {
   const navigate = useNavigate();

   return (
      <>
         <ProfileHeader />
         <Wrapper>
            <Nav sx={{ mb: 3, position: 'relative' }}>
               <Container maxWidth='xl'>
                  <Box sx={{ position: 'relative' }}>
                     <Typography
                        textAlign='center'
                        variant='h3'
                        sx={{
                           fontSize: ['1.8rem', '2rem', '2.5rem'],
                        }}
                     >
                        Book Products In Advance
                     </Typography>
                     <Box>
                        <KeyboardBackspaceIcon
                           sx={{
                              position: 'absolute',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              fontSize: '35px',
                              fontWeight: 600,
                              cursor: 'pointer',
                           }}
                           onClick={() => navigate(-1)}
                        />
                        <Typography variant='body2'>
                           Back To Portfolio
                        </Typography>
                     </Box>
                  </Box>
               </Container>
            </Nav>
            <Container maxWidth='xl' sx={{pb: 4}}>
               <Grid container spacing={4}>
                  <Grid item xs={12} md={3}>
                     <LeftProductFilter />
                  </Grid>
                  <Grid container spacing={2} item xs={12} md={9}>
                     <Grid item xs={12} md={4}>
                        <BookProduct />
                     </Grid>
                     <Grid item xs={12} md={4}>
                        <BookProduct />
                     </Grid>
                     <Grid item xs={12} md={4}>
                        <BookProduct />
                     </Grid>
                     <Grid item xs={12} md={4}>
                        <BookProduct />
                     </Grid>
                     <Grid item xs={12} md={4}>
                        <BookProduct />
                     </Grid>
                     <Grid item xs={12} md={4}>
                        <BookProduct />
                     </Grid>
                  </Grid>
               </Grid>
            </Container>
         </Wrapper>
         <ProfileFooter />
      </>
   );
};

export default ProductBooking;
