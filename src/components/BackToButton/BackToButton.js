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
      color: theme.palette.primary.dark,
      fontSize: '25px',
   },
}));

const BackToButton = ({ children, onClick, sx }) => {
   return (
      <StyledBackToButton
         sx={{ ...sx }}
         onClick={onClick}
         startIcon={<KeyboardBackspaceIcon />}
      >
         {children}
      </StyledBackToButton>
   );
};

export default BackToButton;
