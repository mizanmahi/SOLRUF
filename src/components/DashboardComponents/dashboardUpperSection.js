import React, { useState } from 'react';

import { Box } from '@mui/system';
import {
   Tooltip,
   Typography,
   Grid,
   Avatar,
   Chip,
   useMediaQuery,
   Dialog,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
   HomeIcon,
   PhoneMissedCallIcon,
   MailIcon,
} from '@heroicons/react/outline';
import EditIcon from '@mui/icons-material/Edit';

import { LocationMarkerIcon } from '@heroicons/react/outline';
import CopyText from '../CopyText/CopyText';

import StarIcon from '../../assets/star.svg';
import mailIcon from '../../assets/mailIcon.svg';
import phoneIcon from '../../assets/phoneIcon.svg';
import locationIcon from '../../assets/locationIcon.svg';
import DashboardUpperTabs from './dashboardUpperTabs';
import RoundedDarkButton from '../RoundedDarkButton/RoundedDarkButton';
import CollapsableText from '../CollapsableText/CollapsableText';
import { DownloadChip } from '../CustomerDetailsDrawer/customerDetailsDrawer.style';
import CompanyModalContents from './dashboardCompanyModalContents';
import KeyboardBackspace from '@mui/icons-material/KeyboardBackspace';
import { modalTopBackButtonStyle } from '../../theme/modalTopBackButtonStyle';
import CustomModal from '../CustomModal/CustomModal';
import { toast } from 'react-toastify';

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
      height: '100%',
      objectFit: 'cover',
   },
}));

const EditButton = styled(Box)(({ theme }) => ({
   background: 'red',
   padding: theme.spacing(1),
   height: '40px',
   width: '40px',
   borderRadius: '50%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
   position: 'absolute',
   // transform: 'translate(35%, -35%)',
   cursor: 'pointer',
   '&:hover': {
      background: theme.palette.primary.main,
      color: theme.palette.secondary.dark,
   },
   top: 4,
   right: 4,
   '@media (max-width: 1100px)': {
      transform: 'translate(15%, -15%)',
      height: '40px',
      width: '40px',
   },
   '@media (max-width: 600px)': {
      transform: 'translate(15%, -15%)',
      height: '40px',
      width: '40px',
   },
   [theme.breakpoints.down('md')]: {
      height: '40px',
      width: '40px',
   },
   svg: {
      // color: theme.palette.secondary.dark,
      color: '#ffffff',
      fontSize: '25px',
      [theme.breakpoints.down('md')]: {
         fontSize: '22px',
      },
      [theme.breakpoints.down('xl')]: {
         fontSize: '25px',
      },
   },
}));

