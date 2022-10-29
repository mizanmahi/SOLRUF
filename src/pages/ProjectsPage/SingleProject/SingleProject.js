import { Button, Grid, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { useDispatch } from 'react-redux';
import { setProjectToBeEdited } from '../../../redux/slices/projectSlice';
import { axiAuth } from '../../../utils/axiosInstance';
import PrimaryButton from '../../../components/Custom/PrimaryButton/PrimaryButton';

const SingleProjectBox = styled(Box)(({ theme }) => {
   return {
      padding: theme.spacing(2),
      background: '#ffffff',
      // border: '2px solid #FFD05B',
      borderRadius: theme.spacing(1),
      minHeight: '320px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
   };
});

const ImageBox = styled(Box)(({ theme }) => {
   return {
      display: 'flex',
      // background: '#f3f3f3',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '1.5rem',
      maxWidth: '100%',
      overflow: 'hidden',
      '& img': {
         flex: '0 1 25%',
         maxWidth: '70px',
         height: '50px',
         marginRight: '.5rem',
         display: 'block',
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
         marginBottom: '.8rem',
      },
   };
});

const SingleProject = ({ project, setShowForm }) => {
   const classes = useStyles();
   const { name, is_pinned, project_cost, state, city, images, project_id } =
      project;

   const dispatch = useDispatch();

   const editHandler = async (project_id) => {
      const { data } = await axiAuth.get(`api/vendor/projects/${project_id}`);
      console.log(data);
      dispatch(setProjectToBeEdited(data?.project));
      setShowForm(true);
   };

   const match1350 = useMediaQuery('(max-width:1350px)');

   const [isPinned, setIsPinned] = React.useState(is_pinned);

   console.log(is_pinned);

   const handlePinning = async () => {
      try {
         const { data } = await axiAuth.get(
            `api/vendor/projects/${project_id}/pin`
         );
         console.log(data);
         if (data.message === 'Project Pinned') {
            setIsPinned(true);
            alert('Project pinned');
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleUnpin = async () => {
      try {
         const { data } = await axiAuth.get(
            `api/vendor/projects/${project_id}/pin`
         );
         console.log(data);
         if (data.message === 'Project Unpinned') {
            setIsPinned(false);
            alert('Project unpinned');
         }

         console.log(data);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Grid item xs={12} md={6} lg={4}>
         <SingleProjectBox>
            <Box>
               <Box className={classes.pinBox}>
                  <Typography
                     variant='h6'
                     sx={{ fontWeight: 500, color: '#000000', maxWidth: '70%' }}
                  >
                     {name.length > 22 ? `${name.substring(0, 22)}...` : name}
                  </Typography>
                  {isPinned ? (
                     <Button
                        startIcon={<PushPinIcon />}
                        sx={{ color: '#000000' }}
                        onClick={handleUnpin}
                     >
                        Pin
                     </Button>
                  ) : (
                     <Button
                        startIcon={<PushPinOutlinedIcon />}
                        sx={{ color: '#000000' }}
                        onClick={handlePinning}
                     >
                        Pin
                     </Button>
                  )}
               </Box>
               <Box>
                  <Typography gutterBottom>{`${city}, ${state}`}</Typography>
                  <Typography gutterBottom>Rs {project_cost}</Typography>
               </Box>
            </Box>

            <ImageBox>
               {images.map(
                  ({ id, url }, i) => i < 4 && <img key={id} src={url} alt='' />
               )}
            </ImageBox>
            <hr />
            <ButtonBox>
               <PrimaryButton
                  variant='secondary'
                  onClick={() => editHandler(project_id)}
                  style={{
                     padding: match1350 ? '.5rem .8rem' : '.7rem 1.5rem',
                  }}
                  IconStart={EditIcon}
               >
                  Edit
               </PrimaryButton>
               <PrimaryButton
                  sx={{
                     border: '2px solid #F20519',
                     color: '#F20519',
                     padding: match1350 ? '.4rem .7rem' : '.7rem 1.4rem',
                     '&:hover': {
                        background: '#F20519',
                        color: '#ffffff',
                        border: '2px solid transparent',
                     },
                  }}
                  IconStart={DeleteIcon}
                  variant='secondary'
               >
                  Delete
               </PrimaryButton>
            </ButtonBox>
         </SingleProjectBox>
      </Grid>
   );
};

export default SingleProject;
