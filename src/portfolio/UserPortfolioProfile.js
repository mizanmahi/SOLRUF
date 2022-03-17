import {
   Avatar,
   Button,
   Chip,
   Container,
   Grid,
   Tooltip,
   Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import {
   HomeIcon,
   PhoneMissedCallIcon,
   MailIcon,
   ExternalLinkIcon,
   XIcon,
   PhoneIcon,
} from '@heroicons/react/outline';

import { LocationMarkerIcon } from '@heroicons/react/outline';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import './userPortfolioProfile.css';
import Projects from './Projects/Projects';
import BookNow from './Projects/BookNow/BookNow';
import { makeStyles } from '@mui/styles';
import TextField from '../components/TextField/TextField';
import BookProducts from './BookProducts/BookProducts';
import YellowButton from '../components/YellowButton/YellowButton';
import LightButton from '../components/YellowButton/LightButton/LightButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import DownloadIcon from '@mui/icons-material/Download';
import CustomModal from '../components/CustomModal/CustomModal';
import { tooltipClasses } from '@mui/material/Tooltip';
import TextModal from '../components/TextModal/TextModal';
import { useEffect } from 'react';
import { axiAuth } from '../utils/axiosInstance';
import { useNavigate, useParams } from 'react-router';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader';
import ProfileFooter from '../components/ProfileFooter/ProfileFooter';
import CollapsableText from '../components/CollapsableText/CollapsableText';
import Loader from '../components/Loader/Loader';
import VideoModal from '../components/VideoModal/VideoModal';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: '#D0D7D9',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4,
};

const ConsultBookingHeader = styled(Box)(({ theme }) => {
   return {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
         flexDirection: 'row',
      },
   };
});

const useStyles = makeStyles((theme) => {
   return {
      bookingFormBox: {
         width: '100%',
         mx: 'auto',
         padding: '2rem',
         background: '#f3f3f3',
         borderRadius: 10,
         margin: '2rem auto',
         position: 'relative',
         transition: 'all 0.9s ease-in-out',
         '@media (max-width: 600px)': {
            padding: '1.2rem',
         },
      },
      closeBtn: {
         position: 'absolute',
         top: '0.5rem',
         right: '0.5rem',
         cursor: 'pointer',
         color: '#000',
         height: '2rem',
         fontWeight: 'bold',
         transition: 'all 0.3s ease-in-out',
         '@media (max-width: 600px)': {
            height: '1rem',
         },
      },
      phonePanel: {
         display: 'flex',
         maxWidth: '400px',
         justifyContent: 'space-around',
         background: (props) => (props.openPhonePanel ? '#FFD05B' : '#D0D7D9'),
         padding: theme.spacing(2),
         borderRadius: '10px',
         textAlign: 'right',
         '@media (max-width: 600px)': {
            textAlign: 'center',
            padding: '.5rem',
            marginRight: '.5rem',
         },
         alignItems: 'flex-start',
         cursor: 'pointer',
         border: '2px solid #000',
      },
      addressPanel: {
         display: 'flex',
         maxWidth: '400px',
         justifyContent: 'space-around',
         background: (props) => (props.openPhonePanel ? '#D0D7D9' : '#FFD05B'),
         padding: theme.spacing(2),
         borderRadius: '10px',
         textAlign: 'right',
         '@media (max-width: 600px)': {
            textAlign: 'center',
            padding: '.5rem',
         },
         alignItems: 'flex-start',
         cursor: 'pointer',
         border: '2px solid #000',
      },
      circle: {
         minWidth: 25,
         height: 25,
         borderRadius: '50%',
         background: (props) => (props.openPhonePanel ? '#000' : ''),
         border: '2px solid #000',
         display: 'inline-block',
         '@media (max-width: 600px)': {
            height: 15,
            minWidth: 15,
         },
      },
      circle2: {
         background: (props) => (!props.openPhonePanel ? '#000' : ''),
         border: '2px solid #000',
         display: 'inline-block',
         height: 25,
         minWidth: 25,
         borderRadius: '50%',
         '@media (max-width: 600px)': {
            height: 15,
            minWidth: 15,
         },
      },
   };
});

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

