import { styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ProjectModal from '../ProjectModal/ProjectModal';
import { useNavigate } from 'react-router';
const ProjectList = styled(Box)(({ theme }) => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   background: '#f3f3f3',
   padding: '.8rem',
   borderRadius: '5px',
   cursor: 'pointer',
}));
const TitleBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}));
const ActionBox = styled(Box)(({ theme }) => ({}));
const Number = styled(Box)(({ theme }) => ({
   background: '#4D4D4D',
   color: '#ffffff',
   fontWeight: 'bold',
   mr: '0.5rem',
   borderRadius: '50%',
   padding: '0.5rem',
   width: '1.5rem',
   height: '1.5rem',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   marginRight: '0.5rem',
}));

const ProjectListView = ({ project }) => {
   const [tag, setTag] = useState(0);
   const [projectModalOpen, setProjectModalOpen] = useState(false);
   const navigate = useNavigate(); 
    
   const handleModalOPen = (e) => {
      setProjectModalOpen(true);
   };

   console.log(project);
   const { name } = project;

   const handleModalClose = (e) => {
      e.stopPropagation();
      setProjectModalOpen(false);
   };

   const handleEdit = (e) => {
      e.stopPropagation();
      navigate(`/editProjectMobile/${project.project_id}`);
   };

   return (
      <ProjectList onClick={handleModalOPen}>
         <TitleBox>
            <Number>1</Number>
            <Typography fontWeight={600}>
               {name.length < 15 ? name : name.slice(0, 20) + '...'}
            </Typography>
         </TitleBox>
         <ActionBox>
            {tag === 0 ? (
               <PushPinOutlinedIcon
                  sx={{
                     cursor: 'pointer',
                     color: '#ffd05b',
                  }}
                  onClick={() => setTag(1)}
               />
            ) : (
               <PushPinIcon
                  sx={{
                     cursor: 'pointer',
                     color: '#ffd05b',
                  }}
                  onClick={() => setTag(0)}
               />
            )}
            <EditIcon
               sx={{
                  background: '#ffd05b',
                  borderRadius: '50%',
                  p: 0.2,
                  mx: 1,
               }}
               onClick={handleEdit}
            />
            <DeleteIcon sx={{ color: '#F20519' }} />
         </ActionBox>
         <ProjectModal open={projectModalOpen} handleClose={handleModalClose} />
      </ProjectList>
   );
};

export default ProjectListView;
