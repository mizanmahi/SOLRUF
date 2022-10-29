import { Box, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
// import errorSvg from '../assets/error-page.svg';
import PrimaryButton from '../components/Custom/PrimaryButton/PrimaryButton';
import MainHeader from '../components/MainHeader/MainHeader';
import notFoundSvg from '../assets/404.svg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ErrorPage = () => {
   const theme = useTheme();

   return (
      <>
         <MainHeader />
         <Box
            p={4}
            height='100%'
            display='flex'
            alignItems='center'
            flexDirection='column'
            justifyContent='center'
            mt={4}
         >
            <Box
               sx={{
                  width: '100%',
                  maxWidth: '600px',
               }}
            >
               <img src={notFoundSvg} width='100%' alt='Error 404' />
            </Box>
            <Typography
               sx={{
                  color: theme.palette.primary.dark,
                  fontWeight: 300,
                  fontSize: '3rem',
               }}
               color='primary.main'
               mt={3}
            >
               Take a breath.
            </Typography>
            <Typography color='text.disabled' fontWeight='500'>
               That page does not exist but you can <br /> explore our{' '}
               <Link to='/blogs'>Blog</Link> .
            </Typography>
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  columnGap: 2,
                  mt: 3,
               }}
            >
               <PrimaryButton
                  component={Link}
                  to='/'
                  sx={{
                     fontWeight: 600,
                     px: 2,
                     '&:hover': {
                        color: theme.palette.primary.dark,
                     },
                  }}
               >
                  Go Home
               </PrimaryButton>
               <PrimaryButton
                  component={Link}
                  variant='secondary'
                  onClick={() => {
                     window.history.back();
                  }}
                  sx={{
                     fontWeight: 600,
                     px: 2,
                     '&:hover': {
                        color: theme.palette.primary.dark,
                     },
                  }}
                  IconStart={ArrowBackIcon}
               >
                  Back
               </PrimaryButton>
            </Box>
         </Box>
      </>
   );
};

export default ErrorPage;
