import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

const BottomFooter = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: theme.palette.primary.main,
   padding: '1rem 0',
   '& a': {
        color: theme.palette.primary.dark,
        fontWeight: 'bold',
      //   textDecoration: 'none',
   }
}));

const ProfileFooter = () => {
   return (
      <BottomFooter>
         <Typography>
            Powered by <Link to='/'  >SOLRUF</Link>
         </Typography>
      </BottomFooter>
   );
};

export default ProfileFooter;
