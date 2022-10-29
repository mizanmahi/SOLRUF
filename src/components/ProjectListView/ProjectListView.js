import { Dialog, IconButton, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { axiAuth } from '../../utils/axiosInstance';
import { setProjects, setProjectToBeEdited } from '../../redux/slices/projectSlice';
import { useDispatch } from 'react-redux';
import AddProject from '../../pages/AddProject/AddProject';
import { KeyboardBackspace, PushPin } from '@mui/icons-material';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import { toast } from 'react-toastify';
import DraggableBottomDialog from '../Custom/BottomDialog/DraggableBottomDialog';
import CardMedia from '@mui/material/CardMedia';
import Portfoliocart from '../../media/Portfoliocart.png';
import PrimaryButton from '../Custom/PrimaryButton/PrimaryButton';
import { modalTopBackButtonStyle } from '../../theme/modalTopBackButtonStyle';

const ProjectList = styled(Box)(({ theme }) => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   background: '#fff',
   padding: '.8rem',
   borderRadius: '5px',
   cursor: 'pointer',
   boxShadow: '0 4px 15px rgba(0,0,0,0)',
}));
const TitleBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}));
const Number = styled(Box)(({ theme }) => ({
   background: '#d0d7d9',
   color: '#4d4d4d',
   fontWeight: 'bold',
   // mr: "0.8rem",
   borderRadius: '50%',
   padding: '0.5rem',
   width: '1.5rem',
   height: '1.5rem',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   marginRight: '0.8rem',
}));

const ButtonBox = styled(Box)(({ theme }) => {
   return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
   };
});

