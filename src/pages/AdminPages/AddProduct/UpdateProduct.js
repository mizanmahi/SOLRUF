import {
   Backdrop,
   Box,
   Button,
   CircularProgress,
   Container,
   MenuItem,
   styled,
   Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import YellowButton from '../../../components/YellowButton/YellowButton';

import AutoCompleteSelect from '../../../components/AutoCompleteSelect/AutoCompleteSelect';
// import TabPanel from '../../../components/SolrufTabPanel/SolrufTabPanel';
import { AppTextInputButton } from '../../../components/AppTextInputButton';
import './AddProduct.css';
import FileUploadWithProgress from '../../../components/FileUploadWithProgress/FileUploadWithProgress';
import SelectCheckBox from '../../../components/SelectCheckBox/SelectCheckBox';
import ListViewTable from '../../../components/ListViewTable/ListViewTable';
import {
   getAttributes,
   getBrands,
   getCategories,
   getSubCategories,
   updateProduct,
} from '../helper';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
// import AddAttribute from '../AddAttribute/AddAttribute';
import { nanoid } from 'nanoid';
import { useDropzone } from 'react-dropzone';
import { PlusIcon } from '@heroicons/react/solid';
import UploadError from '../../MyPortfolio/UploadError';
import SingleFIleUploadWithProgress from '../../MyPortfolio/SingleFIleUploadWithProgress';
import {
   generateUrl,
   generatePrevUrl,
} from '../../../utils/urlGeneratorForProductAndWarrantyDoc';
import SolrufTextField from '../../../components/TextField/TextField';
import { axiAuth } from '../../../utils/axiosInstance';
import CloseIcon from '@mui/icons-material/Close';
import FilterModal from './FilterModal';
import SolrufSwitch from '../../../components/Custom/SolrufSwitch/SolrufSwitch';
import {
   CertificateNameBox,
   DocumentUploadBox,
   FieldUnitBox,
} from './updateProduct.style';
import PrimaryButton from '../../../components/Custom/PrimaryButton/PrimaryButton';
import { useParams } from 'react-router';

// 'List View' >> Portfolio card
// 'Grid View' >> Procurement card
// 'Product Main Page' >> Product feature list
// 'Booking price view' >> Vendor editable purchase
// 'Price View' >> Vendor editable booking

export const ViewPointOptions = [
   'Portfolio card',
   'Procurement card',
   'Vendor editable purchase',
   'Vendor editable booking',
   'Product feature list',
];

const SolrufTextFieldGray = styled(SolrufTextField)(({ theme }) => ({
   '& .MuiOutlinedInput-root': {
      //// background: '#f3f3f3',
   },
}));

const UpdateProduct = () => {
   const dispatch = useDispatch();
   const updateProductSelector = useSelector(
      (state) => state.updateProductSlice
   );
   console.log({ updateProductSelector });

   const [page, setPage] = useState('main');

   const [units, setUnits] = useState([]);
   const [selectedUnit, setSelectedUnit] = useState('');

   // console.log('selectedUnit>>>>>>',selectedUnit)

   useEffect(() => {
      axiAuth
         .get('api/admin/units')
         .then((res) => {
            setUnits(res.data.units);
            setSelectedUnit(res.data.units[0]);
         })
         .catch((err) => {
            toast.warn('Something went wrong when fetching units');
            console.log(err);
         });
   }, []);

   //selected values
   const [selectedCategory, setSelectedCategory] = useState(null);
   const [selectedSubCategory, setSelectedSubCategory] = useState(null);
   const [selectedAttribute, setSelectedAttribute] = useState(null);
   const [selectedBrand, setSelectedBrand] = useState('');
   const [productImages, setProductImages] = useState([]);
   const [selectedViews, setSelectedViews] = useState([]);
   const [fieldUnit, setFieldUnit] = useState('');
   const [openModal, setOpenModal] = useState(false);

   // edit products states
   // const [editProduct, setEditProduct] = useState(null);

   //entered values
   const [productName, setProductName] = useState('');
   const [productDescription, setProductDescription] = useState('');
   const [warrantyDescription, setWarrantyDescription] = useState('');
   const [productFields, setProductFields] = useState([]);
   const [editId, setEditId] = useState(null);

   console.log(productFields);

   const onClickEdit = (id) => {
      console.log(id);
      console.log(productFields);
      setOpenModal(false);
      let editField = productFields.find((field) => field.nanoid === id);
      setEditId(id);
      setSelectedAttribute({
         id: editField.attribute_id,
         name: editField.attribute_name,
         category_id: selectedCategory,
      });
      setFieldUnit(editField.value_unit);
      setSelectedViews(editField.fieldViewPoints);
      setSelectedUnit(editField.value_unit_type);
   };

   //Store get data from api
   const [categories, setCategories] = useState([]);
   const [subCategories, setSubCategories] = useState([]);
   const [attributeList, setAttributeList] = useState([]);
   const [brands, setBrands] = useState([]);

   //Temporary store data
   const [productCreateClicked, setProductCreateClicked] = useState(false);

   // const emptyAll = () => {
   //    setProductName('');
   //    setProductDescription('');
   //    setWarrantyDescription('');
   //    setProductImages([]);
   //    setProductFields([]);
   //    setSelectedBrand(null);
   //    setProductCreateClicked(false);
   //    setSelectedAttribute('');
   //    setFieldUnit('');
   //    setSelectedCategory(null);
   //    setSelectedSubCategory(null);
   //    setProductDocuments([]);
   //    setWarrantyDocuments([]);
   // };

   const emptyAttributes = () => {
      setSelectedAttribute('');
      setFieldUnit('');
      setSelectedViews([]);
   };

   //State for tab
   // const [mainTab, setMainTab] = useState(0);

   // const handleMainTabChange = (event, newValue) => {
   //    setMainTab(newValue);
   // };

   //Get categories from api
   useEffect(() => {
      getCategories().then((response) => {
         setCategories(response);
      });
   }, []);

   //Get subcategories from api
   useEffect(() => {
      if (selectedCategory) {
         getSubCategories(selectedCategory).then((response) => {
            setSubCategories(response);
         });
         getBrands(selectedCategory).then((response) => {
            setBrands(response);
         });
      }
   }, [selectedCategory]);

   //Get attributes from api
   useEffect(() => {
      if (selectedSubCategory) {
         getAttributes(selectedSubCategory).then((response) => {
            setAttributeList([
               {
                  attribute_id: response.id,
                  value: response.name,
                  value_unit: selectedUnit,
                  editable: true,
                  views: {
                     list: {
                        level: 1,
                        visibility: false,
                     },
                     grid: {
                        level: 1,
                        visibility: false,
                     },
                     main: {
                        level: 1,
                        visibility: false,
                     },
                  },
               },
            ]);
            setAttributeList(response);
         });
      }
   }, [selectedSubCategory, selectedUnit]);

   const [taxFields, setTaxFields] = useState({
      hsn_sac_code: '',
      tax_igst: '',
      tax_cgst: '',
      tax_sgst: '',
   });

   const [isActive, setIsActive] = useState(true);

   const handleIsActiveChange = () => {
      setIsActive(!isActive);
   };

   const onUpdateMain = () => {
      console.log({
         selectedCategory,
         selectedSubCategory,
         productName,
         productDescription,
         warrantyDescription,
      });
      if (
         selectedCategory === null ||
         selectedSubCategory === null ||
         productName === '' ||
         productDescription === '' ||
         warrantyDescription === ''
      ) {
         toast.error('Please fill all the fields');
      } else {
         const warrantyDocs = generateUrl(warrantyDocuments).concat(
            generatePrevUrl(prevWarrantyDocuments)
         );
         const productDocs = generateUrl(productDocuments).concat(
            generatePrevUrl(prevProductDocuments)
         );
         let images = productImages.map((image) => {
            return image.url;
         });
         prevProductImages.forEach((ele) => {
            images.push(ele.image_url);
         });

         if (productDocs.length === 0) {
            toast.error('Please upload product documents');
         }
         if (warrantyDocs.length === 0) {
            toast.error('Please upload warranty documents');
         }
         if (images.length < 3 || images.length > 5) {
            toast.error('Please upload 3 to 5 images');
            return;
         }

         let data = {
            name: productName,
            category_id: selectedSubCategory,
            description: productDescription,
            attributes: productFields,
            product_description: productDescription,
            warranty_description: warrantyDescription,
            documents: [...warrantyDocs, ...productDocs],
            images: images,
            brand_id: selectedBrand,
            active: isActive,
            ...taxFields,
         };

         updateProduct(data, editProductId, dispatch).then((response) => {
            console.log(response);
            if (response && (response.message = 'Product created')) {
               toast.success('Product updated successfully');
            } else {
               toast.error('Product update failed');
            }
         });
      }
   };

   const [productDocuments, setProductDocuments] = useState([]);
   const [documentNameError, setDocumentNameError] = useState('');
   const productNameRef = useRef(null);

   const onDropProductDocument = useCallback((acceptedFiles, rejectedFiles) => {
      if (productNameRef.current.value.trim().length === 0) {
         productNameRef.current.focus();
         setDocumentNameError('Please enter Certificate name');
         return;
      }
      const mappedAcceptedFiles = acceptedFiles.map((file) => {
         setDocumentNameError('');
         file.givenName = productNameRef.current.value;
         return {
            file,
            error: [],
         };
      });
      setProductDocuments((cur) => [
         ...cur,
         ...mappedAcceptedFiles,
         ...rejectedFiles,
      ]);
   }, []);
   const { getRootProps, getInputProps } = useDropzone({
      onDrop: onDropProductDocument,
      maxSize: 5000000,
   });

   const onProductDocumentUpload = (url, file) => {
      setProductDocuments((cur) =>
         cur.map((fw) => {
            if (fw.file === file) {
               return { ...fw, url, type: 'product' };
            }
            return fw;
         })
      );
   };

   const productDocumentDeleteHandler = (file) => {
      setProductDocuments((cur) => cur.filter((fw) => fw.file !== file));
   };

   const [warrantyDocuments, setWarrantyDocuments] = useState([]);
   const [warrantyDocumentNameError, setWarrantyDocumentNameError] =
      useState('');
   const warrantyDocumentNameRef = useRef(null);

   const onDropWarrantyDocument = useCallback(
      (acceptedFiles, rejectedFiles) => {
         if (warrantyDocumentNameRef.current.value.trim().length === 0) {
            warrantyDocumentNameRef.current.focus();
            setWarrantyDocumentNameError('Please enter Document name');
            return;
         }
         const mappedAcceptedFiles = acceptedFiles.map((file) => {
            setWarrantyDocumentNameError('');
            file.givenName = warrantyDocumentNameRef.current.value;
            return {
               file,
               // type: 'warranty',
               error: [],
            };
         });
         setWarrantyDocuments((cur) => [
            ...cur,
            ...mappedAcceptedFiles,
            ...rejectedFiles,
         ]);
      },
      []
   );

   const {
      getRootProps: getRootPropsForWarrantee,
      getInputProps: getInputPropsForWarrantee,
   } = useDropzone({
      onDrop: onDropWarrantyDocument,
      maxSize: 5000000,
   });

   const onWarrantyDocumentUpload = (url, file) => {
      setWarrantyDocuments((cur) =>
         cur.map((fw) => {
            if (fw.file === file) {
               return { ...fw, url, type: 'warranty' };
            }
            return fw;
         })
      );
   };

   const warrantyDocumentDeleteHandler = (file) => {
      setWarrantyDocuments((cur) => cur.filter((fw) => fw.file !== file));
   };

   // const editProductId = useSelector(
   //    (state) => state.editProductAdmin?.productToBeEdited?.product_id
   // );

   const { product_id: editProductId } = useParams();

   // console.log(editProductId);

   const [prevProductImages, setPrevProductImages] = useState([]);
   const [prevProductDocuments, setPrevProductDocuments] = useState([]);
   const [prevWarrantyDocuments, setPrevWarrantyDocuments] = useState([]);

   // console.log("images>>>>>>>>>>",prevProductDocuments,prevWarrantyDocuments,prevProductImages);

   const prevDocDeleteHandler = (fileId, reqType) => {
      if (fileId) {
         axiAuth
            .delete(`/api/document/${fileId}`)
            .then((res) => {
               if (reqType === 'prevProductDocuments') {
                  let upId = prevProductDocuments.filter((ele) => {
                     return fileId !== ele.doc_id;
                  });
                  setPrevProductDocuments(upId);
               } else if (reqType === 'prevWarrantyDocuments') {
                  let upId = prevWarrantyDocuments.filter((ele) => {
                     return fileId !== ele.doc_id;
                  });
                  setPrevWarrantyDocuments(upId);
               }
            })
            .catch((err) => {
               console.log(err);
            });
      }
   };

   useEffect(() => {
      if (editProductId) {
         setTimeout(() => {
            axiAuth
               .get(`api/admin/products/${editProductId}`)
               .then((res) => {
                  console.log(
                     'product data by id >>>>>>>>>>>>>>>>>>>>>>',
                     res.data
                  );
                  // setEditProduct(res.data?.product);
                  console.log(res.data?.product?.category?.sub_category_id);
                  setSelectedCategory(
                     res.data?.product?.category?.sub_category_id
                  );
                  setProductName(res.data?.product.product_name);
                  setSelectedBrand(res.data?.product.product_brand);
                  setProductDescription(res.data?.product.product_description);
                  setWarrantyDescription(
                     res.data.product.product_warranty_description
                  );
                  setPrevProductImages(res.data.product.images);
                  setPrevWarrantyDocuments(
                     res.data.product.documents.filter(
                        (doc) => doc.doc_type === 'warranty'
                     )
                  );
                  setPrevProductDocuments(
                     res.data.product.documents.filter(
                        (doc) => doc.doc_type === 'product'
                     )
                  );

                  setSelectedCategory(res.data.product.main_category.id);
                  setSelectedSubCategory(
                     res.data.product.sub_category.sub_category_id
                  );

                  console.log(
                     'attributes >>>>>>>>>>>>>>>>>>>>>>>>>>>',
                     res.data.product
                  );

                  setIsActive(res.data?.product?.active);
                  setTaxFields({
                     tax_cgst: res.data?.product?.tax_cgst,
                     tax_sgst: res.data?.product?.tax_sgst,
                     tax_igst: res.data?.product?.tax_igst,
                     hsn_sac_code: res.data?.product?.hsn_sac_code,
                  });

                  const finalAttribute = [];
                  let duplicate = [];
                  res.data?.product?.attributes?.forEach((item) => {
                     if (!duplicate.includes(item.name)) {
                        item.attribute_values.forEach((ele) => {
                           console.log(ele);
                           let tempVar = {
                              attribute_id: item.id,
                              attribute_name: item.name,
                              nanoid: ele.id.toString(),
                              fieldViewPoints: ele.views.field_view_points,
                              value_unit: ele.value,
                              value_unit_type: ele.value_unit,
                              attribute_filterable: item.filterable,
                              attribute_filter_type: item.filter_type,
                              editable: ele.editable === 1 ? true : false,
                              views: {
                                 portfolioCard: ele.views.portfolio_card,
                                 procurementCard: ele.views.procurement_card,
                                 vendorEditablePurchase:
                                    ele.views.vendor_editable_purchase,
                                 vendorEditableBooking:
                                    ele.views.vendor_editable_booking,
                                 productFeatureList:
                                    ele.views.product_feature_list,
                              },
                           };
                           finalAttribute.push(tempVar);
                        });
                        duplicate.push(item.attribute_name);
                     }
                  });

                  console.log(finalAttribute);
                  setProductFields(finalAttribute);
               })
               .catch((err) => {
                  console.log(err);
               });
         }, 1000);
      }
   }, [editProductId]);

   const updateProductField = async (updatedAttribute, attribute_id) => {
      console.log(updatedAttribute);

      const data = {
         ...updatedAttribute,
         value: updatedAttribute.value_unit,
         value_unit: updatedAttribute.value_unit_type,
         editable: updatedAttribute.editable ? 1 : 0,
         attribute_filterable: updatedAttribute.attribute_filterable,
         attribute_filter_type: updatedAttribute.attribute_filter_type,
         views: {
            field_view_points: updatedAttribute.fieldViewPoints,
            portfolio_card: updatedAttribute.views.portfolioCard,
            procurement_card: updatedAttribute.views.procurementCard,
            product_feature_list: updatedAttribute.views.productFeatureList,
            vendor_editable_booking:
               updatedAttribute.views.vendorEditableBooking,
            vendor_editable_purchase:
               updatedAttribute.views.vendorEditablePurchase,
         },
      };

      const { status } = await axiAuth.put(
         `api/admin/products/${editProductId}/attributes/${attribute_id}`,
         data
      );

      if (status === 200) {
         toast.success('Attribute updated successfully!');
      }
   };

   const deleteProductField = async (attribute_id) => {
      try {
         const { status } = await axiAuth.delete(
            `api/admin/products/${editProductId}/attributes/${attribute_id}`
         );

         if (status === 200) {
            const updatedProductFields = productFields.filter(
               (productField) => productField.attribute_id !== attribute_id
            );
            setProductFields(updatedProductFields);

            toast.success('Attribute deleted successfully!');
         }
      } catch (error) {
         console.log(error);
         toast.error('Something went wrong while deleting attribute!');
      }
   };

   return (
      <Container maxWidth='xl'>
         <div>
            {page === 'main' && (
               <>
                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        my: 4,
                     }}
                  >
                     <Typography
                        variant='h5'
                        gutterBottom
                        style={{
                           fontWeight: 'bold',
                           fontSize: '1.4rem',
                        }}
                        className='mt-2'
                     >
                        Update Product
                     </Typography>

                     <YellowButton
                        variant='contained'
                        color='primary'
                        style={{
                           padding: '0.6rem 2.8rem',
                        }}
                        onClick={onUpdateMain}
                     >
                        Update Product
                     </YellowButton>
                  </Box>
                  {!productCreateClicked && (
                     <Box
                        sx={{
                           display: 'flex',
                           my: 3,
                        }}
                     >
                        <SolrufTextFieldGray
                           select
                           size='small'
                           label='Select Category'
                           value={selectedCategory || ''}
                           onChange={(e) => setSelectedCategory(e.target.value)}
                           sx={{ mr: 2 }}
                        >
                           {categories?.map(({ category_id, name }, id) => (
                              <MenuItem key={id} value={category_id}>
                                 {name}
                              </MenuItem>
                           ))}
                        </SolrufTextFieldGray>

                        <SolrufTextFieldGray
                           select
                           size='small'
                           label='Select Sub Category'
                           value={selectedSubCategory || ''}
                           onChange={(e) =>
                              setSelectedSubCategory(e.target.value)
                           }
                        >
                           {subCategories?.map(({ category_id, name }, id) => (
                              <MenuItem key={id} value={category_id}>
                                 {name}
                              </MenuItem>
                           ))}
                        </SolrufTextFieldGray>
                     </Box>
                  )}
                  <div>
                     {!productCreateClicked && (
                        <>
                           <Typography
                              variant='h6'
                              gutterBottom
                              className='mt-4'
                           >
                              Product Name
                           </Typography>
                           <AppTextInputButton
                              isButtonPresent={true}
                              placeholder='Search Products Example:- 550W Solar Panel, Solar Cooker...'
                              value={productName}
                              onChange={(e) => {
                                 setProductName(e.target.value);
                              }}
                              onClick={() => {
                                 if (productName) {
                                    setProductCreateClicked(true);
                                 }
                              }}
                              buttonDisabled={!productName}
                           />
                        </>
                     )}
                     {productCreateClicked && (
                        <Box
                           className='upload-background'
                           sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mt: 3,
                              width: '100%',
                           }}
                        >
                           <Typography sx={{ mt: 3 }} component='p'>
                              {productName}
                           </Typography>
                           <Button
                              style={{
                                 color: '#000',
                              }}
                              onClick={() => {
                                 setProductCreateClicked(!productCreateClicked);
                              }}
                           >
                              <EditIcon />
                           </Button>
                        </Box>
                     )}

                     <Box
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           mt: 3,
                           ml: 2,
                           columnGap: 2,
                        }}
                     >
                        <Typography>Is Active ?</Typography>
                        <SolrufSwitch
                           sx={{ py: 0.5 }}
                           checked={isActive}
                           onChange={handleIsActiveChange}
                        />
                     </Box>
                     <Box
                        sx={{
                           my: 3,
                        }}
                     >
                        <SolrufTextFieldGray
                           select
                           size='small'
                           label='Select Brand'
                           value={selectedBrand}
                           onChange={(e) => setSelectedBrand(e.target.value)}
                        >
                           {brands.map(({ id, name }) => (
                              <MenuItem value={id}>{name}</MenuItem>
                           ))}
                        </SolrufTextFieldGray>
                     </Box>
                     <Box>
                        <AppTextInputButton
                           textArea={true}
                           placeholder='Product Description'
                           value={productDescription}
                           onChange={(e) => {
                              setProductDescription(e.target.value);
                           }}
                        />
                     </Box>
                  </div>

                  {/* //? document upload box for product // */}

                  <DocumentUploadBox>
                     <Typography
                        variant='h6'
                        gutterBottom
                        sx={{ color: '#000000' }}
                     >
                        Add Product Documents
                     </Typography>
                     <CertificateNameBox>
                        <input
                           type='text'
                           placeholder='Document Name'
                           ref={productNameRef}
                        />

                        <label
                           htmlFor='serviceFile'
                           style={{
                              width: '20%',
                              height: '100%',
                              background: '#ffd05b',
                           }}
                           {...getRootProps()}
                        >
                           <input {...getInputProps()} multiple />
                           <Box
                              sx={{
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 height: '100%',
                              }}
                           >
                              <PlusIcon style={{ width: 25 }} />{' '}
                              <Typography
                                 variant='body1'
                                 sx={{ ml: 2, color: '#000000' }}
                              >
                                 Add
                              </Typography>
                           </Box>
                        </label>
                     </CertificateNameBox>
                     {documentNameError && (
                        <Typography style={{ color: 'red' }}>
                           {documentNameError}
                        </Typography>
                     )}

                     {/* ================================================ */}

                     {productDocuments.map((fileWrapper, i) => {
                        return fileWrapper?.errors?.length ? (
                           <UploadError
                              file={fileWrapper.file}
                              errors={fileWrapper.errors}
                              onDelete={productDocumentDeleteHandler}
                           />
                        ) : (
                           <SingleFIleUploadWithProgress
                              key={i}
                              file={fileWrapper.file}
                              onDelete={productDocumentDeleteHandler}
                              onFileUpload={onProductDocumentUpload}
                           />
                        );
                     })}

                     {prevProductDocuments &&
                        prevProductDocuments.map((doc) => (
                           <Box
                              sx={{
                                 display: 'flex',
                                 justifyContent: 'space-between',
                                 mt: 1,
                                 borderBottom: '1px solid gray',
                              }}
                           >
                              <Typography>{doc?.doc_name}</Typography>
                              <Button
                                 endIcon={<CloseIcon />}
                                 color='secondary'
                                 onClick={() =>
                                    prevDocDeleteHandler(
                                       doc?.doc_id,
                                       'prevProductDocuments'
                                    )
                                 }
                              ></Button>
                           </Box>
                        ))}
                  </DocumentUploadBox>

                  {/* //? document upload box for product end// */}
                  <div>
                     <AppTextInputButton
                        textArea={true}
                        placeholder='Warranty Description'
                        className='mt-4'
                        value={warrantyDescription}
                        onChange={(e) => {
                           setWarrantyDescription(e.target.value);
                        }}
                     />
                  </div>
                  {/* //? document upload box for warrantee // */}
                  <DocumentUploadBox>
                     <Typography
                        variant='h6'
                        gutterBottom
                        sx={{ color: '#000000' }}
                     >
                        Add Warrantee Documents
                     </Typography>
                     <CertificateNameBox>
                        <input
                           type='text'
                           placeholder='Document Name'
                           ref={warrantyDocumentNameRef}
                        />

                        <label
                           htmlFor='serviceFile'
                           style={{
                              width: '20%',
                              height: '100%',
                              background: '#ffd05b',
                           }}
                           {...getRootPropsForWarrantee()}
                        >
                           <input {...getInputPropsForWarrantee()} multiple />
                           <Box
                              sx={{
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 height: '100%',
                              }}
                           >
                              <PlusIcon style={{ width: 25 }} />{' '}
                              <Typography
                                 variant='body1'
                                 sx={{ ml: 2, color: '#000000' }}
                              >
                                 Add
                              </Typography>
                           </Box>
                        </label>
                     </CertificateNameBox>
                     {warrantyDocumentNameError && (
                        <Typography style={{ color: 'red' }}>
                           {warrantyDocumentNameError}
                        </Typography>
                     )}

                     {/* ================================================ */}

                     {warrantyDocuments.map((fileWrapper, i) => {
                        return fileWrapper?.errors?.length ? (
                           <UploadError
                              file={fileWrapper.file}
                              errors={fileWrapper.errors}
                              onDelete={warrantyDocumentDeleteHandler}
                           />
                        ) : (
                           <SingleFIleUploadWithProgress
                              key={i}
                              file={fileWrapper.file}
                              onDelete={warrantyDocumentDeleteHandler}
                              onFileUpload={onWarrantyDocumentUpload}
                           />
                        );
                     })}
                     {prevWarrantyDocuments &&
                        prevWarrantyDocuments.map((doc) => (
                           <Box
                              sx={{
                                 display: 'flex',
                                 justifyContent: 'space-between',
                                 mt: 1,
                                 borderBottom: '1px solid gray',
                              }}
                           >
                              <Typography>{doc?.doc_name}</Typography>
                              <Button
                                 endIcon={<CloseIcon />}
                                 color='secondary'
                                 onClick={() =>
                                    prevDocDeleteHandler(
                                       doc?.doc_id,
                                       'prevWarrantyDocuments'
                                    )
                                 }
                              ></Button>
                           </Box>
                        ))}
                  </DocumentUploadBox>
                  {/* //? document upload box for warrantee end// */}

                  <Box
                     sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        my: 2,
                        columnGap: 2,
                     }}
                  >
                     <SolrufTextField
                        label='Hsn'
                        size='small'
                        value={taxFields.hsn_sac_code}
                        onChange={(e) => {
                           setTaxFields({
                              ...taxFields,
                              hsn_sac_code: e.target.value,
                           });
                        }}
                     />
                     <SolrufTextField
                        label='Igst'
                        size='small'
                        value={taxFields.tax_igst}
                        onChange={(e) => {
                           setTaxFields({
                              ...taxFields,
                              tax_igst: e.target.value,
                           });
                        }}
                     />
                     <SolrufTextField
                        label='Cgst'
                        size='small'
                        value={taxFields.tax_cgst}
                        onChange={(e) => {
                           setTaxFields({
                              ...taxFields,
                              tax_cgst: e.target.value,
                           });
                        }}
                     />
                     <SolrufTextField
                        label='Sgst'
                        size='small'
                        value={taxFields.tax_sgst}
                        onChange={(e) => {
                           setTaxFields({
                              ...taxFields,
                              tax_sgst: e.target.value,
                           });
                        }}
                     />
                  </Box>

                  <div>
                     <Typography
                        variant='h6'
                        gutterBottom
                        className='mt-4 pl-3'
                     >
                        Add Product Images
                     </Typography>
                     <FileUploadWithProgress
                        fileType={['image/png', 'image/jpeg']}
                        document={productImages}
                        setDocument={setProductImages}
                        name='Add Product Images (3-5MB)'
                        prevImages={prevProductImages}
                        setPrevProductImages={setPrevProductImages}
                     />
                  </div>
                  <PrimaryButton
                     onClick={() => setPage('features')}
                     sx={{
                        mt: 3,
                        mb: 6,
                     }}
                  >
                     Update Features
                  </PrimaryButton>
               </>
            )}

            {/* product fields area */}
            {page === 'features' && (
               <>
                  <div>
                     <Typography
                        variant='h6'
                        gutterBottom
                        className='my-4 text-center'
                     >
                        Product Fields
                     </Typography>
                     <Box
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                        }}
                     >
                        <Box
                           sx={{
                              flex: 1,
                              pt: 1,
                           }}
                        >
                           <AutoCompleteSelect
                              style={{
                                 marginRight: '1rem',
                                 marginTop: '3px',
                                 backgroundColor: '#ffffff',
                              }}
                              options={attributeList}
                              value={selectedAttribute}
                              setValue={setSelectedAttribute}
                              label='Select Attribute'
                              disabled={
                                 selectedSubCategory !== null ? false : true
                              }
                              notAdd={true}
                           />
                        </Box>
                        <Box
                           sx={{
                              flex: 1,
                              pt: 1,
                              mx: 1,
                           }}
                        >
                           <FieldUnitBox>
                              <input
                                 type='text'
                                 placeholder='Field Unit'
                                 name='field_unit'
                                 value={fieldUnit}
                                 onChange={(e) => {
                                    setFieldUnit(e.target.value);
                                 }}
                              />
                              <select
                                 name='field_unit_type'
                                 onChange={(event) =>
                                    setSelectedUnit(event.target.value)
                                 }
                                 value={selectedUnit}
                              >
                                 {units.map((unit) => (
                                    <option key={unit} value={unit}>
                                       {unit}
                                    </option>
                                 ))}
                              </select>
                           </FieldUnitBox>
                        </Box>
                        <Box
                           sx={{
                              flex: 1,
                              pt: 1,
                           }}
                        >
                           <SelectCheckBox
                              selected={selectedViews}
                              setSelected={setSelectedViews}
                              options={ViewPointOptions}
                           />
                        </Box>
                        <div className='col-6 col-md-2'>
                           <YellowButton
                              variant='contained'
                              color='primary'
                              style={{
                                 padding: '0.6rem 2.8rem',
                              }}
                              onClick={async () => {
                                 if (
                                    selectedAttribute === '' ||
                                    fieldUnit === '' ||
                                    selectedViews === []
                                 ) {
                                    toast.error(
                                       'Please fill all the attribute fields!'
                                    );
                                    return;
                                 }
                                 if (editId) {
                                    setProductFields(
                                       productFields.map((productField) => {
                                          if (productField.nanoid === editId) {
                                             // console.log(selectedAttribute);

                                             const updatedAttribute = {
                                                ...productField,
                                                attribute_id:
                                                   selectedAttribute.id,
                                                attribute_name:
                                                   selectedAttribute.name,
                                                editable: true,
                                                value_unit: fieldUnit,
                                                value_unit_type: selectedUnit,
                                                attribute_filterable: false,
                                                attribute_filter_type: 'select',
                                                views: {
                                                   portfolioCard: {
                                                      level: productField.views
                                                         .portfolioCard.level,
                                                      visibility:
                                                         selectedViews.indexOf(
                                                            'Portfolio card'
                                                         ) > -1
                                                            ? true
                                                            : false,
                                                   },
                                                   procurementCard: {
                                                      level: productField.views
                                                         .procurementCard.level,
                                                      visibility:
                                                         selectedViews.indexOf(
                                                            'Procurement card'
                                                         ) > -1
                                                            ? true
                                                            : false,
                                                   },
                                                   vendorEditablePurchase: {
                                                      level: productField.views
                                                         .vendorEditablePurchase
                                                         .level,
                                                      visibility:
                                                         selectedViews.indexOf(
                                                            'Vendor editable purchase'
                                                         ) > -1
                                                            ? true
                                                            : false,
                                                   },
                                                   vendorEditableBooking: {
                                                      level: productField.views
                                                         .vendorEditableBooking
                                                         .level,
                                                      visibility:
                                                         selectedViews.indexOf(
                                                            'Vendor editable booking'
                                                         ) > -1
                                                            ? true
                                                            : false,
                                                   },
                                                   productFeatureList: {
                                                      level: productField.views
                                                         .productFeatureList
                                                         .level,
                                                      visibility:
                                                         selectedViews.indexOf(
                                                            'Product feature list'
                                                         ) > -1,
                                                   },
                                                },
                                                fieldViewPoints: selectedViews,
                                             };

                                             console.log(updatedAttribute);

                                             updateProductField(
                                                updatedAttribute,
                                                productField.attribute_id
                                             );

                                             return updatedAttribute;
                                          }
                                          return productField;
                                       })
                                    );
                                 } else {
                                    setProductFields([
                                       ...productFields,
                                       {
                                          attribute_id: selectedAttribute?.id,
                                          attribute_name:
                                             selectedAttribute.name,
                                          editable: true,
                                          value_unit: fieldUnit,
                                          value_unit_type: selectedUnit,
                                          attribute_filterable: false,
                                          attribute_filter_type: null,
                                          views: {
                                             portfolioCard: {
                                                level: productFields.filter(
                                                   (list) =>
                                                      list.views.portfolioCard
                                                         .visibility === true
                                                ).length,
                                                visibility:
                                                   selectedViews.indexOf(
                                                      'Portfolio card'
                                                   ) > -1
                                                      ? true
                                                      : false,
                                             },
                                             procurementCard: {
                                                level: productFields.filter(
                                                   (list) =>
                                                      list.views.procurementCard
                                                         .visibility === true
                                                ).length,
                                                visibility:
                                                   selectedViews.indexOf(
                                                      'Procurement card'
                                                   ) > -1
                                                      ? true
                                                      : false,
                                             },
                                             vendorEditablePurchase: {
                                                level: productFields.filter(
                                                   (list) =>
                                                      list.views
                                                         .vendorEditablePurchase
                                                         .visibility === true
                                                ).length,
                                                visibility:
                                                   selectedViews.indexOf(
                                                      'Vendor editable purchase'
                                                   ) > -1
                                                      ? true
                                                      : false,
                                             },
                                             vendorEditableBooking: {
                                                level: productFields.filter(
                                                   (list) =>
                                                      list.views
                                                         .vendorEditableBooking
                                                         .visibility === true
                                                ).length,
                                                visibility:
                                                   selectedViews.indexOf(
                                                      'Vendor editable booking'
                                                   ) > -1
                                                      ? true
                                                      : false,
                                             },
                                             productFeatureList: {
                                                level: productFields.filter(
                                                   (list) =>
                                                      list.views
                                                         .productFeatureList
                                                         .visibility === true
                                                ).length,
                                                visibility:
                                                   selectedViews.indexOf(
                                                      'Product feature list'
                                                   ) > -1,
                                             },
                                          },
                                          fieldViewPoints: selectedViews,
                                          nanoid: nanoid(),
                                       },
                                    ]);
                                    console.log(productFields);
                                 }
                                 emptyAttributes();
                                 setEditId(null);
                              }}
                           >
                              Save
                           </YellowButton>
                        </div>
                     </Box>
                  </div>

                  <div>
                     <Typography
                        variant='h6'
                        gutterBottom
                        className='mt-4 pl-3'
                     >
                        All Features
                     </Typography>
                     {productFields?.map((filteredList) => (
                        <ListViewTable
                           list={filteredList}
                           onClickEdit={() => {
                              onClickEdit(filteredList.nanoid);
                           }}
                           onClickDelete={(cb) => {
                              deleteProductField(filteredList.attribute_id);
                              cb();
                           }}
                        />
                     ))}
                  </div>
                  <Box
                     sx={{
                        display: 'fex',
                        alignItems: 'center',
                        columnGap: 2,
                        mt: 3,
                        mb: 5,
                     }}
                  >
                     <PrimaryButton onClick={() => setPage('main')}>
                        Back
                     </PrimaryButton>
                     {/* <PrimaryButton onClick={() => setOpenModal(true)}>
                           Preview
                        </PrimaryButton> */}
                     <PrimaryButton onClick={() => setOpenModal(true)}>
                        Features Positioning
                     </PrimaryButton>
                  </Box>
               </>
            )}

            {openModal && (
               <FilterModal
                  modalProps={{
                     openModal,
                     setopenModal: setOpenModal,
                     productFields,
                     onClickEdit,
                     setProductFields,
                  }}
               />
            )}

            <Backdrop
               sx={{
                  color: '#fff',
                  zIndex: (theme) => theme.zIndex.drawer + 1,
               }}
               open={updateProductSelector.loading}
            >
               <CircularProgress color='inherit' />
            </Backdrop>
         </div>
      </Container>
   );
};

export default UpdateProduct;
