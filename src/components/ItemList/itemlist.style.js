import { styled, Box, Typography } from '@mui/material';

export const QuantityBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'stretch',
   margin: '1rem 0',
   border: `2px solid ${theme.palette.primary.main}`,
   width: '150px',
   borderRadius: '5px',
   '& input': {
      maxWidth: '60px',
      height: '32px',
      textAlign: 'center',
      border: 0,
      outline: 0,
   },
   '& svg': {
      background: theme.palette.primary.main,
      cursor: 'pointer',
   },
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
   color: theme.palette.primary.error,
   fontSize: '12px',
   position: 'absolute',
   bottom: '-0.4rem',
   width: '150%',
}));