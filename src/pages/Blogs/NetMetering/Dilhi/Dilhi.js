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
   alignItems: 'center',
   marginBottom: '1rem',
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

const Dilhi = () => {
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
            subtitle='DILHI'
            icon={<LocationOnIcon sx={{ fontSize: '40px' }}></LocationOnIcon>}
         />

         <Container maxWidth='lg'>
            <Para>
               Delhi is blessed with almost 300 sunny days and the rooftop space
               available for solar panels is estimated to be 31 sq. km, giving
               Delhi a solar energy potential of 2500 MWp (annual Generation
               approx. 3,500 million kWh). Of this potential, 26% is in the
               government/public sector, 25% in the commercial/ industrial
               sector, and 49% in the domestic sector. The Renewable Energy
               Service Company model or RESCO is expected to benefit consumers
               like residential, schools, hospitals, and municipal segments
               through its aggregate demand generation.
            </Para>

            <BlogTitledBox
               title='Parties eligible for net metering policy'
               sx={{ mr: 3 }}
               variant='tertiary'
            >
               <ListingWithHand>
                  <span>👉</span>
                  All electricity consumers under all electricity tariffs in
                  Delhi and to all entities that set up and operate power plants
                  in Delhi.
               </ListingWithHand>

               <ListingWithHand>
                  <span>👉</span>
                  All residential buildings, colonies, townships, housing
                  societies, private bungalows, farm houses, etc.
               </ListingWithHand>
               <ListingWithHand>
                  <span>👉</span>
                  All urban development and housing agencies (private and
                  public, including DDA and PWD), the Municipal Corporations of
                  Delhi, banks and RWAs
               </ListingWithHand>
               <ListingWithHand>
                  <span>👉</span>
                  Commercial and Industrial buildings with available rooftop
                  areas are also included but aren’t limited to schools,
                  hospitals, industries, commercial & tourism complexes, etc..
               </ListingWithHand>
            </BlogTitledBox>

            <BlogTitledBox
               title='Net-metering policy arrangement,'
               sx={{ mr: 3 }}
               variant='tertiary'
            >
               <ListingWithHand>
                  <span>👉</span>
                  The height of the module structure carrying solar panels shall
                  not be counted towards the total height of the building as
                  permitted by building bylaws, except near airports where
                  building regulations issued by the Airports Authority of India
                  take precedence.
               </ListingWithHand>

               <ListingWithHand>
                  <span>👉</span>
                  No approval will be required from concerned Municipal
                  Corporation or other Urban Development Bodies like the DDA for
                  putting up solar plants including any additional system for
                  monitoring the performance of solar plant in existing or new
                  buildings.
               </ListingWithHand>
               <ListingWithHand>
                  <span>👉</span>
                  The support structure on which rooftop solar panels are
                  installed shall be a temporary structure built in accordance
                  with local building codes.
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
                           <Typography>Visit the BSES website</Typography>
                           <Button
                              endIcon={<OpenInNewIcon />}
                              component='a'
                              href='#'
                              sx={{ mt: 2, color: 'blue' }}
                           >
                              Click Here
                           </Button>
                        </li>
                        <li>
                           <Typography>
                              Click on the “New Connection” section and apply
                              for “Solar Rooftop Net-metering”.
                           </Typography>
                        </li>
                        <li>
                           <Typography>
                              Upload the required documents and filled up online
                              forms including capacity proof, ID proof,
                              electricity bill, NOC, etc. BSES department will
                              review your documents and update you on the
                              application status.
                           </Typography>
                        </li>
                     </Ol>
                  </ApprovalBox>
               </Grid>
               <Grid item xs={12} md={6}>
                  <DocumentBox>
                     <UtilityList>
                        <DoneIcon />
                        <Typography>Copy of Latest Electricity Bill</Typography>
                     </UtilityList>
                     <UtilityList>
                        <DoneIcon />
                        <Typography>
                           Copy of Latest Municipality Tax or Index-2
                        </Typography>
                     </UtilityList>
                     <UtilityList>
                        <DoneIcon />
                        <Typography>Copy of Adhar Card</Typography>
                     </UtilityList>
                     <UtilityList>
                        <DoneIcon />
                        <Typography>Copy of Pan Card</Typography>
                     </UtilityList>

                     <UtilityList>
                        <DoneIcon />
                        <Typography>Passport Size Photo-3 Copy</Typography>
                     </UtilityList>
                     <UtilityList>
                        <DoneIcon />
                        <Typography>Contact Number</Typography>
                     </UtilityList>
                  </DocumentBox>
               </Grid>
            </Grid>

            <BlogTitledBox
               title='SOLAR SUBSIDY,'
               sx={{ mr: 3 }}
               variant='tertiary'
            >
               <Para sx={{ mb: 3 }}>
                  The applicable subsidy for various capacities of rooftop solar
                  power systems installed at individual residential households
                  are:
               </Para>

               <ListingWithHand>
                  <span>👉</span>
                  Residential sector upto 3 kWA: 40% of the benchmark cost
               </ListingWithHand>
               <ListingWithHand>
                  <span>👉</span>
                  Residential sector from 3kW -10 kWA: 20% for RTS system
               </ListingWithHand>
               <ListingWithHand>
                  <span>👉</span>
                  Group Housing Societies with consumption more than 500 KWA:
                  20%
               </ListingWithHand>
            </BlogTitledBox>

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
                           <Typography>Size:Min 1 kWp</Typography>
                        </li>
                        <li>
                           <Typography>Max 1 MWp</Typography>
                        </li>
                        <li>
                           <Typography>
                              Voltage level:230V(Single phase) or 415 V (Three
                              phase) : upto 10 kWp max.
                           </Typography>
                        </li>
                        <li>
                           <Typography>
                              415V (Three phase): 10-100 kWp max.
                           </Typography>
                        </li>
                        <li>
                           <Typography>HT/EHT Level : 100Wp max.</Typography>
                        </li>
                        <li>
                           <Typography>
                              Conditions:Cumulative capacity of all solar
                              systems installed in your area shall not exceed
                              15% of Local Distribution transformer capacity in
                              your area.
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
                           <Typography>Self ownership (CAPEX model)</Typography>
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
                           <Typography>Annual settlement</Typography>
                        </li>
                        <li>
                           <Typography>
                              Any net electricity injected in the grid shall be
                              paid at rates decided by DERC.
                           </Typography>
                        </li>
                        <li>
                           <Typography>
                              Any excess generation (above 90 per cent) at the
                              end of the financial year would be considered as
                              free energy and not offset against the consumers
                              consumption. There shall be no carry forward to
                              next financial year.
                           </Typography>
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
                           Exempted from wheeling, banking, transmission charges & electricity tax if applicable


                           </Typography>
                        </li>
                        <li>
                           <Typography>
                           Residential consumers opting to implement solar plants to sell power to the grid shall be exempted from the conversion charges requirement of house tax to commercial tax.
                           </Typography>
                        </li>
                     </ul>
                  </GrayBox>
               </Box>
            </ToggleBox>
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

export default Dilhi;
