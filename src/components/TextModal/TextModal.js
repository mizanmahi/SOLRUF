import { Modal, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   bgcolor: '#fff',
   boxShadow: 24,
   borderRadius: '5px',
   width: '95%',
   minWidth: '300px',
};

const Nav = styled(Box)(({ theme }) => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   backgroundColor: theme.palette.primary.main,
   padding: theme.spacing(1),
   borderRadius: '5px 5px 0 0',
}));

const Content = styled(Box)(({ theme }) => ({
   width: '100%',
   padding: theme.spacing(1),
   maxHeight: '400px',
   overflowY: 'auto',
}));

const TextModal = ({ open, handleClose, text, title }) => {
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
         <Box sx={{ ...style }}>
            <Nav>
               <Typography variant='h6' style={{ fontWeight: 'bold' }}>
                  {title}
               </Typography>
               <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
            </Nav>
            <Content>{text}</Content>
         </Box>
      </Modal>
   );
};

export default TextModal;
