import { Grid, Modal, Typography } from '@mui/material';
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
   p: 4,
   borderRadius: 5,
};

const paraStyle = {
   maxHeight: '500px !important',
};

const CustomModal = ({ open, handleClose }) => {
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
         <Box sx={{ ...style, width: ['95%', '70%'] }}>
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
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Animi molestiae eligendi iure hic? Molestiae esse
                        possimus repellat quisquam, reiciendis veniam commodi
                        ipsa iste dolorem inventore. Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Aspernatur cupiditate
                        ipsam cumque soluta iusto est sed explicabo! Eaque dicta
                        sapiente obcaecati laudantium saepe itaque veniam
                        consectetur, placeat illo asperiores maiores! Lorem
                        ipsum dolor sit amet consectetur. Lorem ipsum dolor sit
                        amet consectetur adipisicing elit. Consequuntur veniam <br /> <br />
                        sint consequatur necessitatibus minima. Et facere eum
                        dolores corrupti, mollitia sunt quidem sequi ex vel
                        obcaecati architecto delectus molestiae quos.
                        ipsum dolor sit amet consectetur. Lorem ipsum dolor sit
                        amet consectetur adipisicing elit. Consequuntur veniam
                        sint consequatur necessitatibus minima. Et facere eum
                        dolores corrupti, mollitia sunt quidem sequi ex vel
                        obcaecati architecto delectus molestiae quos.
                        obcaecati architecto delectus molestiae quos.
                        ipsum dolor sit amet consectetur. Lorem ipsum dolor sit<br /> <br />
                        amet consectetur adipisicing elit. Consequuntur veniam
                        sint consequatur necessitatibus minima. Et facere eum
                        dolores corrupti, mollitia sunt quidem sequi ex vel
                        obcaecati architecto delectus molestiae quos.
                        obcaecati architecto delectus molestiae quos.
                        obcaecati architecto delectus molestiae quos.
                        ipsum dolor sit amet consectetur. Lorem ipsum dolor sit
                        amet consectetur adipisicing elit. Consequuntur veniam
                        sint consequatur necessitatibus minima. Et facere eum
                        dolores corrupti, mollitia sunt quidem sequi ex vel
                        obcaecati architecto delectus molestiae quos.
                     </Typography>
                  </Box>
               </Grid>
            </Grid>
         </Box>
      </Modal>
   );
};

export default CustomModal;
