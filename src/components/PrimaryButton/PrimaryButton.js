import React from 'react';
import { styled } from '@mui/styles';

const Button = styled('button')({
   background: '#FFD05B',
   color: '#000',
   fontWeight: 'bold',
   borderRadius: '5px',
   padding: '10px 20px',
   borderColor: '#4D4D4D',
   borderWidth: '4px',
   outline: 'none',
   cursor: 'pointer',
   '&:hover': {},
   '&:active': {
      outline: 'none',
      borderColor: '#4D4D4D',
      borderWidth: '4px',
   },
   '&:focus': {
      outline: 'none',
      borderColor: '#4D4D4D',
      borderWidth: '4px',
   },
});

const PrimaryButton = ({ children }) => {
   return (
      <>
         <Button variant='contained'>{children}</Button>
      </>
   );
};

export default PrimaryButton;
