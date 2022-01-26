import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import PushPinIcon from '@mui/icons-material/PushPin';
import YellowButton from '../../../components/YellowButton/YellowButton';

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
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '1.5rem',
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

const SingleProject = () => {
   const classes = useStyles();

   return (
      <Grid item xs={12} md={6} lg={4}>
         <SingleProjectBox>
            <Box className={classes.pinBox}>
               <Typography variant='h6' sx={{ fontWeight: 500, mb: 1.5 }}>
                  Kanpur Power Grid Project
               </Typography>
               <Button startIcon={<PushPinIcon />} color='secondary'>
                  Pin
               </Button>
            </Box>
            <Typography gutterBottom>Kanpur Uttar Pradesh</Typography>
            <Typography gutterBottom>Rs 10 22 560</Typography>
            <Typography gutterBottom>Kalish Sharma</Typography>
            <ImageBox>
               <img src='https://i.ibb.co/prSrHsx/Rectangle-79.png' alt='' />
               <img src='https://i.ibb.co/qnGsGWf/Rectangle-80.png' alt='' />
               <img src='https://i.ibb.co/Yt3y0wS/Rectangle-81.png' alt='' />
               <img src='https://i.ibb.co/w0Jk1B8/Rectangle-82.png' alt='' />
            </ImageBox>
            <hr />
            <ButtonBox>
               <YellowButton
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
