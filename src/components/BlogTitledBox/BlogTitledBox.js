import { Box, styled, Typography } from '@mui/material';
import React from 'react';

const Wrapper = styled(Box)(({ theme }) => ({
   background: '#ffffff',
   padding: '2rem',
   borderRadius: '12px',
   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
   position: 'relative',
   marginTop: '4rem',
   flex: '1',
}));

const Title = styled(Box)(({ theme }) => ({
   background: theme.palette.primary.main,
   padding: '.7rem 1.1rem',
   borderRadius: '7px',
   position: 'absolute',
   top: '0',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   '& p': {
      color: '#000000',
      fontSize: '1.4rem',
      fontWeight: '600',
   },
}));

const BlogTitledBox = ({ title, sx, children }) => {
   return (
      <Wrapper sx={sx}>
         <Title>
            <Typography>{title}</Typography>
         </Title>
         <Typography sx={{ color: '#000000', mt: 2.5 }}>{children}</Typography>
      </Wrapper>
   );
};

export default BlogTitledBox;
