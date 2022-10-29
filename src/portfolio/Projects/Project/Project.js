import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Avatar, styled, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';
import ProjectTag from '../../../components/ProjectTag/ProjectTag';
import ProductDetailList from '../../../components/ProductDetailList/ProductDetailList';
import { axiAuth } from '../../../utils/axiosInstance';
import CollapsableText from '../../../components/CollapsableText/CollapsableText';
import CalculateIcon from '@mui/icons-material/Calculate';
import HistoryIcon from '@mui/icons-material/History';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ResponsiveSlider from '../../../components/ResponsiveSlider/ResponsiveSlider';


const useStyle = makeStyles((theme) => ({
   addressBox: {
      background: '#FFD05B',
      width: '50%',
      height: '25%',
      marginTop: '-2rem',
      zIndex: 100,
      marginLeft: '2rem',
      borderRadius: '1rem',
      padding: '.8rem',
      position: 'absolute',

      [theme.breakpoints.up('md')]: {
         width: '60%',
      },
      [theme.breakpoints.up('lg')]: {
         width: '40%',
      },
   },
   modalHeaderBox: {},
   reviewBox: {
      width: '70%',
      padding: theme.spacing(3),
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '0 auto',
      boxShadow: '0px 4px 8px 0 rgba(0, 0, 0, 0.3)',
      borderRadius: theme.spacing(2),
   },
   typeBox: {
      background: '#3FB500',
      height: '40px',
      marginTop: '-2rem',
      zIndex: 100,
      marginLeft: '16rem',
      borderRadius: '1rem',
      padding: '.8rem',
      position: 'absolute',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('xl')]: {
         marginLeft: '10.5rem',
         fontSize: '1rem',
      },
      [theme.breakpoints.down('md')]: {
         marginLeft: '4rem',
         fontSize: '1rem',
      },
   },
}));

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',

   alignItems: 'center',
}));

const modalStyles = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '60%',
   '@media (max-width: 1500px)': {
      width: '75%',
   },
   '@media (max-width: 1300px)': {
      width: '85%',
   },
   '@media (max-width: 1000px)': {
      width: '90%',
   },
   '@media (max-width: 600px)': {
      width: '100%',
   },
   bgcolor: 'background.paper',
   boxShadow: 24,
   p: 4,
};

const InfoBoxWrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'stretch',
}));
const InfoBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'stretch',
   '@media (max-width: 800px)': {
      flexDirection: 'column',
      alignItems: 'center',
   },
   flex: 1,
   padding: theme.spacing(1.5),
   background: '#FFD05B',
   borderRadius: theme.spacing(1),
   marginRight: theme.spacing(4),
   '&:last-child': {
      marginRight: 0,
   },
   '& .iconBox': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingRight: theme.spacing(1.5),
      borderRight: '3px solid #4D4D4D',
      '@media (max-width: 800px)': {
         borderRight: 0,
      },
      '& svg': {
         fontSize: '50px',
      },
   },
   '& .textBox': {
      textAlign: 'right',
      '@media (max-width: 800px)': {
         textAlign: 'center',
      },
   },
}));



