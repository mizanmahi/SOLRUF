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

import './haryana.style.css';

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

const TableWrapper = styled(Box)(({ theme }) => ({
   background: theme.palette.secondary.light,
   padding: '2rem',
   boxShadow: '0 4px 10px rgba(0,0,0,0.1)',

   borderRadius: '10px',
   margin: '3rem auto',
   width: '100%',
   overflowX: 'auto',
}));

const TableBox = styled(Box)(({ theme }) => ({
   minWidth: '700px',
   justifyContent: 'center',
   display: 'grid',
   gridTemplateColumns: '2fr repeat(3, 1fr)',
   gridGap: '1rem',
}));

const DataBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   padding: '1rem',
   background: '#ffffff',
   color: '#000000',
   borderRadius: '5px',
   fontWeight: '600',
   fontFamily: 'inherit',
}));

const DataBox2 = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   padding: '1rem',
   background: '#666f73',
   color: '#ffffff',
   borderRadius: '5px',
   fontWeight: '600',
   fontFamily: 'inherit',
}));

const Haryana = () => {
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
            subtitle='HARYANA'
            icon={<LocationOnIcon sx={{ fontSize: '40px' }}></LocationOnIcon>}
         />

         <Container maxWidth='lg'>
            <Para>
               Haryana is an agrarian state with several geographical
               constraints such as high cost and paucity of barren land within
               its borders, with low potential for wind or hydropower. The state
               has shifted focus mainly on rooftop solar projects and
               small-scale distributed solar systems besides exploring the
               potential of megawatt-scale solar projects and parks. The last
               budget had announced a scheme to install 50,000 off-grid solar
               pumps of 3 HP to 10 HP capacity in the State, with installation
               of 15,000 pumps and 35,000 pumps in two phases. The State
               government under the Pradhan Mantri Kisan Urja Surksha Evam
               Utthan Mahabhiyaan (PM-KUSUM) Scheme is providing 75% subsidy, of
               which 30% subsidy is provided under PM-KUSUM and 45% from the
               state. The state of Haryana has set a target of 3200 MW of solar
               power to be generated by the year 2021-22. The current installed
               and commissioned solar capacity of the state is 73.27 MW.
            </Para>

            <BlogTitledBox
               title='Parties eligible for net metering policy'
               sx={{ mr: 3 }}
               variant='tertiary'
            >
               <ListingWithHand>
                  <span>👉</span>
                  he eligible consumer shall be within the permissible rated
                  capacity as defined under these Regulations
               </ListingWithHand>

               <ListingWithHand>
                  <span>👉</span>
                  The eligible consumer shall be located in the consumer
                  premises;
               </ListingWithHand>
               <ListingWithHand>
                  <span>👉</span>
                  The eligible consumer shall interconnect and operate safely in
                  parallel with the distribution licensee’s network.
               </ListingWithHand>
            </BlogTitledBox>

            <BlogTitledBox
               title='Net-metering policy arrangement,'
               sx={{ mr: 3 }}
               variant='tertiary'
            >
               <Para sx={{ mb: 3 }}>
                  Consumers across all categories including residential,
                  commercial and industrial are now allowed to set-up solar
                  projects with a maximum capacity of 2 MW. However, this comes
                  with the condition that solar projects within the range of 1
                  to 2 MW must have 25% battery storage that should be able to
                  store and deliver energy for 2 hours.
               </Para>
               <ListingWithHand>
                  <span>👉</span>
                  The distribution capacity of transformers has been increased
                  from 30% and 15% to 50% and 30% for LT and HT consumers
                  respectively.
               </ListingWithHand>

               <ListingWithHand>
                  <span>👉</span>
                  The DISCOMs will continue to provide net-metering arrangements
                  to eligible consumers on a non-discriminatory and
                  first-come-first-serve basis, as long as the total capacity of
                  rooftop solar systems does not exceed 500 MW, up from the
                  figure of 200 MW.
               </ListingWithHand>
               <ListingWithHand>
                  <span>👉</span>
                  Rooftop solar systems commissioned under these regulations,
                  whether self-owned or third-party owned, will be exempted from
                  all wheeling, cross-subsidy, transmission, distribution, and
                  banking charges and surcharges.
               </ListingWithHand>
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
                           <Typography>
                              Visit “Dakshin haryana bijli vitran nigam”
                              (DHBVN):
                           </Typography>
                           <Button
                              endIcon={<OpenInNewIcon />}
                              component='a'
                              target='_blank'
                              href='https://dhbvn.org.in/web/portal/home'
                              sx={{ mt: 2, color: 'blue' }}
                           >
                              Click Here
                           </Button>
                        </li>
                        <li>
                           <Typography>
                              Apply for the “Solar Connection” and fill up the
                              application form. During application filing,
                              please note that in Haryana “the name of applicant
                              on electricity bill and property registry should
                              be same”
                           </Typography>
                        </li>
                        <li>
                           <Typography>
                              After submitting the application form, pay the
                              incurred Challan on the ePayment website of DHBVN:
                              epayment.dhbvn.org.in. Check the application
                              status from time to time.
                           </Typography>
                        </li>
                     </Ol>
                  </ApprovalBox>
               </Grid>
               <Grid item xs={12} md={6}>
                  <DocumentBox>
                     <UtilityList>
                        <DoneIcon />
                        <Typography>Identity Proof (both)</Typography>
                     </UtilityList>
                     <UtilityList>
                        <DoneIcon />
                        <Typography>Pan Card</Typography>
                     </UtilityList>
                     <UtilityList>
                        <DoneIcon />
                        <Typography>Aadhaar Card</Typography>
                     </UtilityList>
                     <UtilityList>
                        <DoneIcon />
                        <Typography>Residence/ Address Proof</Typography>
                     </UtilityList>
                     <UtilityList>
                        <DoneIcon />
                        <Typography>Site Address Proof</Typography>
                     </UtilityList>
                     <UtilityList>
                        <DoneIcon />
                        <Typography>
                           Aadhar card and any other document if address differ
                           from Aadhar card
                        </Typography>
                     </UtilityList>
                     <UtilityList>
                        <DoneIcon />
                        <Typography>Electricity Bill</Typography>
                     </UtilityList>
                     <UtilityList>
                        <DoneIcon />
                        <Typography>Photograph of site</Typography>
                     </UtilityList>
                     <UtilityList>
                        <DoneIcon />
                        <Typography>
                           For other than domestic sector: Registration
                           Certificate, Proof of being institute/ social
                           organization
                        </Typography>
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
                  The Government is providing Financial Assistance for the
                  installation of Grid Connected Rooftop Solar Power Plants at
                  rate of 30% of the cost/ benchmark cost (including the Central
                  Financial Assistance (CFA) of MNRE, if available) or Rs.
                  20000/- per kWp, whichever is less, for installation of the
                  grid connected rooftop solar power plant ranging from 1 KWp to
                  500 KWp to the eligible categories. The benchmark cost shall
                  be taken as the cost of the system finalized for installation
                  of the grid connected rooftop SPV power plants for government
                  sector buildings.
               </Para>
            </BlogTitledBox>

          <TableWrapper>
          <TableBox>
               <DataBox2>Capacity</DataBox2>
               <DataBox2>1 KWP</DataBox2>
               <DataBox2>100 KWP</DataBox2>
               <DataBox2>500 KWP</DataBox2>

               <DataBox2>Approximate Cost of System (Rs.)</DataBox2>
               <DataBox>49500</DataBox>
               <DataBox>4170000</DataBox>
               <DataBox>2012500</DataBox>

               <DataBox2>Financial Assistance</DataBox2>
               <DataBox>14850</DataBox>
               <DataBox>12510000</DataBox>
               <DataBox>6037500</DataBox>

               <DataBox2>Approximate User Cost (Rs.)</DataBox2>
               <DataBox>34650</DataBox>
               <DataBox>2919000</DataBox>
               <DataBox>14087500</DataBox>

               <DataBox2>Life (yrs.)</DataBox2>
               <DataBox>25</DataBox>
               <DataBox>25</DataBox>
               <DataBox>25</DataBox>

               <DataBox2>Electricity Generation (KWh)</DataBox2>
               <DataBox>1500</DataBox>
               <DataBox>150000</DataBox>
               <DataBox>750000</DataBox>

               <DataBox2>
                  Approximate annual saving on energy (Rs.) (Tariff taken as Rs.
                  7.5 per unit)
               </DataBox2>
               <DataBox>11250</DataBox>
               <DataBox>111250000</DataBox>
               <DataBox>5625000</DataBox>

               <DataBox2>Payback period (Yrs.)*</DataBox2>
               <DataBox>3.08</DataBox>
               <DataBox>2.6</DataBox>
               <DataBox>2.5</DataBox>
            </TableBox>
            <Typography sx={{mt: 1, fontWeight: 600}}>*Payback period has been calculated assuming availability of subsidy.</Typography>
          </TableWrapper>

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
                           CAPACITY OF SOLAR SYSTEM
                        </Typography>

                        <GrayBox>
                           <ul>
                              <li>
                                 <Typography>Size:=2 MW</Typography>
                              </li>
                              <li>
                                 <Typography>
                                    From 1 to 2MW, there is a mandate to have
                                    25% battery storage that should be able to
                                    store and deliver energy for 2 hours.
                                 </Typography>
                              </li>
                              <li>
                                 <Typography>
                                    Conditions:=100% of your Sanctioned Load
                                 </Typography>
                              </li>

                              <li>
                                 <Typography>
                                    Cumulative capacity of all solar systems
                                    installed in your area shall not exceed 50%
                                    of Local Distribution transformer capacity
                                    in your area.
                                 </Typography>
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
                                 <Typography>Annual settlement</Typography>
                              </li>
                           </ul>
                        </GrayBox>
                     </Box>
                     <Box sx={{ mt: 4 }}>
                        <Typography
                           sx={{ fontSize: '2rem', fontWeight: 'bold', mb: 1 }}
                        >
                           OTHERS
                        </Typography>

                        <GrayBox>
                           <ul>
                              <li>
                                 <Typography>
                                    Mandatory for new residential buildings
                                    having plot size more than 500 sq. yards to
                                    install 3% to 5% capacity of their
                                    Sanctioned Load on solar.
                                 </Typography>
                              </li>
                              <li>
                                 <Typography>
                                    No permission is required from the building
                                    plan sanctioning authority forsetting up of
                                    rooftop solar power plants.
                                 </Typography>
                              </li>
                              <li>
                                 <Typography>
                                    Electricity taxes, cess, electricity duty,
                                    wheeling charges, cross subsidy charges,
                                    transmission and distribution charges:
                                    totally waived off for Rooftop Solar
                                    Projects.
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
                           CAPACITY OF SOLAR SYSTEM
                        </Typography>

                        <GrayBox>
                           <ul>
                              <li>
                                 <Typography>Size:=2 MW</Typography>
                              </li>
                              <li>
                                 <Typography>
                                    From 1 to 2MW, there is a mandate to have
                                    25% battery storage that should be able to
                                    store and deliver energy for 2 hours.
                                 </Typography>
                              </li>
                              <li>
                                 <Typography>
                                    Conditions:=100% of your Sanctioned Load
                                 </Typography>
                              </li>

                              <li>
                                 <Typography>
                                    Cumulative capacity of all solar systems
                                    installed in your area shall not exceed 50%
                                    of Local Distribution transformer capacity
                                    in your area.
                                 </Typography>
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
                                 <Typography>Annual settlement</Typography>
                              </li>
                           </ul>
                        </GrayBox>
                     </Box>
                     <Box sx={{ mt: 4 }}>
                        <Typography
                           sx={{ fontSize: '2rem', fontWeight: 'bold', mb: 1 }}
                        >
                           OTHERS
                        </Typography>

                        <GrayBox>
                           <ul>
                              <li>
                                 <Typography>
                                    Mandatory for all Commercial complexes,
                                    Offices, Malls, etc. (existing as well as
                                    new buildings) having Connected Load of 50
                                    kW and above to install 3% to 5% capacity of
                                    their Connected Load of solar.
                                 </Typography>
                              </li>
                              <li>
                                 <Typography>
                                    No permission is required from the building
                                    plan sanctioning authority for setting up
                                    rooftop solar power plants.
                                 </Typography>
                              </li>
                              <li>
                                 <Typography>
                                    Electricity taxes, cess, electricity duty,
                                    wheeling charges, cross subsidy charges,
                                    transmission and distribution charges:
                                    totally waived off for Rooftop Solar
                                    Projects.
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

export default Haryana;
