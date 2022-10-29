import { Box, styled } from '@mui/material';

export const Wrapper = styled(Box)(({ theme }) => ({
   position: 'relative',
   width: '100% !important',
   // backgroundColor: 'blue',
}));

export const SearchBox = styled(Box)(({ theme }) => ({
   border: '2px solid #ffd05b',
   borderRadius: '6px',
   display: 'flex',
   alignItems: 'stretch',
   overflow: 'hidden',
   width: '100%',
   '&:hover': {
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.10)',
   },
   '& input': {
      border: 'none',
      outline: 'none',
      fontSize: '1.2rem',
      color: '#000',
      fontWeight: 'bold',
      width: '100%',
      // flex: 1,
      padding: '5px 1rem',
      '@media (max-width: 400px)': {
         padding: '5px 0.2rem',
         // flex: '2',
      },
      
      fontFamily: 'inherit',

      '&::placeholder': {
         fontFamily: 'inherit',
         fontWeight: '400',
         fontSize: '1.2rem',
      },
   },
}));

export const SearchIconBox = styled(Box)(({ theme }) => ({
   background: 'white',
   display: 'flex',
   justifyContent: 'center',
   paddingRight: '0.8rem',
   minWidth: '45px',
   alignItems: 'center',
   cursor: 'pointer',
   '@media (max-width: 400px)': {
      paddingRight: '0',
      // flex: '1',
   },
   '&:hover': {
      borderRadius: '5px',
      transition: 'all 0.5s',
      '& svg': {
         color: '#ffd05b',
      },
   },
   '& svg': {
      fontSize: '2rem',
      color: '#4d4d4d',
      marginLeft: '0.4rem',
      '@media (max-width: 400px)': {
         fontSize: '1.5rem',
         marginLeft: '0',
      }
   },
}));
