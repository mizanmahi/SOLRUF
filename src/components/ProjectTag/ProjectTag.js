import { styled, Typography } from '@mui/material';
import React from 'react';

const Tag = styled('div')(({ theme }) => ({
   display: 'inline-block',
   background: '#3FB500',
   padding: '5px 10px',
   borderRadius: '5px',
}));

const ProjectTag = ({ title }) => {
   return (
      <Tag>
         <Typography variant='body1' sx={{ color: '#ffffff' }}>
            {title}
         </Typography>
      </Tag>
   );
};

export default ProjectTag;
