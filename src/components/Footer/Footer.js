import {
   Container,
   Grid,
   styled,
   Typography,
   useMediaQuery,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const FooterWrapper = styled(Box)(({ theme }) => ({
   backgroundColor: theme.palette.primary.dark,
   padding: '2rem 0 0',
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
   color: theme.palette.secondary.light,
   fontSize: '1.2rem',
   fontWeight: 'bold',
   textTransform: 'uppercase',
   borderBottom: '2px solid #ffd05b',
   display: 'inline-block',
   paddingRight: '1.5rem',
   marginBottom: '.7rem',
}));

const LinkList = styled(Typography)(({ theme }) => ({
   color: theme.palette.secondary.light,
   display: 'block',
   textDecoration: 'none',
   '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
   },
}));

const LinkListWithIcon = styled(Typography)(({ theme }) => ({
   color: theme.palette.secondary.light,
   textDecoration: 'none',
   display: 'flex',
   justifyContent: 'flex-start',
   alignItems: 'flex-start',
   '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
   },
}));

const SocialIcons = styled(Typography)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'flex-start',
   alignItems: 'flex-start',
   margin: '.5rem 0',
}));

const BottomFooter = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: theme.palette.primary.main,
   padding: '1rem 0',
}));

const Footer = () => {
   const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
   return (
      <FooterWrapper>
         <Container maxWidth='xl' sx={{ pb: 2 }}>
            <Grid container spacing={2}>
               <Grid item xs={12} sm={12} md={4} lg={3}>
                  <Box
                     sx={{
                        display: matches ? 'flex' : 'block',
                        justifyContent: 'center',
                     }}
                  >
                     <img
                        src='https://i.ibb.co/CzpgVFq/51.png'
                        alt='logo'
                        style={{ maxWidth: '100%' }}
                     />

                     {!matches && (
                        <Box>
                           <a
                              href='https://www.fieo.org/certificateview.php?memberfieo2009token=OvC4etKfCP_116295'
                              target='_blank'
                              rel='noreferrer'
                           >
                              <img
                                 src='https://i.ibb.co/gJnvP4R/fieo.png'
                                 alt=''
                                 style={{
                                    maxWidth: '150px',
                                    width: '100%',
                                    marginTop: '1rem',
                                    marginLeft: '1rem',
                                 }}
                              />
                           </a>
                        </Box>
                     )}
                  </Box>
               </Grid>
               <Grid item xs={12} sm={12} md={4} lg={6}>
                  <Grid
                     container
                     item
                     spacing={2}
                     rowSpacing={5}
                     justifyContent='center'
                  >
                     <Grid item xs={6} sm={6} md={6} lg={4}>
                        <FooterTitle>Company</FooterTitle>
                        <LinkList component={Link} to='/'>
                           Home
                        </LinkList>
                        <LinkList component={Link} to='/'>
                           About Us
                        </LinkList>
                        <LinkList component={Link} to='/'>
                           Procurement
                        </LinkList>
                        <LinkList component={Link} to='/'>
                           Tenders
                        </LinkList>
                     </Grid>
                     <Grid item xs={6} sm={6} md={6} lg={4}>
                        <FooterTitle>Blog</FooterTitle>
                        <LinkList component={Link} to='/'>
                           Net-Metering Policy
                        </LinkList>
                        <LinkList component={Link} to='/'>
                           Solar Products
                        </LinkList>
                        <LinkList component={Link} to='/'>
                           Solar Design
                        </LinkList>
                        <LinkList component={Link} to='/'>
                           Solar Installation
                        </LinkList>
                     </Grid>

                     <Grid item xs={6} sm={6} md={6} lg={4}>
                        <FooterTitle>Legal Info </FooterTitle>
                        <LinkList component={Link} to='/'>
                           Privacy Policy
                        </LinkList>
                        <LinkList component={Link} to='/'>
                           Terms and Conditions
                        </LinkList>
                        <LinkList component={Link} to='/'>
                           Return & Refund Policy
                        </LinkList>
                     </Grid>
                     <Grid item xs={6} sm={6} md={6} lg={4}>
                        <FooterTitle>Sell On Solruf</FooterTitle>
                        <LinkList component={Link} to='/'>
                           Become a Vendor
                        </LinkList>
                     </Grid>
                  </Grid>
               </Grid>
               <Grid item xs={12} sm={12} md={4} lg={3}>
                  {/* ============ Contact ============ */}
                  <FooterTitle>Contact</FooterTitle>
                  <LinkListWithIcon component={Link} to='/'>
                     <LocationOnIcon sx={{ color: '#ffd05b', mr: 1 }} />
                     <span>
                        Agarwal Bunglaw, Behind Atul Mangal Karyalaya, Rukmini
                        Nagar, Amravati, Maharashtra, India, 444606
                     </span>
                  </LinkListWithIcon>
                  <LinkListWithIcon component={Link} to='/' sx={{ my: 1.5 }}>
                     <PhoneEnabledIcon sx={{ color: '#ffd05b', mr: 1 }} />
                     <span>+99 78 896 9898</span>
                  </LinkListWithIcon>
                  <LinkListWithIcon component={Link} to='/'>
                     <EmailIcon sx={{ color: '#ffd05b', mr: 1 }} />
                     <span>sumo@solruf.com</span>
                  </LinkListWithIcon>
                  <SocialIcons
                     sx={{
                        mt: matches ? '1.5rem' : '0.5rem',
                        display: matches ? 'flex' : 'block',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}
                  >
                   <Box>
                   <PinterestIcon sx={{ color: '#ffd05b', mr: 1 }} />
                     <TwitterIcon sx={{ color: '#ffd05b', mr: 1 }} />
                     <LinkedInIcon sx={{ color: '#ffd05b', mr: 1 }} />
                     <InstagramIcon sx={{ color: '#ffd05b', mr: 1 }} />
                   </Box>
                   {
                      matches && ( <Box>
                        <a
                           href='https://www.fieo.org/certificateview.php?memberfieo2009token=OvC4etKfCP_116295'
                           target='_blank'
                           rel='noreferrer'
                        >
                           <img
                              src='https://i.ibb.co/gJnvP4R/fieo.png'
                              alt=''
                              style={{
                                 maxWidth: '150px',
                                 width: '100%',
                              }}
                           />
                        </a>
                     </Box>)
                   }

                  </SocialIcons>
               </Grid>
            </Grid>
         </Container>
         <BottomFooter>
            <Typography>
               <strong>&copy;SOLRUF INDIA PRIVATE LIMITED</strong> All Right
               Reserved
            </Typography>
         </BottomFooter>
      </FooterWrapper>
   );
};

export default Footer;
