import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';

const CollapsableText = ({ text, collapseAt }) => {
   const [textExpanded, setTextExpanded] = useState(false);

   return (
      <Typography sx={{ fontSize: '1rem', color: '#000000' }}>
         {textExpanded
            ? text?.slice(0, text.length)
            : text?.slice(0, collapseAt) +
              `${text?.length > collapseAt ? '...' : ''}`}
         <Button
            sx={{ color: 'primary.dark', textDecoration: 'underline' ,textTransform: 'none', py: 0 }}
            onClick={() => setTextExpanded(!textExpanded)}
         >
            {text?.length > collapseAt
               ? textExpanded
                  ? 'Read Less'
                  : 'Read More'
               : ''}
         </Button>
      </Typography>
   );
};

export default CollapsableText;
