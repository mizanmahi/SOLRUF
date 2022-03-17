import { Container } from '@mui/material';
import { Avatar, Button, Chip, Grid, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
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
import { axiAuth } from '../../../utils/axiosInstance';
import EditIcon from '@mui/icons-material/Edit';

import MyPortfolio from '../../MyPortfolio/MyPortfolio';
import { motion } from 'framer-motion';
import Loader from '../../../components/Loader/Loader';
import CollapsableText from '../../../components/CollapsableText/CollapsableText';
import CreatePortfolio from '../../../components/CreatePortfolio/CreatePortfolio';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCreatePortfolio } from '../../../redux/slices/portfolio.slice';
import UpdatePortfolio from '../../MyPortfolio/UpdatePortfolio';
import CopyText from '../../../components/CopyText/CopyText';
import VideoModal from '../../../components/VideoModal/VideoModal';

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

const EditButton = styled(Box)(({ theme }) => ({
   background: 'red',
   padding: theme.spacing(1),
   height: '50px',
   width: '50px',
   borderRadius: '50%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
   position: 'absolute',
   transform: 'translate(35%, -35%)',
   cursor: 'pointer',
   '&:hover': {
      background: theme.palette.primary.main,
      color: theme.palette.secondary.dark,
   },
   top: 0,
   right: 0,
   '@media (max-width: 600px)': {
      transform: 'translate(15%, -15%)',
      height: '40px',
   width: '40px',
   },
   svg: {
      // color: theme.palette.secondary.dark,
      color: '#ffffff',
      fontSize: '30px',
   },
}));

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   '@media (max-width: 600px)': {
      flexDirection: 'column',
   },
}));

const ProfilePhoto = styled(Box)(({ theme }) => ({
   width: '100px',
   height: '100px',
   borderRadius: '50%',
   overflow: 'hidden',
   '& img': {
      width: '100%',
   },
}));

const CertificateList = styled('li')(({ theme }) => ({
   marginBottom: theme.spacing(1),
   '&::marker': {
      color: '#0339A6',
   },
   '& a': {
      fontWeight: 500,
      color: '#0339A6',
      fontSize: '1.1rem',
      '& svg': {
         width: '1rem',
         marginBottom: '.5rem',
         marginLeft: '.5rem',
      },
   },
}));

