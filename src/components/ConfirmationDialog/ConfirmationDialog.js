import { Button, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const Wrapper = styled(Box)(({ theme }) => ({
   background: '#ffffff',
   boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
   minWidth: '300px',
   position: 'relative',
   maxWidth: '400px',
   margin: '5rem auto',
   padding: '2rem',
   borderRadius: '10px',
}));

const DeleteBox = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: '-27px',
   left: '50%',
   transform: 'translateX(-50%)',
   backgroundColor: '#f3f3f3',
   borderRadius: '50%',
   width: '54px',
   height: '54px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}));

const ConfirmationDialog = () => {
   return (
      <Wrapper>
         <DeleteBox>
            <DeleteIcon sx={{ color: 'red', fontSize: '30px' }} />
         </DeleteBox>
         <Typography
            variant='h5'
            fontWeight='bold'
            textAlign='center'
            sx={{ my: 5 }}
         >
            Delete Data
         </Typography>
         <Box>
            <Button
               variant='contained'
               fullWidth
               sx={{
                  backgroundColor: 'red',
                  mb: 1,
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
               }}
            >
               Delete
            </Button>
            <Button
               variant='contained'
               fullWidth
               sx={{
                  backgroundColor: '#f3f3f3',
                  border: '2px solid #ffd05b',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
               }}
            >
               Cancel
            </Button>
         </Box>
      </Wrapper>
   );
};

export default ConfirmationDialog;
