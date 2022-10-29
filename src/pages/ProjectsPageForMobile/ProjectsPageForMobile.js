import React, { useState } from 'react';
import { Grid, Button, Dialog, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddProject from '../AddProject/AddProject';
// import useMediaQuery from '@mui/material/useMediaQuery';
import ProjectListView from '../../components/ProjectListView/ProjectListView';
import ProjectModal from '../../components/ProjectModal/ProjectModal';
import AddIcon from '@mui/icons-material/Add';
import { modalTopBackButtonStyle } from '../../theme/modalTopBackButtonStyle';
import { useDispatch } from 'react-redux';
import { removeProjectToBeEdited } from '../../redux/slices/projectSlice';
import AnimatedSearchBar from '../../components/AnimatedSearchBar/AnimatedSearchBar';

const HeaderBox = styled(Box)(({ theme }) => {
   return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '0',
   };
});

const ProjectsBox = styled(Box)(({ theme }) => {
   return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '@media (max-width: 600px)': {
         marginLeft: '8px',
      },
   };
});

const ProjectsPageBox = styled(Box)(({ theme }) => {
   return {
      borderRadius: theme.spacing(1),
      marginTop: theme.spacing(1),
      position: 'relative',
   };
});

const ProjectsPageForMobile = ({ setFetchProjects, projects }) => {
   // const [projectPage, setProjectPage] = useState(true);
   // const [showProductForm, setShowProductForm] = useState(false);
   const projectPage = true;
   const showProductForm = false;


   const [showForm, setShowForm] = useState(false);
   // const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
   const dispatch = useDispatch();

   const [showAnimatedSearchBar, setShowAnimatedSearchBar] = useState(false);
   const [searchValue, setSearchValue] = useState('');

   return (
      <ProjectsPageBox>
         <Box>
            <Box
               sx={{
                  display: {
                     sm: 'none',
                     xs: 'flex',
                  },
                  width: '100%',
                  justifyContent: 'space-between',
                  mb: 3,
                  ml: 0.5,
               }}
            >
               <AnimatedSearchBar
                  onChange={(e) => setSearchValue(e.target.value)}
                  searchTerm={searchValue}
                  showStatus={(status) => setShowAnimatedSearchBar(status)}
               />
               {!showAnimatedSearchBar && (
                  <IconButton
                     sx={{
                        bgcolor: 'primary.main',
                     }}
                     onClick={() => {
                        dispatch(removeProjectToBeEdited());
                        setShowForm(true);
                     }}
                  >
                     <AddIcon />
                  </IconButton>
               )}
            </Box>

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
                           {projects
                              ?.filter((el) =>
                                 el.name.toLowerCase().includes(searchValue)
                              )
                              .map((project, index) => {
                                 return (
                                    <Grid item xs={12} md={6} lg={4}>
                                       <ProjectListView
                                          projects={projects}
                                          project={project}
                                          key={project.project_id}
                                          number={index + 1}
                                          setFetchProjects={setFetchProjects}
                                       />
                                    </Grid>
                                 );
                              })}
                        </>
                     )}
                  </Grid>
               </ProjectsBox>
            )}
            <Dialog
               fullScreen
               open={showForm}
               onClose={() => setShowForm(false)}
            >
               <Box
                  sx={modalTopBackButtonStyle}
                  onClick={() => setShowForm(false)}
               >
                  <KeyboardBackspaceIcon />
                  <Box>Back</Box>
               </Box>
               <AddProject
                  closeForm={() => setShowForm(false)}
                  setFetchProjects={setFetchProjects}
               />
            </Dialog>
         </Box>

         <ProjectModal />
      </ProjectsPageBox>
   );
};

export default ProjectsPageForMobile;
