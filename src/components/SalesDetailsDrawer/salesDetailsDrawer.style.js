import { Box, styled } from "@mui/material";


export const EnquiryDetailsWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    // background: '#f3f3f3',
    width: '100%',
    '& > svg': {
       position: 'absolute',
       top: '0',
       right: '0',
       fontWeight: 'bold',
       cursor: 'pointer',
    },
 }));

 export const Flex = styled(Box)(({ theme }) => ({
  display: 'flex'
}));

export const TabsWrapper = styled(Box)(({ theme, noPadding }) => ({
   padding: noPadding ? 0 : theme.spacing(2),
   paddingTop: theme.spacing(1),
   background: '#fff',
   borderRadius: '8px',
   margin: '1rem 0',
   boxShadow: '4px 4px 10px 0px rgba(0,0,0,0.1)',
}));

export const AnswerBox = styled(Box)(({ theme }) => ({
   background: '#f3f3f3',
   padding: '1rem',
   borderRadius: '0.5rem',
}));

export const ListWrapper = styled(Box)(({ theme }) => ({
   boxShadow: '4px 4px 10px 0px rgba(0, 0, 0, 0.1)',
   borderRadius: '8px',
   padding: '10px',
   marginTop: '2rem',
   maxHeight: "300px",
   overflowY: "auto",
}));