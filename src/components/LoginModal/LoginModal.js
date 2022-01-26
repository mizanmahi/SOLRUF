import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeLoginModal } from '../../redux/slices/loginModalSlice';

const style = {
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '100%',
   maxWidth: '500px',
   bgcolor: 'background.paper',
   boxShadow: 24,
   p: 4,
   position: 'relative',
   borderRadius: '5px',
};

const CloseIconBox = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: 5,
   right: '8px',
   background: '#efefef',
   borderRadius: '8px',
   padding: '2px',
   cursor: 'pointer',
   '&:hover': {
      background: '#ddd',
   },
}));

const LoginModal = ({ children }) => {
   const { isOpen } = useSelector((state) => state.loginModal);
   const dispatch = useDispatch();

   return (
      <div>
         <Modal
            open={isOpen}
            onClose={() => dispatch(closeLoginModal())}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
         >
            <Box sx={style}>
               <CloseIconBox onClick={() => dispatch(closeLoginModal())}>
                  <CloseIcon />
               </CloseIconBox>
               {children}
            </Box>
         </Modal>
      </div>
   );
};

export default LoginModal;