import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled(Box)(({ theme }) => ({
   boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
   zIndex: 1000,
   position: 'sticky',
   top: '2rem',
   '@media (max-width: 600px)': {
      top: '2.5rem',
   },
}));

export const Header = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: '0.7rem 0',
   // boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
}));

export const Logo = styled(Box)(({ theme }) => ({
   marginRight: '1rem',
   marginLeft: '0',
   '& img': {
      maxWidth: '170px',
      width: '170px',
      height: '46px',

      '@media (max-width: 1000px)': {
         maxWidth: '100px',
      },
      '@media (max-width: 900px)': {
         maxWidth: '150px',
      },
   },
}));

export const Nav = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
}));

export const CustomMenuItem = styled(Typography)(({ theme }) => ({
   margin: '0 1rem',
   fontSize: '14px',
   '@media (max-width: 1200px)': {
      fontSize: '0.9rem',
      margin: '0 0.4rem',
   },
   textDecoration: 'none',
   transition: 'all 0.2s ease',
   borderBottom: '2px solid transparent',
   cursor: 'pointer',
   fontWeight: 600,
   '&:hover': {
      color: '#000000',
      borderBottom: '2px solid #ffd05b',
      textDecoration: 'none',
      '& .nestedMenu': {
         display: 'block',
      },
   },
}));

export const SearchBox = styled(Box)(({ theme }) => ({
   backgroundColor: '#ffffff',
   border: '3px solid #ffd05b',
   borderRadius: '6px',
   display: 'flex',
   alignItems: 'stretch',
   // overflow: 'hidden',
   flex: '0 0 35%',
   position: 'relative',
   boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.10)',
   '&:hover': {
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.10)',
   },
   '& input': {
      border: '0',
      borderRadius: '6px',
      outline: 'none',
      fontSize: '1.2rem',
      color: '#000',
      fontWeight: 'bold',
      width: '80%',
      padding: '3px 0.8rem',
      fontFamily: 'inherit',
      '@media (max-width: 1200px)': {
         fontSize: '0.9rem',
      },

      '&::placeholder': {
         fontFamily: 'inherit',
         fontWeight: '400',
         fontSize: '1.2rem',
         '@media (max-width: 1200px)': {
            fontSize: '0.9rem',
         },
      },
   },
}));

export const SearchIconBox = styled(Box)(({ theme }) => ({
   background: '#ffd05b',
   width: '20%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   cursor: 'pointer',
   '&:hover': {},
   '& svg': {
      fontSize: '1.5rem',
      color: '#4d4d4d',
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

export const DashboardMenu = styled(Box)(({ theme }) => ({
   width: '90%',
   marginLeft: 'auto',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   marginTop: theme.spacing(2),
}));

export const DashboardMenuLink = styled(NavLink)(({ theme, nested }) => ({
   width: '100%',
   position: nested ? 'relative' : 'static',
   display: 'flex',
   flexDirection: 'row',
   alignItems: 'center',
   padding: theme.spacing(1.5),
   marginBottom: theme.spacing(3),
   borderRadius: '50px 0 0 50px',
   color: 'black',
   textDecoration: 'none',
   fontWeight: 'bold',
   '&:hover': {
      background: 'gray',
      color: '#000',
      textDecoration: 'none',
   },
   '& svg': {
      marginRight: theme.spacing(1),
   },
}));

export const DashboardMenuLink2 = styled(Typography)(({ theme }) => ({
   width: '100%',
   display: 'flex',
   flexDirection: 'row',
   alignItems: 'center',
   padding: theme.spacing(1.5),
   marginBottom: theme.spacing(3),
   borderRadius: '50px 0 0 50px',
   color: 'black',
   textDecoration: 'none',
   fontWeight: 'bold',
   '&:hover': {
      background: 'gray',
      color: '#000',
      textDecoration: 'none',
   },
   '& svg': {
      marginRight: theme.spacing(1),
   },
}));

export const activeStyle = {
   background: '#ffd05b',
};

export const activeHeaderMenuStyle = {
   color: '#000000',
   borderBottom: '2px solid #ffd05b',
   textDecoration: 'none',
};

export const LogoBoxInDrawer = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   background: '#2D2B2B',
   padding: '2rem .5rem',
}));

export const CartBox = styled('header')(({ theme }) => ({
   background: theme.palette.primary.main,
   padding: '.5rem 1rem',
   '@media (max-width: 1200px)': {
      padding: '.5rem 0.5rem',
   },
   margin: '0',
   display: 'flex',
   alignItems: 'center',
   boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
   borderRadius: '5px',
   '@media (max-width: 600px)': {
      margin: '0 0',
   },
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

export const DrawerFooter = styled(Box)(({ theme }) => ({
   position: 'absolute',
   bottom: 0,
   width: '100%',
}));

export const FooterMenus = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-around',
   alignItems: 'center',
}));

export const FooterMenu = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   textDecoration: 'none',
   cursor: 'pointer',
   '&:hover': {
      textDecoration: 'none',
   },
   '& svg': {
      color: '#4D4D4D',
   },
}));

export const ResultItem = styled(Box)(({ theme }) => ({
   display: 'flex',
   cursor: 'pointer',
   alignItems: 'center',
   padding: '4px',
   borderRadius: '5px',
   borderBottom: '1px solid #f7f7f7',
   '&:hover': {
      background: '#f7f7f7',
   },
   '& .imageBox': {
      borderRadius: '5px',
      height: '50px',
      width: '50px',
      marginRight: '1.5rem',
      '& img': {
         height: '100%',
         width: '100%',
         objectFit: 'cover',
      },
   },
}));

export const MenuContainer = styled(Box)(({ theme }) => ({
   display: 'none',
   position: 'absolute',
   height: 'auto',
   minWidth: '170px',
   width: '320px',
   // maxWidth: '250px',
   top: 'calc(100%)',

   left: 0,
   zIndex: 150000,
   '& ul': {
      marginBottom: '0',
      width: '100%',
      background: '#ffffff',
      padding: '0.5rem 0',
      borderRadius: '4px',
      filter:
         'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
   },
}));

export const MenuItemSolruf = styled('li')(({ theme, nested }) => ({
   listStyle: 'none',
   padding: '0 0.5rem',
   width: '100%',
   '& a': {
      borderBottom: '1px solid #f7f7f7',
      width: '100%',
      wordBreak: 'break-word',
      color: 'rgb(75 85 99);',
      padding: '0.3rem 0.5rem',
      borderRadius: '4px',
      display: nested ? 'flex' : 'block',
      alignItems: nested ? 'center' : 'flex-start',
      justifyContent: nested ? 'space-between' : 'flex-start',
   },
   '&:hover > a': {
      color: 'rgb(31 41 55)',
      background: 'rgb(229 231 235)',
      '& > ul': {
         display: nested ? 'block' : 'none',
         '& li': {
            '&:hover > a': {
               color: 'rgb(31 41 55)',
               background: 'rgb(229 231 235)',
               '& ul': {
                  display: 'block',
               },
            },
         },
      },
   },
   position: nested ? 'relative' : 'static',
}));

export const NestedMenuContainer = styled('ul')(({ theme, nested }) => ({
   position: 'absolute',
   maxHeight: '400px',
   height: 'auto',
   minWidth: '170px',
   maxWidth: '300px',
   top: '0',
   left: 'calc(100%)',
   background: '#ffffff',
   borderRadius: '4px',
   filter:
      'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
   padding: '0.5rem',
   zIndex: 150000,
   display: 'none',
}));
