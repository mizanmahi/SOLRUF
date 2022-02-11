import { CardContent, CardMedia, Container, Grid, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router';
import BlogIntroSection from '../../../components/BlogIntroSection/BlogIntroSection';
import YellowButton from '../../../components/YellowButton/YellowButton';

const Wrapper = styled(Box)(({ theme }) => ({
   paddingBottom: '2rem',
   background: '#F3F3F3',
}));


const BlogCards = styled(Box)(({ theme }) => ({
   //    boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
   borderRadius: '5px',
   margin: '3rem 0',
   position: 'relative',
}));

const BlogCard = styled(Box)(({ theme }) => ({
   boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
   borderRadius: '10px',
   display: 'flex',
   justifyContent: 'space-between',
   flexDirection: 'column',
}));

const SolarComponents = () => {

   const navigate = useNavigate();

   return (
      <Wrapper>
         <BlogIntroSection
         sx={{ mb: 14}}
            title='COMPONENTS USED FOR INSTALLATION'
            backgroundImageUrl='https://i.ibb.co/3vzG2th/pexels-los-muertos-crew-8853468-1.png'
         />
         <Container maxWidth='lg'>
         <BlogCards>
                     <Grid container rowSpacing={3}>
                        <Grid
                           item
                           xs={12}
                           md={6}
                           sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                           <BlogCard sx={{ maxWidth: 440 }} elevation='0'>
                              <Box>
                                 <CardMedia
                                    sx={{ borderRadius: '5px 5px 0 0' }}
                                    image='https://i.ibb.co/xMVKF84/Rectangle-155-5.png'
                                    component='img'
                                    height='350'
                                    alt='green iguana'
                                 />

                                 <CardContent>
                                    <Typography
                                       gutterBottom
                                       variant='h6'
                                       component='div'
                                       sx={{ fontWeight: 'bold' }}
                                       
                                    >
                                       SOLAR DESIGN
                                    </Typography>
                                    <Typography
                                       variant='body2'
                                       color='text.secondary'
                                    >
                                       Solar design is the representation of the photovoltaic system characteristics such as civil and electrical rendition including.
                                    </Typography>
                                 </CardContent>
                              </Box>
                              <Box sx={{ p: 2 }}>
                                 <YellowButton onClick={() => navigate('/blogs/solarDesign')} >Read More</YellowButton>
                              </Box>
                           </BlogCard>
                        </Grid>
                        <Grid
                           item
                           xs={12}
                           md={6}
                           sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                           <BlogCard sx={{ maxWidth: 440 }} elevation='0'>
                              <Box>
                                 <CardMedia
                                    sx={{ borderRadius: '5px 5px 0 0' }}
                                    component='img'
                                    height='350'
                                    image='https://i.ibb.co/ns0bqSH/Rectangle-155-6.png'
                                    alt='green iguana'
                                 />

                                 <CardContent>
                                    <Typography
                                       gutterBottom
                                       variant='h6'
                                       component='div'
                                       sx={{ fontWeight: 'bold' }}
                                    >
                                      SOLAR PANELS
                                    </Typography>
                                    <Typography
                                       variant='body2'
                                       color='text.secondary'
                                    >
                                      Solar panels collect clean renewable energy in the form of sunlight and convert that light into electricity which..
                                    </Typography>
                                 </CardContent>
                              </Box>
                              <Box sx={{ p: 2 }}>
                                 <YellowButton onClick={() => navigate('/blogs/solarSteps')}>Read More</YellowButton>
                              </Box>
                           </BlogCard>
                        </Grid>
                        <Grid
                           item
                           xs={12}
                           md={6}
                           sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                           <BlogCard sx={{ maxWidth: 440 }} elevation='0'>
                              <Box>
                                 <CardMedia
                                    sx={{ borderRadius: '5px 5px 0 0' }}
                                    component='img'
                                    height='350'
                                    image='https://i.ibb.co/8XkCns1/Rectangle-155-7.png'
                                    alt='green iguana'
                                 />

                                 <CardContent>
                                    <Typography
                                       gutterBottom
                                       variant='h6'
                                       component='div'
                                       sx={{ fontWeight: 'bold' }}
                                    >
                                      SOLAR BATTERIES
                                    </Typography>
                                    <Typography
                                       variant='body2'
                                       color='text.secondary'
                                    >
                                     Solar batteries are an additional component that allows for the storage of solar photovoltaic energy, so we can use it..
                                    </Typography>
                                 </CardContent>
                              </Box>
                              <Box sx={{ p: 2 }}>
                                 <YellowButton onClick={() => navigate('/blogs/solarInstallationProcess')} >Read More</YellowButton>
                              </Box>
                           </BlogCard>
                        </Grid>
                        <Grid
                           item
                           xs={12}
                           md={6}
                           sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                           <BlogCard sx={{ maxWidth: 440 }} elevation='0'>
                              <Box>
                                 <CardMedia
                                    sx={{ borderRadius: '5px 5px 0 0' }}
                                    component='img'
                                    height='350'
                                    image='https://i.ibb.co/8P1J6VP/Rectangle-155-8.png'
                                    alt='green iguana'
                                 />

                                 <CardContent>
                                    <Typography
                                       gutterBottom
                                       variant='h6'
                                       component='div'
                                       sx={{ fontWeight: 'bold' }}
                                    >
                                       SOLAR INVERTERS
                                    </Typography>
                                    <Typography
                                       variant='body2'
                                       color='text.secondary'
                                    >
                                    Solar inverters are used to convert the direct current (DC) electricity generated by solar photovoltaic modules into..
                                    </Typography>
                                 </CardContent>
                              </Box>
                              <Box sx={{ p: 2 }}>
                                 <YellowButton onClick={()=> navigate('/blogs/solarComponents')}>Read More</YellowButton>
                              </Box>
                           </BlogCard>
                        </Grid>
                        <Grid
                           item
                           xs={12}
                           md={6}
                           sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                           <BlogCard sx={{ maxWidth: 440 }} elevation='0'>
                              <Box>
                                 <CardMedia
                                    sx={{ borderRadius: '5px 5px 0 0' }}
                                    component='img'
                                    height='350'
                                    image='https://i.ibb.co/vJDkf0T/Rectangle-155-9.png'
                                    alt='green iguana'
                                 />

                                 <CardContent>
                                    <Typography
                                       gutterBottom
                                       variant='h6'
                                       component='div'
                                       sx={{ fontWeight: 'bold' }}
                                    >
                                       MODULE MOUNTING STRUCTURES
                                    </Typography>
                                    <Typography
                                       variant='body2'
                                       color='text.secondary'
                                    >
                                       PV arrays must be mounted on a stable, durable structure that can support the array and withstand wind, rain, hail, and..
                                    </Typography>
                                 </CardContent>
                              </Box>
                              <Box sx={{ p: 2 }}>
                                 <YellowButton
                                  onClick={() => navigate('/blogs/maintenance')} >Read More</YellowButton>
                              </Box>
                           </BlogCard>
                        </Grid>
                        <Grid
                           item
                           xs={12}
                           md={6}
                           sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                           <BlogCard sx={{ maxWidth: 440 }} elevation='0'>
                              <Box>
                                 <CardMedia
                                    sx={{ borderRadius: '5px 5px 0 0' }}
                                    component='img'
                                    height='350'
                                    image='https://i.ibb.co/6mwG0ZW/Rectangle-155-10.png'
                                    alt='green iguana'
                                 />

                                 <CardContent>
                                    <Typography
                                       gutterBottom
                                       variant='h6'
                                       component='div'
                                       sx={{ fontWeight: 'bold' }}
                                    >
                                    BALANCE OF SYSTEMS
                                    </Typography>
                                    <Typography
                                       variant='body2'
                                       color='text.secondary'
                                    >
                                       The balance of system (BOS) refers to the components and equipment that move DC energy produced by solar..
                                    </Typography>
                                 </CardContent>
                              </Box>
                              <Box sx={{ p: 2 }}>
                                 <YellowButton
                                  onClick={() => navigate('/blogs/maintenance')} >Read More</YellowButton>
                              </Box>
                           </BlogCard>
                        </Grid>
                     </Grid>
                  </BlogCards>
         </Container>
      </Wrapper>
   );
};

export default SolarComponents;
