import { Button, Chip } from '@mui/material';
import { Box, styled } from '@mui/system';

export const TermLinkButton = styled(Button)(({ theme }) => ({
   borderRadius: '7px',
   background: '#FFFFFF',
   width: '60%',
   fontSize: '15px',
}));

export const EnquiryDetailsWrapper = styled(Box)(({ theme }) => ({
   position: 'relative',
   // background: '#f3f3f3',
   padding: '5px',
   width: '100%',
   '& > svg': {
      position: 'absolute',
      top: '0',
      right: '0',
      fontWeight: 'bold',
      cursor: 'pointer',
   },
}));

export const Textarea = styled('textarea')(({ theme }) => {
   return {
      width: '100%',
      margin: '.6rem 0 0rem 0',
      border: '2px solid #FFD05B !important',
      background: '#F3F3F3',
      borderRadius: '10px',
      outline: 'none',
      padding: '1rem',
      fontFamily: theme.typography.fontFamily,
   };
});

export const DrawerContent = styled(Box)(({ theme }) => ({
   // padding: '1rem',
}));

export const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
}));

export const TabsWrapper = styled(Box)(({ theme, noPadding }) => ({
   padding: noPadding ? 0 : theme.spacing(2),
   paddingTop: theme.spacing(1),
   background: '#fff',
   borderRadius: '8px',
   margin: '1rem 0',
   boxShadow: '4px 4px 10px 0px rgba(0,0,0,0.1)',
}));

export const FormWrapper = styled(Box)(({ theme }) => ({
   padding: '1rem',
}));

// for file upload
export const QueryCreationBox = styled(Box)(({ theme }) => ({
   borderRadius: '0.5rem',
   padding: '20px 0px 0px 20px',
}));

export const AvatarBox = styled(Box)(({ theme }) => ({
   width: '100%',
   display: 'flex',
   alignItems: 'center',
}));

export const ReminderBox = styled(Box)(({ theme }) => ({
   background: '#fff',
   borderRadius: '8px',
   marginTop: '1rem',
   boxShadow: '4px 4px 10px 0px rgba(0, 0, 0, 0.1)',
}));

export const DownloadChip = styled(Chip)(({ theme }) => ({
   marginRight: '8px',
   background: '#000',
   color: '#fff',
   borderRadius: '10px',
   fontSize: '1rem',
   cursor: 'pointer',
   '&:hover': {
      background: '#000',
      color: '#fff',
      textDecoration: 'underline',
   },
   '& .MuiSvgIcon-root': {
      color: '#fff',
      '&:hover': {
         color: 'red',
      },
   },
}));

export const QuotationListItemWrapper = styled(Box)(({ theme, index }) => ({
   borderRadius: '8px',
   background: index % 2 !== 0 ? '#fff' : '#f3f3f3',
   padding: '0 1rem',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   columnGap: '1rem',
}));

export const QuotationListWrapper = styled(Box)(({ theme }) => ({
   padding: '0.5rem',
   display: 'flex',
   flexDirection: 'column',
   rowGap: '0.5rem',
}));

export const QuotationListItemActions = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   columnGap: '1rem',
}));
