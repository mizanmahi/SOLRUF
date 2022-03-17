import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import YellowButton from '../../components/YellowButton/YellowButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// import addProject from '../../media/addProject.png';
import SingleProject from './SingleProject/SingleProject';
import BookProduct from '../../portfolio/BookProducts/BookProduct/BookProduct';
// import { Link } from 'react-router-dom';
import AddProject from '../AddProject/AddProject';
import SearchProduct from '../SearchProduct/SearchProduct';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router';
import { axiAuth } from '../../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import {
   removeProjectToBeEdited,
   setProjects,
} from '../../redux/slices/projectSlice';
import ProjectsPageForMobile from '../ProjectsPageForMobile/ProjectsPageForMobile';
import ProductPageForMobile from '../ProductPageForMobile/ProductPageForMobile';

const HeaderBox = styled(Box)(({ theme }) => {
   return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '1.2rem',
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
      // padding: theme.spacing(0.5),
      borderRadius: theme.spacing(1.5),
      marginTop: theme.spacing(10),
      border: `2px solid ${theme.palette.primary.main}`,
      position: 'relative',
      paddingBottom: '1.5rem',
      boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
   };
});

const TopButtonBox = styled(Box)(({ theme }) => {
   return {
      display: 'flex',
      position: 'absolute',
      bottom: '100%',
   };
});

const UploadProjectBox = styled(Box)(({ theme }) => {
   return {
      // border: `2px solid ${theme.palette.primary.main}`,
      background: '#fff',
      // width: '320px',
      maxWidth: '100%',
      // minWidth: '330px',
      height: '100%',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      padding: '1rem',
   };
});

const ProjectsPage = () => {
   // const [projects, setProjects] = useState([]);
   const [projectPage, setProjectPage] = useState(true);
   const [showForm, setShowForm] = useState(false);
   const [showProductForm, setShowProductForm] = useState(false);
   const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
   const navigate = useNavigate();

   const dispatch = useDispatch();
   const { projects } = useSelector((state) => state.project);

   const showFormHandler = () => {
      if (matches) {
         navigate('/m.addProject');
      }

      if (projectPage) {
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

   useEffect(() => {
      axiAuth('api/vendor/projects?page=1')
         .then(({ data }) => {
            dispatch(setProjects(data.projects));
         })
         .catch((err) => {
            console.log(err);
         });
   }, [showForm]);

   const backToProjectHandler = () => {
      setShowForm(false);
      dispatch(removeProjectToBeEdited());
   };

   return (
      <ProjectsPageBox>
         <Container maxWidth='xl'>
            <TopButtonBox>
               <YellowButton
                  style={{
                     marginRight: '1.5rem',
                     boxShadow: 'none',
                     background: `${projectPage ? '#D0D7D9' : '#ffd05d'}`,
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
                     background: `${projectPage ? '#ffd05d' : '#D0D7D9'}`,
                     border: '2px solid #ffd05d',
                     borderBottom: 'none',
                  }}
                  onClick={showProductPageHandler}
               >
                  Products
               </YellowButton>
            </TopButtonBox>

            {showForm && (
               <HeaderBox>
                  <Button
                     startIcon={<KeyboardBackspaceIcon />}
                     sx={{ color: '#4D4D4D' }}
                     onClick={backToProjectHandler}
                  >
                     Back To Project
                  </Button>
               </HeaderBox>
            )}

            {!showForm && !showProductForm && (
               <ProjectsBox>
                  <Grid container spacing={2}>
                     <Grid item xs={12} md={6} lg={4}>
                        <UploadProjectBox onClick={showFormHandler}>
                           <img
                              src='https://i.ibb.co/9TQjBdx/Group-31.png'
                              alt='upload box'
                           />
                        </UploadProjectBox>
                     </Grid>

                     {projectPage && (
                        <>
                           {!matches ? (
                              projects.map((project) => (
                                 <SingleProject
                                    key={project.project_id}
                                    project={project}
                                    setShowForm={setShowForm}
                                 />
                              ))
                           ) : (
                              <ProjectsPageForMobile />
                           )}
                        </>
                     )}

                     {!projectPage && !showForm && !showProductForm && (
                        <>
                           {!matches ? (
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
                           ) : (
                              <ProductPageForMobile />
                           )}
                        </>
                     )}
                  </Grid>
               </ProjectsBox>
            )}

            {showForm && (
               <AddProject backToProjectHandler={backToProjectHandler} />
            )}

            {showProductForm && (
               <SearchProduct showProductPageHandler={showProductPageHandler} />
            )}
         </Container>
      </ProjectsPageBox>
   );
};

export default ProjectsPage;

// https://i.ibb.co/prSrHsx/Rectangle-79.png
// https://i.ibb.co/qnGsGWf/Rectangle-80.png
// https://i.ibb.co/Yt3y0wS/Rectangle-81.png
// https://i.ibb.co/w0Jk1B8/Rectangle-82.png
