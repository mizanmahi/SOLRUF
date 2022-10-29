import { Button } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const StyledNextButton = styled(Button)(({ theme }) => ({
   background: theme.palette.primary.main,
   color: '#000000',
   '&:hover': {
      background: theme.palette.primary.main,
   },
   '& .MuiSvgIcon-root': {
      transform: 'rotate(180deg)',
   },
}));

const NextButton = ({ children, sx, ...rest }) => {
   return (
      <StyledNextButton
         {...rest}
         endIcon={<KeyboardBackspaceIcon />}
         end
         sx={{ ...sx }}
      >
         {children}
      </StyledNextButton>
   );
};

export default NextButton;
