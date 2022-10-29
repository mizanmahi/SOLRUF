import { Button } from '@mui/material';
import React from 'react';
// import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';

import { styled } from '@mui/system';

const StyledDownloadButton = styled(Button)(({ theme }) => ({
   background: '#000',
   padding: '.3rem 1rem',
   color: '#fff',
   '&:hover': {
      background: '#000',
   },
}));

const DownloadButton = ({ children, closeIcon, sx }) => {
   if (closeIcon) {
      return (
         <StyledDownloadButton endIcon={<CloseIcon />} sx={{ ...sx }}>
            {children}
         </StyledDownloadButton>
      );
   }
   return (
      <StyledDownloadButton sx={{ ...sx }}>{children}</StyledDownloadButton>
   );
};

export default DownloadButton;
