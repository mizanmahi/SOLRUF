import { Box, styled } from '@mui/material';

export const EnquiryDetailsWrapper = styled(Box)(({ theme }) => ({
   position: 'relative',
   // background: '#f3f3f3',
   width: '100%',
   padding: '5px',
   '& > svg': {
      position: 'absolute',
      top: '0',
      right: '0',
      fontWeight: 'bold',
      cursor: 'pointer',
   },
}));

export const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
}));

export const ListWrapper = styled(Box)(({ theme }) => ({
   boxShadow: '4px 4px 10px 0px rgba(0, 0, 0, 0.1)',
   borderRadius: '8px',
   padding: '10px',
   marginTop: '2rem',
   maxHeight: '300px',
   overflowY: 'auto',
}));

export const AmountBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   backgroundColor: '#FFD05B',
   borderRadius: '8px',
   padding: '1rem 1.5rem',
   margin: '1rem 0',
   justifyContent: 'space-between',
}));
