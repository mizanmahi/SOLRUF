import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import YellowButton from '../../../components/YellowButton/YellowButton';
import { useDispatch } from 'react-redux';
import { setProjectToBeEdited } from '../../../redux/slices/projectSlice';

const SingleProjectBox = styled(Box)(({ theme }) => {
   return {
      padding: theme.spacing(2),
      background: '#F3F3F3',
      border: '2px solid #FFD05B',
      borderRadius: theme.spacing(1),
   };
});

const ImageBox = styled(Box)(({ theme }) => {
   return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '1.5rem',
      '& img': {
         maxWidth: '100px',
         marginRight: '1rem',
         '&:last-child': {
            marginRight: 0,
         },
      },
   };
});

const ButtonBox = styled(Box)(({ theme }) => {
   return {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
   };
});

const useStyles = makeStyles((theme) => {
   return {
      pinBox: {
         display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center',
      },
   };
});

const SingleProject = ({ project, setShowForm }) => {
   const classes = useStyles();
   console.log(project);
   const { name, is_pinned, project_cost, project_id, state, city, images } =
      project;

   const dispatch = useDispatch();

   const editHandler = () => {
      dispatch(setProjectToBeEdited(project));
      setShowForm(true);
   }

   return (
      <Grid item xs={12} md={6} lg={4}>
         <SingleProjectBox>
            <Box className={classes.pinBox}>
               <Typography variant='h6' sx={{ fontWeight: 500, mb: 1.5 }}>
                  {name}
               </Typography>
               {is_pinned ? (
                  <Button startIcon={<PushPinIcon />} color='secondary'>
                     Pin
                  </Button>
               ) : (
                  <Button startIcon={<PushPinOutlinedIcon />} color='secondary'>
                     Pin
                  </Button>
               )}
            </Box>
            <Typography gutterBottom>{`${city} ${state}`}</Typography>
            <Typography gutterBottom>Rs {project_cost}</Typography>

            <ImageBox>
               {images.map((imageUrl) => (
                  <img src={imageUrl} alt='' />
               ))}
            </ImageBox>
            <hr />
            <ButtonBox>
               <YellowButton
               onClick={editHandler}
                  style={{
                     border: '2px solid #FFD05B',
                     color: '#4D4D4D',
                     background: '#fff',
                     padding: '.7rem 1.5rem',
                  }}
               >
                  {' '}
                  <EditIcon /> Edit
               </YellowButton>
               <YellowButton
                  style={{
                     border: '2px solid red',
                     color: 'red',
                     background: '#fff',
                     padding: '.7rem 1.5rem',
                  }}
               >
                  {' '}
                  <DeleteIcon /> Delete
               </YellowButton>
            </ButtonBox>
         </SingleProjectBox>
      </Grid>
   );
};

export default SingleProject;
