import {
   createAttribureInProgress as createAttributeInProgress,
   createAttributeSuccess,
   createAttributetError,
} from '../../../redux/slices/admin/createAttributeSlice';
import {
   createProductError,
   createProductInProgress,
   createProductSuccess,
} from '../../../redux/slices/admin/createProductSlice';
import {
   updateProductError,
   updateProductInProgress,
   updateProductSuccess,
} from '../../../redux/slices/admin/updateProductSlice';
import { axiAuth } from '../../../utils/axiosInstance';

export const getCategories = async () => {
   try {
      let response = await axiAuth.get('api/categories');
      return response.data.categories;
   } catch (error) {
      console.log(error);
   }
};

export const getSubCategories = async (selectedCategory) => {
   try {
      let response = await axiAuth.get(
         `api/categories?parent=${selectedCategory}`
      );
      return response.data.categories;
   } catch (error) {
      console.log(error);
   }
};

export const getAttributes = async (selectedSubCategory) => {
   console.log(selectedSubCategory);
   try {
      let response = await axiAuth.get(
         `api/admin/attributes?category_id=${selectedSubCategory}`
      );
      console.log(response.data.attributes);
      return response.data.attributes;
   } catch (error) {
      console.log(error);
   }
};

export const getBrands = async (selectedCategoryId) => {
   try {
      let response = await axiAuth.get(
         `/api/admin/brands?category_id=${selectedCategoryId}`
      );
      return response.data.brands;
   } catch (error) {
      console.log(error);
   }
};

export const createAttribute = async (attribute, dispatch) => {
   dispatch(createAttributeInProgress());
   try {
      let response = await axiAuth.post('api/admin/attributes', attribute);
      dispatch(createAttributeSuccess());
      return response.data.message;
   } catch (error) {
      dispatch(createAttributetError());
   }
};

export const createBrand = async (brand, dispatch) => {
   dispatch(createAttributeInProgress());
   console.log(brand);
   try {
      let response = await axiAuth.post('api/admin/brands', brand);
      dispatch(createAttributeSuccess());
      return response.data.message;
   } catch (error) {
      dispatch(createAttributetError());
   }
};

export const uploadFile = async (formData) => {
   try {
      let response = await axiAuth.post('api/upload', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });
      return response.data;
   } catch (error) {
      console.log(error);
   }
};

export const createProduct = async (product, dispatch) => {
   dispatch(createProductInProgress());
   try {
      let response = await axiAuth.post('api/admin/products', product);
      dispatch(createProductSuccess());
      return response.data;
   } catch (error) {
      dispatch(createProductError());
   }
};

export const updateProduct = async (product, product_id, dispatch) => {
   dispatch(updateProductInProgress());
   try {
      let response = await axiAuth.put(
         `api/admin/products/${product_id}`,
         product
      );
      dispatch(updateProductSuccess());
      return response.data;
   } catch (error) {
      dispatch(updateProductError());
   }
};
