import { Box, styled } from '@mui/system';

export const BookingAvailabilityBox = styled(Box)(({ theme }) => ({
   background: '#ffffff',
   borderRadius: '8px',
   marginTop: '1rem',
   boxShadow: '4px 0px 10px 0px rgba(0, 0, 0, 0.1)',
}));

export const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
}));
