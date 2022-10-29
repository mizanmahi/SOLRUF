import { Box, LinearProgress, Typography } from '@mui/material';

function LinearProgressWithLabel(props) {
   return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
         <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant='determinate' {...props} />
         </Box>
         <Box
            sx={{
               minWidth: 35,
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
            }}
         >
            <Typography variant='body2' color='text.secondary'>{`${Math.round(
               props.value
            )}%`}</Typography>
         </Box>
      </Box>
   );
}

export default LinearProgressWithLabel;
