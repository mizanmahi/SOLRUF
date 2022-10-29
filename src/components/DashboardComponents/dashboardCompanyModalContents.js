import { Tooltip, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { DownloadChip } from '../CustomerDetailsDrawer/customerDetailsDrawer.style';
import { useScrollPosition } from '../../hooks/useScrollPosition';
function CompanyModalContents({ portfolioData, videoUrl }) {
   const [tabValue, setTabValue] = React.useState(0);

   console.log('portfolioData', portfolioData);

   const match400 = useMediaQuery('(max-width:400px)');

   const handleChange = (e, newValue) => {
      setTabValue(newValue);
   };
   const [scrollIndex, setScrollIndex] = React.useState(0);
   const [showTooltip2, setShowTooltip2] = React.useState(false);

   const companyRef = React.useRef(null);
   const aboutRef = React.useRef(null);
   const certificatesRef = React.useRef(null);

   const scrollPosition = useScrollPosition();
   console.log({ scrollPosition });

   useEffect(() => {
       
      if (scrollIndex === 2)
         certificatesRef?.current?.scrollIntoView({ behavior: 'smooth' });
      if (scrollIndex === 1)
         aboutRef?.current?.scrollIntoView({ behavior: 'smooth' });
      if (scrollIndex === 0){
        companyRef?.current?.scrollIntoView(0, 0, );
      }
        //  companyRef?.current?.scrollIntoView(true);
        //  window.scrollBy(0, -100);

        

   }, [scrollIndex]);


   return (
      <Box>
         <Tabs
            sx={{
               position: 'sticky',
               top: '35px',
               bgcolor: '#fff',
               zIndex: 100,
               width: '100%',
            }}
            value={tabValue}
            centered
            onChange={handleChange}
            variant={
                match400 ? 'scrollable' : 'standard'
            }

            
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
               onClick={(e) => {
                  setScrollIndex(0);
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
               onClick={(e) => {
                  setScrollIndex(1);
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
               onClick={(e) => {
                  setScrollIndex(2);
               }}
            />
         </Tabs>
         <Box sx={{
            scrollBehavior: 'smooth',
         }}>
            {/* COMPANY */}
            <Box sx={{ pt: 3,    scrollBehavior: 'smooth', }} ref={companyRef} >
               <Box sx={{ pl: 5 }}>
                  <Box
                     sx={{
                        textAlign: 'start',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                     }}
                  >
                     {' '}
                     Company Details:{' '}
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
                        open={showTooltip2}
                        onOpen={() => setShowTooltip2(true)}
                        onClose={() => setShowTooltip2(false)}
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
                           onClick={() => setShowTooltip2(!showTooltip2)}
                           style={{
                              marginLeft: '1rem',
                           }}
                           src='https://i.ibb.co/pWNNjTt/vecteezy-profile-verification-check-marks-icons-vector-illustration-1-3.png'
                           alt=''
                        />
                     </Tooltip>
                  </Typography>
               </Box>
            </Box>
            {/* ABOUT */}
            <Box ref={aboutRef} sx={{ pt: 3 }}>
               <Box
                  sx={{
                     p: 3.9,
                     bgcolor: '#F4F0E4',
                  }}
               >
                  <Box
                     sx={{
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        p: 1,
                     }}
                  >
                     About:
                  </Box>
                  <Box
                     sx={{
                        bgcolor: '',
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
                     sx={{ fontSize: '1rem', mt: 1 }}
                     onClick={() => {}}
                  >
                     {portfolioData.description}
                  </Typography>
               </Box>
            </Box>
            {/* CERTIFICATION */}
            <Box
               ref={certificatesRef}
               sx={{
                  textAlign: 'center',
                  bgcolor: 'white',
                  py: 2,
                  px: 1,
               }}
            >
               <Box
                  sx={{
                     textAlign: 'start',
                     fontWeight: 'bold',
                     fontSize: '1.1rem',
                     p: 1,
                  }}
               >
                  {' '}
                  Certificate
               </Box>
               {portfolioData.certificates.map((certificate, index) => {
                  return (
                     <DownloadChip
                        label={certificate?.name}
                        component='a'
                        href={certificate?.file}
                        target='_blank'
                     />
                  );
               })}
            </Box>
            {/* DESCRIPTION */}
         </Box>
      </Box>
   );
}

export default CompanyModalContents;