const ProjectListView = ({ project, number, setFetchProjects, projects }) => {
   const { name, is_pinned, project_id } = project;

   const [projectModalOpen, setProjectModalOpen] = useState(false);
   const [isPinned, setIsPinned] = React.useState(is_pinned);
   const [projectDeleteId, setProjectDeleteId] = React.useState(null);

   const [projectDeleteConfirm, setProjectDeleteConfirm] = React.useState({
      role: 'Project',
      isOpen: false,
      title: 'Delete Project?',
      message: 'Project will be deleted permanently once you continue!',
      cacheRole: 'User',
   });

   const handleProjectDeleteClick = (e, project_id) => {
      e.stopPropagation();
      setProjectDeleteConfirm({
         ...projectDeleteConfirm,
         isOpen: true,
      });

      setProjectDeleteId(project_id);
   };

   const deleteHandler = async () => {
      if (!projectDeleteId) return;
      try {
         const { status } = await axiAuth.delete(
            `api/vendor/projects/${project_id}`
         );
         if (status === 200) {
            setFetchProjects((prev) => !prev);
            toast.success('Project deleted successfully');
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleModalOPen = (e) => {
      setProjectModalOpen(true);
   };

   const handleModalClose = (e) => {
      // e.stopPropagation();
      setProjectModalOpen(false);
   };

   // const handlePinning = async (e) => {
   //    e.stopPropagation();
   //    try {
   //       const { data } = await axiAuth.get(
   //          `api/vendor/projects/${project_id}/pin`
   //       );
   //       if (data.message === 'Project Pinned') {
   //          setIsPinned(true);
   //          alert('Project pinned');
   //       }
   //    } catch (error) {
   //       console.log(error);
   //    }
   // };

   // const handleUnpin = async (e) => {
   //    e.stopPropagation();
   //    try {
   //       const { data } = await axiAuth.get(
   //          `api/vendor/projects/${project_id}/pin`
   //       );
   //       if (data.message === 'Project Unpinned') {
   //          setIsPinned(false);
   //          alert('Project unpinned');
   //       }
   //    } catch (error) {
   //       console.log(error);
   //    }
   // };
   const [editProject, setEditProject] = useState(false);
   const dispatch = useDispatch();

   const editProjectHandler = async (e, project_id) => {
      //when ever we are editing the project we are setting it's id in redux store and then loading the AddProject form and there we are taking that id from redux store.
      e.stopPropagation();
      const { data } = await axiAuth.get(`api/vendor/projects/${project_id}`);
      dispatch(setProjectToBeEdited(data?.project));
      setEditProject(true);
   };

   const [projectPinningConfirm, setProjectPinningConfirm] = React.useState({
      role: 'Project',
      isOpen: false,
      title: 'Pin This Project?',
      message: 'Pinned project will be visible in your portfolio!',
      cacheRole: 'Vendor',
   });

   const [projectUnPinningConfirm, setProjectUnPinningConfirm] = React.useState(
      {
         role: 'Project',
         isOpen: false,
         title: 'Unpin This Project?',
         message: 'Unpinned project will not be visible in your portfolio!',
         cacheRole: 'Vendor',
      }
   );


   const handlePinning = async (e) => {
      e.stopPropagation();
      try {
        const { data } = await axiAuth.get(
          `api/vendor/projects/${project_id}/pin`
        );
        console.log(data);
        if (data.message === "Project Pinned") {
          setIsPinned(true);
          toast.success("Project Pinned Successfully!");
          setProjectPinningConfirm({
            ...projectPinningConfirm,
            isOpen: false,
          });
  
          const updatedProjects = projects.map((project) => {
            if (project.project_id === project_id) {
              return {
                ...project,
                is_pinned: true,
              };
            }
            return project;
          });
          dispatch(setProjects(updatedProjects));
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleUnpin = async (e) => {
      e.stopPropagation();
      try {
        const { data } = await axiAuth.get(
          `api/vendor/projects/${project_id}/pin`
        );
        console.log(data);
        if (data.message === "Project Unpinned") {
          setIsPinned(false);
          toast.warn("Project Unpinned Successfully!");
  
          setProjectUnPinningConfirm({
            ...projectUnPinningConfirm,
            isOpen: false,
          });
  
          const updatedProjects = projects.map((project) => {
            if (project.project_id === project_id) {
              return {
                ...project,
                is_pinned: false,
              };
            }
            return project;
          });
          dispatch(setProjects(updatedProjects));
        }
  
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

   return (
      <ProjectList
         sx={{
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            border: '0.5px solid rgba(77,77,77,1)',
         }}
         onClick={handleModalOPen}
      >
         <TitleBox>
            <Number>{number || 1}</Number>
            <Typography fontWeight={600}>
               {name.length < 15 ? name : name.slice(0, 20) + '...'}
            </Typography>
         </TitleBox>

         <DraggableBottomDialog
            handleClose={handleModalClose}
            open={projectModalOpen}
            bar={true}
            paddingValue='0px'
            specialCase={true}
         >
            <Box sx={{ width: '100%', pb: 2 }}>
               <CardMedia
                  component='img'
                  height='250'
                  image={project?.images[0].url || Portfoliocart}
                  alt='cart'
                  className=''
               />

               <Box sx={{ p: 2 }}>
                  <Typography
                     sx={{
                        mt: 0.9,
                        display: 'flex',
                        justifyContent: 'space-between',
                     }}
                  >
                     <span
                        style={{
                           background: '#3FB500',
                           borderRadius: '5px',
                           padding: '2.4px 12px',
                           color: '#FFFFFF',
                           fontFamily: 'Inter',
                           fontSize: '16px',
                           fontWeight: '500',
                           height: '30px',
                        }}
                     >
                        Commercial
                     </span>
                     <IconButton size='small'>
                        {isPinned ? (
                           <PushPin
                              sx={{ mt: 0.4, color: 'black' }}
                              // onClick={handleUnpin}
                              onClick={(e) => {
                                 e.stopPropagation();
                                 setProjectUnPinningConfirm({
                                   ...projectUnPinningConfirm,
                                   isOpen: true,
                                 });
                               }}
                           />
                        ) : (
                           <PushPinOutlinedIcon
                              sx={{ mt: 0.4 }}
                              // onClick={handlePinning}
                              onClick={(e) => {
                                 e.stopPropagation();
                                 setProjectPinningConfirm({
                                   ...projectPinningConfirm,
                                   isOpen: true,
                                 });
                               }}
                           />
                        )}
                     </IconButton>
                  </Typography>
                  <Typography
                     sx={{
                        mt: 1.7,
                        color: '#000000',
                        fontWeight: '700',
                        fontSize: '22px',
                        lineHeight: '26px',
                     }}
                  >
                     {project.name}
                  </Typography>

                  <Typography
                     sx={{
                        mt: 1.5,
                        color: '#000000',
                        fontWeight: '500',
                        fontSize: '16px',
                     }}
                  >
                     {`Location: ${project.city}, ${project.state}`}
                  </Typography>

                  <Typography
                     sx={{
                        mt: 1.5,
                        color: '#000000',
                        fontWeight: '500',
                        fontSize: '16px',
                     }}
                  >
                     {`Amount: ${project.amount}, ${project.state}`}
                  </Typography>

                  <ButtonBox style={{ paddingTop: '15px' }}>
                     <PrimaryButton
                        sx={{
                           px: 3.5,
                           py: 0.5,
                           background: 'transparent',
                           border: '2px solid #4D4D4D',
                           display: 'flex',
                           alignItems: 'center',
                           flex: '1',
                           '&:hover': {
                              border: '2px solid transparent',
                           },
                        }}
                        onClick={(e) =>
                           editProjectHandler(e, project.project_id)
                        }
                     >
                        <EditIcon />
                        Edit
                     </PrimaryButton>

                     <PrimaryButton
                        sx={{
                           px: 3.5,
                           py: 0.5,
                           background: 'transparent',
                           border: '2px solid #F20519',
                           color: '#F20519',
                           flex: '1',
                           display: 'flex',
                           alignItems: 'center',
                           marginLeft: '1rem',
                           '&:hover': {
                              border: '2px solid transparent',
                              background: '#F20519',
                              color: '#ffffff',
                           },
                        }}
                        onClick={(e) => handleProjectDeleteClick(e, project_id)}
                     >
                        <DeleteIcon />
                        Delete
                     </PrimaryButton>
                  </ButtonBox>
               </Box>
            </Box>
         </DraggableBottomDialog>

         <Dialog
            open={editProject}
            handleClose={() => setEditProject(false)}
            fullScreen
         >
            <Box
               sx={modalTopBackButtonStyle}
               onClick={() => setEditProject(false)}
            >
               <KeyboardBackspace />
               <Box>Back to Portfolio</Box>
            </Box>
            {editProject && (
               <Box sx={{ width: '100%' }}>
                  <AddProject
                     backToProjectHandler={() => {
                        setEditProject(false);
                        setProjectModalOpen(false);
                     }}
                     setFetchProjects={setFetchProjects}
                  />
               </Box>
            )}
         </Dialog>

         <ConfirmDialog
            confirmDialog={{
               ...projectDeleteConfirm,
               onConfirm: deleteHandler,
            }}
            setConfirmDialog={setProjectDeleteConfirm}
            variant='warning'
         />

         <ConfirmDialog
            confirmDialog={{
               ...projectPinningConfirm,
               onConfirm: handlePinning,
            }}
            setConfirmDialog={setProjectPinningConfirm}
            variant='warning'
         />

         <ConfirmDialog
            confirmDialog={{
               ...projectUnPinningConfirm,
               onConfirm: handleUnpin,
            }}
            setConfirmDialog={setProjectUnPinningConfirm}
            variant='warning'
         />
      </ProjectList>
   );
};

export default ProjectListView;
