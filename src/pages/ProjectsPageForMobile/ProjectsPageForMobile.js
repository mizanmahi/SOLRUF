import React, { useState } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import YellowButton from '../../components/YellowButton/YellowButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// import addProject from '../../media/addProject.png';
import BookProduct from '../../portfolio/BookProducts/BookProduct/BookProduct';
// import { Link } from 'react-router-dom';
import AddProject from '../AddProject/AddProject';
import SearchProduct from '../SearchProduct/SearchProduct';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router';
import SingleProject from '../ProjectsPage/SingleProject/SingleProject';
import SolrufTextField from '../../components/TextField/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ProjectListView from '../../components/ProjectListView/ProjectListView';
import ProjectModal from '../../components/ProjectModal/ProjectModal';

const HeaderBox = styled(Box)(({ theme }) => {
   return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '1rem',
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
      padding: theme.spacing(.5),
      paddingBottom: '1rem',
      borderRadius: theme.spacing(1),
      marginTop: theme.spacing(10),
      // border: `2px solid ${theme.palette.primary.main}`,
      position: 'relative',
   };
});

const TopButtonBox = styled(Box)(({ theme }) => {
   return {
      display: 'flex',
      justifyContent: 'center',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: '100%',
   };
});

const UploadProjectBox = styled(Box)(({ theme }) => {
   return {
      border: `2px solid ${theme.palette.primary.main}`,
      background: '#fff',
      // width: '320px',
      maxWidth: '100%',
      minWidth: '330px',
      height: '100%',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      padding: '1rem',
   };
});

const ProjectsPageForMobile = () => {
   const [projectPage, setProjectPage] = useState(true);
   const [showForm, setShowForm] = useState(false);
   const [showProductForm, setShowProductForm] = useState(false);
   const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
   const navigate = useNavigate();

   const showFormHandler = () => {
      console.log(matches);
      if (matches && projectPage) {
         navigate('/m.addProject');
         return;
      }

      if (projectPage) {
         console.log('aise');
         setShowForm(true);
         // setProjectPage(false);
      } else {
         setShowProductForm(true);
      }
   };

   const showProjectsPageHandler = () => {
      setProjectPage(true);
      setShowForm(false);
      setShowProductForm(false);
   };
   const showProductPageHandler = () => {
      setProjectPage(false);
      setShowForm(false);
      setShowProductForm(false);
   };

   return (
      <ProjectsPageBox>
         <Container maxWidth='xl'>
            <TopButtonBox>
               <YellowButton
                  style={{
                     marginRight: '1rem',
                     boxShadow: 'none',
                     background: `${projectPage ? '#D0D7D9' : '#ffd05d'}`,
                     border: '2px solid #ffd05d',
                     borderBottom: 'none',
                     borderRadius: '5px 5px 0 0',
                     padding: '0.6rem 1rem',
                     
                  }}
                  onClick={showProjectsPageHandler}
               >
                  Projects
               </YellowButton>
               <YellowButton
                  style={{
                     boxShadow: 'none',
                     background: `${projectPage ? '#ffd05d' : '#D0D7D9'}`,
                     border: '2px solid #ffd05d',
                     borderBottom: 'none',
                     borderRadius: '5px 5px 0 0', 
                     padding: '0.6rem 1rem',
                     
                  }}
                  onClick={showProductPageHandler}
               >
                  Products
               </YellowButton>
            </TopButtonBox>

            <SolrufTextField
               label='Search Project'
               iconText={<SearchIcon />}
               sx={{ background: '#fff', borderRadius: 1, mt: 2 }}
            />

            {showForm && (
               <HeaderBox>
                  <Button
                     startIcon={<KeyboardBackspaceIcon />}
                     sx={{ color: '#4D4D4D' }}
                     onClick={() => setShowForm(false)}
                  >
                     Back To Project
                  </Button>

                  {/* <YellowButton>Save</YellowButton> */}
               </HeaderBox>
            )}

            <Button
               variant='contained'
               sx={{
                  mt: 2.4,
                  ml: 'auto',
                  display: 'flex',
                  p: 1.5,
                  textTransform: 'capitalize',
                  fontSize: '1rem',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
               }}
               startIcon={<AddIcon />}
               onClick={showFormHandler}
            >
               Add {projectPage ? 'Project' : 'Product'}
            </Button>

            {!showForm && !showProductForm && (
               <ProjectsBox>
                  <Grid container spacing={3}>
                     {/* <Grid item md={6} lg={4}>
                        <UploadProjectBox onClick={showFormHandler}>
                           <img
                              src='https://i.ibb.co/9TQjBdx/Group-31.png'
                              alt='upload box'
                           />
                        </UploadProjectBox>
                     </Grid> */}

                     {projectPage && (
                        <>
                           <Grid item xs={12} md={6} lg={4}>
                              <ProjectListView />
                           </Grid>
                           <Grid item xs={12} md={6} lg={4}>
                              <ProjectListView />
                           </Grid>
                           <Grid item xs={12} md={6} lg={4}>
                              <ProjectListView />
                           </Grid>
                           <Grid item xs={12} md={6} lg={4}>
                              <ProjectListView />
                           </Grid>
                           <Grid item xs={12} md={6} lg={4}>
                              <ProjectListView />
                           </Grid>
                        
                        </>
                     )}
                     {!projectPage && !showForm && !showProductForm && (
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
                        </>
                     )}
                  </Grid>
               </ProjectsBox>
            )}
            {showForm && <AddProject />}
            {showProductForm && <SearchProduct />}
         </Container>

         <ProjectModal />
      </ProjectsPageBox>
   );
};

export default ProjectsPageForMobile;

// https://i.ibb.co/prSrHsx/Rectangle-79.png
// https://i.ibb.co/qnGsGWf/Rectangle-80.png
// https://i.ibb.co/Yt3y0wS/Rectangle-81.png
// https://i.ibb.co/w0Jk1B8/Rectangle-82.png
