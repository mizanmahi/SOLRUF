import { Button } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
// import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const StyledSubmitToButton = styled(Button)(({ theme }) => ({
   background: theme.palette.primary.main,
   color: '#4D4D4D',
   minWidth: '300px',
   '&:hover': {
      background: theme.palette.primary.main,
   },
   '& .MuiSvgIcon-root': {
      color: '#000000',
      fontSize: '30px',
      fontWeight: 'bold',
   },
}));

const SubmitButton = ({ children, onClick }) => {
   return (
      <StyledSubmitToButton
         onClick={onClick}
         //  startIcon={<KeyboardBackspaceIcon />}
      >
         {children}
      </StyledSubmitToButton>
   );
};

export default SubmitButton;
