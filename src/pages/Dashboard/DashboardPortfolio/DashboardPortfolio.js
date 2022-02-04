import { Container } from '@mui/material';
import { Avatar, Button, Chip, Grid, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import {
   HomeIcon,
   PhoneMissedCallIcon,
   MailIcon,
   ExternalLinkIcon,
   PhoneIcon,
} from '@heroicons/react/outline';

import { LocationMarkerIcon } from '@heroicons/react/outline';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import useMediaQuery from '@mui/material/useMediaQuery';
import DownloadIcon from '@mui/icons-material/Download';
import { tooltipClasses } from '@mui/material/Tooltip';
import TextModal from '../../../components/TextModal/TextModal';
import YellowButton from '../../../components/YellowButton/YellowButton';
import CustomModal from '../../../components/CustomModal/CustomModal';
import ProjectsPage from '../../ProjectsPage/ProjectsPage';
import ProjectsPageForMobile from '../../ProjectsPageForMobile/ProjectsPageForMobile';

const HtmlTooltip = styled(({ className, ...props }) => (
   <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
   [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'transparent',
      //   color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      //   fontSize: theme.typography.pxToRem(12),
      //   border: '1px solid #dadde9',
      padding: 0,
      margin: 0,
   },
}));

const tags = [
   'Tag #1',
   'Tag #2',
   'Tag #3',
   'Tag #4',
   'Tag #5',
   'Tag #2',
   'Tag #3',
   'Tag #4',
   'Tag #5',
];

