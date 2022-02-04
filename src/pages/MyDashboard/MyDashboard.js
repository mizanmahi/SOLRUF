import {
   Chip,
   Container,
   Grid,
   styled,
   Typography,
   useMediaQuery,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useState, useEffect } from 'react';
import YellowButton from '../../components/YellowButton/YellowButton';

const Portfolio = styled(Container)(({ theme }) => ({
   boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
   padding: theme.spacing(2),
   borderRadius: '10px',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'flex-start',
   minHeight: '337px',
   '@media (max-width: 680px)': {
      flexDirection: 'column',
      alignItems: 'center',
   },
}));

const InstallerInfo = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'flex-start',
   alignItems: 'center',
   marginTop: '.5rem',
   '& svg': {
      marginRight: `${theme.spacing(0.5)}`,
   },
}));

const CertificateNameBox = styled('div')(({ theme }) => {
   return {
      width: '100%',
      border: '3px solid #FFD05B',
      borderRadius: '5px',
      outline: 'none',
      fontFamily: theme.typography.fontFamily,
      height: '55px',
      overflow: 'hidden',
      display: 'flex',
      '& input': {
         border: 'none',
         width: '90%',
         height: '100%',
         padding: '1rem',
      },
      '& input[type=file]': {
         display: 'none',
      },
   };
});

const Cards = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   marginTop: '2rem',
}));
const DashboardCard = styled('div')(({ theme }) => ({
   boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
   padding: theme.spacing(2),
   borderRadius: '10px',
   backgroundImage: 'linear-gradient(to bottom, #FFD05B -100%, #f3f3f3)',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   minHeight: '180px',
}));
const Circle = styled('div')(({ theme }) => ({
   width: '100px',
   height: '100px',
   borderRadius: '50%',
   background: '#ffd05b',
   boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
   backgroundImage: 'linear-gradient(to bottom, #f3f3f3 -50%, #FFD05B)',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}));

const UpcomingMeetings = styled(Container)(({ theme }) => ({
   boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
   padding: theme.spacing(2),
   borderRadius: '10px',
}));

const MeetingDetails = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
}));

const TopDetailedImageBox = styled(Box)(({ theme }) => ({
   display: 'block',
   marginTop: '4rem',
   '@media (max-width: 680px)': {
      display: 'none',
   },
}));

const BottomDetailedImage = styled('div')(({ theme }) => ({
   display: 'none',
   marginTop: '1rem',
   '@media (max-width: 680px)': {
      display: 'block',
   },
}));

const tags = ['Tag #1', 'Tag #2', 'Tag #3', 'Tag #4', 'Tag #5'];

