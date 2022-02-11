import {
   Box,
   Button,
   Container,
   Grid,
   styled,
   Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import BlogIntroSection from '../../../../components/BlogIntroSection/BlogIntroSection';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BlogTitledBox from '../../../../components/BlogTitledBox/BlogTitledBox';
import DoneIcon from '@mui/icons-material/Done';
import YellowButton from '../../../../components/YellowButton/YellowButton';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const Wrapper = styled(Box)(({ theme }) => ({
   paddingBottom: '2rem',
   background: '#F3F3F3',
}));

const Para = styled(Typography)(({ theme }) => ({
   color: '#000000',
}));

const ListingWithHand = styled(Typography)(({ theme }) => ({
   color: '#000000',
   display: 'flex',
   alignItems: 'top',
   marginBottom: '2rem',
   '&:last-child': {
      marginBottom: 0,
   },
   '& span': {
      marginRight: '1rem',
   },
}));

const ApprovalBox = styled(Box)(({ theme }) => ({
   boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
   borderRadius: '10px',
   overflow: 'hidden',
   height: '100%',
}));

const DocumentBox = styled(Box)(({ theme }) => ({
   // boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
}));

const Ol = styled('ol')(({ theme }) => ({
   margin: '2rem 0',
   paddingRight: '1rem',
   '& li': {
      color: '#000000',
      marginBottom: '3rem',
      '&:last-child': {
         marginBottom: 0,
      },
   },
   '& li p': {
      color: '#000000',
      fontWeight: 400,
   },
}));

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   '@media (max-width: 600px)': {
    flexDirection: 'column',
    '& p': {
       marginBottom: '1rem',
    }
 }
}));

const UtilityList = styled(Box)(({ theme }) => ({
   borderRadius: '10px',
   boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
   padding: '1rem',
   display: 'flex',
   // justifyContent: 'center',
   marginBottom: '1rem',
   alignItems: 'center',
   '&:last-child': {
      marginBottom: 0,
   },
   '& p': {
      color: '#000000',
      fontWeight: 400,
      fontSize: '1.2rem',
   },
   '& svg': {
      marginRight: '1rem',
      color: 'green',
      fontSize: '2rem',
   },
}));

const ToggleBox = styled(Box)(({ theme }) => ({
   borderRadius: '10px',
   border: '5px solid #ffd05b',
   padding: '2rem 2rem',
   margin: '6rem auto',
   position: 'relative',
   background: '#fff',
}));
const ToggleButtons = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   width: '100%',
   maxWidth: '500px',
   position: 'absolute',
   left: '50%',
   top: 0,
   transform: 'translate(-50%, -100%)',
   '& button': {
      boxShadow: 'none !important',
      fontSize: '1.5rem',
      color: '#000000 !important',
      fontWeight: '600 !important',
      padding: '1rem 1.2rem !important',
      '@media (max-width: 600px)': {
        fontSize: '1.2rem',
        padding: '.5rem .5rem !important',
        maxWidth: '100%',
     }
   },
}));

const GrayBox = styled(Box)(({ theme }) => ({
   background: '#f3f3f3',
   padding: '1rem',
   borderRadius: '10px',
   '& li': {
      marginBottom: '1rem',
      '&:last-child': {
         marginBottom: 0,
      },
   },
   '& p': {
      color: '#000000',
   },
}));

const DownloadButton = styled(Button)(({ theme }) => ({
   background: '#000000',
   color: '#ffffff',
   boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
   padding: '.4rem .5rem',

   '&:hover': {
      background: '#000000',
   },
}));

