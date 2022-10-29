import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const FormTitle = styled(Typography)(({ theme }) => ({
   fontSize: '1.5rem',
   fontWeight: 'bold',
   marginBottom: '1rem',
}));
export const Nav = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: '1rem',
   '& p': {
      textTransform: 'uppercase ',
      fontSize: '11px',
      fontWeight: 'bold',
   },
   '& svg': {
      cursor: 'pointer',
      color: 'gray',
   },
}));

export const UserNameBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   marginBottom: '1rem',
}));

export const RoleBox = styled(Box)(({ theme }) => ({
   margin: '1rem 0',
   display: 'flex',
   justifyContent: 'space-between',
   flexDirection: 'column',
   alignItems: 'center',
}));

export const UserTypeBox = styled(Box)(({ theme }) => ({
   display: 'block',
   padding: '1rem 0',
}));

export const UserBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   background: '#D0D7D9',
   padding: '.5rem',
   borderRadius: '6px',
   border: '2px solid #000000',

   cursor: 'pointer',
   flex: 1,
   '&:hover': {
      opacity: '0.9',
   },
}));
export const VendorBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   background: '#D0D7D9',
   padding: '.5rem',
   borderRadius: '6px',
   border: '2px solid #000000',
   cursor: 'pointer',
   marginBottom: '1rem',
   flex: 1,
   '&:hover': {
      opacity: '0.9',
   },
}));

export const Text = styled(Box)(({ theme }) => ({
   textAlign: 'right',
   flex: '1',
}));

export const Circle = styled(Box)(({ theme }) => ({
   width: '1.5rem',
   height: '1.5rem',
   borderRadius: '50%',
   border: '2px solid #000000',
   marginRight: '1rem',
}));
