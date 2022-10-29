import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material';

const style = {
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 'fit-content',
   maxWidth: '600px',
   bgcolor: 'background.paper',
   boxShadow: 24,
   p: 5,
   position: 'relative',
   borderRadius: '5px',
   borderTop: '5px solid #ffd05b',
};

const CloseIconBox = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: 5,
   right: '8px',
   background: '#efefef',
   borderRadius: '8px',
   padding: '1px',
   cursor: 'pointer',
   '&:hover': {
      background: '#ddd',
   },
}));

const MobileVerifyModal = ({ children,setmobileVerifyOpen,mobileVerifyOpen }) => {

   return (
      <div>
         <Modal
            open={mobileVerifyOpen}
            onClose={() => setmobileVerifyOpen(false)}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
         >
            <Box sx={style}>
               <CloseIconBox onClick={() => setmobileVerifyOpen(false)}>
                  <CloseIcon sx={{fontSize: '1.3rem'}} />
               </CloseIconBox>
               {children}
            </Box>
         </Modal>
      </div>
   );
};

export default MobileVerifyModal;
