import { Box, styled } from '@mui/system';

export const ProductCardWrapper = styled(Box)(({ theme }) => ({
   background: '#ffffff',
   padding: theme.spacing(3),
   borderRadius: theme.spacing(1.5),
   boxShadow: '0px 4px 24px 0  rgba(0, 69, 184, 0.15)',

   cursor: 'pointer',
   position: 'relative',
   maxWidth: '350px',
   width: '100%',
}));
