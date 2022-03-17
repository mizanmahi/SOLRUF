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
import { axiAuth } from '../../utils/axiosInstance';
import Loader from '../../components/Loader/Loader';
import CreatePortfolio from '../../components/CreatePortfolio/CreatePortfolio';
import { useDispatch } from 'react-redux';
import { setCreatePortfolio } from '../../redux/slices/portfolio.slice';
import { useNavigate } from 'react-router';
import CopyText from '../../components/CopyText/CopyText';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

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
   '@media (max-width: 600px)': {
      padding: theme.spacing(1),
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

const Cards = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'flex-end',
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
   width: '100%',
   maxWidth: '150px',
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

const MyDashboard = () => {
   const matchMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
   const matchSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));

   const [projects, setProjects] = useState([]);

   const [portfolioData, setPortfolioData] = useState({});
   const [profileDataLoading, setProfileDataLoading] = useState(true);

   // useEffect(() => {
   //    axiAuth.get('api/admin/products?page=1').then(({ data }) => {
   //       console.log(data);
   //    });
   // }, []);

   useEffect(() => {
      setProfileDataLoading(true);
      axiAuth
         .get('api/vendor/profile')
         .then(({ data }) => {
            setPortfolioData(data.portfolio);
            setProfileDataLoading(false);
            console.log(data);

            console.log(data.portfolio.services);
         })
         .catch((err) => {
            console.log('Portfolio data error', err);
            setProfileDataLoading(false);
         });
   }, []);

   useEffect(() => {
      axiAuth
         .get('api/vendor/projects?page=1')
         .then(({ data }) => {
            setProjects(data.projects);
         })
         .catch((err) => {
            console.log('Projects data error', err);
         });
   }, []);

   console.log(portfolioData);

   const dispatch = useDispatch();
   let navigate = useNavigate();

   const createPortfolioHandler = () => {
      console.log('create portfolio button clicked from dashboard');
      dispatch(setCreatePortfolio(true));

      // redirect to portfolio page
      navigate('/dashboard/portfolio');
   };

   return (
      <Container maxWidth='xl' sx={{p: [1, 2]}}>
         <Grid container spacing={2}>
            <Grid item xs={12} xl={9}>
               {profileDataLoading ? (
                  <Loader />
               ) : portfolioData.name ? (
                  <Portfolio>
                     <Box sx={{ flex: 5 }}>
                        <Typography
                           variant='body1'
                           sx={{ color: '#000000', fontWeight: 600 }}
                        >
                           My Portfolio
                        </Typography>
                        <InstallerInfo>
                           <PersonIcon sx={{ fontSize: 30 }} />
                           <Typography
                              variant='h6'
                              sx={{ color: '#000000', fontWeight: 600 }}
                           >
                              {portfolioData.name}
                           </Typography>
                        </InstallerInfo>
                        <Box sx={{ maxWidth: '80%', my: 2 }}>
                           {portfolioData?.services?.length < 4
                              ? portfolioData?.services?.map((service, i) => (
                                   <Chip
                                      key={i}
                                      label={service}
                                      sx={{
                                         color: '#fff',
                                         borderRadius: 1,
                                         bgcolor: 'blue',
                                         fontWeight: 600,
                                         fontSize: '1rem',
                                         marginRight: '.3rem',
                                         mb: '.5rem',
                                      }}
                                   />
                                ))
                              : portfolioData?.services
                                   ?.slice(0, 3)
                                   .map((service, i) => (
                                      <Chip
                                         key={i}
                                         label={service}
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
                           {portfolioData?.services?.length > 3 ? (
                              <MoreHorizIcon
                                 sx={{
                                    fontSize: '40px',
                                    display: 'block',
                                    color: 'blue',
                                 }}
                              />
                           ) : null}
                        </Box>
                        <TopDetailedImageBox>
                           <img
                              src='https://i.ibb.co/gzFf82v/Frame-184-1.png'
                              alt=''
                              style={{ marginLeft: -10, cursor: 'pointer' }}
                              onClick={() => navigate('/dashboard/portfolio')}
                           />
                        </TopDetailedImageBox>
                     </Box>
                     {/*  === portfolio right */}
                     <Box sx={{ flex: 6 }}>
                        <Box>
                           <Typography
                              sx={{ textAlign: 'right', fontWeight: 600 }}
                              gutterBottom
                           >
                              Consumer Sharable Link
                           </Typography>
                           <CopyText title={`profile/${portfolioData.slug}`} />
                        </Box>
                        <Cards>
                           <DashboardCard sx={{ mr: 2.5 }}>
                              <Circle>
                                 <Typography
                                    variant='h4'
                                    fontWeight={600}
                                    sx={{ color: '#000000' }}
                                 >
                                    {projects?.length}
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
                                    0
                                 </Typography>
                              </Circle>
                              <Typography
                                 textAlign='center'
                                 fontWeight={600}
                                 sx={{ mt: 2 }}
                              >
                                 Products Added
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
               ) : (
                  <CreatePortfolio
                     createPortfolioHandler={createPortfolioHandler}
                  />
               )}
            </Grid>
            <Grid item xs={12} xl={3}>
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
