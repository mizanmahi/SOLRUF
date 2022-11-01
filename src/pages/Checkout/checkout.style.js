import { Box, styled } from '@mui/system';

export const ItemContainer = styled('div')(({ theme }) => ({
   width: '100%',
   overflowY: 'auto',
   padding: theme.spacing(1),
   maxHeight: '800px',
   marginBottom: '1rem',
}));

export const TotalPriceContainer = styled('div')(({ theme }) => ({
   background: theme.palette.primary.main,
   // display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-around',
   borderRadius: '8px',
   padding: theme.spacing(2),
   boxShadow: '0px 4px 24px 0  rgba(0, 69, 184, 0.15)',
   "@media (max-width: 680px)": {
      position:'fixed',
      top:'40px',
      width:'99%',
      margin:0,
      zIndex:100,
      borderRadius: '0px 0px 12px 12px',
   },
}));

export const StepperBox = styled('div')(({ theme }) => ({
   background: theme.palette.primary.light,
   padding: theme.spacing(3),
}));

export const Form = styled(Box)(({ theme }) => ({
   background: '#ffffff',
   borderRadius: theme.spacing(1),
}));

export const DeliveredToBox = styled('div')(({ theme }) => ({
   background: '#fff',
   borderRadius: '8px',
   padding: '0rem 3rem 1rem 3rem',
   marginTop: '0rem',
   marginBottom: '1rem',
}));

export const OtpBox = styled('div')(({ theme }) => ({
   background: '#fff',
   padding: theme.spacing(3),
   marginTop: '0rem',
   marginBottom: '1rem',
}));

export const BankDetailBox = styled('div')(({ theme }) => ({
   background: '#fff',
   borderRadius: '8px',
   padding: theme.spacing(3),
   marginTop: '1rem',
   marginBottom: '1rem',
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

export const StepNavigatorBox = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
}));
