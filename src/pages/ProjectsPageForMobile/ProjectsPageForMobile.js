import React, { useEffect, useState } from 'react';
import { Container, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import BookProduct from '../../portfolio/BookProducts/BookProduct/BookProduct';
import AddProject from '../AddProject/AddProject';
import SearchProduct from '../SearchProduct/SearchProduct';
import useMediaQuery from '@mui/material/useMediaQuery';
import SolrufTextField from '../../components/TextField/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ProjectListView from '../../components/ProjectListView/ProjectListView';
import ProjectModal from '../../components/ProjectModal/ProjectModal';
import { axiAuth } from '../../utils/axiosInstance';

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
      padding: theme.spacing(0.5),
      paddingBottom: '1rem',
      borderRadius: theme.spacing(1),
      marginTop: theme.spacing(1),
      position: 'relative',
   };
});

const ProjectsPageForMobile = () => {
   const [projectPage, setProjectPage] = useState(true);
   const [showForm, setShowForm] = useState(false);
   const [showProductForm, setShowProductForm] = useState(false);
   const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
   

   const [projects, setProjects] = useState([]);

   useEffect(() => {
      axiAuth.get('api/vendor/projects?page=1').then(({ data }) => {
         console.log(data);
         console.log('fetch projects');
         setProjects(data.projects);
         console.log(data.projects[0]);
      });
   }, []);

   return (
      <ProjectsPageBox>
         <Container maxWidth='xl'>

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

               </HeaderBox>
            )}

            {!showForm && !showProductForm && (
               <ProjectsBox>
                  <Grid container spacing={3}>

                     {projectPage && (
                        <>
                           {projects.map((project, index) => {
                              return (
                                 <Grid item xs={12} md={6} lg={4}>
                                    <ProjectListView
                                       project={project}
                                       key={project.project_id}
                                    />
                                 </Grid>
                              );
                           })}
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
