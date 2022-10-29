import { Box } from '@mui/system';
import React, { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';
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
import { axiAuth } from '../../utils/axiosInstance';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import DeleteIcon from '@mui/icons-material/Delete';

const AddProjectBox = styled(Box)(({ theme }) => {
   return {
      background: '#ffffff',
      padding: theme.spacing(1),
      borderRadius: theme.spacing(3),
      position: 'relative',
      marginTop: theme.spacing(3),
   };
});

const FileInputBox = styled(Box)(({ theme }) => {
   return {
      //   border: '2px solid #FFD05B',
      //   height: 200,
      //   width: '100%',
      //   maxWidth: '300px',
      //   background: '#F3F3F3',
      //   borderRadius: 20,
      //   padding: theme.spacing(2),
      //   display: 'flex',
      //   flexDirection: 'column',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   position: 'relative',
      '& img': {
         maxWidth: '100%',
      },
   };
});

const PowerCapacityBox = styled(Box)(({ theme }) => {
   return {
      background: theme.palette.primary.main,
      display: 'flex',
      justifyContent: 'stretch',
      alignItems: 'stretch',
      height: '58px',
      marginTop: '3px',
      boxSizing: 'border-box',
      borderRadius: '5px',
      border: '2px solid #FFD05B',
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

const MonthsTakenBox = styled(Box)(({ theme }) => {
   return {
      background: theme.palette.primary.main,
      display: 'flex',
      justifyContent: 'stretch',
      alignItems: 'stretch',
      height: '58px',
      marginTop: '3px',
      boxSizing: 'border-box',
      borderRadius: '5px',
      border: '2px solid #FFD05B',
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

const ReturnPeriodBox = styled(Box)(({ theme }) => {
   return {
      background: theme.palette.primary.main,
      display: 'flex',
      justifyContent: 'stretch',
      alignItems: 'stretch',
      height: '54px',
      marginTop: '3px',
      boxSizing: 'border-box',
      borderRadius: '5px',
      border: '2px solid #FFD05B',
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

const ConsultTextField = styled(TextField)(({ theme }) => ({
   '& label.Mui-focused': {
      color: theme.palette.primary.dark,
   },
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         borderColor: theme.palette.primary.main,
         borderWidth: '2px',
      },
      '&:hover fieldset': {
         borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
         borderColor: theme.palette.primary.main,
      },
   },
   width: '100%',
   marginTop: '.2rem',
   '& .MuiFormHelperText-root': {
      
   }
}));

const ImageBox = styled(Box)(({ theme }) => {
   return {
      background: '#F3F3F3',
      maxWidth: '80px',
      borderRadius: '5px',
      overflow: 'hidden',
      position: 'relative',
      '& img': {
         width: '100%',
      },
      '& svg': {
         position: 'absolute',
         top: 0,
         right: 0,
         zIndex: 1,
         cursor: 'pointer',
         '&:hover': {
            color: 'red'
         }
      }
   };
})

const EditProjectForMobile = () => {
   const [projectImages, setProjectImages] = useState([]);
   const navigate = useNavigate();

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

   const [category_id, setCategory_id] = useState(22);

   const handleTagChange = (e) => {
      e.preventDefault();
      setCategory_id(e.target.value);
   };

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const submitHandler = async (formData) => {
      console.log(formData);
      console.log(projectImages);
      const projectData = {};
      projectData.category_id = category_id;
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
         const { data } = await axiAuth.post(
            'api/vendor/projects',
            projectData
         );
         console.log(data);
         if (data.message === 'Project created successfully') {
            reset();
            setProjectImages([]);
            toast.success(data.message);
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
         axiAuth.get('api/categories').then(({ data }) => {
            console.log(data);
            setCategories(data.categories);
         });
      } catch (error) {
         console.log(error.message);
      }
   }, []);

   const { projectId } = useParams();

   const [project, setProject] = useState({});
   const [loadingProject, setLoadingProject] = useState(true);

   useEffect(() => {
      setLoadingProject(true);
      axiAuth.get(`api/vendor/projects/${projectId}`).then(({ data }) => {
         console.log(data);
         setProject(data.project);
         setLoadingProject(false);
      });
   }, [projectId]);

   console.log(project);

   return (
      <motion.div
         initial={{ x: '10vw', opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         transition={{ duration: 0.3, delay: 0.1 }}
      >
         {loadingProject ? (
            <Loader />
         ) : (
            <AddProjectBox>
               <Box component='form' onSubmit={handleSubmit(submitHandler)}>
                  {/* nav section */}
                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '2rem',
                     }}
                  >
                     <ArrowBackIcon
                        sx={{ fontSize: 40, cursor: 'pointer' }}
                        onClick={() => navigate(-1)}
                     />
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'space-between',
                           alignItems: 'center',
                        }}
                     >
                        {tag === 0 ? (
                           <PushPinOutlinedIcon
                              sx={{
                                 fontSize: '40px',
                                 cursor: 'pointer',
                                 color: '#ffd05b',
                              }}
                              onClick={() => setTag(1)}
                           />
                        ) : (
                           <PushPinIcon
                              sx={{
                                 fontSize: '40px',
                                 cursor: 'pointer',
                                 color: '#ffd05b',
                              }}
                              onClick={() => setTag(0)}
                           />
                        )}
                        <YellowButton
                           style={{ marginLeft: '1rem' }}
                           type='submit'
                        >
                           Update
                        </YellowButton>
                     </Box>
                  </Box>
                  <Grid container spacing={1}>
                     <Grid item xs={12} sm={12} md={6} lg={4}>
                        <SolrufTextField
                           label='Project Name'
                           defaultValue={project.name}
                           {...register('name', {
                              required: {
                                 value: true,
                                 message: 'Name is required',
                              },
                           })}
                        />
                     </Grid>
                     <Grid item xs={12} sm={12} md={6} lg={4}>
                        <MonthsTakenBox>
                           <input
                              defaultValue={project.duration}
                              type='number'
                              placeholder='Months Taken'
                              {...register('duration', {
                                 required: {
                                    value: true,
                                    message: 'Duration is Required',
                                 },
                              })}
                              name='duration'
                              onChange={(event) => +event.target.value}
                           />

                           <select
                              defaultValue={project.duration_type}
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
                     </Grid>
                     <Grid item xs={12} sm={12} md={6} lg={4}>
                        <PowerCapacityBox>
                           <input
                              defaultValue={project.power_capacity}
                              type='number'
                              placeholder='Capacity'
                              {...register('power_capacity', {
                                 required: {
                                    value: true,
                                    message: 'Capacity is Required',
                                 },
                              })}
                              name='power_capacity'
                              onChange={(event) => +event.target.value}
                           />

                           <select
                              defaultValue={project.power_capacity_type}
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
                     </Grid>
                     <Grid item xs={12} md={6}>
                        {/* <CustomSelect
                           sx={{ mt: 0.6 }}
                           name='fieldName'
                           defaultValue={22}
                           value={category_id}
                           // label='Project Category'
                           changeHandler={handleTagChange}
                           // defaultValue={project.category_id}
                        >
                           {categories.map((category) => (
                              <MenuItem
                                 value={category?.category_id}
                                 key={category.category_id}
                              >
                                 { category?.name}
                              </MenuItem>
                           ))}
                        </CustomSelect> */}

                        <ConsultTextField
                           select
                           onChange={handleTagChange}
                           variant='outlined'
                           label='Project Category'
                           fullWidth
                           // defaultValue={22}
                           value={category_id}
                        >
                           {categories.map((category) => (
                              <MenuItem
                                 value={category?.category_id}
                                 key={category.category_id}
                              >
                                 {category?.name}
                              </MenuItem>
                           ))}
                        </ConsultTextField>
                     </Grid>
                     <Grid item xs={12} md={12}>
                        <CustomTextArea
                           defaultValue={project.description}
                           rows='5'
                           placeholder='Description (1000 characters)'
                           {...register('description', {
                              required: {
                                 value: true,
                                 message: 'Name is required',
                              },
                           })}
                           style={{ marginTop: '.3rem' }}
                        ></CustomTextArea>
                     </Grid>

                     <Grid item md={12}>
                        {/* <SolrufAccordion /> */}

                        <CustomAccordion
                           title='Project Cost and Return On Investment'
                           noPadding={true}
                        >
                           <Grid container spacing={1}>
                              <Grid item xs={12} sm={12} md={6} lg={4}>
                                 <SolrufTextField
                                    defaultValue={project.project_cost}
                                    label='Project Cost'
                                    type='text'
                                    iconText={
                                       <Typography variant='body2'>
                                          INR
                                       </Typography>
                                    }
                                    size='large'
                                    {...register('cost', {
                                       required: {
                                          value: true,
                                          message: 'Name is required',
                                       },
                                    })}
                                 />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={4}>
                                 <ReturnPeriodBox>
                                    <input
                                       defaultValue={project.return_period}
                                       type='number'
                                       placeholder='Return Period'
                                       {...register('return_period', {
                                          required: {
                                             value: true,
                                             message:
                                                'Return Period is Required',
                                          },
                                       })}
                                       name='return_period'
                                       onChange={(event) => +event.target.value}
                                    />

                                    <select
                                       defaultValue={project.return_period_type}
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
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={4}>
                                 <SolrufTextField
                                    defaultValue={project.return_amount}
                                    label='Amount of Return'
                                    type='text'
                                    iconText={
                                       <Typography variant='body2'>
                                          INR
                                       </Typography>
                                    }
                                    size='large'
                                    {...register('return_amount', {
                                       required: {
                                          value: true,
                                          message: 'Name is required',
                                       },
                                    })}
                                 />
                              </Grid>
                           </Grid>
                        </CustomAccordion>

                        <CustomAccordion title='Location' noPadding={true}>
                           <Grid container spacing={1}>
                              <Grid item xs={12} sm={12} md={6} lg={4}>
                                 <SolrufTextField
                                    defaultValue={project.state}
                                    label='State'
                                    type='text'
                                    {...register('state', {
                                       required: {
                                          value: true,
                                          message: 'State is required',
                                       },
                                    })}
                                 />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={4}>
                                 <SolrufTextField
                                    defaultValue={project.city}
                                    label='City/District'
                                    type='text'
                                    // size='small'
                                    {...register('city', {
                                       required: {
                                          value: true,
                                          message: 'Name is required',
                                       },
                                    })}
                                 />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={4}>
                                 <SolrufTextField
                                    defaultValue={project.pincode}
                                    label='Pin Code'
                                    type='text'
                                    size='large'
                                    {...register('pincode', {
                                       required: {
                                          value: true,
                                          message: 'Name is required',
                                       },
                                    })}
                                 />
                              </Grid>
                           </Grid>
                        </CustomAccordion>

                        <CustomAccordion
                           title='Customer Details'
                           noPadding={true}
                        >
                           <Grid container spacing={1}>
                              <Grid item xs={12} sm={12} md={6} lg={4}>
                                 <SolrufTextField
                                    label='Customer Name'
                                    type='text'
                                    // size='small'
                                    {...register('customer_name', {
                                       required: {
                                          value: true,
                                          message: 'Name is required',
                                       },
                                    })}
                                 />
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                 <CustomTextArea
                                    rows='5'
                                    placeholder='Customer Review'
                                    {...register('customer_review', {
                                       required: {
                                          value: true,
                                          message: 'Review is required',
                                       },
                                    })}
                                    style={{ marginTop: '0rem' }}
                                 ></CustomTextArea>
                              </Grid>
                           </Grid>
                        </CustomAccordion>

                        <CustomAccordion title='Upload Image'>
                           <Grid container columnSpacing={3}>
                              <Grid item xs={12} md={12} lg={4}>
                                 <FileInputBox {...getRootProps()}>
                                    <input {...getInputProps()} />

                                    <img
                                       src='https://i.ibb.co/C23nQcK/Frame-165.png'
                                       alt=''
                                    />
                                 </FileInputBox>
                              </Grid>
                              <Grid item xs={12} md={12} lg={5}>
                                 <Box sx={{mt: 1.5}}>
                                    {
                                       project.images.map((image, index) => (
                                          <ImageBox>
                                             <img src={image} alt="project" />
                                             <DeleteIcon />
                                          </ImageBox>
                                       ))
                                    }
                                 </Box>
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
                                 </Box>
                              </Grid>
                              {/* <DesignLayoutUploadWithProgress /> */}
                           </Grid>
                        </CustomAccordion>
                     </Grid>
                     <Grid item xs={12}>
                        <YellowButton
                           style={{ width: '100%', marginTop: '1rem' }}
                           type='submit'
                        >
                           Submit
                        </YellowButton>
                     </Grid>
                  </Grid>
               </Box>
            </AddProjectBox>
         )}
      </motion.div>
   );
};

export default EditProjectForMobile;
