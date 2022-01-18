import { Box, Button, Container, styled, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import BookProducts from '../../portfolio/BookProducts/BookProducts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import ProductCardForMobile from '../../components/ProductCardForMobile/ProductCardForMobile';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const Nav = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
}));



const BookProductInAdvancePage = () => {
   const navigate = useNavigate();

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);
   const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event &&
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
   
    
const list = (anchor) => (
   <Box
     sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
     role="presentation"
     onClick={toggleDrawer(anchor, false)}
     onKeyDown={toggleDrawer(anchor, false)}
   >
     <List>
       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
         <ListItem button key={text}>
           <ListItemIcon>
             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
           </ListItemIcon>
           <ListItemText primary={text} />
         </ListItem>
       ))}
     </List>
     <Divider />
     <List>
       {['All mail', 'Trash', 'Spam'].map((text, index) => (
         <ListItem button key={text}>
           <ListItemIcon>
             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
           </ListItemIcon>
           <ListItemText primary={text} />
         </ListItem>
       ))}
     </List>
   </Box>
 );

   return (
      <Box>
         <Container>
            <Nav>
               <ArrowBackIcon
                  sx={{ fontSize: 40, cursor: 'pointer' }}
                  onClick={() => navigate('/about')}
               />
               <Typography variant='h6'>Book Product in Advance</Typography>
            </Nav>
            <Box>
               <ProductCardForMobile />
               <ProductCardForMobile />
               <ProductCardForMobile />
               <ProductCardForMobile />
            </Box>
          <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
         </Container>
      </Box>
   );
};

export default BookProductInAdvancePage;