const ConsultTextField = styled(TextField)(({ theme }) => ({
   '& label.Mui-focused': {
      color: theme.palette.primary.dark,
   },
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         borderColor: theme.palette.primary.main,
         borderWidth: '2px',
      },
      '&:hover fieldset': {
         borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
         borderColor: theme.palette.primary.main,
      },
   },
   width: '100%',
   marginTop: '1rem',
}));

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

const CustomTab = styled(Tab)(({ theme }) => ({
   fontSize: '.8rem',
   '&.Mui-selected': {
      fontWeight: 'bold',
      color: theme.palette.secondary.main,
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

const MobileDescription = styled(Box)(({ theme }) => ({
   padding: theme.spacing(3.9),
   bgcolor: '#D0D7D9',
   margin: `${theme.spacing(3.5)}px 0`,
   borderRadius: 2,
   border: 0,

   boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
   maxHeight: '400px',
   overflowY: 'auto',
}));

const CertificateButtonMobile = styled(Button)(({ theme }) => ({
   width: '80%',
   marginBottom: theme.spacing(1),
   color: theme.palette.secondary.main,
   background: theme.palette.secondary.light,
   '&:hover': {
      background: theme.palette.primary.main,
      color: '#ffffff',
   },
}));

const UserPortfolioProfile = ({ noPadding }) => {
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const [openBooking, setOpenBooking] = useState(false);
   const [openPhonePanel, setOpenPhonePanel] = useState(true);

   const [openAfterSalePolicyModal, setOpenAfterSalePolicyModal] =
      useState(false);

   const handleAfterSalePolicyModalOpen = () => {
      setOpenAfterSalePolicyModal(true);
   };
   const handleAfterSalePolicyModalClose = () =>
      setOpenAfterSalePolicyModal(false);

   const classes = useStyles({ openPhonePanel });

   const handleOpenBooking = () => {
      setOpenBooking((openBooking) => !openBooking);
   };

   const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

   const [tabValue, setTabValue] = React.useState(0);

   const handleChange = (e, newValue) => {
      setTabValue(newValue);
   };

   const handleTextExpandClose = () => {
      setAboutTextExpanded(false);
   };
   const [aboutTextExpanded, setAboutTextExpanded] = useState(false);

   // const [projects, setProjects] = useState([]);

   const [profileData, setProfileData] = useState(null);
   const [profileDataLoading, setProfileDataLoading] = useState(true);
   const [profileDataError, setProfileDataError] = useState(false);

   const { name } = useParams();

   useEffect(() => {
      setProfileDataLoading(true);
      setProfileDataError(false);
      axiAuth
         .get(`api/share/${name}`)
         .then(({ data }) => {
            console.log(data);
            setProfileData(data.data);
            setProfileDataLoading(false);
         })
         .catch((err) => {
            setProfileDataError('Error Loading Profile data');
            setProfileDataLoading(false);
         });
   }, [name]);

   console.log(profileData);

   const WrapperStyle = {
      py: noPadding ? '0' : 4,
      background: noPadding ? 'transparent' : '#F3F3F3',
   };

   const navigate = useNavigate();

   const bookNowClickHandler = () => {
      navigate('/product-booking');
   };

   const portfolio = profileData?.portfolio;
   const certificates = profileData?.certificates;
   const projects = profileData?.projects;

   const videoUrl = portfolio?.video_url?.replace('watch?v=', 'embed/');

   return (
      <>
         <ProfileHeader />
         {!profileDataLoading ? (
            <Box sx={WrapperStyle}>
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
                              {portfolio?.logo ? (
                                 <ProfilePhoto>
                                    <img src={portfolio.logo} alt='' />
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
                                 {portfolio.name}
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
                              {portfolio.services.map((service, i) => (
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
                           text={portfolio.description}
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
                                    {portfolio.location}
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
                                       City / District: -{' '}
                                    </span>
                                    {portfolio.city}, {portfolio.state}
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
                                       {portfolio.mobile}
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
                                       Email: - {''}
                                    </span>
                                    <a
                                       href='mailto:sumo@solruf.com'
                                       style={{ textDecoration: 'none' }}
                                    >
                                       {portfolio.email}
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
                                 {certificates?.length > 0 && (
                                    <Typography
                                       variant='h5'
                                       sx={{ fontWeight: 600 }}
                                    >
                                       Certification
                                    </Typography>
                                 )}

                                 <Box component='ul' sx={{ mt: 2 }}>
                                    {certificates?.map(
                                       ({ name, file }, i) =>
                                          i < 4 && (
                                             <CertificateList key={i}>
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
                                          bgcolor: '#D0D7D9',
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
                                          <CustomTab
                                             label='Company Details'
                                             sx={{
                                                fontSize: '.8rem',
                                                '&.Mui-selected': {
                                                   fontWeight: 'bold',
                                                   color: 'secondary.main',
                                                },
                                             }}
                                          />

                                          <CustomTab
                                             label='About'
                                             sx={{
                                                fontSize: '.8rem',
                                                '&.Mui-selected': {
                                                   fontWeight: 'bold',
                                                   color: 'secondary.main',
                                                },
                                             }}
                                          />
                                          <CustomTab
                                             label='Certificate'
                                             sx={{
                                                fontSize: '.8rem',

                                                '&.Mui-selected': {
                                                   fontWeight: 'bold',
                                                   color: 'secondary.main',
                                                },
                                             }}
                                          />
                                          <CustomTab
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
                                             <span
                                                style={{ fontWeight: '600' }}
                                             >
                                                Turnover: -
                                             </span>
                                             {` ${portfolio.turnover} ${portfolio.turnover_type}/Year`}
                                          </Typography>
                                          <Typography sx={{ mb: 2 }}>
                                             <span
                                                style={{ fontWeight: '600' }}
                                             >
                                                Total Projects: -
                                             </span>
                                             300/400
                                          </Typography>
                                          <Typography sx={{ mb: 2 }}>
                                             <span
                                                style={{ fontWeight: '600' }}
                                             >
                                                GST No: -
                                             </span>
                                             {portfolio.gst}
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
                                                   style={{
                                                      marginLeft: '1rem',
                                                   }}
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
                                             {portfolio.description.slice(
                                                0,
                                                100
                                             )}
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
                                             text={portfolio.description}
                                             title='Project Details'
                                             handleClose={handleTextExpandClose}
                                          />
                                       </Box>
                                    )}

                                    {tabValue === 2 && (
                                       <Box sx={{ mt: 2 }}>
                                          {certificates.map(
                                             ({ name, file }, i) =>
                                                i < 4 && (
                                                   <CertificateButtonMobile
                                                      component='a'
                                                      href={file}
                                                      target='_blank'
                                                      variant='contained'
                                                      endIcon={<DownloadIcon />}
                                                   >
                                                      {name}
                                                   </CertificateButtonMobile>
                                                )
                                          )}
                                       </Box>
                                    )}

                                    {tabValue === 3 && (
                                       <MobileDescription>
                                          <Typography
                                             sx={{ fontSize: '1.1rem' }}
                                          >
                                             {portfolio.description}
                                          </Typography>
                                       </MobileDescription>
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
                                    onClick={handleOpen}
                                    sx={{ bgcolor: '', position: 'relative' }}
                                 >
                                    <iframe
                                       style={{ borderRadius: '1rem' }}
                                       width='280'
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
                                          Turnover: -
                                       </span>

                                       {` ${portfolio.turnover} ${portfolio.turnover_type} / Year`}
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
                                          Total Projects: -
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
                                       {portfolio.gst}
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
                                          sx={{
                                             '& .MuiTooltip-popper': {
                                                fontSize: '1rem',
                                             },
                                          }}
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
                  {/* ======================== Book Consult Start ======================== */}
                  <Box
                     sx={{
                        my: 4,
                        bgcolor: '#D0D7D9',
                        p: [1.5, 5],
                        borderRadius: 3,
                     }}
                  >
                     <ConsultBookingHeader
                        sx={{ flexDirection: ['column', 'row'] }}
                     >
                        <Typography
                           variant='h6'
                           sx={{ fontWeight: 700, mb: [2, 0] }}
                        >
                           Lorem ipsum dolor sit amet consectetur, adipisicing
                           elit. Nulla, ad.
                        </Typography>
                        <LightButton onClick={handleOpenBooking}>
                           Book Consulting
                        </LightButton>
                     </ConsultBookingHeader>

                     {openBooking && (
                        <Box
                           className={classes.bookingFormBox}
                           data-aos='fade-down'
                           sx={{ p: ['1rem', '2rem'] }}
                        >
                           <XIcon
                              className={classes.closeBtn}
                              onClick={handleOpenBooking}
                           />
                           <Grid
                              spacing={[0, 2, 2, 2]}
                              container
                              sx={{
                                 mt: 2.5,

                                 width: ['100%', '70%'],

                                 mx: ['auto', 'auto', 'auto', 'auto'],
                                 flexWrap: 'nowrap',
                                 justifyContent: 'center',
                              }}
                           >
                              <Grid item sm={6}>
                                 <Box
                                    className={classes.phonePanel}
                                    sx={{ mb: 2 }}
                                    onClick={() => setOpenPhonePanel(true)}
                                 >
                                    {/* <CheckCircleIcon style={{width: "20px"}} /> */}
                                    {
                                       <div
                                          className={`${classes.circle}`}
                                       ></div>
                                    }
                                    <Box>
                                       <Typography
                                          variant='h5'
                                          fontWeight={600}
                                          gutterBottom
                                          sx={{ fontSize: ['1rem', '1.2rem'] }}
                                       >
                                          Phone Call
                                       </Typography>
                                       <Typography
                                          fontWeight={500}
                                          sx={{ fontSize: [10, 14] }}
                                       >
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipisicing.
                                       </Typography>
                                    </Box>
                                 </Box>
                              </Grid>
                              <Grid item sm={6}>
                                 <Box
                                    className={classes.addressPanel}
                                    onClick={() => setOpenPhonePanel(false)}
                                 >
                                    {<div className={classes.circle2}></div>}
                                    <Box>
                                       <Typography
                                          variant='h5'
                                          fontWeight={600}
                                          gutterBottom
                                          sx={{ fontSize: ['1rem', '1.2rem'] }}
                                       >
                                          Site Visit
                                       </Typography>
                                       <Typography
                                          fontWeight={500}
                                          sx={{ fontSize: [10, 14] }}
                                       >
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipisicing.
                                       </Typography>
                                    </Box>
                                 </Box>
                              </Grid>
                           </Grid>
                           <Box
                              component='form'
                              sx={{
                                 width: ['100%', '80%'],
                                 mx: 'auto',
                                 display: 'flex',
                                 flexDirection: 'column',
                                 alignItems: 'center',
                              }}
                           >
                              <ConsultTextField label='Name' />
                              <ConsultTextField label='Phone Number' />
                              <ConsultTextField label='Email (Optional)' />

                              {!openPhonePanel && (
                                 <ConsultTextField label='Address' />
                              )}

                              <YellowButton
                                 onClick={handleOpenBooking}
                                 style={{ marginTop: '2.5rem' }}
                              >
                                 Submit
                              </YellowButton>
                           </Box>
                        </Box>
                     )}
                  </Box>

                  {/* ============ Projects Slider ============ */}
                  {projects.length > 0 && <Projects projects={projects} />}

                  <BookNow onClick={bookNowClickHandler} />

                  <BookProducts />

                  {/* ============ modals ============ */}
                  {/* Modal for video */}
                  <Modal
                     open={open}
                     onClose={handleClose}
                     aria-labelledby='modal-modal-title'
                     aria-describedby='modal-modal-description'
                  >
                     <Box sx={style}>
                        <Typography
                           id='modal-modal-title'
                           variant='h6'
                           component='h2'
                        >
                           Text in a modal
                        </Typography>
                        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                           Duis mollis, est non commodo luctus, nisi erat
                           porttitor ligula.
                        </Typography>
                     </Box>
                  </Modal>
                  {/* Modal for policy */}
                  <CustomModal
                     open={openAfterSalePolicyModal}
                     modalText={portfolio.return_policy}
                     handleClose={handleAfterSalePolicyModalClose}
                  />
                  <VideoModal
                     open={open}
                     handleClose={handleClose}
                     videoLink={portfolio.video_url}
                     // videoLink='https://www.youtube.com/watch?v=Cg-6WRhpWy8'
                  />
               </Container>
            </Box>
         ) : (
            <Loader />
         )}
         <ProfileFooter />
      </>
   );
};

export default UserPortfolioProfile;
