import { Button, Container, Dialog, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';

const Dashboard = () => {
   const [confirmDialog, setConfirmDialog] = useState({
      isOpen: false,
      message: '',
      title: '',
   });

   const deleteData = () => {
      setConfirmDialog({ isOpen: false, ...confirmDialog });
      console.log('Item Deleted Successfully');
   };

   return (
      <Box sx={{minHeight: '55vh'}}>
         <Container maxWidth='xl'>
            <Typography variant='h4' textAlign='center' sx={{mt: 10}}>
               Dashboard is under construction 🏗
            </Typography>

            <Button
               variant='contained'
               onClick={() =>
                  setConfirmDialog({
                     isOpen: true,
                     message: 'Data will be deleted permanently',
                     title: 'Delete Data',
                     onConfirm: () => {
                        deleteData();
                     },
                  })
               }
               sx={{ my: 5, mx: 'auto' }}
            >
               Delete Data
            </Button>

            <ConfirmDialog
               confirmDialog={confirmDialog}
               setConfirmDialog={setConfirmDialog}
            />
         </Container>
      </Box>
   );
};

export default Dashboard;
