import { Box } from '@mui/system';
import React, { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Grid, MenuItem, Typography } from '@mui/material';
import SolrufTextField from '../../components/TextField/TextField';
import { useDropzone } from 'react-dropzone';
import UploadError from '../MyPortfolio/UploadError';
import SingleFIleUploadWithProgress from '../MyPortfolio/SingleFIleUploadWithProgress';
import { motion } from 'framer-motion';
// accordion
import CustomAccordion from '../../components/CustomAccordion/CustomAccordion';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
import YellowButton from '../../components/YellowButton/YellowButton';
import { useForm } from 'react-hook-form';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import { axiAuth } from '../../utils/axiosInstance';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import usePinCode from '../../hooks/usePinCode';
import { useDebounce } from 'use-debounce';
import CustomErrorText from '../../components/CustomErrorText/CustomErrorText';

const AddProjectBox = styled(Box)(({ theme }) => {
   return {
      background: '#ffffff',
      padding: theme.spacing(5),
      borderRadius: theme.spacing(2),
      position: 'relative',
      marginTop: theme.spacing(3),
   };
});

const FileInputBox = styled(Box)(({ theme }) => {
   return {
      border: '2px solid #FFD05B',
      height: 200,
      width: '100%',
      maxWidth: '300px',
      background: '#F3F3F3',
      borderRadius: 20,
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
   };
});

const DottedBox = styled(Box)(({ theme }) => {
   return {
      position: 'absolute',
      width: '80%',
      height: '80%',
      border: '2px dashed #FFD05B',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
   };
});

const PowerCapacityBox = styled(Box)(({ theme, error }) => {
   return {
      background: theme.palette.primary.main,
      display: 'flex',
      justifyContent: 'stretch',
      alignItems: 'stretch',
      height: '54px',
      marginTop: '3px',
      boxSizing: 'border-box',
      borderRadius: '5px',
      border: `2px solid ${error ? '#d32f2f' : '#FFD05B'} `,
      overflow: 'hidden',
      '& input': {
         width: '70%',
         padding: '18px 8px',
         border: 'none',
         outline: 'none',
         fontFamily: 'Inter',
         '&::placeholder': {
            fontFamily: 'Inter',
         },
      },
      '& select': {
         width: '30%',
         textAlign: 'center',
         border: 'none',
         outline: 'none',
         background: theme.palette.primary.main,
         fontFamily: 'Inter',
         '& option': {
            fontFamily: 'Inter',
            padding: '10px',
         },
      },
   };
});

const MonthsTakenBox = styled(Box)(({ theme, error }) => {
   return {
      background: theme.palette.primary.main,
      display: 'flex',
      justifyContent: 'stretch',
      alignItems: 'stretch',
      height: '54px',
      marginTop: '3px',
      boxSizing: 'border-box',
      borderRadius: '5px',
      border: `2px solid ${error ? '#d32f2f' : '#FFD05B'} `,
      overflow: 'hidden',
      '& input': {
         width: '70%',
         padding: '18px 8px',
         border: 'none',
         outline: 'none',
         fontFamily: 'Inter',
         '&::placeholder': {
            fontFamily: 'Inter',
         },
      },
      '& select': {
         width: '30%',
         textAlign: 'center',
         border: 'none',
         outline: 'none',
         background: theme.palette.primary.main,
         fontFamily: 'Inter',
         '& option': {
            fontFamily: 'Inter',
            padding: '10px',
         },
      },
   };
});

