import { Box, styled } from '@mui/system';

export const HorizontalProductCardWrapper = styled(Box)(({ theme }) => ({
   background: '#ffffff',
   padding: '24px 24px 24px 24px',
   borderRadius: theme.spacing(1.5),
   boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
   cursor: 'pointer',
   position: 'relative',
   maxWidth: '750px',
   width: '100%',
   minWidth: '650px',
}));
