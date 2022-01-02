import { Box, Button, Container } from '@mui/material';
import React, { useEffect } from 'react';
import BookProducts from '../../portfolio/BookProducts/BookProducts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const BookProductInAdvancePage = () => {
   const navigate = useNavigate();
   
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   return (
      <Box>
         <Container>
            <Box>
               <Button
                  startIcon={<ArrowBackIcon />}
                  sx={{ color: 'secondary.main' }}
                  onClick={() => navigate('/about')}
               >
                  Back To Portfolio
               </Button>
            </Box>
            <BookProducts scrollIntoView={false} />
         </Container>
      </Box>
   );
};

export default BookProductInAdvancePage;
