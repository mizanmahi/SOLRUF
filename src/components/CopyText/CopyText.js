import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import React, { useEffect, useState } from 'react';

const Wrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'flex-end',
   alignItems: 'stretch',
   width: '100%',
   '@media (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'center'
   }
}));

const TextToBeCopied = styled(Typography)(({ theme }) => ({
   borderRadius: '5px',
   padding: theme.spacing(1),
   color: 'rgb(30, 142, 62)',
   background: 'rgb(230, 244, 234)',
   flex: '0 0 auto',
   marginRight: '.5rem',
   maxWidth: '500px',
   overflow: 'hidden',
   textWrapping: 'wrap',
   height: '41px',
   '@media (max-width: 600px)': {
      marginRight: 0,
      marginBottom: '.5rem',
      width: '100%',
      maxWidth: '100%',
   }

}));

const Copy = styled(Typography)(({ theme }) => ({
   padding: theme.spacing(1),
   color: 'rgb(26, 115, 232)',
   background: '#edf4ff',
   borderRadius: '5px',
   cursor: 'pointer',
   width: '95px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   '&:hover': {
      background: '#c9ddfd',
   },
   '@media (max-width: 600px)': {
      width: '100%',
   }
}));

const CopyText = ({ title }) => {
   const [copied, setCopied] = useState(false);
   // const domain = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : process.env.REACT_APP_SOLRUF_DOMAIN;

   const url = `https://web.solruf.com/${title}`;


   useEffect(() => {
      if (copied) {
         setTimeout(() => {
            setCopied(false);
         }, 6000);
      }
   }, [copied]);

   return (
      <Wrapper>
         <TextToBeCopied>{url}</TextToBeCopied>
         <Copy
            onClick={() => {
               navigator.clipboard.writeText(url);
               setCopied(true);
            }}
         >
            {copied ? 'Copied!' : 'Copy'}
         </Copy>
      </Wrapper>
   );
};

export default CopyText;
