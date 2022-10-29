import { Backdrop } from '@mui/material';
import React from 'react';
import Loader from '../../Loader/Loader';

const BackdropLoader = ({ open, handleClose, ...rest }) => {
   return (
      <Backdrop
         sx={{ color: '#FFD05B', zIndex: (theme) => theme.zIndex.drawer + 1 }}
         open={open || true}
         onClick={handleClose}
         {...rest}
      >
         <Loader />
      </Backdrop>
   );
};

export default BackdropLoader;
