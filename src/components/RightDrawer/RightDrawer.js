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
            anchor={anchor}
            open={open}
            onClose={onClose}
         >
            <Box sx={{ maxWidth: '900px', width: '100%', p: 2, ...drawerStyles }}>
               {children}
            </Box>
         </Drawer>
      </React.Fragment>
   );
}
