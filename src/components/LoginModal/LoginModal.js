import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeLoginModal, setLoginRedirect } from '../../redux/slices/loginModalSlice';
import {
   setLoginMode,
   setRegisterMode,
   setVerificationMode,
   setVerificationMode2,
} from '../../redux/slices/loginStepSlice';

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
   height:'25px',
   width:'25px',
   display:'flex',
   justifyContent:'center',
   alignItems:'center',
   '&:hover': {
      background: '#ddd',
      cursor: 'pointer',
   },
}));

const LoginModal = ({ children }) => {
   const { isOpen } = useSelector((state) => state.loginModal);
   const dispatch = useDispatch();

   const closeHandler = () => {
      dispatch(closeLoginModal());
      dispatch(setLoginMode(true));
      dispatch(setRegisterMode(false));
      dispatch(setVerificationMode(false));
      dispatch(setVerificationMode2(false));
      dispatch(setLoginRedirect());
   };

   return (
      <div>
         <Modal
            open={isOpen}
            onClose={() => dispatch(closeLoginModal())}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
         >
            <Box sx={style}>
               <CloseIconBox onClick={closeHandler}>
                  <CloseIcon sx={{fontSize: '1.3rem'}} />
               </CloseIconBox>
               {children}
            </Box>
         </Modal>
      </div>
   );
};

export default LoginModal;
