import { Box, styled } from '@mui/material';

export const Form = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   width: '100%',
   maxWidth: '450px',
   margin: '0 auto',
   padding: '40px 25px',
   position: 'relative',
   borderRadius: '5px',
   boxShadow: '0px 4px 24px  0 rgba(0, 69, 184, 0.15)',
}));
