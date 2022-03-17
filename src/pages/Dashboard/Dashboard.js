import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { Link, NavLink, Outlet } from 'react-router-dom';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GavelIcon from '@mui/icons-material/Gavel';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MonetizationOn from '@mui/icons-material/MonetizationOn';
import { useSelector } from 'react-redux';

const drawerWidth = 240;

const DashboardMenu = styled(Box)(({ theme }) => ({
   width: '90%',
   marginLeft: 'auto',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   marginTop: theme.spacing(2),
}));

const DashboardMenuLink = styled(NavLink)(({ theme }) => ({
   width: '100%',
   display: 'flex',
   flexDirection: 'row',
   alignItems: 'center',
   padding: theme.spacing(1.5),
   marginBottom: theme.spacing(3),
   borderRadius: '50px 0 0 50px',
   color: 'black',
   textDecoration: 'none',
   fontWeight: 'bold',
   '&:hover': {
      background: 'gray',
      color: '#000',
      textDecoration: 'none',
   },
   '& svg': {
      marginRight: theme.spacing(1),
   },
}));

const activeStyle = {
   background: '#ffd05b',
};

const desktopDrawerStyle = {
   display: { xs: 'none', sm: 'none', md: 'block' },
   '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: drawerWidth,
      border: 0,
      background: '#f7f7f7',
      height: `calc(95vh - 77px)`,
      marginTop: '100px',
      borderRadius: '0 15px 15px 0',
   },
};

function Dashboard(props) {
   const { window } = props;
   const [mobileOpen, setMobileOpen] = useState(false);

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };
   const navigate = useNavigate();

   const { role } = useSelector((state) => state.user);

   useEffect(() => {
      navigate('myDashboard');
   }, []);

   const [value, setValue] = useState(0);
   console.log(role);

   const drawer = (
      <DashboardMenu>
         {role === 'Vendor' ? (
            <>
               {' '}
               <DashboardMenuLink
                  to='myDashboard'
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
               >
                  <DashboardIcon />
                  Dashboard
               </DashboardMenuLink>
               <DashboardMenuLink
                  to='portfolio'
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
               >
                  <DesktopMacIcon />
                  Portfolio
               </DashboardMenuLink>
               <DashboardMenuLink
                  to='tenders'
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
               >
                  <GavelIcon />
                  Tenders
               </DashboardMenuLink>
               <DashboardMenuLink
                  to='customerLeads'
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
               >
                  <SupportAgentIcon />
                  Customer Leads
               </DashboardMenuLink>
               <DashboardMenuLink
                  to='sale'
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
               >
                  <MonetizationOnIcon />
                  Sale
               </DashboardMenuLink>
            </>
         ) : (
            <>
               <DashboardMenuLink
                  to='sale'
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
               >
                  <MonetizationOnIcon />
                  Purchases
               </DashboardMenuLink>
               <DashboardMenuLink
                  to='sale'
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
               >
                  <MonetizationOnIcon />
                  Inquiries
               </DashboardMenuLink>
            </>
         )}
      </DashboardMenu>
   );

   const container =
      window !== undefined ? () => window().document.body : undefined;

   return (
      <Box sx={{ display: 'flex' }}>
         <CssBaseline />

         <Box
            component='nav'
            sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label='mailbox folders'
         >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
               container={container}
               variant='temporary'
               open={mobileOpen}
               onClose={handleDrawerToggle}
               ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
               }}
               sx={{
                  display: { xs: 'block', sm: 'block', md: 'none' },
                  '& .MuiDrawer-paper': {
                     boxSizing: 'border-box',
                     width: drawerWidth,
                     border: 0,
                     background: '#f7f7f7',
                     opacity: 1,
                     borderRadius: '0 15px 15px 0',
                     position: 'relative',
                     zIndex: 100000,
                  },
               }}
            >
               {drawer}
            </Drawer>
            {/* ============================== drawer for desktop ============================== */}
            <Drawer variant='permanent' sx={desktopDrawerStyle} open>
               <Box sx={{ background: '#000000', p: 2 }}>
                  <Typography
                     sx={{ color: '#ffffff', textAlign: 'center' }}
                     variant='h6'
                  >
                     My Dashboard
                  </Typography>
               </Box>

               {drawer}
            </Drawer>
         </Box>
         <Box
            component='main'
            sx={{
               flexGrow: 1,
               py: 3,
               px: 0,
               width: { sm: `calc(100% - ${drawerWidth}px)` },
               // background: 'red',
               maxWidth: '100%',
            }}
         >
            <BottomNavigation
               sx={{
                  display: { xs: 'flex', md: 'none', margin: '0 auto' },
                  justifyContent: 'center',
                  '& .MuiButtonBase-root': {
                     px: 0,
                  },
                  mb: 2,
               }}
               showLabels
               value={value}
               onChange={(event, newValue) => {
                  setValue(newValue);
               }}
            >
               <BottomNavigationAction
                  component={Link}
                  to='myDashboard'
                  label='Dashboard'
                  icon={<DashboardIcon />}
               />
               <BottomNavigationAction
                  component={Link}
                  to='portfolio'
                  label='Portfolio'
                  icon={<DesktopMacIcon />}
               />
               <BottomNavigationAction
                  label='Tenders'
                  icon={<GavelIcon />}
                  component={Link}
                  to='tenders'
               />
               <BottomNavigationAction
                  label='Leads'
                  icon={<SupportAgentIcon />}
                  component={Link}
                  to='leads'
               />
               <BottomNavigationAction
                  label='Sale'
                  icon={<MonetizationOn />}
                  component={Link}
                  to='sale'
               />
            </BottomNavigation>
            <Outlet />
         </Box>
      </Box>
   );
}

Dashboard.propTypes = {
   /**
    * Injected by the documentation to work in an iframe.
    * You won't need it on your project.
    */
   window: PropTypes.func,
};

export default Dashboard;

// ============================================================ confirm dialog
// const [confirmDialog, setConfirmDialog] = useState({
//    isOpen: false,
//    message: '',
//    title: '',
// });

// const deleteData = () => {
//    setConfirmDialog({ isOpen: false, ...confirmDialog });
//    console.log('Item Deleted Successfully');
// };
//  <Button
// variant='contained'
// onClick={() =>
//    setConfirmDialog({
//       isOpen: true,
//       message: 'Data will be deleted permanently',
//       title: 'Delete Data',
//       onConfirm: () => {
//          deleteData();
//       },
//    })
// }
// sx={{ my: 5, mx: 'auto' }}
// >
// Delete Data
// </Button>

// <ConfirmDialog
// confirmDialog={confirmDialog}
// setConfirmDialog={setConfirmDialog}
// />
