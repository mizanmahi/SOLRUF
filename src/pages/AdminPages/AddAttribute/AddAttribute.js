import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import YellowButton from '../../../components/YellowButton/YellowButton';
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
import SelectCheckBox from '../../../components/SelectCheckBox/SelectCheckBox';

const AddAttribute = () => {
   const [selectedCategory, setSelectedCategory] = useState(null);
   const [selectedAttribute, setSelectedAttribute] = useState(null);
   const [selectedBrand, setSelectedBrand] = useState(null);
   const [selectedSubCategory, setSelectedSubCategory] = useState(null);
   const [categories, setCategories] = useState([]);
   const [subCategories, setSubCategories] = useState([]);
   const [brands, setBrands] = useState([]);
   const [attributeList, setAttributeList] = useState([]);
   const [selectedViews, setSelectedViews] = useState([]);

   console.log(selectedViews);

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
         console.log('comes here');
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

         console.log(selectedSubCategory);
         console.log(newCategoryId);

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
            (attribute) => attribute.name === selectedAttribute.name
         )
      ) {
         toast.warn('This attribute already exists');
      } else {
         createAttribute(
            {
               name: selectedAttribute?.name,
               category_id: selectedSubCategory.category_id || newSubCategoryId,
            },
            dispatch
         ).then((response) => {
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

   console.log(selectedSubCategory);

   return (
      <div
         className='py-5'
         style={{
            minHeight: '55vh',
         }}
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className='d-flex my-3'>
               <AutoCompleteSelect
                  style={{ marginRight: '1rem' }}
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
            </div>
            <div>
               <Typography
                  variant='h6'
                  gutterBottom
                  className='my-4 text-center p-2'
               >
                  + Add Field
               </Typography>
               <div className='d-flex my-3'>
                  <AutoCompleteSelect
                     style={{ marginTop: '3px' }}
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
               </div>
            </div>
            <div>
               <Typography
                  variant='h6'
                  gutterBottom
                  className='my-4 text-center p-2'
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
            <Box sx={{ maxWidth: '300px' }}>
               <SelectCheckBox
                  selected={selectedViews}
                  setSelected={setSelectedViews}
                  options={['Range Filter', 'SelectFilter']}
               />
            </Box>
            <div className='w-100'>
               <YellowButton
                  variant='contained'
                  color='primary'
                  style={{
                     padding: '0.5rem 2.8rem',
                  }}
                  className='mx-auto mt-5'
               >
                  {createAttributeSelector.loading ? (
                     <CircularProgress color='success' size={20} />
                  ) : (
                     'Save'
                  )}
               </YellowButton>
            </div>
         </form>
      </div>
   );
};

export default AddAttribute;
