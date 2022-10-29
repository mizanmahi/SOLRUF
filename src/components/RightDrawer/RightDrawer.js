import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

export default function RightDrawer({
   children,
   open,
   onClose,
   anchor,
   drawerStyles,
}) {
   return (
      <React.Fragment>
         <Drawer
            hideBackdrop={false}
            anchor={anchor}
            open={open}
            onClose={onClose}
            
            PaperProps={{
               sx: { width: ['100%', 720], },
               background: '#f3f3f3',
               px: 0
            }}
         >
            <Box
               sx={{
                  ...drawerStyles,
                  maxWidth: '720px',
                  width: '100%',
                  px: [0,2],
                  height:'100vh',
                  overflow:'auto'
               }}
            >
               {children}
            </Box>
         </Drawer>
      </React.Fragment>
   );
}
