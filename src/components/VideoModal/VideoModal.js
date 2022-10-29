import { Modal } from '@mui/material';
import { Box, styled } from '@mui/system';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ReactPlayer from 'react-player';

const style = {
   position: 'relative',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   bgcolor: '#fff',
   boxShadow: 24,
   borderRadius: 2,
};

const VideoBox = styled(Box)(({ theme }) => ({
   //    width: '100%',
}));

const VideoModal = ({ open, handleClose, videoLink }) => {


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
         <Box
            sx={{
               ...style,
               width: ['95%', 'fit-content'],
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
            }}
         >
            <CloseIcon
               style={{
                  position: 'absolute',
                  right: '.5rem',
                  top: '.5rem',
                  cursor: 'pointer',
                  //   backgroundColor: '#fff',
                  color: '#fff',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  borderRadius: '50%',
               }}
               onClick={handleClose}
            />
            <VideoBox>
               <ReactPlayer url={videoLink} controls />
            </VideoBox>
         </Box>
      </Modal>
   );
};

export default VideoModal;