const MyDashboard = () => {
   const matchMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
   const matchSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));

   const [time, setTime] = useState(new Date());
   const [projects, setProjects] = useState([]);

   useEffect(() => {}, []);
   return (
      <Container maxWidth='xl'>
         <Grid container spacing={2} sx={{}}>
            <Grid item xs={12} lg={8}>
               <Portfolio>
                  <Box>
                     <Typography
                        variant='h6'
                        sx={{ color: '#000000', fontWeight: 600 }}
                     >
                        My Portfolio
                     </Typography>
                     <InstallerInfo>
                        <PersonIcon sx={{ fontSize: 30 }} />
                        <Typography variant='body1'>Installer Name</Typography>
                     </InstallerInfo>
                     <Box sx={{ maxWidth: '60%', my: 2 }}>
                        {tags.map((tag, i) => (
                           <Chip
                              label={tag}
                              sx={{
                                 color: '#fff',
                                 borderRadius: 1,
                                 bgcolor: 'blue',
                                 fontWeight: 600,
                                 fontSize: '1.1rem',
                                 marginRight: '.5rem',
                                 mb: '.5rem',
                              }}
                           />
                        ))}
                     </Box>
                     <TopDetailedImageBox>
                        <img
                           src='https://i.ibb.co/gzFf82v/Frame-184-1.png'
                           alt=''
                           style={{ marginLeft: -10 }}
                        />
                     </TopDetailedImageBox>
                  </Box>
                  {/*  === portfolio right */}
                  <Box>
                     {/* shareable link */}
                     <Box
                        sx={{
                           display: 'flex',
                           flexDirection: 'column',
                           justifyContent: 'flex-end',
                           alignItems: 'flex-end',
                        }}
                     >
                        <Typography
                           variant='body1'
                           gutterBottom
                           fontWeight={500}
                        >
                           Consumer Sharable Link
                        </Typography>
                        <CertificateNameBox
                           style={{
                              width: '100%',
                              margin: '0',
                              minWidth: '270px',
                              height: '45px',
                           }}
                        >
                           <input
                              type='text'
                              placeholder='https://frederik.info'
                           />

                           <label
                              htmlFor='serviceFile'
                              style={{
                                 width: '10%',
                                 minWidth: '100px',
                                 height: '100%',
                                 background: '#ffd05b',
                              }}
                           >
                              <Box
                                 sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                 }}
                              >
                                 <Typography
                                    variant='body1'
                                    sx={{ cursor: 'pointer' }}
                                 >
                                    Copy
                                 </Typography>
                              </Box>
                           </label>
                        </CertificateNameBox>
                     </Box>
                     <Cards>
                        <DashboardCard sx={{ mr: 1.5 }}>
                           <Circle>
                              <Typography
                                 variant='h4'
                                 fontWeight={600}
                                 sx={{ color: '#000000' }}
                              >
                                 50
                              </Typography>
                           </Circle>
                           <Typography
                              textAlign='center'
                              fontWeight={600}
                              sx={{ mt: 2 }}
                           >
                              Projects Added
                           </Typography>
                        </DashboardCard>
                        <DashboardCard>
                           <Circle>
                              <Typography
                                 variant='h4'
                                 fontWeight={600}
                                 sx={{ color: '#000000' }}
                              >
                                 20
                              </Typography>
                           </Circle>
                           <Typography
                              textAlign='center'
                              fontWeight={600}
                              sx={{ mt: 2 }}
                           >
                              Projects Added
                           </Typography>
                        </DashboardCard>
                     </Cards>
                  </Box>
                  <BottomDetailedImage>
                     <img
                        src='https://i.ibb.co/gzFf82v/Frame-184-1.png'
                        alt=''
                        style={{ display: 'block', margin: '0 auto' }}
                     />
                  </BottomDetailedImage>
               </Portfolio>
            </Grid>
            <Grid item xs={12} lg={4}>
               <UpcomingMeetings>
                  <Typography
                     sx={{
                        color: 'blue',
                        fontWeight: 600,
                        textAlign: 'center',
                     }}
                     variant='h5'
                  >
                     Upcoming Meetings
                  </Typography>
                  <Typography variant='h6' textAlign='center' sx={{ my: 1 }}>
                     10 Aug, 2022, 03:45 AM
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                     <MeetingDetails>
                        <PersonIcon sx={{ mr: 1 }} />
                        <Typography variant='body1'>Name</Typography>
                     </MeetingDetails>
                     <Typography variant='body1' sx={{ ml: 4, color: '#000' }}>
                        Aman Zain
                     </Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                     <MeetingDetails>
                        <PersonIcon sx={{ mr: 1 }} />
                        <Typography variant='body1'>Appointment</Typography>
                     </MeetingDetails>
                     <Typography variant='body1' sx={{ ml: 4, color: '#000' }}>
                        Aman Zain
                     </Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                     <MeetingDetails>
                        <PersonIcon sx={{ mr: 1 }} />
                        <Typography variant='body1'>Reminder Type</Typography>
                     </MeetingDetails>
                     <Typography variant='body1' sx={{ ml: 4, color: '#000' }}>
                        Aman Zain
                     </Typography>
                  </Box>

                  <YellowButton style={{ margin: '0 auto', marginTop: '1rem' }}>
                     See Other Meetings
                  </YellowButton>
               </UpcomingMeetings>
            </Grid>
         </Grid>
      </Container>
   );
};

export default MyDashboard;