function DashboardUpperSection({
   portfolioData,
   videoUrl,
   setShowMobileAfterSale,
   editButtonHandler,
   setShowEditModal,
   sx,
   ...rest
}) {
   // const [open, setOpen] = useState(false);
   const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
   // const handleOpen = () => setOpen(true);
   const [openAfterSalePolicyModal, setOpenAfterSalePolicyModal] =
      useState(false);

   const handleAfterSalePolicyModalOpen = () => {
      setOpenAfterSalePolicyModal(true);
   };

   const [aboutTextExpanded, setAboutTextExpanded] = useState(false);
   const handleTextExpandClose = () => {
      setAboutTextExpanded(false);
   };

   const handleAddressCopying = () => {
      const address = `${portfolioData?.location}, ${portfolioData?.pincode}, ${portfolioData?.city}, ${portfolioData?.state}`;
      navigator.clipboard.writeText(address);
      toast.success('Address Copied');
   };

   return (
      <Box
         sx={{
            bgcolor: { sm: '#ffffff' },
            maxWidth: '100%',
            px: [0.5, 2, 3.9],
            pt: [2, 3, 3.9],
            pb: [0, 3, 3.9],
            borderRadius: 4,
            boxShadow: { sm: '0 4px 15px rgba(0,0,0,0.1)' },
            position: 'relative',
            ...sx,
         }}
         {...rest}
      >
         <EditButton
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            onClick={editButtonHandler}
         >
            <EditIcon />
         </EditButton>
         <EditButton
            sx={{
               display: { xs: 'flex', sm: 'none' },
               top: 8,
               right: 8,
               zIndex: 100,
            }}
            onClick={() => setShowEditModal(true)}
         >
            <EditIcon />
         </EditButton>
         <Flex
            sx={{
               maxWidth: '100%',
               display: { xs: 'none', sm: 'flex' },
               justifyContent: 'space-between',
               flexDirection: ['column', 'column', 'row'],
               mt: [2.5],
            }}
         >
            <Typography
               style={{ flex: 1 }}
               sx={{
                  fontWeight: 600,
                  color: '#000000',
                  fontSize: {
                     xs: '1.5rem',
                     lg: '1.8rem',
                  },
               }}
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
                     mb: 0,
                  },
               }}
            >
               <Typography
                  variant='body1'
                  gutterBottom
                  fontWeight='bold'
                  color='black'
                  py='2'
               >
                  Consumer Sharable Link
               </Typography>
               <CopyText title={`${`portfolio/${portfolioData.slug}`}`} />
            </Box>
         </Flex>
         <Grid container rowSpacing={2}>
            <Grid item xs={12} sm={12} md={6}>
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: { xs: 'start', sm: 'center' },
                     position: 'relative',
                  }}
               >
                  <div>
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
                  </div>

                  <Box sx={{ flexGrow: 1, ml: 3.5, mt: 0.2 }}>
                     <Typography variant='h5' sx={{ fontWeight: 600 }}>
                        {portfolioData.name}
                     </Typography>
                     <Box
                        sx={{
                           mt: 1,
                           display: { xs: 'block', sm: 'none' },
                        }}
                     >
                        {/* //? review section needs to be improved */}

                        <Box
                           sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                           }}
                        >
                           {[...Array(5)].map((el) => (
                              <img src={StarIcon} alt='star icon' />
                           ))}

                           <Typography>(100)</Typography>
                        </Box>
                        <Box
                           sx={{
                              mt: 2,
                              display: 'flex',
                              justifyContent: 'start',
                              columnGap: 2.5,
                           }}
                        >
                           <a
                              href={`tel:${portfolioData.mobile}`}
                              className='portFolioSmallIcons'
                           >
                              <img
                                 style={{ width: '25px' }}
                                 src={phoneIcon}
                                 alt='phone icon'
                              />
                           </a>
                           <a
                              href={`mailto:${portfolioData.email}`}
                              className='portFolioSmallIcons'
                           >
                              <img
                                 style={{ width: '25px' }}
                                 src={mailIcon}
                                 alt='mail icon'
                              />
                           </a>
                           <span
                              // href={`https://www.google.com/maps/place/${portfolioData.city}`}
                              onClick={handleAddressCopying}
                              target='_blank'
                              className='portFolioSmallIcons'
                              alt='google maps'
                              rel='noopener noreferrer'
                           >
                              <img
                                 style={{ width: '22px' }}
                                 src={locationIcon}
                                 alt='google maps'
                              />
                           </span>
                        </Box>
                     </Box>
                  </Box>
               </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} sx={{ alignSelf: 'center' }}>
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: ['flex-start', 'flex-start', 'flex-end'],
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
                           color: '#0173BB',
                           borderRadius: 4,
                           bgcolor: '#C9E7F7',
                           fontWeight: 600,
                           fontSize: '1.1rem',
                           mb: 1,
                        }}
                     />
                  ))}
               </Box>
            </Grid>
            <Grid
               item
               sx={{
                  display: { xs: 'flex', sm: 'none' },
                  justifyContent: 'center',
               }}
               xs={12}
            >
               <RoundedDarkButton
                  style={{ fontSize: '0.8rem' }}
                  title={'After Sales & Service Policy'}
                  onClick={() => setShowMobileAfterSale(true)}
               />
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
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
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
                           {portfolioData.location}-{portfolioData.pincode}
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
                              href={`tel:${portfolioData.mobile}`}
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
                              href={`mailto:${portfolioData.email}`}
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
                              sx={{ fontWeight: 600, mb: 1 }}
                           >
                              Certification
                           </Typography>
                        )}

                        {portfolioData.certificates?.map(
                           ({ name, file }, i) =>
                              i < 4 && (
                                 <DownloadChip
                                    label={name}
                                    onClick={() => console.log('Clicked')}
                                    component='a'
                                    href={file}
                                    target='_blank'
                                    sx={{
                                       mb: 1,
                                    }}
                                 />
                              )
                        )}
                     </Box>
                  </Box>
                  
                  {portfolioData?.solar_subsidy && (
                     <Box
                        sx={{
                           backgroundColor: '#FFD05B',
                           borderRadius: 3.9,
                           border: 3,
                           mt: 3.9,
                           p: 1,
                           width: '100%',
                           maxWidth: 400,
                        }}
                     >
                        <Typography
                           sx={{
                              fontWeight: 600,
                              fontSize: '1rem',
                              my: 1,
                           }}
                        >
                           Empanelled Member (You provide solar subsidy)
                        </Typography>
                     </Box>
                  )}

                  {matches && (
                     <DashboardUpperTabs
                        portfolioData={portfolioData}
                        videoUrl={videoUrl}
                        aboutTextExpanded={aboutTextExpanded}
                        setAboutTextExpanded={setAboutTextExpanded}
                        // showDetailedDialog={() => setAboutTextExpanded(true)}
                        // removeDetailedDialog={() => setAboutTextExpanded(false)}
                     />
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
                        // onClick={handleOpen}
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
                                 <span style={{ fontSize: '1.2rem' }}>
                                    GST Verified
                                 </span>
                              }
                              placement='top'
                              arrow
                           >
                              <img
                                 style={{
                                    marginLeft: '1rem',
                                    marginBottom: '8px',
                                 }}
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
               sx={{
                  display: { xs: 'none', sm: 'flex' },
                  justifyContent: 'flex-end',
               }}
               xs={12}
            >
               <RoundedDarkButton
                  title={'After Sales & Service Policy'}
                  onClick={handleAfterSalePolicyModalOpen}
               />
            </Grid>
         </Grid>

         {/* DETAIL MODAL  */}
         <Dialog
            hideBackdrop={true}
            sx={{ top: '0' }}
            fullScreen
            open={aboutTextExpanded}
            onClose={handleTextExpandClose}
         >
            <Box>
               <Box
                  sx={modalTopBackButtonStyle}
                  onClick={() => setAboutTextExpanded(false)}
               >
                  <KeyboardBackspace />
                  <Box>Back</Box>
               </Box>
               <CompanyModalContents
                  portfolioData={portfolioData}
                  videoUrl={videoUrl}
               />
            </Box>
         </Dialog>
         <CustomModal
            open={openAfterSalePolicyModal}
            handleClose={() => setOpenAfterSalePolicyModal(false)}
            modalText={portfolioData.return_policy}
         />
      </Box>
   );
}

export default DashboardUpperSection;
