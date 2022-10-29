import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import PrimaryButton from '../Custom/PrimaryButton/PrimaryButton';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

const Wrapper = styled(Box)(({ theme }) => ({
   background: `linear-gradient(108.58deg, #F4F0E4 -22.48%, #FFD05B 49.85%)`,
   padding: theme.spacing(1),
   maxWidth: '100%',
   width: '500px',
   borderRadius: theme.spacing(1),
}));

const UrlBox = styled(Box)(({ theme }) => ({
   background: '#edf4ff',
   padding: theme.spacing(1),
   borderRadius: theme.spacing(1),
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   '& .url': {
      display: 'flex',
      alignItems: 'center',
      '& > svg': {
         marginRight: theme.spacing(1),
      },
   },
   position: 'relative',
}));

const CopyTextVar = ({ url, sx }) => {
   const [copied, setCopied] = useState(false);

   useEffect(() => {
      if (copied) {
         setTimeout(() => {
            setCopied(false);
         }, 5000);
      }
   }, [copied]);

   return (
      <Wrapper sx={{ ...sx }}>
         <Typography
            sx={{ fontSize: '1rem', fontWeight: 'bold', mb: 1, pl: 1 }}
         >
            Share Product Link
         </Typography>
         <UrlBox>
            <Box className='url'>
               <InsertLinkIcon />
               <Typography>
                  {url.length > 45 ? url.slice(0, 45) + '...' : url}
               </Typography>
            </Box>
            <Box>
               <PrimaryButton
                  sx={{
                     px: 2,
                     borderRadius: '8px',
                  }}
                  onClick={() => {
                     navigator.clipboard.writeText(url);
                     setCopied(true);
                  }}
               >
                  {copied ? 'Copied!' : 'Copy'}
               </PrimaryButton>
            </Box>
         </UrlBox>
      </Wrapper>
   );
};

export default CopyTextVar;
