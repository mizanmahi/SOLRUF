import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material';

const style = {
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '100%',
   maxWidth: '1000px',
   bgcolor: 'background.paper',
   boxShadow: 24,
   p: [2, 5],
   position: 'relative',
   borderRadius: '5px',
   borderTop: '5px solid #ffd05b',
};

const CloseIconBox = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: 5,
   right: '8px',
   background: '#efefef',
   borderRadius: '50%',
   height: '25px',
   width: '25px',
   padding: '5px',
   cursor: 'pointer',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   '&:hover': {
      background: '#ddd',
   },
}));

const SolrufModal = ({ children, open, onClose, sx }) => {
   return (
      <div>
         <Modal
            open={open}
            onClose={onClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            sx={{
               mx: 1
            }}
         >
            <Box sx={{ ...style, ...sx }}>
               <CloseIconBox onClick={onClose}>
                  <CloseIcon sx={{ fontSize: '1.3rem' }} />
               </CloseIconBox>
               {children}
            </Box>
         </Modal>
      </div>
   );
};

export default SolrufModal;
