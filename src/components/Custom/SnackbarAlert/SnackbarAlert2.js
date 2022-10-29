import React, { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import {
   setNetworkSnackbar2Open,
   setSnackbarInitiated,
} from '../../../redux/slices/utils/utils.slice';
import NetworkWifiSharpIcon from '@mui/icons-material/NetworkWifiSharp';

// custom alert for snackbar
const Alert = forwardRef(function Alert(props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const SnackbarAlert2 = () => {
   const dispatch = useDispatch();

   const { networkSnackbarOpen2, snackbarInitiated } = useSelector(
      (state) => state.utils
   );

   const handleClose = (e, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      dispatch(setNetworkSnackbar2Open(false));
      dispatch(setSnackbarInitiated(false));
   };

   return (
      <div>
         <Snackbar
            open={networkSnackbarOpen2 && snackbarInitiated}
            autoHideDuration={4000}
            onClose={handleClose}
         >
            <Alert
               onClose={handleClose}
               severity='success'
               sx={{ width: '100%' }}
               icon={<NetworkWifiSharpIcon fontSize='inherit' />}
            >
               Your Internet Connection was restored!
            </Alert>
         </Snackbar>
      </div>
   );
};

export default SnackbarAlert2;
