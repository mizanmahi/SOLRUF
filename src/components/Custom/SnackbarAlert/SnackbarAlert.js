import React, { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { setNetworkSnackbarOpen } from '../../../redux/slices/utils/utils.slice';
import { Button } from '@mui/material';
import SignalWifiConnectedNoInternet4SharpIcon from '@mui/icons-material/SignalWifiConnectedNoInternet4Sharp';

// custom alert for snackbar
const Alert = forwardRef(function Alert(props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const SnackbarAlert = () => {
   const dispatch = useDispatch();

   const { networkSnackbarOpen } = useSelector((state) => state.utils);

   const handleClose = (e, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      dispatch(setNetworkSnackbarOpen(false));
   };
   return (
      <div>
         <Snackbar
            open={networkSnackbarOpen}
            autoHideDuration={3000}
            onClose={handleClose}
         >
            <Alert
               onClose={handleClose}
               severity='info'
               sx={{ width: '100%' }}
               icon={
                  <SignalWifiConnectedNoInternet4SharpIcon fontSize='inherit' />
               }
               action={
                  <Button
                     color='inherit'
                     size='small'
                     onClick={() => window.location.reload(false)}
                  >
                     Refresh
                  </Button>
               }
            >
               You are currently offline!
            </Alert>
         </Snackbar>

         
      </div>
   );
};

export default SnackbarAlert;
