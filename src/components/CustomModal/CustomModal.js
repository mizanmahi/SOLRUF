import { Grid, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   bgcolor: '#ffffff',
   boxShadow: 24,
   p: 2,
   borderRadius: 5,
};

const paraStyle = {
   maxHeight: '500px !important',
};

const CustomModal = ({ open, handleClose, modalText }) => {
   console.log(open);

   return (
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby='modal-modal-title'
         aria-describedby='modal-modal-description'
         sx={{
            '& .MuiBackdrop-root': {
               backdropFilter: 'blur(10px)',
            },
         }}
      >
         <Box sx={{ ...style, width: ['95%', '70%'], minHeight: '500px' }}>
            <CloseIcon
               style={{
                  position: 'absolute',
                  right: '3%',
                  top: '3%',
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                  borderRadius: '50%',
               }}
               onClick={handleClose}
            />
            <Grid container spacing={1} alignItems='center'>
               <Grid item xs={12} md={6}>
                  <Box>
                     <img
                        src='https://i.ibb.co/6Pnc8KZ/8590-1.png'
                        alt=''
                        style={{ maxWidth: '100%' }}
                     />
                  </Box>
               </Grid>
               <Grid item xs={12} md={6}>
                  <Box style={paraStyle}>
                     <Typography
                        variant='h4'
                        textAlign='center'
                        fontWeight='bold'
                     >
                        After Sale And Service Policy
                     </Typography>
                     <Typography
                        sx={{ mt: 2, maxHeight: '400px', overflowY: 'auto' }}
                     >
                      {modalText}
                     </Typography>
                  </Box>
               </Grid>
            </Grid>
         </Box>
      </Modal>
   );
};

export default CustomModal;