const DashboardPortfolio = () => {
   const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const [tabValue, setTabValue] = React.useState(0);

   const handleChange = (e, newValue) => {
      setTabValue(newValue);
   };

   const [textExpanded, setTextExpanded] = useState(false);
   const handleTextExpandClose = () => {
      setAboutTextExpanded(false);
   };

   const [openAfterSalePolicyModal, setOpenAfterSalePolicyModal] =
      useState(false);
   const handleAfterSalePolicyModalOpen = () => {
      console.log('click');
      setOpenAfterSalePolicyModal(true);
   };
   const handleAfterSalePolicyModalClose = () =>
      setOpenAfterSalePolicyModal(false);
   const [aboutTextExpanded, setAboutTextExpanded] = useState(false);
   const description =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio obcaecati exercitationem quasi aperiam beatae unde velit veniam perspiciatis, cupiditate ipsam provident debitis quas aliquid odit quidem voluptatum architecto optio placeat at officiis non. Voluptatibus eos possimus, similique asperiores praesentium deserunt veniam odit expedita error minus, quaerat at numquam eaque fugit eum sit quas consequuntur nostrum rerum veritatis earum ducimus nam quia nihil. Neque excepturi aliquid corporis dolor. Doloribus iusto neque repellendus voluptate id et odio eligendi soluta debitis. Nemo, voluptates.  quaerat at numquam eaque fugit eum sit quas consequuntur nostrum rerum veritatis earum ducimus nam quia nihil. Neque excepturi aliquid corporis dolor. Doloribus iusto neque repellendus voluptate id et odio eligendi soluta debitis. Nemo, voluptates. asperiores praesentium deserunt veniam odit expedita error minus, quaerat at numquam eaque fugit eum sit quas consequuntur nostrum rerum veritatis earum ducimus nam quia nihil. Neque excepturi aliquid corporis dolor. Doloribus iusto neque repellendus voluptate id et odio eligendi soluta debitis. Nemo, voluptates.  quaerat at numquam eaque fugit eum sit quas consequuntur nostrum rerum veritatis earum ducimus nam quia nihil. Neque excepturi aliquid corporis dolor. Doloribus iusto neque repellendus voluptate id et odio eligendi soluta debitis. Nemo, voluptates.';

   return (
      <Container maxWidth='xl'>
         <Box
            sx={{
               bgcolor: '#ffffff',
               p: [1, 3.9],
               borderRadius: 4,
               boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            }}
         >
            <Grid container rowSpacing={2}>
               <Grid item xs={12} sm={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                     <Avatar
                        alt='Remy Sharp'
                        src='https://i.ibb.co/0sLRgyb/logic-1.png'
                        sx={{
                           width: 70,
                           height: 70,
                           '&.MuiAvatar-root': {
                              bgcolor: '#D0D7D9',
                              p: 1.3,
                           },
                        }}
                     />
                     <Typography variant='h5' sx={{ fontWeight: 600, ml: 3.5 }}>
                        Brain Electrical
                     </Typography>
                  </Box>
               </Grid>
               <Grid item xs={12} sm={12} md={6} sx={{ alignSelf: 'center' }}>
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: [
                           'flex-start',
                           'flex-start',
                           'flex-end',
                        ],
                        flexWrap: 'wrap',
                        mb: [2, 0, 0],
                     }}
                  >
                     {tags.map((tag, i) => (
                        <Chip
                           label={tag}
                           sx={{
                              ml: 1,
                              color: '#fff',
                              borderRadius: 1,
                              bgcolor: 'blue',
                              fontWeight: 600,
                              fontSize: '1.1rem',
                              mb: 1,
                           }}
                        />
                     ))}
                  </Box>
               </Grid>
            </Grid>

            {/* =========================== portfolio header end =========================== */}

            <Box
               sx={{
                  p: 3.9,
                  bgcolor: '#D0D7D9',
                  my: 3.5,
                  borderRadius: 3.9,
                  border: 3,
                  borderColor: '#FFD05B',
                  display: ['none', 'none', 'block'],
               }}
            >
               <Typography sx={{ fontSize: '1.1rem' }}>
                  {textExpanded
                     ? description.slice(0, description.length)
                     : description.slice(0, 300) + '...'}
                  <Button
                     sx={{ color: 'blue', textTransform: 'none', py: 0 }}
                     onClick={() => setTextExpanded(!textExpanded)}
                  >
                     {textExpanded ? 'Read Less' : 'Read More'}
                  </Button>
               </Typography>
            </Box>

            {/* ===================== portfolio description end ========================*/}

            <Grid container>
               <Grid sm={12} md={7} sx={{ width: '100%' }}>
                  <Box
                     sx={{
                        display: ['flex', 'block'],
                        flexDirection: ['column'],
                        justifyContent: 'center',
                     }}
                  >
                     <Box sx={{ display: 'flex', alignItems: 'top', mb: 2 }}>
                        <LocationMarkerIcon
                           style={{
                              height: '1.7rem',
                              minHeight: 23,
                              minWidth: 23,
                              marginRight: '.5rem',
                           }}
                        />
                        <Typography variant='h6' fontSize='1.1rem'>
                           <span
                              style={{
                                 fontWeight: '600',
                                 fontSize: '1.2rem',
                              }}
                           >
                              Location: -
                           </span>
                           41, Prajkta Kunj Apt, Sarsole Gaon, Sec 6, Plot
                           No.4127, Opp The Great Eastern Gallery, Btwn, Nerul
                        </Typography>
                     </Box>
                     <Box sx={{ display: 'flex', alignItems: 'top', mb: 2 }}>
                        <HomeIcon
                           style={{ height: '1.7rem', marginRight: '.5rem' }}
                        />
                        <Typography variant='h6' fontSize='1.1rem'>
                           <span
                              style={{
                                 fontWeight: '600',
                                 fontSize: '1.2rem',
                              }}
                           >
                              City / District: -
                           </span>
                           Mumbai, Maharashtra
                        </Typography>
                     </Box>
                     <Box sx={{ display: 'flex', alignItems: 'top', mb: 2 }}>
                        <PhoneMissedCallIcon
                           style={{ height: '1.7rem', marginRight: '.5rem' }}
                        />
                        <Typography variant='h6' fontSize='1.1rem'>
                           <span
                              style={{
                                 fontWeight: '600',
                                 fontSize: '1.2rem',
                              }}
                           >
                              Mobile Number: -
                           </span>
                           00011199999
                        </Typography>
                     </Box>
                     <Box sx={{ display: 'flex', alignItems: 'top', mb: 2 }}>
                        <MailIcon
                           style={{ height: '1.7rem', marginRight: '.5rem' }}
                        />
                        <Typography variant='h6' fontSize='1.1rem'>
                           <span
                              style={{
                                 fontWeight: '600',
                                 fontSize: '1.2rem',
                              }}
                           >
                              Email: -
                           </span>
                           emmail@gmail.com
                        </Typography>
                     </Box>

                     <Box
                        sx={{
                           mt: 3.9,
                           width: '100%',
                           display: ['none', 'block'],
                        }}
                     >
                        <Typography variant='h5' sx={{ fontWeight: 600 }}>
                           Certification
                        </Typography>

                        <Box component='ul' sx={{ mt: 2 }}>
                           <li
                              style={{ marginBottom: '1rem' }}
                              className='certification-list'
                           >
                              <Typography
                                 component='a'
                                 href='#'
                                 sx={{ fontWeight: 500, color: '#0339A6' }}
                              >
                                 Name
                                 <ExternalLinkIcon
                                    style={{
                                       width: '1rem',
                                       marginBottom: '.5rem',
                                       marginLeft: '.5rem',
                                    }}
                                 />
                              </Typography>
                           </li>
                           <li
                              style={{ marginBottom: '1rem' }}
                              className='certification-list'
                           >
                              <Typography
                                 component='a'
                                 href='#'
                                 sx={{ fontWeight: 500, color: '#0339A6' }}
                              >
                                 Name
                                 <ExternalLinkIcon
                                    style={{
                                       width: '1rem',
                                       marginBottom: '.5rem',
                                       marginLeft: '.5rem',
                                    }}
                                 />
                              </Typography>
                           </li>
                           <li
                              style={{ marginBottom: '1rem' }}
                              className='certification-list'
                           >
                              <Typography
                                 component='a'
                                 href='#'
                                 sx={{ fontWeight: 500, color: '#0339A6' }}
                              >
                                 Name
                                 <ExternalLinkIcon
                                    style={{
                                       width: '1rem',
                                       marginBottom: '.5rem',
                                       marginLeft: '.5rem',
                                    }}
                                 />
                              </Typography>
                           </li>
                        </Box>
                     </Box>

                     {matches && (
                        <Box sx={{ mt: 2 }}>
                           <YellowButton
                              style={{
                                 width: '100%',
                                 margin: '0 auto',
                                 fontSize: '1rem',
                                 padding: '.6rem 1rem',
                              }}
                           >
                              <PhoneIcon style={{ width: 20 }} /> Call Now
                           </YellowButton>

                           <Box
                              sx={{
                                 // maxWidth: 480,
                                 bgcolor: '#D0D7D9',
                                 mt: 2,
                                 borderRadius: 1,
                                 boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.10)',
                              }}
                           >
                              <Tabs
                                 value={tabValue}
                                 onChange={handleChange}
                                 variant='scrollable'
                                 scrollButtons
                                 allowScrollButtonsMobile
                                 aria-label='details tabs'
                                 sx={{
                                    '& .MuiTabs-indicator': {
                                       height: 5,
                                    },
                                    '& .MuiButtonBase-root': {
                                       padding: '1rem',
                                    },
                                 }}
                              >
                                 <Tab
                                    label='Company Details'
                                    sx={{
                                       fontSize: '.8rem',
                                       '&.Mui-selected': {
                                          fontWeight: 'bold',
                                          color: 'secondary.main',
                                       },
                                    }}
                                 />

                                 <Tab
                                    label='About'
                                    sx={{
                                       fontSize: '.8rem',
                                       '&.Mui-selected': {
                                          fontWeight: 'bold',
                                          color: 'secondary.main',
                                       },
                                    }}
                                 />
                                 <Tab
                                    label='Certificate'
                                    sx={{
                                       fontSize: '.8rem',

                                       '&.Mui-selected': {
                                          fontWeight: 'bold',
                                          color: 'secondary.main',
                                       },
                                    }}
                                 />
                                 <Tab
                                    label='Description'
                                    sx={{
                                       fontSize: '.8rem',
                                       '&.Mui-selected': {
                                          fontWeight: 'bold',
                                          color: 'secondary.main',
                                       },
                                    }}
                                 />
                              </Tabs>

                              {/* ============ content of different tabs for mobile version */}
                           </Box>

                           {tabValue === 0 && (
                              <Box>
                                 <Typography sx={{ mb: 2, mt: 4 }}>
                                    <span style={{ fontWeight: '600' }}>
                                       Turn Over: -
                                    </span>
                                    35lacs/year
                                 </Typography>
                                 <Typography sx={{ mb: 2 }}>
                                    <span style={{ fontWeight: '600' }}>
                                       Total Participation: -
                                    </span>
                                    300/400
                                 </Typography>
                                 <Typography sx={{ mb: 2 }}>
                                    <span style={{ fontWeight: '600' }}>
                                       GST No: -
                                    </span>
                                    123098
                                    <HtmlTooltip
                                       title={
                                          <>
                                             <img
                                                src='https://i.ibb.co/2g62C66/Group-178-1.png'
                                                alt=''
                                             />
                                          </>
                                       }
                                       placement='top'
                                    >
                                       <img
                                          style={{ marginLeft: '1rem' }}
                                          src='https://i.ibb.co/pWNNjTt/vecteezy-profile-verification-check-marks-icons-vector-illustration-1-3.png'
                                          alt=''
                                       />
                                    </HtmlTooltip>
                                 </Typography>
                              </Box>
                           )}
                           {tabValue === 1 && (
                              <Box
                                 sx={{
                                    p: 3.9,
                                    bgcolor: '#D0D7D9',
                                    my: 3.5,
                                    borderRadius: 2,
                                 }}
                              >
                                 <Box
                                    sx={{
                                       bgcolor: '',
                                       position: 'relative',
                                    }}
                                    onClick={handleOpen}
                                 >
                                    <iframe
                                       style={{
                                          borderRadius: '1rem',
                                          maxWidth: '100%',
                                       }}
                                       height='170'
                                       src='https://www.youtube.com/embed/ZCuYPiUIONs?controls=0'
                                       title='YouTube video player'
                                       frameborder='0'
                                       allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                       allowfullscreen
                                    ></iframe>
                                    <Box
                                       sx={{
                                          position: 'absolute',
                                          top: 0,
                                          left: 0,
                                          bgcolor: '',
                                          width: '100%',
                                          height: '100%',
                                          opacity: 0.3,
                                       }}
                                    ></Box>
                                 </Box>
                                 <Typography
                                    sx={{ fontSize: '1.1rem', mt: 1 }}
                                    onClick={() => {}}
                                 >
                                    {description.slice(0, 100)}
                                    <Button
                                       sx={{
                                          color: 'blue',
                                          textTransform: 'none',
                                          py: 0,
                                       }}
                                       onClick={() =>
                                          setAboutTextExpanded(
                                             !aboutTextExpanded
                                          )
                                       }
                                    >
                                       Read More
                                    </Button>
                                 </Typography>
                                 <TextModal
                                    open={aboutTextExpanded}
                                    text={description}
                                    title='Project Details'
                                    handleClose={handleTextExpandClose}
                                 />
                              </Box>
                           )}

                           {tabValue === 2 && (
                              <Box sx={{ mt: 2 }}>
                                 <Button
                                    sx={{
                                       width: '80%',
                                       mb: 1,
                                       color: 'secondary.main',
                                       bgcolor: 'secondary.light',
                                    }}
                                    component='a'
                                    href='https://docs.google.com/spreadsheets/d/1wZeHkfMLq-tU0yYKc0-qO0vPsBsLLHvAoyPy1OK-mpI/edit?usp=sharing'
                                    target='_blank'
                                    variant='contained'
                                    endIcon={<DownloadIcon />}
                                 >
                                    Certificate Name1
                                 </Button>
                                 <Button
                                    sx={{
                                       width: '80%',
                                       mb: 1,
                                       color: 'secondary.main',
                                       bgcolor: 'secondary.light',
                                    }}
                                    component='a'
                                    href='https://docs.google.com/spreadsheets/d/1wZeHkfMLq-tU0yYKc0-qO0vPsBsLLHvAoyPy1OK-mpI/edit?usp=sharing'
                                    target='_blank'
                                    variant='contained'
                                    endIcon={<DownloadIcon />}
                                 >
                                    Certificate Name2
                                 </Button>
                                 <Button
                                    sx={{
                                       width: '80%',
                                       mb: 1,
                                       color: 'secondary.main',
                                       bgcolor: 'secondary.light',
                                    }}
                                    component='a'
                                    href='https://docs.google.com/spreadsheets/d/1wZeHkfMLq-tU0yYKc0-qO0vPsBsLLHvAoyPy1OK-mpI/edit?usp=sharing'
                                    target='_blank'
                                    variant='contained'
                                    endIcon={<DownloadIcon />}
                                 >
                                    Certificate Name3
                                 </Button>
                              </Box>
                           )}

                           {tabValue === 3 && (
                              <Box
                                 sx={{
                                    p: 3.9,
                                    bgcolor: '#D0D7D9',
                                    my: 3.5,
                                    borderRadius: 2,
                                    border: 0,
                                    //  borderColor: '#FFD05B',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                    maxHeight: '400px',
                                    overflowY: 'auto',
                                 }}
                              >
                                 <Typography sx={{ fontSize: '1.1rem' }}>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Distinctio obcaecati
                                    exercitationem quasi aperiam beatae unde
                                    velit veniam perspiciatis, cupiditate ipsam
                                    provident debitis quas aliquid odit quidem
                                    voluptatum architecto optio placeat at
                                    officiis non. Voluptatibus eos possimus,
                                    similique asperiores praesentium deserunt
                                    veniam odit expedita error minus, quaerat at
                                    numquam eaque fugit eum sit quas
                                    consequuntur nostrum rerum veritatis earum
                                    ducimus nam quia nihil. Neque excepturi
                                    aliquid corporis dolor. Doloribus iusto
                                    neque repellendus voluptate id et odio
                                    eligendi soluta debitis. Nemo, voluptates.
                                 </Typography>
                              </Box>
                           )}
                        </Box>
                     )}
                  </Box>
               </Grid>
               <Grid sm={12} md={5}>
                  <Box
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        mt: 0,
                     }}
                  >
                     <Box
                        onClick={handleOpen}
                        sx={{ display: ['none', 'block'] }}
                     >
                        <Box sx={{ bgcolor: '', position: 'relative' }}>
                           <iframe
                              onClick={handleOpen}
                              style={{ borderRadius: '1rem' }}
                              width='280'
                              height='170'
                              src='https://www.youtube.com/embed/ZCuYPiUIONs?controls=0'
                              title='YouTube video player'
                              frameborder='0'
                              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                              allowfullscreen
                           ></iframe>
                           <Box
                              sx={{
                                 position: 'absolute',
                                 top: 0,
                                 left: 0,
                                 bgcolor: '',
                                 width: '100%',
                                 height: '100%',
                                 opacity: 0.3,
                              }}
                           ></Box>
                        </Box>
                        <Box sx={{ display: ['none', 'block'] }}>
                           <Typography
                              sx={{ mb: 2, mt: 4 }}
                              variant='h6'
                              fontSize='1.1rem'
                           >
                              <span
                                 style={{
                                    fontWeight: '600',
                                    fontSize: '1.2rem',
                                 }}
                              >
                                 Turn Over: -
                              </span>
                              35lacs/year
                           </Typography>
                           <Typography
                              sx={{ mb: 2 }}
                              variant='h6'
                              fontSize='1.1rem'
                           >
                              <span
                                 style={{
                                    fontWeight: '600',
                                    fontSize: '1.2rem',
                                 }}
                              >
                                 Total Participation: -
                              </span>
                              300/400
                           </Typography>
                           <Typography
                              sx={{ mb: 2 }}
                              variant='h6'
                              fontSize='1.1rem'
                           >
                              <span
                                 style={{
                                    fontWeight: '600',
                                    fontSize: '1.2rem',
                                 }}
                              >
                                 GST No: -
                              </span>
                              123098
                              <HtmlTooltip
                                 title={
                                    <>
                                       <img
                                          src='https://i.ibb.co/2g62C66/Group-178-1.png'
                                          alt=''
                                       />
                                    </>
                                 }
                                 placement='top'
                              >
                                 <img
                                    style={{ marginLeft: '1rem' }}
                                    src='https://i.ibb.co/pWNNjTt/vecteezy-profile-verification-check-marks-icons-vector-illustration-1-3.png'
                                    alt=''
                                 />
                              </HtmlTooltip>
                           </Typography>
                        </Box>
                     </Box>
                  </Box>
               </Grid>
               <Grid
                  item
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                  xs={12}
               >
                  <img
                     onClick={handleAfterSalePolicyModalOpen}
                     src='https://i.ibb.co/QDy19HX/Frame-185.png'
                     alt='service policy icon'
                     style={{
                        cursor: 'pointer',
                        width: '350px',
                        marginTop: '1rem',
                     }}
                  />
               </Grid>
            </Grid>
         </Box>
         <CustomModal
            open={openAfterSalePolicyModal}
            handleClose={handleAfterSalePolicyModalClose}
         />
         {!matches ? (
            <Container maxWidth='xl' sx={{ mt: 5 }}>
               <ProjectsPage />
            </Container>
         ) : (
            <ProjectsPageForMobile />
         )}
      </Container>
   );
};

export default DashboardPortfolio;