const WestBengal = () => {
   const [isResidential, setIsResidential] = useState(true);
   const [isCommercial, setIsCommercial] = useState(false);

   const handleResidential = () => {
      setIsResidential(true);
      setIsCommercial(false);
   };

   const handleCommercial = () => {
      setIsResidential(false);
      setIsCommercial(true);
   };
   
   useEffect(() => {
      window.scrollTo(0, 0);
   }, [])
   
   return (
      <Wrapper>
         <BlogIntroSection
            sx={{ mb: 9 }}
            title='NETMETERING POLICY:'
            subtitle='West Bengal'
            icon={<LocationOnIcon sx={{ fontSize: '40px' }}></LocationOnIcon>}
         />

         <Container maxWidth='lg'>
            <Para>
               West Bengal is a pioneer in solar technology in India.
               Government-owned WEBEL was one of the first manufacturers of
               solar energy panels in the country. As the degree of urbanization
               in West Bengal is rapidly growing at the rate of 3.92% (Sultana,
               2015) energy demand is estimated to be at a high. The state
               government has ambitious plans and more than 1300 government
               buildings, hospitals and schools have been identified to help
               install about 180MW of solar in the next couple of years. The
               state has an installed solar capacity of 94 MW as of September
               2019, while 64 MW of solar projects are currently under
               development. It is mandatory for all large housing societies in
               West Bengal, (having a total contract demand of more than 500 kW)
               to install solar rooftop systems to meet a minimum of 1.5% of
               their total electrical load by solar energy. The subsidies are
               applicable as per SECI guidelines.
            </Para>

            <BlogTitledBox
               title='Parties eligible for net metering policy'
               sx={{ mr: 3 }}
               variant='tertiary'
            >
               <ListingWithHand>
                  <span>👉</span>
                  Hospitals / Health centers run by Govt. / Private/ Private
                  charitable organization.
               </ListingWithHand>

               <ListingWithHand>
                  <span>👉</span>
                  Schools / Academic institutions run by Govt./ Private/ Govt.
                  aided
               </ListingWithHand>
               <ListingWithHand>
                  <span>👉</span>
                  Govt. offices / organizations.
               </ListingWithHand>
               <ListingWithHand>
                  <span>👉</span>
                  Local bodies like Municipalities/ Panchayats
               </ListingWithHand>
               <ListingWithHand>
                  <span>👉</span>
                  Housing Complex.
               </ListingWithHand>
               <ListingWithHand>
                  <span>👉</span>
                  Commercial / industrial organizations and any institutions
                  registered under any statute
               </ListingWithHand>
               <ListingWithHand>
                  <span>👉</span>
                  The parties should also be a consumer of WBSEDCL and apply for
                  installation capacity not less than 5KW with a connection type
                  of 3 phase.
               </ListingWithHand>
            </BlogTitledBox>

            <BlogTitledBox
               title='Net-metering policy arrangement,'
               sx={{ mr: 3 }}
               variant='tertiary'
            >
               <Para sx={{ mb: 3 }}>
                  The energy injected by the solar PV system of the customer
                  into the distribution network of the licensee gets adjusted to
                  the maximum extent of 90% against the drawal of energy by the
                  consumer from the grid. The balance of unadjusted injection of
                  energy by the solar PV system, if any, is carried forward to
                  the next billing period. This process of adjustment will be
                  continued for the entire financial year. At the end of the
                  financial year, after effecting the final adjustment for that
                  month, surplus injection from solar PV system will be treated
                  as unwanted / inadvertent injection.
               </Para>
            </BlogTitledBox>

            <Typography
               variant='h4'
               sx={{ fontWeight: 'bold', my: 6, textAlign: 'center' }}
            >
               List of Documents Required
            </Typography>

            <Grid container spacing={3} alignItems='stretch'>
               <Grid item xs={12} md={6}>
                  <ApprovalBox>
                     <Typography
                        sx={{
                           background: '#D0D7D9',
                           py: 2,
                           px: 1,
                           textAlign: 'center',
                           fontSize: '1.3rem',
                           fontWeight: 'bold',
                        }}
                     >
                        Application for Net-Metering approval
                     </Typography>

                     <Ol type='1'>
                        <li>
                           <Typography>Visit the WBSEDCL website:</Typography>
                           <Button
                              endIcon={<OpenInNewIcon />}
                              component='a'
                              target='_blank'
                              href='https://www.wbsedcl.in/irj/go/km/docs/internet/new_website/Home.html'
                              sx={{ mt: 2, color: 'blue' }}
                           >
                              Click Here
                           </Button>
                        </li>
                        <li>
                           <Typography>
                              In the “Rooftop Solar Sources - Net Metering” from
                              the “CONSUMER CORNER” on the homepage, click on
                              the login portal.
                           </Typography>
                        </li>
                        <li>
                           <Typography>
                              In the login portal fill up and submit the ‘Form
                              S1’ for application submission. The application
                              receipt received will be ‘Form S2’
                           </Typography>
                        </li>
                        <li>
                           <Typography>
                              After the application has been approved and passed
                              further for inspection, please file the “Tech
                              feasibility and eligibility report” in the “Form
                              S3”.
                           </Typography>
                        </li>
                        <li>
                           <Typography>
                              After the approval of form S3, please file the
                              ‘Form S6, S7, S8’ for go ahead clearance, draft
                              agreement and work completion report of the
                              installation to finalize the billing mechanism
                              from the electricity board.
                           </Typography>
                        </li>
                     </Ol>
                  </ApprovalBox>
               </Grid>
               <Grid item xs={12} md={6}>
                  <DocumentBox>
                     <UtilityList>
                        <DoneIcon />
                        <Typography>Consumer Id</Typography>
                     </UtilityList>
                     <UtilityList>
                        <DoneIcon />
                        <Typography>
                           Installed Capacity of proposed Solar plant
                        </Typography>
                     </UtilityList>
                     <UtilityList>
                        <DoneIcon />
                        <Typography>Type of Consumer</Typography>
                     </UtilityList>
                     <UtilityList>
                        <DoneIcon />
                        <Typography>
                           Acceptance by the consumer bearing the cost for phase
                           conversion/alteration of service
                        </Typography>
                     </UtilityList>
                     <UtilityList>
                        <DoneIcon />
                        <Typography>
                           Mobile No, Aadhar No(optional), email-id(optional)
                        </Typography>
                     </UtilityList>
                     <UtilityList>
                        <DoneIcon />
                        <Typography>Applicant address.</Typography>
                     </UtilityList>
                  </DocumentBox>
               </Grid>
            </Grid>

            <BlogTitledBox
               title='SOLAR SUBSIDY'
               sx={{ mr: 3 }}
               variant='tertiary'
            >
               <Para sx={{ mb: 3 }}>
                  According to the latest notification by WBSEDCL, 40% of the
                  benchmark cost is provided in accelerated depreciation for
                  solar PV plant installations from capacity of 1 KW to 5 KW.
                  90% of the benchmark cost is provided as discount to farmers
                  for installations of Solar water pumping system.
               </Para>
            </BlogTitledBox>

            {isResidential && (
               <>
                  {' '}
                  <ToggleBox>
                     <ToggleButtons>
                        <YellowButton
                           style={{
                              background: isResidential ? '#ffd05b' : '#D0D7D9',
                           }}
                           onClick={handleResidential}
                        >
                           Residential
                        </YellowButton>
                        <YellowButton
                           style={{
                              background: isCommercial ? '#ffd05b' : '#D0D7D9',
                           }}
                           onClick={handleCommercial}
                        >
                           Commercial
                        </YellowButton>
                     </ToggleButtons>

                     <Box sx={{ mt: 0 }}>
                        <Typography
                           sx={{ fontSize: '2rem', fontWeight: 'bold', mb: 1 }}
                        >
                           ROOFTOP
                        </Typography>

                        <GrayBox>
                           <ul>
                              <li>
                                 <Typography>Mandatory for all large housing societies having a total contract demand of more than 500 kW will be required to install solar rooftop systems to meet at least 1.5% of their total electrical load.</Typography>
                              </li>
                              
                           </ul>
                        </GrayBox>
                     </Box>

                     <Box sx={{ mt: 4 }}>
                        <Typography
                           sx={{ fontSize: '2rem', fontWeight: 'bold', mb: 1 }}
                        >
                           OWNERSHIP OPTIONS
                        </Typography>

                        <GrayBox>
                           <ul>
                              <li>
                                 <Typography>
                                    Self ownership (CAPEX model)
                                 </Typography>
                              </li>
                              <li>
                                 <Typography>
                                    Third party ownership (RESCO model)
                                 </Typography>
                              </li>
                           </ul>
                        </GrayBox>
                     </Box>

                     <Box sx={{ mt: 4 }}>
                        <Typography
                           sx={{ fontSize: '2rem', fontWeight: 'bold', mb: 1 }}
                        >
                           BILLING MECHANISHM
                        </Typography>

                        <GrayBox>
                           <ul>
                              <li>
                                 <Typography>Annual (April to March)
</Typography>
                              </li>
                              <li>
                                 <Typography>
                                 Any unadjusted electricity credits shall be paid as per the rates notified by MERC.
                                 </Typography>
                              </li>
                           </ul>
                        </GrayBox>
                     </Box>
                     
                  </ToggleBox>
               </>
            )}

            {isCommercial && (
               <>
                <ToggleBox>
                     <ToggleButtons>
                        <YellowButton
                           style={{
                              background: isResidential ? '#ffd05b' : '#D0D7D9',
                           }}
                           onClick={handleResidential}
                        >
                           Residential
                        </YellowButton>
                        <YellowButton
                           style={{
                              background: isCommercial ? '#ffd05b' : '#D0D7D9',
                           }}
                           onClick={handleCommercial}
                        >
                           Commercial
                        </YellowButton>
                     </ToggleButtons>

                     <Box sx={{ mt: 0 }}>
                        <Typography
                           sx={{ fontSize: '2rem', fontWeight: 'bold', mb: 1 }}
                        >
                           ROOFTOP
                        </Typography>

                        <GrayBox>
                           <ul>
                              <li>
                                 <Typography>Mandatory for all large housing societies having a total contract demand of more than 500 kW will be required to install solar rooftop systems to meet at least 1.5% of their total electrical load.</Typography>
                              </li>
                              
                           </ul>
                        </GrayBox>
                     </Box>

                     <Box sx={{ mt: 4 }}>
                        <Typography
                           sx={{ fontSize: '2rem', fontWeight: 'bold', mb: 1 }}
                        >
                           OWNERSHIP OPTIONS
                        </Typography>

                        <GrayBox>
                           <ul>
                              <li>
                                 <Typography>
                                    Self ownership (CAPEX model)
                                 </Typography>
                              </li>
                              <li>
                                 <Typography>
                                    Third party ownership (RESCO model)
                                 </Typography>
                              </li>
                           </ul>
                        </GrayBox>
                     </Box>

                     <Box sx={{ mt: 4 }}>
                        <Typography
                           sx={{ fontSize: '2rem', fontWeight: 'bold', mb: 1 }}
                        >
                           BILLING MECHANISHM
                        </Typography>

                        <GrayBox>
                           <ul>
                              <li>
                                 <Typography>Annual (April to March)
</Typography>
                              </li>
                              <li>
                                 <Typography>
                                 Any unadjusted electricity credits shall be paid as per the rates notified by MERC.
                                 </Typography>
                              </li>
                           </ul>
                        </GrayBox>
                     </Box>
                     <Box sx={{ mt: 4 }}>
                        <Typography
                           sx={{ fontSize: '2rem', fontWeight: 'bold', mb: 1 }}
                        >
                           Financial Assistance

                        </Typography>

                        <GrayBox>
                           <ul>
                              <li>
                                 <Typography>
                                 40% Accelerated Depreciation

                                 </Typography>
                              </li>
                              <li>
                                 <Typography>
                                 10 year Tax holiday on solar projects


                                 </Typography>
                              </li>
                              <li>
                                 <Typography>
                                 Loans available for up to Rs.15 Crore for renewable energy projects under Priority sector lending


                                 </Typography>
                              </li>
                              <li>
                                 <Typography>
                                 The host and obligated distribution utilities shall provide revolving Letter of Credit from a nationalized bank as a payment security mechanism for all RE projects.


                                 </Typography>
                              </li>
                            
                           </ul>
                        </GrayBox>
                     </Box>
                  </ToggleBox>
               </>
            )}
            {/* ========= toggle box end ========= */}

            <Typography
               variant='h4'
               sx={{ fontWeight: 'bold', my: 6, textAlign: 'center' }}
            >
               PDF Downloads
            </Typography>

            <Flex sx={{ justifyContent: 'space-between', mb: 4 }}>
               <Typography sx={{ color: '#000000', fontSize: '1.2rem' }}>
                  Maharashtra Net-Metering regulation 2019
               </Typography>
               <DownloadButton
                  endIcon={<DownloadForOfflineIcon />}
                  variant='contained'
               >
                  Document Name
               </DownloadButton>
            </Flex>
            <Flex sx={{ justifyContent: 'space-between', mb: 4 }}>
               <Typography sx={{ color: '#000000', fontSize: '1.2rem' }}>
                  PM-KUSUM Government Resolution 2021
               </Typography>
               <DownloadButton
                  endIcon={<DownloadForOfflineIcon />}
                  variant='contained'
               >
                  Document Name
               </DownloadButton>
            </Flex>
            <Flex sx={{ justifyContent: 'space-between', mb: 4 }}>
               <Typography sx={{ color: '#000000', fontSize: '1.2rem' }}>
                  Methodology for Grid Connected Solar Projects
               </Typography>
               <DownloadButton
                  endIcon={<DownloadForOfflineIcon />}
                  variant='contained'
               >
                  Document Name
               </DownloadButton>
            </Flex>
         </Container>
      </Wrapper>
   );
};

export default WestBengal;
