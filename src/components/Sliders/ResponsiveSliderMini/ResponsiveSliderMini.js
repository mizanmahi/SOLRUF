import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination, Navigation, Scrollbar, Keyboard } from 'swiper';
import './ResponsiveSliderMini.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { saveAs } from 'file-saver';

import { Box } from '@mui/material';
import { axiAuth } from '../../../utils/axiosInstance';
import { useState } from 'react';
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog';

const ResponsiveSliderMini = ({ images, setFetchImages }) => {
   const [deleteImageId, setDeleteImageId] = useState('');
   const [imageDeleteConfirm, setImageDeleteConfirm] = useState({
      role: 'Image',
      isOpen: false,
      title: 'Delete Image?',
      message: 'Image will be deleted permanently once you continue!',
      cacheRole: 'User',
   });

   const imageDeleteHandler = () => {
      console.log('delete image');
      axiAuth
         .post(`api/image/delete`, { image_id: deleteImageId })
         .then((res) => {
            console.log(res.data);
            if (res.status === 200) {
               setImageDeleteConfirm({
                  ...imageDeleteConfirm,
                  isOpen: false,
               });
               setFetchImages((prev) => !prev);
            }
         })
         .catch((err) => {
            console.log(err.message);
         });
   };

   const handleImageDeleteClick = (image_id) => {
      setImageDeleteConfirm({
         ...imageDeleteConfirm,
         isOpen: true,
      });

      setDeleteImageId(image_id);
   };

   console.log(images);

   const downloadImage = async (image_url, image_name) => {
      try {
         let blob = await fetch(image_url).then((image) => image.blob()); // making a blob from the image url to download
         saveAs(blob, 'solruf_image'); // Put your image url here.
      } catch (error) {
         console.log(error.message);
      }
   };

   return (
      <Swiper
         //  loop={true}
         // slidesPerView={3}
         spaceBetween={0}
         navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
         }}
         centeredSlides={false}
         slidesPerGroupSkip={1}
         grabCursor={true}
         keyboard={{
            enabled: true,
         }}
         breakpoints={{
            1024: {
               slidesPerView: 1,
               spaceBetween: 10,
            },
            960: {
               slidesPerView: 4,
               spaceBetween: 30,
            },
            600: {
               slidesPerView: 3,
               spaceBetween: 20,
            },
            500: {
               slidesPerView: 2,
               spaceBetween: 20,
            },
            0: {
               slidesPerView: 2,
               spaceBetween: 20,
            },
         }}
         modules={[Pagination, Navigation, Scrollbar, Keyboard]}
         className='my_swiper_mini'
      >
         {images.map((image, index) => (
            <SwiperSlide key={index}>
               <Box sx={{ position: 'relative', background: '#f3f3f3', width: '120px' }}>
                  <DeleteIcon
                     sx={{
                        position: 'absolute',
                        color: 'red',
                        right: '25%',
                        cursor: 'pointer',
                        '&:hover': {
                           transform: 'scale(1.1)',
                        },
                     }}
                     onClick={() => handleImageDeleteClick(image.image_id)}
                  />
                  <img
                     src={image?.image_url}
                     alt=''
                     onClick={() => downloadImage(image?.image_url)}
                    
                  />
               </Box>
            </SwiperSlide>
         ))}
         <div className='swiper-button-prev'>
            <i className='fas fa-chevron-left'></i>
         </div>
         <div className='swiper-button-next'>
            <i className='fas fa-chevron-right'></i>
         </div>
         <ConfirmDialog
            confirmDialog={{
               ...imageDeleteConfirm,
               onConfirm: imageDeleteHandler,
            }}
            setConfirmDialog={setImageDeleteConfirm}
            variant='warning'
         />
      </Swiper>
   );
};

export default ResponsiveSliderMini;
