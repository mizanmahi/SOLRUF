import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/system';
import { styled, Typography, useMediaQuery } from '@mui/material';
import YellowButton from '../YellowButton/YellowButton';

import DeleteIcon from '@mui/icons-material/Delete';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import warningSvg from './warning.svg';



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

const ConfirmDialog = ({ confirmDialog, setConfirmDialog, variant }) => {
   const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

   let icon;
   let buttonText;
   let variantColor;

   switch (variant) {
      case 'delete':
         buttonText = 'Delete';
         variantColor = 'red';
         icon = <DeleteIcon sx={{ color: 'red', fontSize: '40px' }} />;
         break;
      case 'warning':
         icon = <img src={warningSvg} alt='' style={{ width: '50px' }} />;
         buttonText = 'Continue';
         variantColor = '#3fb500';
         break;
      case 'businessDetailNotPresent':
         icon = <img src={warningSvg} alt='' style={{ width: '50px' }} />;
         buttonText = 'Create Profile';
         variantColor = '#3fb500';
         break;
      default:
         icon = (
            <WarningRoundedIcon sx={{ color: '#ffd05b', fontSize: '40px' }} />
         );
         buttonText = 'Continue';
         variantColor = '#ffd05b';
   }

   return (
      <div>
         <Dialog
            open={confirmDialog.isOpen}
            // TransitionComponent={Transition}
            keepMounted
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
            sx={{zIndex:1500}}
         >
            <DeleteBox>{icon}</DeleteBox>
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
                  flexDirection: matches ? 'column-reverse' : 'flex',
               }}
            >
               <YellowButton
                  variant='contained'
                  style={{
                     backgroundColor: '#f3f3f3',
                     border: '2px solid #ffd05b',
                     width: '70%',
                     padding: '0.5rem 1.1rem',
                     marginTop: matches ? '.5rem' : 0,
                  }}
                  onClick={() =>
                     setConfirmDialog({ ...confirmDialog, isOpen: false })
                  }
               >
                  Cancel
               </YellowButton>
               <YellowButton
                  style={{
                     backgroundColor: variantColor,

                     marginLeft: !matches ? '1rem' : 0,
                     color: '#fff',
                     width: '70%',
                     padding: '0.6rem 1.2rem',
                  }}
                  onClick={confirmDialog.onConfirm}
               >
                  {buttonText}
               </YellowButton>
            </Buttons>
         </Dialog>
      </div>
   );
};

export default ConfirmDialog;
