import { Close } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import Drawer from 'react-drag-drawer';
import { Flex } from '../../../pages/EnquiryPage/enquiryPage.style';

export const Bar = styled(Box)(({ theme }) => ({
   background: '#666F73',
   height: '8px',
   borderRadius: '5px',
   width: '25%',
   top: '0.5rem',
   position: 'absolute',
   cursor: 'pointer',
}));

function DraggableBottomDialog({
   open,
   handleClose,
   children,
   bar,
   text,
   paddingValue,
   specialCase = false,
   page = 0,
   border = false,
}) {
   const DialogHeader = styled(Box)(({ theme }) => ({
      background: 'white',
      minHeight: `${specialCase ? '0px' : '40px'}`,
      height: 0,
      position: 'absolute',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      right: '0px',
      top: '0px',
      '& svg': {
         position: 'absolute',
         // top: "10%",
         // transform: "translateY(-50%) rotate(180deg)",
         right: '0',
         fontSize: '30px',
         cursor: 'pointer',
         color: 'rgba(0,0,0,0.8)',
      },
   }));

   return (
      <Drawer
         onRequestClose={handleClose}
         open={open}
         modalElementClass='drawModal'
         containerElementClass='drawContainer'
         anchor='bottom'
      
      >
         <Box
            sx={{
               background: '#fff',
               borderRadius: '22px 22px 0 0',
               padding: `${paddingValue || '20px 0px 4px 0px'}`,
               width: '100%',
               position: 'relative',
               zIndex: 4000,
               overflow: 'auto',
               maxHeight: '60vh',
               minHeight: '400px',
            }}
         >
            <Flex sx={{ justifyContent: 'center' }}>
               {(bar || page === 2) && <Bar></Bar>}
            </Flex>
            <DialogHeader>
               {specialCase ? (
                  <Close
                     sx={{ fill: '#666F73', top: '10px', right: '10px' }}
                     onClick={handleClose}
                  />
               ) : (
                  <Close sx={{ mt: 2, mr: 2 }} onClick={handleClose} />
               )}
               <Typography
                  sx={{ mt: 1, fontWeight: 'bold', fontSize: '1rem', px: 2 }}
                  variant='h4'
               >
                  {text}
               </Typography>
            </DialogHeader>
            {/* {border && (
               <Box
                  sx={{
                     width: '100%',
                     height: '1px',
                     border: '1px solid black',
                  }}
               ></Box>
            )} */}
            {children}
         </Box>
      </Drawer>
   );
}

export default DraggableBottomDialog;
