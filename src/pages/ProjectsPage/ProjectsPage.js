import React, { useState } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import YellowButton from '../../components/YellowButton/YellowButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import addProject from '../../media/addProject.png';
import SingleProject from './SingleProject/SingleProject';
import BookProduct from '../../portfolio/BookProducts/BookProduct/BookProduct';
import { Link } from 'react-router-dom';
import AddProject from '../AddProject/AddProject';

const HeaderBox = styled(Box)(({ theme }) => {
   return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
   };
});

const ProjectsBox = styled(Box)(({ theme }) => {
   return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '1.5rem',
   };
});

const ProjectsPageBox = styled(Box)(({ theme }) => {
   return {
      background: '#D0D7D9',
      padding: theme.spacing(5),
      borderRadius: theme.spacing(3),
      marginTop: theme.spacing(10),
      border: `2px solid ${theme.palette.primary.main}`,
      position: 'relative',
   };
});

const TopButtonBox = styled(Box)(({ theme }) => {
   return {
      display: 'flex',
      position: 'absolute',
      bottom: '100%',
   };
});

const ProjectsPage = () => {
   const [projectPage, setProjectPage] = useState(true);
   const [showForm, setShowForm] = useState(false);

   const showFormHandler = () => {
      setShowForm(true);
      setProjectPage(false);
   };

   const showProjectsPageHandler = () => {
      setProjectPage(true);
      setShowForm(false);
   };
   const showProductPageHandler = () => {
      setProjectPage(false);
      setShowForm(false);
   };

   return (
      <ProjectsPageBox>
         <Container>
            <TopButtonBox>
               <YellowButton
                  style={{
                     marginRight: '1.5rem',
                     boxShadow: 'none',
                     background: `${projectPage ? '#ffd05d' : '#D0D7D9'}`,
                     border: '2px solid #ffd05d',
                     borderBottom: 'none',
                  }}
                  onClick={showProjectsPageHandler}
               >
                  Projects
               </YellowButton>
               <YellowButton
                  style={{
                     boxShadow: 'none',
                     background: `${projectPage ? '#D0D7D9' : '#ffd05d'}`,
                     border: '2px solid #ffd05d',
                     borderBottom: 'none',
                  }}
                  onClick={showProductPageHandler}
               >
                  Products
               </YellowButton>
            </TopButtonBox>

            { !showForm && <HeaderBox>
               <Typography variant='h5' fontWeight='bold'>
                  Add Your Projects right here
               </Typography>

               <YellowButton>
                  <AddIcon /> Add {projectPage ? 'Project' : 'Product'}
               </YellowButton>
            </HeaderBox> }

            {showForm && <HeaderBox>
               <Button
                  startIcon={<KeyboardBackspaceIcon />}
                  sx={{ color: '#4D4D4D' }}
                  onClick={() => setShowForm(false)}
               >
                  Back To Project
               </Button>

               <YellowButton>Save</YellowButton>
            </HeaderBox>}

            {!showForm && (
               <ProjectsBox>
                  <Grid container spacing={3}>
                     <Grid item md={6} lg={4}>
                        <img
                           src={
                              projectPage
                                 ? addProject
                                 : 'https://i.ibb.co/0tF6P7F/Group-71.png'
                           }
                           alt='Add product'
                           style={{
                              width: '100%',
                              height: 'auto',
                              cursor: 'pointer',
                           }}
                           onClick={showFormHandler}
                        />
                     </Grid>
                     {projectPage && (
                        <>
                           <SingleProject />
                           <SingleProject />
                           <SingleProject />
                           <SingleProject />
                           <SingleProject />
                           <SingleProject />
                           <SingleProject />
                           <SingleProject />
                        </>
                     )}
                     {!projectPage && !showForm && (
                        <>
                           <Grid item xs={12} sm={6} lg={4}>
                              <BookProduct editDelete={true} />
                           </Grid>
                           <Grid item xs={12} sm={6} lg={4}>
                              <BookProduct editDelete={true} />
                           </Grid>
                           <Grid item xs={12} sm={6} lg={4}>
                              <BookProduct editDelete={true} />
                           </Grid>
                           <Grid item xs={12} sm={6} lg={4}>
                              <BookProduct editDelete={true} />
                           </Grid>
                           <Grid item xs={12} sm={6} lg={4}>
                              <BookProduct editDelete={true} />
                           </Grid>
                           <Grid item xs={12} sm={6} lg={4}>
                              <BookProduct editDelete={true} />
                           </Grid>
                           <Grid item xs={12} sm={6} lg={4}>
                              <BookProduct editDelete={true} />
                           </Grid>
                           <Grid item xs={12} sm={6} lg={4}>
                              <BookProduct editDelete={true} />
                           </Grid>
                        </>
                     )}
                  </Grid>
               </ProjectsBox>
            )}
            {showForm && <AddProject />}
         </Container>
      </ProjectsPageBox>
   );
};

export default ProjectsPage;

// https://i.ibb.co/prSrHsx/Rectangle-79.png
// https://i.ibb.co/qnGsGWf/Rectangle-80.png
// https://i.ibb.co/Yt3y0wS/Rectangle-81.png
// https://i.ibb.co/w0Jk1B8/Rectangle-82.png
