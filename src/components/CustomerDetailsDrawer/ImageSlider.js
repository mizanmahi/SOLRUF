// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { saveAs } from 'file-saver';


// import required modules
import { Navigation } from 'swiper';
import DeleteIcon from '@mui/icons-material/Delete';

import './imageSlider.css';
import { Fragment, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import { axiAuth } from '../../utils/axiosInstance';

export default function ImageSlider({
   images,
   view = 'large',
   setFetchImages,
}) {
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

   useEffect(() => {
      const swiper = document.querySelector('.image-slider').swiper;

      // Now you can use all slider methods like
      swiper.slideTo(0);
   }, [images]);

   const downloadImage = async (image_url, image_name) => {
      try {
         let blob = await fetch(image_url).then((image) => image.blob()); // making a blob from the image url to download
         saveAs(blob, 'solruf_image'); // Put your image url here.
      } catch (error) {
         console.log(error.message);
      }
   };

   return (
      <>
         <Swiper
            modules={[Navigation]}
            className='image-slider'
            navigation={{
               nextEl: '.swiper-button-next',
               prevEl: '.swiper-button-prev',
            }}
         >
            {images.reverse().map((item, index) => (
               <SwiperSlide key={index}>
                  <Box sx={{ position: 'relative' }}>
                     <DeleteIcon
                        sx={{
                           position: 'absolute',
                           color: 'red',
                           right: '5px',
                           top: '5px',
                           cursor: 'pointer',
                           '&:hover': {
                              transform: 'scale(1.1)',
                           },
                        }}
                        onClick={() => handleImageDeleteClick(item.image_id)}
                     />

                     <img
                        src={item.image_url}
                        alt='product images'
                        className='image-slider-image'
                        style={{ width: `${view === 'mobile' && '80%'}`, cursor: 'pointer' }}
                        onClick={() => downloadImage(item?.image_url)}
                     />
                  </Box>
               </SwiperSlide>
            ))}
            {view === 'mobile' ? (
               <Fragment>
                  <div
                     className='swiper-button-prev'
                     style={{ backgroundColor: 'transparent' }}
                  >
                     <i className='fas fa-chevron-left'></i>
                  </div>
                  <div
                     className='swiper-button-next'
                     style={{ backgroundColor: 'transparent' }}
                  >
                     <i className='fas fa-chevron-right'></i>
                  </div>
               </Fragment>
            ) : (
               <Fragment>
                  <div className='swiper-button-prev'>
                     <i className='fas fa-chevron-left'></i>
                  </div>
                  <div className='swiper-button-next'>
                     <i className='fas fa-chevron-right'></i>
                  </div>
               </Fragment>
            )}
         </Swiper>
         <ConfirmDialog
            confirmDialog={{
               ...imageDeleteConfirm,
               onConfirm: imageDeleteHandler,
            }}
            setConfirmDialog={setImageDeleteConfirm}
            variant='warning'
         />
      </>
   );
}
