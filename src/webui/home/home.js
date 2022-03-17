import React, { useCallback, useState } from 'react';
import './home.css';
import { useLocation } from 'react-router-dom';

import YellowButton from '../../components/YellowButton/YellowButton.js';
import { Button, Container, Grid, Typography } from '@mui/material';
import RightDrawer from '../../components/RightDrawer/RightDrawer';
import { Box, styled } from '@mui/system';

//  assets for enquiry details and the drawer
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FlagIcon from '@mui/icons-material/Flag';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { WhatsApp } from '@mui/icons-material';
import FilePresentIcon from '@mui/icons-material/FilePresent';

import SliderWithCustomImagePreview from '../../components/SliderWithCustomImagePreview/SliderWithCustomImagePreview';
import DetaildProductButton from '../../components/RightDrawer/Svg/DetaildProductButton.svg';
import ProductDetailList from '../../components/ProductDetailList/ProductDetailList';
import FeatureDetail from '../../components/FeatureDetail/FeatureDetail';
import ExpandableTextArea from '../../components/Custom/ExpandableTextArea/ExpandableTextArea';
import { useDropzone } from 'react-dropzone';
import SingleFIleUploadWithProgress from '../../pages/MyPortfolio/SingleFIleUploadWithProgress';
import UploadError from '../../pages/MyPortfolio/UploadError';
import SliderWIthThumbnail from '../../components/SliderWIthThumbnail/SliderWIthThumbnail';
import ResponsiveSlider from '../../components/ResponsiveSlider/ResponsiveSlider';
import ResponsiveSliderWithBottomScroll from '../../components/ResponsiveSliderWithBottomScroll/ResponsiveSliderWithBottomScroll';

const EnquiryDetailsWrapper = styled(Box)(({ theme }) => ({
   position: 'relative',
   width: '100%',
   '& > svg': {
      position: 'absolute',
      top: '.5rem',
      right: '-.5rem',
      fontWeight: 'bold',
      cursor: 'pointer',
   },
}));

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
   fontWeight: 'bold',
   marginBottom: '1rem',
}));

const WhatsAppButton = styled(Button)(({ theme }) => ({
   background: '#25D366',
   color: '#ffffff',
   '&:hover': {
      background: '#25D366',
   },
}));

const Divider = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   borderBottom: '1px solid gray',
   margin: '2rem 0',
   paddingBottom: '4px',
}));

const QuestionText = styled(Typography)(({ theme }) => ({
   color: '#000000',
   fontWeight: '600',
   fontSize: '1.2rem',
   marginBottom: '.5rem',
}));

const AnswerBox = styled(Box)(({ theme }) => ({
   border: `2px solid ${theme.palette.primary.main}`,
   borderRadius: theme.shape.borderRadius,
   background: '#fff6e0',
   '& > textarea': {
      background: '#fff6e0',
      color: '#000000',
      fontWeight: 500,
      border: 'none',
      '&:focus': {
         outline: 'none',
      },
   },
}));

// for file upload
const FileInputBox = styled(Box)(({ theme }) => {
   return {
      '& svg': {
         fontSize: '2rem',
         marginBottom: '3px',
         color: '#666F73',
         cursor: 'pointer',
         '&:hover': {
            color: theme.palette.primary.main,
         },
      },
   };
});

const images = [
   'https://i.ibb.co/1fhvv6Y/2-1.jpg',
   'https://i.ibb.co/mq74Q7t/3.jpg',
   'https://i.ibb.co/CWHb9Bz/1.jpg',
   'https://i.ibb.co/f2hPD57/4.jpg',
];

const moreImages = [
   ...images,
   'https://i.ibb.co/1bT7CYW/IMG-20191205-WA0009.jpg',
   'https://i.ibb.co/ygLHH1D/IMG-20191205-WA0010.jpg',
   'https://i.ibb.co/Jzn56pJ/IMG-20191205-WA0011.jpg',
];

const shoes = [
   'https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_960_720.jpg',
   'https://cdn.pixabay.com/photo/2021/10/11/18/56/shoes-6701631_960_720.jpg',
   'https://cdn.pixabay.com/photo/2020/08/24/21/40/fashion-5515135_960_720.jpg',
   'https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310_960_720.png',
   'https://cdn.pixabay.com/photo/2014/10/27/19/18/baby-shoes-505471_960_720.jpg',
   'https://cdn.pixabay.com/photo/2020/07/01/17/21/skater-5360306_960_720.jpg',
];

