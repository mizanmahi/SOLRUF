import { Button, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

// const CollapsableTextWrapper = styled(Box)(({ theme }) => ({
//    // [theme.mediaQueries.md]: {},
// }));

const CollapsableText = ({ text, collapseAt }) => {
   const [textExpanded, setTextExpanded] = useState(false);

   return (
      <Typography sx={{ fontSize: '1.1rem' }}>
         {textExpanded
            ? text.slice(0, text.length)
            : text.slice(0, collapseAt) +
              `${text?.length > collapseAt ? '...' : ''}`}
         <Button
            sx={{ color: 'blue', textTransform: 'none', py: 0 }}
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