const Project = ({
   project_id,
   imageUrl,
   state,
   kwValue,
   description,
   category,
}) => {
   const classes = useStyle();

   const [open, setOpen] = useState(false);

   const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
   const navigate = useNavigate();

   const [projectDetails, setProjectDetails] = useState({});

   useEffect(() => {
      axiAuth
         .get(`api/vendor/projects/${project_id}`)
         .then(({ data }) => {
            console.log(data);
            setProjectDetails(data.project);
         })
         .catch((err) => {
            console.log('Error fetching project details');
         });
   }, [project_id]);

   const handleOpen = () => {
      if (matches) {
         navigate('/projectDetails');
      } else {
         setOpen(true);
      }
   };
   const handleClose = () => setOpen(false);

   return (
      <>
         <Card
            sx={{
               maxWidth: '100%',
               width: '400px',
               // minHeight: 350,
               minWidth: '250px',
               mx: '2rem',
               bgcolor: '#ffffff',
               borderRadius: 4,
               boxShadow: 0,
               position: 'relative',
            }}
            onClick={handleOpen}
         >
            <CardMedia
               component='img'
               // height='450'
               image={imageUrl}
               alt='green iguana'
               sx={{ height: ['250px'] }}
            />
            <Box
               className={classes.addressBox}
               sx={{
                  top: {
                     xs: '15%',
                     sm: '15%',
                     md: '20%',
                     lg: '50%',
                     xl: '55%',
                  },
               }}
            >
               <Typography
                  variant='h6'
                  sx={{
                     fontWeight: 500,
                     fontSize: ['1rem', '.9rem', '1.3rem'],
                  }}
               >
                  {state}{' '}
               </Typography>
               <Typography
                  variant='h6'
                  sx={{ fontWeight: 400, fontSize: ['1rem', '1.3rem'] }}
               >
                  {kwValue}{' '}
               </Typography>
            </Box>
            <Box className={classes.typeBox} sx={{}}>
               <Typography sx={{ color: '#ffffff', fontWeight: 600 }}>
                  {category?.name}
               </Typography>
            </Box>
            <CardContent sx={{ pl: 4, mt: 4 }}>
               <Box
                  gutterBottom
                  variant='h5'
                  component='div'
                  sx={{ width: ['100%', '100%', '90%'] }}
               >
                  <Typography variant='h5' sx={{ textDecoration: 'none' }}>
                     {description.length > 25
                        ? description.substring(0, 25) + '...'
                        : description}
                  </Typography>
               </Box>
            </CardContent>
         </Card>

         {/* =========================== Modal =========================== */}
         {/* =========================== Modal =========================== */}

         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='project details modal'
            sx={{
               '& .MuiBackdrop-root': {
                  backdropFilter: 'blur(10px)',
               },
            }}
         >
            <Box
               sx={{
                  ...modalStyles,
                  overflowY: 'scroll',
                  height: '95%',
                  borderRadius: 2,
                  bgcolor: '#F3F3F3',
               }}
            >
               <CloseIcon
                  style={{
                     position: 'absolute',
                     right: '3%',
                     top: '3%',
                     cursor: 'pointer',
                     backgroundColor: '#fff',
                     borderRadius: '50%',
                  }}
                  onClick={handleClose}
               />
               <Box>
                  <Typography variant='h4' textAlign='center' fontWeight={600}>
                     {projectDetails?.name}
                  </Typography>
                  <Typography
                     variant='h6'
                     textAlign='center'
                     fontWeight={600}
                     sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}
                  >
                     {' '}
                     <LocationOnIcon />
                     {projectDetails?.city}, {projectDetails?.state}
                  </Typography>
                  <hr />
               </Box>
               <Box>
                  <Box
                     sx={{
                        width: '55%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1,
                     }}
                  >
                     <Typography variant='h5' fontWeight={500} gutterBottom>
                        Description
                     </Typography>
                     <ProjectTag title={projectDetails?.category?.name} />
                  </Box>

                  <Flex sx={{ mb: 2 }}>
                     <ProductDetailList
                        list='Power Capacity'
                        description={`${projectDetails?.power_capacity} ${projectDetails?.power_capacity_type}`}
                        sx={{ mr: 2 }}
                     />
                     <ProductDetailList
                        list='Months Taken'
                        description={`${projectDetails?.duration} ${projectDetails?.duration_type}`}
                     />
                  </Flex>
                  <Typography variant='body1' fontWeight={500} gutterBottom>
                     <CollapsableText
                        text={projectDetails?.description}
                        collapseAt={150}
                     />
                  </Typography>

                  <Box sx={{ my: 3 }}>
                     <ResponsiveSlider
                        images={
                           projectDetails?.images?.map((img) => img.url) || []
                        }
                     />
                  </Box>
               </Box>

               {/* ====== Project Info ====== */}

               <Box sx={{ mb: 3 }}>
                  <Typography variant='h6' gutterBottom>
                     Project Info
                  </Typography>
                  <InfoBoxWrapper>
                     <InfoBox>
                        <Box className='iconBox'>
                           <CalculateIcon />
                        </Box>
                        <Box className='textBox'>
                           <Typography variant='h6'>Cost Of Project</Typography>
                           <Typography
                              sx={{
                                 fontWeight: 600,
                                 fontSize: ['1rem', '1.7rem'],
                                 color: '#000000',
                              }}
                           >
                              Rs {projectDetails?.project_cost}
                           </Typography>
                        </Box>
                     </InfoBox>
                     <InfoBox>
                        <Box className='iconBox'>
                           <HistoryIcon />
                        </Box>
                        <Box className='textBox'>
                           <Typography variant='h6'>
                              Period Of Return
                           </Typography>
                           <Typography
                              sx={{
                                 fontWeight: 600,
                                 fontSize: ['1rem', '1.7rem'],
                                 color: '#000000',
                              }}
                           >
                              {`${projectDetails?.return_period} ${projectDetails?.return_period_type}`}
                           </Typography>
                        </Box>
                     </InfoBox>
                     <InfoBox>
                        <Box className='iconBox'>
                           <MonetizationOnIcon />
                        </Box>
                        <Box className='textBox'>
                           <Typography variant='h6'>
                              Amount Of Return
                           </Typography>
                           <Typography
                              sx={{
                                 fontWeight: 600,
                                 fontSize: ['1rem', '1.7rem'],
                                 color: '#000000',
                              }}
                           >
                              Rs {projectDetails?.return_amount}
                           </Typography>
                        </Box>
                     </InfoBox>
                  </InfoBoxWrapper>
               </Box>

               {/* ====== Customer review ====== */}

               <Box sx={{ mb: 3 }}>
                  <Typography variant='h6' gutterBottom>
                     Customer Review
                  </Typography>
                  <Box className={classes.reviewBox}>
                     <Avatar
                        alt='Remy Sharp'
                        src='https://i.ibb.co/SJ05bh1/review-Image.png'
                        sx={{ width: '70px', height: '70px', mb: 0.5 }}
                     />
                     <Typography variant='h5' fontWeight={500} gutterBottom>
                        {projectDetails?.reviews?.length > 0 &&
                           projectDetails?.reviews[0]['customer_name']}
                     </Typography>
                     <Typography
                        variant='h6'
                        fontWeight={500}
                        textAlign='center'
                     >
                        ”{' '}
                        {projectDetails?.reviews?.length > 0 &&
                           projectDetails?.reviews[0]['customer_review']}
                        „
                     </Typography>
                  </Box>
               </Box>
            </Box>
            {/* ========= modal end ============ */}
         </Modal>
      </>
   );
};

export default Project;

/* 
https://i.ibb.co/QjMph3z/info1.png
https://i.ibb.co/RjL28gM/info2.png
https://i.ibb.co/XjCLDC4/info3.png
*/
