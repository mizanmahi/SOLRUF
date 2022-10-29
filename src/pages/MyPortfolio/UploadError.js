import { Box, Button, Typography } from '@mui/material';
import React from 'react';
// import FileHeader from './FileHeader';
import CloseIcon from '@mui/icons-material/Close';

const UploadError = ({ file, onDelete, errors }) => {
   return (
      <>
         {/* <FileHeader file={file} onDelete={onDelete} errors={errors} /> */}
         {errors.map((err) => (
            <Box
               sx={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  display: 'flex',
               }}
            >
               <Typography sx={{ color: 'red' }}>
                  {err.message}, Try another!
               </Typography>
               <Button
                  color='secondary'
                  sx={{
                     fontWeight: 600,
                     fontSize: '1.2rem',
                     borderBottom: '0 !important',
                  }}
                  onClick={() => onDelete(file)}
               >
                  <CloseIcon />
               </Button>
            </Box>
         ))}
      </>
   );
};

export default UploadError;
