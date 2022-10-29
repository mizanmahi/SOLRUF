import {
   Box,
   CircularProgress,
   FormControl,
   FormControlLabel,
   FormLabel,
   Radio,
   RadioGroup,
   Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import AutoCompleteSelect from '../../../components/AutoCompleteSelect/AutoCompleteSelect';
import './AddAttribute.css';
import { useDispatch, useSelector } from 'react-redux';
import {
   createAttribute,
   createBrand,
   getAttributes,
   getBrands,
   getCategories,
   getSubCategories,
} from '../helper';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { axiAuth } from '../../../utils/axiosInstance';
import PrimaryButton from '../../../components/Custom/PrimaryButton/PrimaryButton';
// import SelectCheckBox from '../../../components/SelectCheckBox/SelectCheckBox';

const AddAttribute = () => {
   const [selectedCategory, setSelectedCategory] = useState(null);
   const [selectedAttribute, setSelectedAttribute] = useState(null);
   const [selectedBrand, setSelectedBrand] = useState(null);
   const [selectedSubCategory, setSelectedSubCategory] = useState(null);
   const [categories, setCategories] = useState([]);
   const [subCategories, setSubCategories] = useState([]);
   const [brands, setBrands] = useState([]);
   const [attributeList, setAttributeList] = useState([]);

   const [filterType, setFilterType] = React.useState(null);

   const handleFilterChange = (event) => {
      setFilterType(event.target.value);
   };

   console.log({ filterType });

   const createAttributeSelector = useSelector(
      (state) => state.createAttribute
   );

   const schema = yup
      .object({
         category: yup.string().required('Category is required'),
         sub_category: yup.string().required('Sub Category is required'),
         attribute: yup.string().required('Attribute is required'),
      })
      .required();
   const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
   });

   const onSubmit = async (data) => {
      console.log(selectedCategory.category_id);

      let newCategoryId;
      let newSubCategoryId;

      if (!selectedCategory.category_id) {
         const response = await axiAuth.post(
            'api/admin/categories',
            selectedCategory
         );
         if (response.status === 200) {
            newCategoryId = response.data.category_id;
            setSelectedCategory((category) => ({
               ...category,
               category_id: response.data.category_id,
            }));
         }
      }

      if (!selectedSubCategory.category_id) {
         console.log('creating sub');
         const response = await axiAuth.post('api/admin/categories', {
            ...selectedSubCategory,
            parent_id: newCategoryId || selectedCategory.category_id,
         });

         if (response.status === 200) {
            newSubCategoryId = response.data.category_id;
            setSelectedSubCategory((subCategory) => ({
               ...subCategory,
               category_id: newSubCategoryId,
            }));
         }
      }

      if (selectedBrand !== null) {
         if (brands.some((brand) => brand.name === selectedBrand.name)) {
            toast.warn('Brand already exists');
            return;
         }
         createBrand(
            {
               name: selectedBrand.name,
               category_id: selectedCategory.category_id || newCategoryId,
            },
            dispatch
         ).then((response) => {
            if (response === 'Brand Created') {
               toast.success(response);
               setValue('brand', '');
               setSelectedBrand(null);
            } else {
               toast.error('Something went wrong');
            }
         });
      }

      if (
         attributeList.some(
            (attribute) => attribute?.name === selectedAttribute?.name
         )
      ) {
         toast.warn('This attribute already exists');
      } else {
         const newAttribute = {
            name: selectedAttribute?.name,
            category_id: selectedSubCategory.category_id || newSubCategoryId,
            filterable: !filterType || filterType === 'n/a' ? 0 : 1,
         };

         if (filterType !== 'n/a' && filterType !== null) {
            newAttribute.filter_type = filterType;
         }

         createAttribute(newAttribute, dispatch).then((response) => {
            if (response === 'Attribute created') {
               toast.success(response);
               setValue('attribute', '');
               setSelectedAttribute(null);
            } else {
               toast.error('Something went wrong');
            }
         });
      }
      reset();
   };

   const dispatch = useDispatch();

   useEffect(() => {
      getCategories().then((response) => {
         setCategories(response);
      });
   }, []);

   useEffect(() => {
      if (selectedCategory) {
         getSubCategories(selectedCategory.category_id).then((response) => {
            setSubCategories(response);
         });
         getBrands(selectedCategory.category_id).then((response) => {
            setBrands(response);
         });
      }
   }, [selectedCategory]);

   useEffect(() => {
      if (selectedSubCategory) {
         getAttributes(selectedSubCategory.category_id).then((response) => {
            setAttributeList(response);
         });
      }
   }, [selectedSubCategory]);

   return (
      <div
         className='py-5'
         style={{
            minHeight: '55vh',
         }}
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <Box
               sx={{
                  display: 'flex',
                  my: 2,
                  flexDirection: ['column', 'column', 'row'],
               }}
            >
               <AutoCompleteSelect
                  sx={{ marginRight: '1rem', marginBottom: ['1rem', '1rem', 0] }}
                  options={categories}
                  value={selectedCategory}
                  setValue={setSelectedCategory}
                  label='Select Category'
                  formValidation={{ ...register('category') }}
                  errorText={errors.category?.message}
                  register={register}
                  error={errors}
               />

               <AutoCompleteSelect
                  options={subCategories}
                  value={selectedSubCategory}
                  setValue={setSelectedSubCategory}
                  label='Select Sub Category'
                  formValidation={{ ...register('sub_category') }}
                  errorText={errors.sub_category?.message}
                  register={register}
                  error={errors}
               />
            </Box>
            <div>
               <Typography
                  variant='h6'
                  gutterBottom
                  sx={{
                     textAlign: 'center',
                     my: 2,
                     mt: 4
                  }}
               >
                  + Add Field
               </Typography>
               <Box sx={{
                  display: 'flex',
                  my: 2,
               }}>
                  <AutoCompleteSelect
                     style={{ marginTop: '3px', }}
                     options={attributeList}
                     value={selectedAttribute}
                     setValue={setSelectedAttribute}
                     label='Select Attribute'
                     formValidation={{ ...register('attribute') }}
                     errorText={errors.attribute?.message}
                     register={register}
                     error={errors}
                     disabled={selectedSubCategory === null ? true : false}
                  />
               </Box>
            </div>
            <div>
               <Typography
                  variant='h6'
                  gutterBottom
                  sx={{
                     textAlign: 'center',
                     my: 2,
                     mt: 4
                  }}
               >
                  + Add Brand
               </Typography>
               <div className='d-flex my-3'>
                  <AutoCompleteSelect
                     style={{ marginTop: '3px' }}
                     options={brands || []}
                     value={selectedBrand}
                     setValue={setSelectedBrand}
                     label='Select Brand'
                     formValidation={{ ...register('brand') }}
                     errorText={errors.brand?.message}
                     register={register}
                     error={errors}
                     disabled={selectedCategory === null ? true : false}
                  />
               </div>
            </div>
            <Box sx={{ mt: 5 }}>
               <FormControl>
                  <FormLabel
                     id='demo-row-radio-buttons-group-label'
                     sx={{
                        fontSize: '1.3rem',
                        color: '#000000',
                        fontWeight: 500,
                     }}
                  >
                     Filter Type
                  </FormLabel>
                  <RadioGroup
                     row
                     aria-labelledby='demo-row-radio-buttons-group-label'
                     name='row-radio-buttons-group'
                     onChange={handleFilterChange}
                  >
                     <FormControlLabel
                        value='range'
                        control={<Radio />}
                        label='Range'
                     />
                     <FormControlLabel
                        value='select'
                        control={<Radio />}
                        label='Select'
                     />
                     <FormControlLabel
                        value='n/a'
                        control={<Radio />}
                        label='N/A'
                     />
                  </RadioGroup>
               </FormControl>
            </Box>
            <div className='w-100'>
               <PrimaryButton
                  type='submit'
                  sx={{ display: 'block', mx: 'auto', width: ['100%','50%'], mt: 2 }}
               >
                  {createAttributeSelector.loading ? (
                     <CircularProgress color='success' size={20} />
                  ) : (
                     'Save'
                  )}
               </PrimaryButton>
            </div>
         </form>
      </div>
   );
};

export default AddAttribute;
