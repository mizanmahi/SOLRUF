import { Box, styled } from '@mui/material';

export const Wrapper = styled(Box)(({ theme }) => ({
   background: '#FFFFFF',
   boxShadow: '0px 4px 24px rgba(0, 69, 184, 0.15)',
   borderRadius: '12px',
   padding: '1rem',
   position: 'relative',
}));

export const StepperBox = styled('div')(({ theme }) => ({
   background: theme.palette.primary.light,
   padding: theme.spacing(3),
}));

export const TotalPriceContainer = styled('div')(({ theme }) => ({
   background: theme.palette.primary.main,
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   borderRadius: '8px',
   padding: '1rem 3rem',
   boxShadow: '0px 4px 24px 0  rgba(0, 69, 184, 0.15)',
  
}));

export const Ul = styled('ul')(({ theme }) => ({
   listStyle: 'none',
   padding: 0,
   margin: '1rem 0',
   '& li': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      padding: '.8rem .5rem',
      borderRadius: '8px',
      '&:nth-of-type(odd)': {
         background: '#f3f3f3',
      },
   },
}));

export const OtpInputBox = styled('div')(({ theme }) => ({
   width: '100%',
   display: 'flex',
   alignItems: 'stretch',
   border: `2px solid ${theme.palette.primary.main}`,
   borderRadius: '8px',
   overflow: 'hidden',
   margin: '2rem auto',
   '& input': {
      width: '75%',
      padding: '.3rem .6rem',
      border: 'none',
      outline: 'none',
      fontSize: '1.1rem',
      fontWeight: 600,
      '&::placeholder': {
         color: 'gray',
         fontWeight: 400,
      },
   },
   '& span': {
      width: '15%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
   },
   '& button': {
      width: '25%',
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontWeight: 'bold',
      fontFamily: 'inherit',
      border: 0,
      outline: 0,
   },
}));
