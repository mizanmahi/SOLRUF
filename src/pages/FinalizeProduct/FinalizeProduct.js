import { Button, Container, Grid, styled, Typography } from '@mui/material';
import React from 'react';
import HorizontalBookProduct from '../../components/HorizontalBookProduct/HorizontalBookProduct';
import BookProduct from '../../portfolio/BookProducts/BookProduct/BookProduct';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

const Wrapper = styled('div')(({ theme }) => ({
}));
const ButtonNext = styled(Button)(({ theme }) => ({
   background: theme.palette.primary.main,
   padding: '0.5rem 1rem',
}));
const FinalizeProduct = () => {
   return (
      <Wrapper>
         <Container maxWidth='xl'>
            <Grid container spacing={3} alignItems='center' sx={{ mt: 2 }}>
               <Grid item xs={12} md={5} lg={4}>
                  <Typography
                     variant='h4'
                     textAlign='center'
                     fontWeight={600}
                     sx={{ mb: 3 }}
                  >
                     Card View
                  </Typography>
                  <BookProduct noModal={true} style={{ margin: '0 auto' }} />
               </Grid>
               <Grid item xs={12} md={7} lg={8}>
                  <Typography
                     variant='h4'
                     textAlign='center'
                     fontWeight={600}
                     sx={{ mb: 3 }}
                  >
                     List View
                  </Typography>

                  <HorizontalBookProduct noModal={true} />
               </Grid>
            </Grid>
            <Box sx={{ my: 5 }}>
               <Button
                  endIcon={
                     <ArrowRightAltIcon
                        sx={{
                           background: '#ffd05b',
                           borderRadius: '50%',
                           width: 50,
                           height: 50,
                           p: 1,
                        }}
                     />
                  }
                  variant='outlined'
                  sx={{
                     borderRadius: '50px',
                     color: '#000',
                     p: 0,
                     '& .MuiButton-root': { padding: 0 },
                     pl: 2,
                     borderWidth: '2px',
                     backgroundImage:
                        'linear-gradient(to right, #ffd05b, #F3F3F3)',
                     fontWeight: 600,
                     mx: 'auto',
                     display: 'flex',
                  }}
               >
                  {' '}
                  See detailed product description{' '}
               </Button>

               <ButtonNext
                  component={Link}
                  to='/finalizeProduct'
                  sx={{
                     color: '#4D4D4D',
                     mx: 'auto',
                     display: 'flex',
                     minWidth: 250,
                     maxWidth: 250,
                     my: 5,
                     '&:hover': {
                        background: '#f7f7f7',
                     },
                  }}
               >
                  Finalize
               </ButtonNext>
            </Box>
         </Container>
      </Wrapper>
   );
};

export default FinalizeProduct;