function Home({ setShowDashboard, showDashboard }) {
   const location = useLocation();
   console.log(location);

   const [rightDrawerOpen, setRightDrawerOpen] = React.useState(false);

   // const questions = [
   //    {
   //       question: 'Question 1',
   //       answer: 'Some answer',
   //       _id: '4565454',
   //       document: [],
   //    },
   //    {
   //       question: 'Question 2',
   //       answer: 'Some answer 2',
   //       _id: '456545445',
   //       document: [],
   //    },
   // ];
   // const handleDocumentUpload = (id) => {
   //    setAnswerImages(question => question.map(item => {
   //       if (item._id === id) {
   //          item.document.push(item.document[0]);
   //       }
   //       return item;
   //    }))
   // }

   const [answerImages, setAnswerImages] = useState([]);

   const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
      const mappedAcceptedFiles = acceptedFiles.map((file) => {
         return {
            file,
            error: [],
         };
      });
      setAnswerImages((cur) => [
         ...cur,
         ...mappedAcceptedFiles,
         ...rejectedFiles,
      ]);
   }, []);

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      maxSize: 5000000,
      accept: 'image/jpeg, image/png',
   });

   const onFileUpload = (url, file) => {
      setAnswerImages((cur) =>
         cur.map((fw) => {
            if (fw.file === file) {
               return { ...fw, url };
            }
            return fw;
         })
      );
   };

   const deleteHandler = (file) => {
      setAnswerImages((cur) => cur.filter((fw) => fw.file !== file));
   };

   console.log(answerImages);

   return (
      <Container maxWidth='xl'>
         <div className='homeContainer'>
            <div className='lorem'>
               <Typography variant='h2' sx={{ fontWeight: 600 }}>
                  Solruf
               </Typography>
               <Typography>
                  Lorem Ipsum is simply dummy text of <br /> the printing and
                  typesetting industry.
               </Typography>
               <YellowButton style={{ fontSize: '1rem' }}>
                  Learn More
               </YellowButton>
            </div>
         </div>

         <Button sx={{ mb: 5 }} onClick={() => setRightDrawerOpen(true)}>
            Open
         </Button>

         <RightDrawer
            drawerStyles={{ backgroundColor: '#fff' }}
            open={rightDrawerOpen}
            onClose={() => setRightDrawerOpen(false)}
            anchor='right'
         >
            <EnquiryDetailsWrapper>
               <CloseIcon onClick={() => setRightDrawerOpen(false)} />
               <Box sx={{ ml: 2 }}>
                  <Grid container spacing={2} alignItems='center'>
                     <Grid item xs={12} md={6}>
                        <Box sx={{ maxWidth: '450PX', mx: 'auto' }}>
                           <SliderWIthThumbnail images={images} />
                        </Box>
                     </Grid>
                     <Grid item xs={12} md={6}>
                        <Box sx={{ ml: 1.5 }}>
                           <ProductTitle variant='h5'>
                              24-inch Solar Cables (10x Powerful) fully ready to
                              Functional Power Cables
                           </ProductTitle>
                           <img
                              src={DetaildProductButton}
                              alt=''
                              style={{ cursor: 'pointer' }}
                           />
                        </Box>
                     </Grid>
                  </Grid>
               </Box>
               <Flex sx={{ justifyContent: 'space-around' }}>
                  <Box>
                     <ProductDetailList
                        hand={true}
                        list='Price/Watt'
                        description='Rs 256/sq.ft.'
                     />
                     <ProductDetailList
                        hand={true}
                        list='Price Of Panel'
                        description='Rs 2500000'
                     />
                     <ProductDetailList
                        hand={true}
                        list='Power Capacity'
                        description='1024 Watts'
                     />
                  </Box>
                  <Box>
                     <ProductDetailList
                        hand={true}
                        list='Price/Watt'
                        description='Rs 256/sq.ft.'
                     />
                     <ProductDetailList
                        hand={true}
                        list='Price Of Panel'
                        description='Rs 2500000'
                     />
                     <ProductDetailList
                        hand={true}
                        list='Power Capacity'
                        description='1024 Watts'
                     />
                  </Box>
               </Flex>
               <Divider>
                  <Typography variant='h6'>Order Details</Typography>
               </Divider>

               {/* =========  Order details ========= */}

               <Flex
                  sx={{
                     justifyContent: 'flex-start',
                     alignItems: 'flex-start',
                  }}
               >
                  <Box sx={{ mr: 2, minWidth: '50%' }}>
                     <FeatureDetail
                        icon={<ProductionQuantityLimitsIcon />}
                        title='Quantity'
                        value={3}
                     />
                     <FeatureDetail
                        icon={<DateRangeIcon />}
                        title='Date'
                        value='20th Aug, 2022'
                     />
                     <FeatureDetail
                        icon={<LocationOnIcon />}
                        title='Street'
                        value='1089/25, Shiv Motor Market, Kashmere Gate Delhi, Delhi, 110001, 01123929957'
                     />
                  </Box>
                  <Box>
                     <FeatureDetail
                        icon={<LocationCityIcon />}
                        title='City/District'
                        value='Mumbai'
                     />

                     <FeatureDetail
                        icon={<FlagIcon />}
                        title='Pin Code'
                        value='259875'
                     />
                  </Box>
               </Flex>

               {/* =========  Customer details ========= */}

               <Divider>
                  <Typography variant='h6'>Customer Details</Typography>
                  <WhatsAppButton endIcon={<WhatsApp />}>
                     Whatsapp Button
                  </WhatsAppButton>
               </Divider>
               <Flex
                  sx={{
                     justifyContent: 'flex-start',
                     alignItems: 'flex-start',
                  }}
               >
                  <Box sx={{ mr: 2, minWidth: '50%' }}>
                     <FeatureDetail
                        icon={<AccountCircleIcon />}
                        title='Customer Name'
                        value='Aman jain'
                     />
                     <FeatureDetail
                        icon={<LocalPhoneIcon />}
                        title='Phone Number'
                        value='+91 123-456-789'
                     />
                     <FeatureDetail
                        icon={<ApartmentIcon />}
                        title='Company Name'
                        value='Epc Solar Space'
                     />
                  </Box>
                  <Box>
                     <FeatureDetail
                        icon={<EmailIcon />}
                        title='Email'
                        value='amanjainXXXX@email.com'
                     />

                     <FeatureDetail
                        icon={<LanguageIcon />}
                        title='Website'
                        value='www.companyname.in/.com'
                     />

                     <FeatureDetail
                        icon={<ConfirmationNumberIcon />}
                        title='GST No'
                        value='27ABFCS2596E1Z4'
                     />
                  </Box>
               </Flex>

               {/* ========= Upload Area =========  */}
               <Divider>
                  <Typography variant='h6'>
                     {' '}
                     <strong>Queries</strong> (Past link to Document what wish
                     to share)
                  </Typography>
               </Divider>
               <Box sx={{ mb: 2 }}>
                  <QuestionText>
                     Q. How Price per watt setting is done?
                  </QuestionText>
                  <AnswerBox>
                     <ExpandableTextArea placeholder='Answer' minRows={3} />
                     <FileInputBox {...getRootProps()}>
                        <input {...getInputProps()} />
                        <FilePresentIcon />
                     </FileInputBox>
                  </AnswerBox>
                  <Box
                     sx={{
                        background: '',
                        p: 2,
                        maxHeight: '300px',
                        overflowY: 'auto',
                     }}
                  >
                     {answerImages.map((fileWrapper, i) => {
                        return fileWrapper?.errors?.length ? (
                           <UploadError
                              key={i}
                              file={fileWrapper.file}
                              errors={fileWrapper.errors}
                              onDelete={deleteHandler}
                           />
                        ) : (
                           <SingleFIleUploadWithProgress
                              key={i}
                              file={fileWrapper.file}
                              onDelete={deleteHandler}
                              onFileUpload={onFileUpload}
                           />
                        );
                     })}
                  </Box>
               </Box>
            </EnquiryDetailsWrapper>
         </RightDrawer>

         {/* <MultipleSelectChip /> */}

         <Box sx={{ display: 'flex' }}>
            <Box sx={{ maxWidth: '350px', p: 2 }}>
               <SliderWIthThumbnail images={shoes} />
            </Box>
            <Box sx={{ maxWidth: '450px', p: 2 }}>
               <SliderWIthThumbnail images={shoes} />
            </Box>
         </Box>

         <Box sx={{ my: 15 }}>
            <ResponsiveSlider images={shoes} />
         </Box>

         <Box sx={{ my: 5 }}>
            <ResponsiveSliderWithBottomScroll images={shoes} />
         </Box>
      </Container>
   );
}

export default Home;
