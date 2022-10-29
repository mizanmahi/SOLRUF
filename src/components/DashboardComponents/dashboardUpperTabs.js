import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/system';
import { motion } from 'framer-motion';
import { Tooltip, Typography, IconButton, useMediaQuery } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { DownloadChip } from '../CustomerDetailsDrawer/customerDetailsDrawer.style';
import PrimaryButton from '../Custom/PrimaryButton/PrimaryButton';

function DashboardUpperTabs({
   portfolioData,
   videoUrl,
   setAboutTextExpanded,
   aboutTextExpanded,
}) {
   const [showTooltip, setShowTooltip] = React.useState(false);
   const [tabValue, setTabValue] = React.useState(0);

   console.log('portfolioData', portfolioData);

   const handleChange = (e, newValue) => {
      setTabValue(newValue);
   };

   // const matchSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
   const match400 = useMediaQuery('(max-width:400px)');

   return (
      <Box
         sx={{
            mt: 2,
            position: 'relative',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
         }}
      >
         <Box
            sx={{
               height: '100%',
               borderRadius: 1,
               boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
            }}
         >
            <Tabs
               value={tabValue}
               onChange={handleChange}
               variant={match400 ? 'scrollable' : 'standard'}
               // scrollButtons="auto"
               aria-label='details tabs'
               centered
               sx={{
                  bgcolor: '#fff',
                  borderTop: '0px solid transparent',
                  borderBottom: '1px solid transparent',
                  borderRight: 0,
                  borderLeft: 0,
                  boxShadow: '0px 4px 5px rgba(0, 0, 0, 0)',
                  borderRadius: '8px 8px 0 0',
                  justifyContent: 'center',
                  // maxWidth: '500px',
               }}
            >
               <Tab
                  label='Company Details'
                  sx={{
                     borderBottom: '1px solid black',
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
                     borderBottom: '1px solid black',
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
                     borderBottom: '1px solid black',
                     fontSize: '.8rem',

                     '&.Mui-selected': {
                        fontWeight: 'bold',
                        color: 'secondary.main',
                     },
                  }}
               />
            </Tabs>
         </Box>
         <Box
            sx={{
               backgroundColor: '#fff',
               height: '380px',
               borderRadius: 1,
            }}
         >
            {/* ============ content of different tabs for mobile version */}
            {tabValue === 0 && (
               <motion.div
                  initial={{ x: '10vw', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
               >
                  <Box sx={{ pl: 5, py: 2 }}>
                     <Box
                        sx={{
                           textAlign: 'center',
                           fontWeight: 'bold',
                           fontSize: '1.1rem',
                        }}
                     >
                        {' '}
                        {portfolioData.name}{' '}
                     </Box>
                     <Typography sx={{ mb: 2, mt: 4 }}>
                        <span style={{ fontWeight: '600' }}>Turn Over: -</span>
                        {`${portfolioData.turnover} ${portfolioData.turnover_type}/Year`}
                     </Typography>
                     <Typography sx={{ mb: 2 }}>
                        <span style={{ fontWeight: '600' }}>
                           Total Projects: -
                        </span>
                        {portfolioData.total_projects}
                     </Typography>
                     <Typography sx={{ mb: 2 }}>
                        <span style={{ fontWeight: '600' }}>GST No: -</span>
                        {portfolioData.gst}
                        <Tooltip
                           open={showTooltip}
                           onOpen={() => setShowTooltip(true)}
                           onClose={() => setShowTooltip(false)}
                           title={
                              <div
                                 style={{
                                    color: 'lightblue',
                                    fontSize: '10px',
                                 }}
                              >
                                 GST Verified
                              </div>
                           }
                           placement='top'
                           arrow
                        >
                           <img
                              onClick={() => setShowTooltip(!showTooltip)}
                              style={{
                                 marginLeft: '1rem',
                              }}
                              src='https://i.ibb.co/pWNNjTt/vecteezy-profile-verification-check-marks-icons-vector-illustration-1-3.png'
                              alt=''
                           />
                        </Tooltip>
                     </Typography>
                     <PrimaryButton onClick={() => setAboutTextExpanded(true)}>
                        View more
                     </PrimaryButton>
                  </Box>
               </motion.div>
            )}
            {tabValue === 1 && (
               <motion.div
                  initial={{ x: '10vw', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
               >
                  <Box
                     sx={{
                        py: 3.9,
                        px: 5,
                        mb: 3.5,
                        borderRadius: 2,
                     }}
                  >
                     <Box
                        sx={{
                           position: 'relative',
                        }}
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
                     </Box>
                     <Typography
                        sx={{
                           fontSize: '1.1rem',
                           mt: 1,
                        }}
                     >
                        {portfolioData.description.length > 50
                           ? portfolioData.description.slice(0, 50) + '...'
                           : portfolioData.description}
                     </Typography>

                     <PrimaryButton
                        onClick={() => setAboutTextExpanded(!aboutTextExpanded)}
                        sx={{
                           mt: 1,
                        }}
                     >
                        View more
                     </PrimaryButton>
                  </Box>
               </motion.div>
            )}
            {tabValue === 2 && (
               <motion.div
                  style={{ height: '100%' }}
                  initial={{ x: '10vw', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
               >
                  <Box
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                     }}
                  >
                     {portfolioData.certificates?.map((certificate) => (
                        <DownloadChip
                           label={certificate?.name}
                           onClick={() => console.log('Clicked')}
                           component='a'
                           href={certificate?.file}
                           target='_blank'
                           sx={{
                              mb: 1,
                           }}
                        />
                     ))}
                  </Box>
               </motion.div>
            )}
         </Box>
         <IconButton
            aria-label='delete'
            sx={{
               bgcolor: '#FFD05B',
               position: 'absolute',
               top: '50%',
               left: '5px',
               height: '30px',
               width: '30px',
               '& > svg': {
                  fontSize: '18px',
               },
               '&:focus': {
                  outline: 'none',
                  bgcolor: '#FFD05B',
               },
            }}
            onClick={(e) => setTabValue(tabValue - 1 >= 0 ? tabValue - 1 : 2)}
         >
            <ArrowBackIosNew />
         </IconButton>
         <IconButton
            aria-label='delete'
            sx={{
               bgcolor: '#FFD05B',
               position: 'absolute',
               top: '50%',
               height: '30px',
               width: '30px',
               right: '5px',
               '& > svg': {
                  fontSize: '18px',
               },
               '&:focus': {
                  outline: 'none',
                  bgcolor: '#FFD05B',
               },
            }}
            onClick={(e) => setTabValue(tabValue + 1 < 3 ? tabValue + 1 : 0)}
         >
            <ArrowForwardIos />
         </IconButton>
      </Box>
   );
}

export default DashboardUpperTabs;
