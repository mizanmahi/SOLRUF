import BottomNavigation from '@mui/material/BottomNavigation';
import { Paper } from '@mui/material';
import { Fragment } from 'react';

export default function CustomBottomBar({ children }) {
   return (
      <Fragment>
         <Paper
            sx={{
               zIndex: 10,
               position: 'fixed',
               bottom: 0,
               left: 0,
               right: 0,
               width: '100%',
               display: { xs: 'block', md: 'none' },
            }}
            elevation={1}
         >
            <BottomNavigation>{children}</BottomNavigation>
         </Paper>
      </Fragment>
   );
}
