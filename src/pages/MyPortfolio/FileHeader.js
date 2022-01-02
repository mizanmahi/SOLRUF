import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { CheckIcon } from '@heroicons/react/outline';

const FileHeader = ({ file, onDelete, errors, progress, url }) => {
   return (
      <Box
         sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
         }}
      >
         <Typography variant='body1' component='a' href={url} target='_blank'>
            {file.givenName
               ? file.givenName
               : file.name.length > 30
               ? `${file.name.slice(0, 30)}...`
               : file.name}
         </Typography>

         {progress < 100 && (
            <Button
               color='secondary'
               sx={{
                  fontWeight: 600,
                  fontSize: '1.2rem',
                  borderBottom: '0 !important',
               }}
               onClick={() => onDelete(file)}
            >
               X
            </Button>
         )}

         {/* {!progress && (
            <Button
               color='secondary'
               sx={{ fontWeight: 600, fontSize: '1.2rem' }}
               onClick={() => onDelete(file)}
            >
               X
            </Button>
         )} */}

         {progress === 100 && (
            <Box>
               <CheckIcon style={{ width: 30, color: 'green' }} />
               <Button
                  color='secondary'
                  sx={{
                     fontWeight: 600,
                     fontSize: '1.2rem',
                     borderBottom: '0 !important',
                  }}
                  onClick={() => onDelete(file)}
               >
                  X
               </Button>
            </Box>
         )}
      </Box>
   );
};

export default FileHeader;
