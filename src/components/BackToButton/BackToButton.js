import { Button } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const StyledBackToButton = styled(Button)(({ theme }) => ({
   background: 'transparent',
   color: '#4D4D4D',
   '&:hover': {
      background: 'transparent',
   },
   '& .MuiSvgIcon-root': {
      color: '#000000',
      fontSize: '30px',
      fontWeight: 'bold',
   },
}));

const BackToButton = ({ children, onClick }) => {
   return (
      <StyledBackToButton
         onClick={onClick}
         startIcon={<KeyboardBackspaceIcon />}
      >
         {children}
      </StyledBackToButton>
   );
};

export default BackToButton;
