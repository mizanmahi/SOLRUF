import { Box, styled, Typography } from '@mui/material';

export const Wrapper = styled(Box)(({ theme }) => ({
   boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
   zIndex: 1000,
   position: 'sticky',
   top: 0,
   background: '#ffffff',
}));

export const Header = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: '1rem 0',
   zIndex: 100,
}));

export const CartBox = styled('header')(({ theme }) => ({
   background: theme.palette.primary.main,
   padding: '.5rem 1rem',
   display: 'flex',
   alignItems: 'center',
   boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
   borderRadius: '5px',
   '@media (max-width: 400px)': {
      padding: '.3rem .5rem',
      display: 'none',
   },
   '& p': {
      color: '#4D4D4D',
      fontWeight: 'bold',
   },
   '& svg': {
      color: '#4D4D4D',
   },
}));

export const LogoBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   '& svg': {
      fontSize: '2rem',
      marginRight: '0.5rem',
   },
}));

export const Logo = styled(Box)(({ theme }) => ({
   marginLeft: '1rem',
   marginRight: '4rem',
   '& img': {
      maxWidth: '170px',
      '@media (max-width: 400px)': {
         maxWidth: '150px',
      },
   },
}));

export const MenuIconBox = styled(Box)(({ theme }) => ({
   background: '#ffd05b',
   height: '3rem',
   width: '3rem',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
   borderRadius: '50%',
   cursor: 'pointer',
   '& svg': {
      marginRight: 0,
   },
   '@media only screen and (max-width: 400px)': {
      width: '2.8rem',
      height: '2.8rem',
   },
}));
export const activeHeaderMenuStyle = {
   color: '#000000',
   borderBottom: '2px solid #ffd05b',
   textDecoration: 'none',
};

export const CustomMenuItem = styled(Typography)(({ theme }) => ({
   margin: '0 1rem',
   fontSize: '1.1rem',
   textDecoration: 'none',
   transition: 'all 0.2s ease',
   borderBottom: '2px solid transparent',
   cursor: 'pointer',
   fontWeight: 500,
   '&:hover': {
      color: '#000000',
      borderBottom: '2px solid #ffd05b',
      textDecoration: 'none',
   },
}));
