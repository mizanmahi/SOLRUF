import { Container, Dialog } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, Suspense, useEffect, useState } from 'react';

import CustomModal from '../../../components/CustomModal/CustomModal';
import ProjectsPage from '../../ProjectsPage/ProjectsPage';
import { axiAuth } from '../../../utils/axiosInstance';

// import MyPortfolio from '../../MyPortfolio/MyPortfolio';
import { motion } from 'framer-motion';
import Loader from '../../../components/Loader/Loader';
import CreatePortfolio from '../../../components/CreatePortfolio/CreatePortfolio';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCreatePortfolio } from '../../../redux/slices/portfolio.slice';
import UpdatePortfolio from '../../MyPortfolio/UpdatePortfolio';
import VideoModal from '../../../components/VideoModal/VideoModal';

import { KeyboardBackspace } from '@mui/icons-material';
import { modalTopBackButtonStyle } from '../../../theme/modalTopBackButtonStyle';
import DashboardUpperSection from '../../../components/DashboardComponents/dashboardUpperSection';
import CopyText from '../../../components/CopyText/CopyText';
import { lazy } from 'react';
import { formatYoutubeVideoUrl } from '../../../utils/utils';

const MyPortfolio = lazy(() => import('../../MyPortfolio/MyPortfolio'));

const DashboardPortfolio = () => {
   const dispatch = useDispatch();

   const [open, setOpen] = useState(false);

   const { createPortfolio } = useSelector((state) => state.portfolio);

   const [portfolioData, setPortfolioData] = useState({});
   const [profileDataLoading, setProfileDataLoading] = useState(true);

   const [editPortfolio, setEditPortfolio] = useState(false);
   const [showMobileAfterSale, setShowMobileAfterSale] = useState(false);

   // const [showTooltip2, setShowTooltip2] = useState(false);
   const handleClose = () => setOpen(false);

   const editButtonHandler = () => {
      setEditPortfolio(true);
   };

   const portfolioOnUpdateHandler = () => {
      console.log(showEditModal);
      if (showEditModal) {
         setShowEditModal(false);
      } else {
         setEditPortfolio(false);
      }
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
   }, [createPortfolio, editPortfolio, dispatch]);

   const [openAfterSalePolicyModal, setOpenAfterSalePolicyModal] =
      useState(false);
   const [showEditModal, setShowEditModal] = useState(false);

   // const handleAfterSalePolicyModalOpen = () => {
   //    setOpenAfterSalePolicyModal(true);
   // };
   const handleAfterSalePolicyModalClose = () =>
      setOpenAfterSalePolicyModal(false);

   const handleHideEditModal = () => {
      setShowEditModal(false);
   };

   const createPortfolioHandler = () => {
      dispatch(setCreatePortfolio(true));
   };

   // youtube video url fixing to show the preview
   const videoUrl = formatYoutubeVideoUrl(portfolioData?.video_url);

   if (createPortfolio) {
      return (
         <Container maxWidth='xl' sx={{ mt: 2.5 }}>
            <Suspense fallback={<Loader />}>
               <MyPortfolio createPortfolio={true} />
            </Suspense>
         </Container>
      );
   }

   return (
      <>
         {profileDataLoading ? (
            <Loader />
         ) : portfolioData?.name ? (
            <Container maxWidth='xl' sx={{ p: [0, 2], mt: 1 }} disableGutters>
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
                  <Fragment>
                     <DashboardUpperSection
                        setShowEditModal={setShowEditModal}
                        portfolioData={portfolioData}
                        videoUrl={videoUrl}
                        editButtonHandler={editButtonHandler}
                        setShowMobileAfterSale={setShowMobileAfterSale}
                     />
                  </Fragment>
               )}

               <Box
                  sx={{
                     display: { xs: 'block', sm: 'none', marginTop: '54px' },
                     px: '0.5rem',
                  }}
               >
                  <Typography
                     variant='h6'
                     fontWeight={600}
                     component='h2'
                     gutterBottom
                  >
                     Consumer Sharable Link
                  </Typography>
                  <CopyText title={`portfolio/${portfolioData.slug}`} />
               </Box>

               <CustomModal
                  open={openAfterSalePolicyModal}
                  handleClose={handleAfterSalePolicyModalClose}
                  modalText={portfolioData.return_policy}
               />
               <ProjectsPage vendorSlug={portfolioData?.slug} />
            </Container>
         ) : (
            <Container maxWidth='xl' sx={{ mt: 2.5 }}>
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

         {/* EDIT MODAL FOR MOBILE  */}

         <Dialog
            // TransitionComponent={Transition}
            hideBackdrop={true}
            sx={{ top: '100' }}
            fullScreen
            open={showEditModal}
            onCLose={handleHideEditModal}
         >
            <Box>
               <Box sx={modalTopBackButtonStyle} onClick={handleHideEditModal}>
                  <KeyboardBackspace />
                  <Box>Back</Box>
               </Box>
               <Box sx={{ pb: 25 }}>
                  <UpdatePortfolio
                     portfolioData={portfolioData}
                     mobileView
                     setShowEditModal={setShowEditModal}
                     showEditModal={showEditModal}
                     portfolioOnUpdateHandler={portfolioOnUpdateHandler}
                  />
               </Box>
            </Box>
         </Dialog>

         {/* AFTER SALE MODAL FOR MOBILE */}
         <Dialog
            // TransitionComponent={Transition}
            hideBackdrop={true}
            // sx={{ top: '0' }}
            fullScreen
            open={showMobileAfterSale}
            onCLose={() => setShowMobileAfterSale(false)}
         >
            <Box
               sx={modalTopBackButtonStyle}
               onClick={() => setShowMobileAfterSale(false)}
            >
               <KeyboardBackspace />
               <Box>Back</Box>
            </Box>

            <Grid container spacing={1} alignItems='center'>
               <Grid item xs={12} md={6}>
                  <Box sx={{ px: 3 }}>
                     <img
                        src='https://res.cloudinary.com/dpfoirokh/image/upload/v1656264426/8590_1_fdgn0z.svg'
                        alt=''
                        style={{ maxWidth: '100%' }}
                     />
                  </Box>
               </Grid>
               <Grid item xs={12} md={6}>
                  <Box sx={{ px: 3 }}>
                     <Typography
                        variant='h4'
                        textAlign='center'
                        fontWeight='bold'
                     >
                        After Sale And Service Policy
                     </Typography>
                     <Typography
                        sx={{
                           mt: 2,
                           maxHeight: '400px',
                           overflowY: 'auto',
                        }}
                     >
                        {portfolioData.return_policy}
                     </Typography>
                  </Box>
               </Grid>
            </Grid>
         </Dialog>
      </>
   );
};

export default DashboardPortfolio;
