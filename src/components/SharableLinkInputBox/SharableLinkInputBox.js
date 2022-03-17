import { styled, Typography } from '@mui/material';
import { Box } from '@mui/system';

const SharableLinkInput = styled('div')(({ theme }) => {
   return {
      border: '3px solid #FFD05B',
      borderRadius: '10px',
      outline: 'none',
      fontFamily: theme.typography.fontFamily,
      overflow: 'hidden',
      display: 'flex',

      margin: '0',
      width: '100%',
      maxWidth: '450px',
      height: '45px',
      '& input': {
         border: 'none',
         width: '90%',
         height: '100%',
         padding: '1rem',
         '&:focus': {
            outline: 'none',
         },
      },
      '& label': {
         width: '10%',
         minWidth: '100px',
         height: '100%',
         background: '#ffd05b',
         '& div': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
         },
      },
      '& input[type=file]': {
         display: 'none',
      },
   };
});

const SharableLinkInputBox = () => {
   return (
      <SharableLinkInput>
         <input type='text' placeholder='https://frederik.info' />

         <label htmlFor='serviceFile'>
            <Box>
               <Typography variant='body1' sx={{ cursor: 'pointer' }}>
                  Copy
               </Typography>
            </Box>
         </label>
      </SharableLinkInput>
   );
};

export default SharableLinkInputBox;