const DashboardPortfolio = () => {
   const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);

   const { createPortfolio } = useSelector((state) => state.portfolio);

   const [portfolioData, setPortfolioData] = useState({});
   const [profileDataLoading, setProfileDataLoading] = useState(true);

   const [editPortfolio, setEditPortfolio] = useState(false);

   const handleClose = () => setOpen(false);

   const editButtonHandler = () => {
      setEditPortfolio(true);
   };

   const portfolioOnUpdateHandler = () => {
      setEditPortfolio(false);
   };

   useEffect(() => {
      setProfileDataLoading(true);
      axiAuth
         .get('api/vendor/profile')
         .then(async (res) => {
            const { portfolio, certificates } = res.data;

            setPortfolioData({ ...portfolio, certificates });
            setProfileDataLoading(false);
            if (res.status === 200) {
               dispatch(setCreatePortfolio(false));
            }
         })
         .catch((err) => {
            console.log('Portfolio data error', err);
            setProfileDataLoading(false);
         });
   }, [createPortfolio, editPortfolio]);

   const [tabValue, setTabValue] = React.useState(0);

   const handleChange = (e, newValue) => {
      setTabValue(newValue);
   };

   const [openAfterSalePolicyModal, setOpenAfterSalePolicyModal] =
      useState(false);
   const handleAfterSalePolicyModalOpen = () => {
      setOpenAfterSalePolicyModal(true);
   };
   const handleAfterSalePolicyModalClose = () =>
      setOpenAfterSalePolicyModal(false);
   const [aboutTextExpanded, setAboutTextExpanded] = useState(false);
   const handleTextExpandClose = () => {
      setAboutTextExpanded(false);
   };

   const description =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio obcaecati exercitationem quasi aperiam beatae unde velit veniam perspiciatis, cupiditate ipsam provident debitis quas aliquid odit quidem voluptatum architecto optio placeat at officiis non. Voluptatibus eos possimus, similique asperiores praesentium deserunt veniam odit expedita error minus, quaerat at numquam eaque fugit eum sit quas consequuntur nostrum rerum veritatis earum ducimus nam quia nihil. Neque excepturi aliquid corporis dolor. Doloribus iusto neque repellendus voluptate id et odio eligendi soluta debitis. Nemo, voluptates.  quaerat at numquam eaque fugit eum sit quas consequuntur nostrum rerum veritatis earum ducimus nam quia nihil. Neque excepturi aliquid corporis dolor. Doloribus iusto neque repellendus voluptate id et odio eligendi soluta debitis. Nemo, voluptates. asperiores praesentium deserunt veniam odit expedita error minus, quaerat at numquam eaque fugit eum sit quas consequuntur nostrum rerum veritatis earum ducimus nam quia nihil. Neque excepturi aliquid corporis dolor. Doloribus iusto neque repellendus voluptate id et odio eligendi soluta debitis. Nemo, voluptates.  quaerat at numquam eaque fugit eum sit quas consequuntur nostrum rerum veritatis earum ducimus nam quia nihil. Neque excepturi aliquid corporis dolor. Doloribus iusto neque repellendus voluptate id et odio eligendi soluta debitis. Nemo, voluptates.';

   const dispatch = useDispatch();

   const createPortfolioHandler = () => {
      dispatch(setCreatePortfolio(true));
   };

   // youtube video url fixing to show the preview
   const videoUrl = portfolioData?.video_url?.replace('watch?v=', 'embed/');

   if (createPortfolio) {
      return (
         <Container maxWidth='xl'>
            <motion.div
               initial={{ x: '10vw', opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ duration: 0.5, delay: 0.1 }}
            >
               <MyPortfolio createPortfolio={true} />
            </motion.div>
         </Container>
      );
   }

   return (
      <>
         {profileDataLoading ? (
            <Loader />
         ) : portfolioData?.name ? (
            <Container maxWidth='xl' sx={{ p: [1, 2] }}>
               {editPortfolio ? (
                  <motion.div
                     initial={{ x: '10vw', opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ duration: 0.5, delay: 0.1 }}
                  >
                     <UpdatePortfolio
                        portfolioData={portfolioData}
                        portfolioOnUpdateHandler={portfolioOnUpdateHandler}
                     />
                  </motion.div>
               ) : (
                  <Box
                     sx={{
                        bgcolor: '#ffffff',
                        maxWidth: '100%',
                        p: [1, 3.9],
                        borderRadius: 4,
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        position: 'relative',
                     }}
                  >
                     <EditButton onClick={editButtonHandler}>
                        <EditIcon />
                     </EditButton>
                     <Flex sx={{ maxWidth: '100%' }}>
                        <Typography
                           style={{ flex: 1 }}
                           variant='h4'
                           sx={{ fontWeight: 600, color: '#000000' }}
                        >
                           My Portfolio
                        </Typography>
                        <Box
                           sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'flex-end',
                              alignItems: 'flex-end',
                              // width: '100%',
                              minWidth: '550px',
                              mb: 4,
                              '@media screen and (max-width: 768px)': {
                                 minWidth: '100%',
                                 mt: 2,
                                 mb: 0
                              },
                           }}
                        >
                           <Typography
                              variant='body1'
                              gutterBottom
                              fontWeight={500}
                           >
                              Consumer Sharable Link
                           </Typography>
                           <CopyText title={`profile/${portfolioData.slug}`} />
                        </Box>
                     </Flex>
                     <Grid container rowSpacing={2}>
                        <Grid item xs={12} sm={12} md={6}>
                           <Box
                              sx={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 position: 'relative',
                              }}
                           >
                              {portfolioData.logo ? (
                                 <ProfilePhoto>
                                    <img src={portfolioData.logo} alt='' />
                                 </ProfilePhoto>
                              ) : (
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
                              )}
                              <Typography
                                 variant='h5'
                                 sx={{ fontWeight: 600, ml: 3.5 }}
                              >
                                 {portfolioData.name}
                              </Typography>
                           </Box>
                        </Grid>
                        <Grid
                           item
                           xs={12}
                           sm={12}
                           md={6}
                           sx={{ alignSelf: 'center' }}
                        >
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
                              {portfolioData.services?.map((service, i) => (
                                 <Chip
                                    key={i}
                                    label={service}
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
                        <CollapsableText
                           text={portfolioData?.description}
                           collapseAt={250}
                        />
                     </Box>

                     {/* ===================== portfolio description end ========================*/}

                     <Grid container>
                        <Grid item sm={12} md={7} sx={{ width: '100%' }}>
                           <Box
                              sx={{
                                 display: ['flex', 'block'],
                                 flexDirection: ['column'],
                                 justifyContent: 'center',
                              }}
                           >
                              <Box
                                 sx={{
                                    display: 'flex',
                                    alignItems: 'top',
                                    mb: 2,
                                 }}
                              >
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
                                    {portfolioData.location}
                                 </Typography>
                              </Box>
                              <Box
                                 sx={{
                                    display: 'flex',
                                    alignItems: 'top',
                                    mb: 2,
                                 }}
                              >
                                 <HomeIcon
                                    style={{
                                       height: '1.7rem',
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
                                       City / District: -
                                    </span>
                                    {portfolioData.city}, {portfolioData.state}
                                 </Typography>
                              </Box>
                              <Box
                                 sx={{
                                    display: 'flex',
                                    alignItems: 'top',
                                    mb: 2,
                                 }}
                              >
                                 <PhoneMissedCallIcon
                                    style={{
                                       height: '1.7rem',
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
                                       Mobile Number: -{' '}
                                    </span>
                                    <a
                                       href='tel:99788969898'
                                       style={{ textDecoration: 'none' }}
                                    >
                                       {portfolioData.mobile}
                                    </a>
                                 </Typography>
                              </Box>
                              <Box
                                 sx={{
                                    display: 'flex',
                                    alignItems: 'top',
                                    mb: 2,
                                 }}
                              >
                                 <MailIcon
                                    style={{
                                       height: '1.7rem',
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
                                       Email: -{' '}
                                    </span>
                                    <a
                                       href='mailto:sumo@solruf.com'
                                       style={{ textDecoration: 'none' }}
                                    >
                                       {portfolioData.email}
                                    </a>
                                 </Typography>
                              </Box>

                              <Box
                                 sx={{
                                    mt: 3.9,
                                    width: '100%',
                                    display: ['none', 'block'],
                                 }}
                              >
                                 {portfolioData?.certificates?.length > 0 && (
                                    <Typography
                                       variant='h5'
                                       sx={{ fontWeight: 600 }}
                                    >
                                       Certification
                                    </Typography>
                                 )}

                                 <Box component='ul' sx={{ mt: 2 }}>
                                    {portfolioData.certificates?.map(
                                       ({ name, file }, i) =>
                                          i < 4 && (
                                             <CertificateList>
                                                <Typography
                                                   component='a'
                                                   href={file}
                                                >
                                                   {name}
                                                   <ExternalLinkIcon />
                                                </Typography>
                                             </CertificateList>
                                          )
                                    )}
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
                                       <PhoneIcon style={{ width: 20 }} /> Call
                                       Now
                                    </YellowButton>

                                    <Box
                                       sx={{
                                          // maxWidth: 480,
                                          height: '100%',
                                          bgcolor: '#FFD05B',
                                          mt: 2,
                                          borderRadius: 1,
                                          boxShadow:
                                             '0px 4px 5px rgba(0, 0, 0, 0.10)',
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

                                    </Box>

                                    {/* ============ content of different tabs for mobile version */}
                                    {tabValue === 0 && (
                                       <Box>
                                          <Typography sx={{ mb: 2, mt: 4 }}>
                                             <span
                                                style={{ fontWeight: '600' }}
                                             >
                                                Turn Over: -
                                             </span>
                                             {`${portfolioData.turnover} ${portfolioData.turnover_type}/Year`}
                                          </Typography>
                                          <Typography sx={{ mb: 2 }}>
                                             <span
                                                style={{ fontWeight: '600' }}
                                             >
                                                Total Projects: -
                                             </span>
                                             {portfolioData.total_projects}
                                          </Typography>
                                          <Typography sx={{ mb: 2 }}>
                                             <span
                                                style={{ fontWeight: '600' }}
                                             >
                                                GST No: -
                                             </span>
                                             {portfolioData.gst}
                                             <Tooltip
                                                title={
                                                   <h1
                                                      style={{
                                                         color: 'lightblue',
                                                         fontSize: '40px',
                                                      }}
                                                   >
                                                      GST
                                                   </h1>
                                                }
                                                placement='top'
                                                arrow
                                             >
                                                <img
                                                   style={{
                                                      marginLeft: '1rem',
                                                   }}
                                                   src='https://i.ibb.co/pWNNjTt/vecteezy-profile-verification-check-marks-icons-vector-illustration-1-3.png'
                                                   alt=''
                                                />
                                             </Tooltip>
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
                                                src={videoUrl}
                                                title='YouTube video player'
                                                frameBorder='0'
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
                                             boxShadow:
                                                '0 4px 15px rgba(0,0,0,0.1)',
                                             maxHeight: '400px',
                                             overflowY: 'auto',
                                          }}
                                       >
                                          <Typography
                                             sx={{ fontSize: '1.1rem' }}
                                          >
                                             {portfolioData.description}
                                          </Typography>
                                       </Box>
                                    )}
                                 </Box>
                              )}
                           </Box>
                        </Grid>
                        <Grid item sm={12} md={5}>
                           <Box
                              sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 alignItems: 'flex-end',
                                 mt: 0,
                              }}
                           >
                              <Box sx={{ display: ['none', 'block'] }}>
                                 <Box
                                    sx={{ bgcolor: '', position: 'relative' }}
                                    onClick={handleOpen}
                                 >
                                    <iframe
                                       style={{ borderRadius: '1rem' }}
                                       width='280'
                                       height='170'
                                       src={videoUrl}
                                       // src='https://www.youtube.com/watch?v=xKxrkht7CpY'
                                       title='YouTube video player'
                                       frameBorder='0'
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

                                       {`${portfolioData.turnover} ${portfolioData.turnover_type}/Year`}
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
                                          Total Projects: -{''}
                                       </span>
                                       {portfolioData.total_projects}
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
                                       {portfolioData.gst}
                                       <Tooltip
                                          title={
                                             <span
                                                style={{ fontSize: '1.2rem' }}
                                             >
                                                GST Verified
                                             </span>
                                          }
                                          placement='top'
                                          arrow
                                       >
                                          <img
                                             style={{ marginLeft: '1rem' }}
                                             src='https://i.ibb.co/pWNNjTt/vecteezy-profile-verification-check-marks-icons-vector-illustration-1-3.png'
                                             alt=''
                                          />
                                       </Tooltip>
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
               )}
               <CustomModal
                  open={openAfterSalePolicyModal}
                  handleClose={handleAfterSalePolicyModalClose}
                  modalText={portfolioData.return_policy}
               />
               <ProjectsPage />
            </Container>
         ) : (
            <Container maxWidth='xl'>
               <CreatePortfolio
                  createPortfolioHandler={createPortfolioHandler}
               />
            </Container>
         )}
         <VideoModal
            open={open}
            handleClose={handleClose}
            // videoLink={portfolioData.videi_url}
            videoLink={portfolioData.video_url}
         />
      </>
   );
};

export default DashboardPortfolio;
