import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled, Typography, useMediaQuery } from '@mui/material';
import YellowButton from '../YellowButton/YellowButton';

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction='up' ref={ref} {...props} />;
});

const DeleteBox = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: '-32px',
   left: '50%',
   transform: 'translateX(-50%)',
   backgroundColor: '#f3f3f3',
   borderRadius: '50%',
   width: '64px',
   height: '64px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));
const Buttons = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}));

const ConfirmDialog = ({ confirmDialog, setConfirmDialog }) => {
   const [open, setOpen] = React.useState(false);

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

   return (
      <div>
         <Dialog
            open={confirmDialog.isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby='alert-dialog-slide-description'
            PaperProps={{
               sx: {
                  overflowY: 'inherit',
                  p: 3,
                  background: '#f3f3f3',
                  width: '100%',
                  maxWidth: '500px',
                  borderRadius: '10px',
               },
            }}
         >
            <DeleteBox>
               <DeleteIcon sx={{ color: 'red', fontSize: '40px' }} />
            </DeleteBox>
            <Box sx={{ textAlign: 'center', my: 3 }}>
               <Typography variant='h4' fontWeight={600} gutterBottom>
                  {confirmDialog.title}
               </Typography>
               <Typography variant='subtitle'>
                  {confirmDialog.message}
               </Typography>
            </Box>
            <Buttons
               sx={{
                  flexDirection: matches ? 'column' : 'flex',
               }}
            >
               <YellowButton
                  style={{
                     backgroundColor: 'red',
                     marginRight: !matches ? '1rem' : 0,
                     color: '#fff',
                     width: '70%',
                     marginBottom: matches ? '.5rem' : 0,
                     padding: '0.6rem 1.2rem',
                  }}
                  onClick={confirmDialog.onConfirm}
               >
                  Delete
               </YellowButton>
               <YellowButton
                  variant='contained'
                  style={{
                     backgroundColor: '#f3f3f3',
                     border: '2px solid #ffd05b',
                     width: '70%',
                     padding: '0.5rem 1.1rem',
                  }}
                  onClick={() =>
                     setConfirmDialog({ ...confirmDialog, isOpen: false })
                  }
               >
                  Cancel
               </YellowButton>
            </Buttons>
         </Dialog>
      </div>
   );
};

export default ConfirmDialog;
