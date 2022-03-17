import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useParams } from 'react-router-dom';

const ProfileSharingPage = () => {
   const params = useParams();
   console.log(params);

   return (
      <Box>
         <Typography variant='h4' textAlign='center'>
            Profile to be shared of {params.name}.
         </Typography>
      </Box>
   );
};

export default ProfileSharingPage;