const ReturnPeriodBox = styled(Box)(({ theme, error }) => {
   return {
      background: theme.palette.primary.main,
      display: 'flex',
      justifyContent: 'stretch',
      alignItems: 'stretch',
      height: '54px',
      marginTop: '3px',
      boxSizing: 'border-box',
      borderRadius: '5px',
      border: `2px solid ${error ? '#d32f2f' : '#FFD05B'} `,
      overflow: 'hidden',
      '& input': {
         width: '70%',
         padding: '18px 8px',
         border: 'none',
         outline: 'none',
         fontFamily: 'Inter',
         '&::placeholder': {
            fontFamily: 'Inter',
         },
      },
      '& select': {
         width: '30%',
         textAlign: 'center',
         border: 'none',
         outline: 'none',
         background: theme.palette.primary.main,
         fontFamily: 'Inter',
         '& option': {
            fontFamily: 'Inter',
            padding: '10px',
         },
      },
   };
});

const AddProject = ({ backToProjectHandler }) => {
   const [projectImages, setProjectImages] = useState([]);

   const { projectToBeEdited } = useSelector((state) => state.project);
   const [prevImages, setPrevImages] = useState(projectToBeEdited?.images);

   const [selectedCategory, setSelectedCategory] = useState(
      projectToBeEdited?.category?.id
   );
   const [categoryError, setCategoryError] = useState(false);

   console.log(projectToBeEdited);

   const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
      const mappedAcceptedFiles = acceptedFiles.map((file) => {
         return {
            file,
            error: [],
         };
      });
      setProjectImages((cur) => [
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
      setProjectImages((cur) =>
         cur.map((fw) => {
            if (fw.file === file) {
               return { ...fw, url };
            }
            return fw;
         })
      );
   };

   const deleteHandler = (file) => {
      setProjectImages((cur) => cur.filter((fw) => fw.file !== file));
   };

   const handleTagChange = (e) => {
      console.log(e.target.value);
      setCategoryError(false);
      e.preventDefault();
      // setCategory_id(e.target.value);
      setSelectedCategory(e.target.value);
   };

   console.log(selectedCategory);

   const {
      register,
      handleSubmit,
      reset,
      watch,
      setValue,
      formState: { errors },
   } = useForm({
      defaultValues: projectToBeEdited,
   });

   const submitHandler = async (formData) => {
      console.log(formData);
      console.log(projectImages);

      if (!selectedCategory) {
         setCategoryError('Please select a category');
         return;
      }

      const projectData = {};
      projectData.category_id = selectedCategory;
      projectData.name = formData.name;
      projectData.description = formData.description;
      projectData.tag = tag;
      projectData.power_capacity = formData.power_capacity;
      projectData.power_capacity_type = formData.power_capacity_type;
      projectData.duration = formData.duration;
      projectData.duration_type = formData.duration_type;
      projectData.cost = formData.cost;
      projectData.return_period = formData.return_period;
      projectData.return_period_type = formData.return_period_type;
      projectData.return_amount = formData.return_amount;
      projectData.images = projectImages.map((fw) => fw.url);
      projectData.city = formData.city;
      projectData.state = formData.state;
      projectData.pincode = formData.pincode;

      console.log(projectData);

      try {
         if (projectToBeEdited) {
            projectData._method = 'PUT';

            const result = await axiAuth.post(
               `api/vendor/projects/${projectToBeEdited.project_id}`,
               projectData
            );
            console.log(result);
            if (result.status === 200) {
               alert('Project Updated Successfully');
               setProjectImages([]);
               reset();
               backToProjectHandler();
            }
         } else {
            const projectResponse = await axiAuth.post(
               'api/vendor/projects',
               projectData
            );

            const reviewResponse = await axiAuth.post(
               'api/vendor/project-reviews',
               {
                  customer_review: formData.customer_review,
                  project_id: projectResponse.data.project_id,
                  customer_name: formData.customer_name,
               }
            );

            console.log(reviewResponse);

            if (
               projectResponse.status === 200 &&
               reviewResponse.status === 200
            ) {
               setProjectImages([]);
               alert('Project Created Successfully');

               reset();
               backToProjectHandler();
            }
         }
      } catch (error) {
         console.log(error.message);
      }
   };
   console.log('errors', errors);

   const [tag, setTag] = useState(0);

   const [categories, setCategories] = useState([]);

   useEffect(() => {
      try {
         axiAuth.get('api/categories?type=project').then(({ data }) => {
            console.log(data);
            setCategories(data.categories);
         });
      } catch (error) {
         console.log(error.message);
      }
   }, []);

   const onImageDelete = async (id) => {
      console.log(id);
      const { status, data } = await axiAuth.post(
         'api/vendor/projects/image/delete',
         {
            image_id: id,
            _method: 'DELETE',
         }
      );

      console.log(data);

      if (status === 200) {
         alert('Image Deleted Successfully');
         setPrevImages(prevImages.filter((img) => img.id !== id));
      }
   };
   const [pincode, state] = watch(['pincode', 'state']);
   console.log({ pincode, state });
   const [debouncedPinCode] = useDebounce(pincode, 1000);

   const { indiaState, district } = usePinCode(debouncedPinCode);
   console.log({ indiaState, district });

   useEffect(() => {
      if (indiaState && district) {
         setValue('state', indiaState, {
            shouldTouch: true,
         });

         setValue('city', district, { shouldTouch: true });
      }
   }, [indiaState, district]);

   return (
      <motion.div
         initial={{ x: '10vw', opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         transition={{ duration: 0.5, delay: 0.1 }}
      >
         <AddProjectBox>
            <Box component='form' onSubmit={handleSubmit(submitHandler)}>
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'flex-end',
                     alignItems: 'center',
                     marginBottom: '2rem',
                  }}
               >
                  <YellowButton style={{ marginLeft: '1rem' }} type='submit'>
                     Submit
                  </YellowButton>
               </Box>
               <Grid container columnSpacing={3} rowSpacing={1}>
                  <Grid item sm={12} md={6} lg={4}>
                     <SolrufTextField
                        label='Project Name'
                        {...register('name', {
                           required: {
                              value: true,
                              message: 'Name is required',
                           },
                        })}
                        error={errors.name}
                        helperText={errors.name ? errors.name.message : ' '}
                     />
                  </Grid>
                  <Grid item sm={12} md={6} lg={4}>
                     <MonthsTakenBox error={!!errors.duration}>
                        <input
                           type='number'
                           placeholder='Months Taken'
                           {...register('duration', {
                              required: {
                                 value: true,
                                 message: 'Duration is Required',
                              },
                           })}
                        />

                        <select
                           name='duration_type'
                           {...register('duration_type', {
                              required: {
                                 value: true,
                                 message: 'Duration Type is Required',
                              },
                           })}
                        >
                           <option value='months'>Month</option>
                           <option value='year'>Year</option>
                        </select>
                     </MonthsTakenBox>

                     <CustomErrorText errorMessage={errors.duration?.message} />
                  </Grid>
                  <Grid item sm={12} md={6} lg={4}>
                     <PowerCapacityBox error={!!errors.power_capacity}>
                        <input
                           type='number'
                           placeholder='Capacity'
                           {...register('power_capacity', {
                              required: {
                                 value: true,
                                 message: 'Capacity is Required',
                              },
                           })}
                        />

                        <select
                           name='capacity_type'
                           {...register('power_capacity_type', {
                              required: {
                                 value: true,
                                 message: 'Capacity Type is Required',
                              },
                           })}
                        >
                           <option value='kw'>Kw</option>
                           <option value='mw'>Mw</option>
                        </select>
                     </PowerCapacityBox>
                     <CustomErrorText
                        errorMessage={errors.power_capacity?.message}
                     />
                  </Grid>
                  <Grid item md={6}>
                     <CustomSelect
                        name='fieldName'
                        label='Project Category'
                        changeHandler={handleTagChange}
                        value={selectedCategory}
                     >
                        {categories.map((category) => (
                           <MenuItem value={category?.category_id}>
                              {category?.name}
                           </MenuItem>
                        ))}
                     </CustomSelect>
                     <CustomErrorText errorMessage={categoryError} />
                  </Grid>
                  <Grid item md={12}>
                     <CustomTextArea
                        rows='5'
                        style={{ marginTop: '0' }}
                        placeholder='Description'
                        {...register('description', {
                           required: {
                              value: true,
                              message: 'Description is required',
                           },
                        })}
                     ></CustomTextArea>
                     <CustomErrorText
                        errorMessage={errors.description?.message}
                     />
                  </Grid>

                  <Grid item md={12}>
                     {/* <SolrufAccordion /> */}

                     <CustomAccordion title='Project Cost and Return On Investment'>
                        <Grid container columnSpacing={3}>
                           <Grid item sm={12} md={6} lg={4}>
                              <SolrufTextField
                                 label='Project Cost'
                                 type='text'
                                 iconText={
                                    <Typography variant='body2'>INR</Typography>
                                 }
                                 size='large'
                                 {...register('cost', {
                                    required: {
                                       value: true,
                                       message: 'Project cost is required',
                                    },
                                 })}
                                 error={errors.cost}
                                 helperText={
                                    errors.cost ? errors.cost.message : ' '
                                 }
                              />
                           </Grid>
                           <Grid item sm={12} md={6} lg={4}>
                              <ReturnPeriodBox error={errors.return_amount}>
                                 <input
                                    type='number'
                                    placeholder='Return Period'
                                    {...register('return_period', {
                                       required: {
                                          value: true,
                                          message: 'Return Period is Required',
                                       },
                                    })}
                                 />

                                 <select
                                    name='return_period_type'
                                    {...register('return_period_type', {
                                       required: {
                                          value: true,
                                          message: 'Period Type is Required',
                                       },
                                    })}
                                 >
                                    <option value='month'>Month</option>
                                    <option value='year'>Year</option>
                                 </select>
                              </ReturnPeriodBox>
                              <CustomErrorText
                                 errorMessage={errors?.return_period?.message}
                              />
                           </Grid>
                           <Grid item sm={12} md={6} lg={4}>
                              <SolrufTextField
                                 label='Amount of Return'
                                 type='text'
                                 iconText={
                                    <Typography variant='body2'>INR</Typography>
                                 }
                                 size='large'
                                 {...register('return_amount', {
                                    required: {
                                       value: true,
                                       message: 'Return amount is required',
                                    },
                                 })}
                                 error={errors.return_amount}
                                 helperText={
                                    errors.return_amount
                                       ? errors.return_amount.message
                                       : ' '
                                 }
                              />
                           </Grid>
                        </Grid>
                     </CustomAccordion>

                     <CustomAccordion title='Location'>
                        <Grid container columnSpacing={3}>
                           <Grid item sm={12} md={6} lg={4}>
                              <SolrufTextField
                                 defaultValue={
                                    projectToBeEdited
                                       ? projectToBeEdited.pincode
                                       : ''
                                 }
                                 label='Pin Code'
                                 type='text'
                                 size='large'
                                 // value={pinCode}
                                 // onChange={(e) => setPinCode(e.target.value)}
                                 {...register('pincode', {
                                    required: {
                                       value: true,
                                       message: 'Pin Code is required',
                                    },
                                    minLength: {
                                       value: 6,
                                       message: 'Pin Code must be 6 digits',
                                    },
                                 })}
                                 error={errors.pincode}
                                 helperText={
                                    errors.pincode
                                       ? errors.pincode.message
                                       : ' '
                                 }
                              />
                           </Grid>

                           <Grid item sm={12} md={6} lg={4}>
                              <SolrufTextField
                                 label='State'
                                 type='text'
                                 {...register('state', {
                                    required: {
                                       value: true,
                                       message: 'State is required',
                                    },
                                 })}
                                 error={errors.state}
                                 helperText={
                                    errors.state ? errors.state.message : ' '
                                 }
                              />
                           </Grid>
                           <Grid item sm={12} md={6} lg={4}>
                              <SolrufTextField
                                 label='City/District'
                                 // type='text'
                                 {...register('city', {
                                    required: {
                                       value: true,
                                       message: 'District is required',
                                    },
                                 })}
                                 error={errors.city}
                                 helperText={
                                    errors.city ? errors.city.message : ' '
                                 }
                              />
                           </Grid>
                        </Grid>
                     </CustomAccordion>

                     <CustomAccordion title='Customer Details'>
                        <Grid container columnSpacing={3}>
                           <Grid item sm={12} md={6} lg={4}>
                              <SolrufTextField
                                 defaultValue={
                                    projectToBeEdited?.reviews.length > 0
                                       ? projectToBeEdited?.reviews[0][
                                            'customer_name'
                                         ]
                                       : ''
                                 }
                                 label='Customer Name'
                                 type='text'
                                 {...register('customer_name', {
                                    required: {
                                       value: true,
                                       message: 'Name is required',
                                    },
                                 })}
                                 error={errors.customer_name}
                                 helperText={
                                    errors.customer_name
                                       ? errors.customer_name.message
                                       : ''
                                 }
                              />
                           </Grid>
                           <Grid item sm={12}>
                              <CustomTextArea
                                 defaultValue={
                                    projectToBeEdited?.reviews.length > 0
                                       ? projectToBeEdited?.reviews[0][
                                            'customer_review'
                                         ]
                                       : ''
                                 }
                                 rows='5'
                                 placeholder='Customer Review'
                                 style={{ marginTop: '1rem' }}
                                 {...register('customer_review', {
                                    required: {
                                       value: true,
                                       message: 'Review is required',
                                    },
                                 })}
                              ></CustomTextArea>
                              <CustomErrorText
                                 errorMessage={errors?.customer_review?.message}
                              />
                           </Grid>
                        </Grid>
                     </CustomAccordion>

                     <CustomAccordion title='Upload Image'>
                        <Grid container columnSpacing={3}>
                           <Grid item md={12} lg={4}>
                              <FileInputBox {...getRootProps()}>
                                 <input {...getInputProps()} />

                                 <DottedBox>
                                    <Typography
                                       variant='body2'
                                       textAlign='center'
                                    >
                                       Add image (Upto 5 mb jpg, jpeg format)
                                    </Typography>
                                    <img
                                       src='https://i.ibb.co/M23FX1T/upload-Plus.png'
                                       alt=''
                                       style={{
                                          width: '100',
                                          height: '100',
                                       }}
                                    />
                                 </DottedBox>
                              </FileInputBox>
                           </Grid>
                           <Grid item md={12} lg={5}>
                              <Box
                                 sx={{
                                    background: '',
                                    p: 2,
                                    maxHeight: '300px',
                                    overflowY: 'auto',
                                 }}
                              >
                                 {projectImages.map((fileWrapper, i) => {
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

                                 {projectToBeEdited &&
                                    prevImages.map(({ id, url }) => (
                                       <React.Fragment>
                                          <Box
                                             sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                             }}
                                          >
                                             <img
                                                src={url}
                                                alt=''
                                                style={{
                                                   maxWidth: '100%',
                                                   width: '70px',
                                                   height: 'auto',
                                                }}
                                             />

                                             <Button
                                                color='secondary'
                                                sx={{
                                                   fontWeight: 600,
                                                   fontSize: '1.2rem',
                                                   borderBottom: '0 !important',
                                                }}
                                                onClick={() =>
                                                   onImageDelete(id)
                                                }
                                             >
                                                <CloseIcon />
                                             </Button>
                                          </Box>
                                          <hr />
                                       </React.Fragment>
                                    ))}
                              </Box>
                           </Grid>
                           {/* <DesignLayoutUploadWithProgress /> */}
                        </Grid>
                     </CustomAccordion>
                  </Grid>
               </Grid>
            </Box>
         </AddProjectBox>
      </motion.div>
   );
};

export default AddProject;
