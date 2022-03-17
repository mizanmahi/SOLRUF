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
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { nanoid } from 'nanoid';
import AutoCompleteSelect from '../../../components/AutoCompleteSelect/AutoCompleteSelect';
import TabPanel from '../../../components/SolrufTabPanel/SolrufTabPanel';
import { AppTextInputButton } from '../../../components/AppTextInputButton';
import './AddProduct.css';
import FileUploadWithProgress from '../../../components/FileUploadWithProgress/FileUploadWithProgress';
import SelectCheckBox from '../../../components/SelectCheckBox/SelectCheckBox';
import ListViewTable from '../../../components/ListViewTable/ListViewTable';
import {
   createProduct,
   getAttributes,
   getBrands,
   getCategories,
   getSubCategories,
} from '../helper';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import AddAttribute from '../AddAttribute/AddAttribute';
import { nanoid } from 'nanoid';
import { useDropzone } from 'react-dropzone';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';
import UploadError from '../../MyPortfolio/UploadError';
import SingleFIleUploadWithProgress from '../../MyPortfolio/SingleFIleUploadWithProgress';
import { generateUrl } from '../../../utils/urlGeneratorForProductAndWarrantyDoc';
import SolrufTextField from '../../../components/TextField/TextField';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { axiAuth } from '../../../utils/axiosInstance';

const ViewPointOptions = [
   'List View',
   'Grid View',
   'Product Main Page',
   'Booking',
   'Vendor Editable',
];

const DocumentUploadBox = styled('div')(({ theme }) => {
   return {
      width: '100%',
      padding: '1rem',
      background: theme.palette.secondary.light,
      borderRadius: '5px',
   };
});

const CertificateNameBox = styled('div')(({ theme }) => {
   return {
      width: '100%',
      margin: '0rem auto',
      border: '3px solid #FFD05B',
      borderRadius: '5px',
      outline: 'none',
      fontFamily: theme.typography.fontFamily,
      height: '39px',
      overflow: 'hidden',
      display: 'flex',
      '& input': {
         border: 'none',
         width: '80%',
         height: '100%',
         padding: '1rem',
         '&:focus': {
            outline: 'none',
         },
      },
      '& input[type=file]': {
         display: 'none',
      },
   };
});

const SolrufTextFieldGray = styled(SolrufTextField)(({ theme }) => ({
   '& .MuiOutlinedInput-root': {
      // background: '#f3f3f3',
   },
}));

//Dropdown and Input Box
const FieldUnitBox = styled('div')(({ theme }) => {
   return {
      width: '100%',
      margin: '0 auto',
      border: '2px solid #FFD05B',
      borderRadius: '5px',
      outline: 'none',
      fontFamily: theme.typography.fontFamily,
      height: '39px',
      overflow: 'hidden',
      '& input': {
         border: 'none',
         width: '40%',
         height: '100%',
         padding: '1rem',
         background: '#FFFFFF',
         '&:focus': {
            outline: 'none',
         },
      },
      '& select': {
         border: 'none',
         outline: 'outline',
         width: '60%',
         borderRight: '5px solid #FFD05B',
         height: '100%',
         textAlign: 'center',
         background: '#ffd05b',
         '&:focus': {
            outline: 'none',
         },
         '& option': {
            background: '#ffd05b',
          
         },
      },
   };
});

const AddProduct = () => {
   const dispatch = useDispatch();
   const createProductSelector = useSelector((state) => state.createProduct);

   const [units, setUnits] = useState([]);
   const [selectedUnit, setSelectedUnit] = useState('');
   const [fieldUnit, setFieldUnit] = useState('');

   useEffect(() => {
      axiAuth
         .get('api/admin/units')
         .then((res) => {
            console.log(res.data);
            setUnits(res.data.units);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   console.log(selectedUnit);
   console.log(units);

   //selected values
   const [selectedCategory, setSelectedCategory] = useState(null);
   const [selectedSubCategory, setSelectedSubCategory] = useState(null);
   const [selectedAttribute, setSelectedAttribute] = useState(null);
   const [selectedBrand, setSelectedBrand] = useState('');
   const [productImages, setProductImages] = useState([]);
   const [selectedViews, setSelectedViews] = useState([]);

   //entered values
   const [productName, setProductName] = useState('');
   const [productDescription, setProductDescription] = useState('');
   const [warrantyDescription, setWarrantyDescription] = useState('');
   const [productFields, setProductFields] = useState([]);
   const [editId, setEditId] = useState(null);

   const onClickEdit = (id) => {
      let editField = productFields.find((field) => field.nanoid === id);
      setEditId(id);
      console.log(editField);
      setSelectedAttribute({
         id: editField.attribute_id,
         name: editField.value,
         category_id: selectedCategory,
      });
      setFieldUnit(editField.value_unit);
      setSelectedViews(editField.fieldViewPoints);
      setSelectedUnit(editField.value_unit_type);
   };

   console.log(productFields);
   console.log(selectedAttribute);
   console.log(selectedCategory);
   //Store get data from api
   const [categories, setCategories] = useState([]);
   const [subCategories, setSubCategories] = useState([]);
   const [attributeList, setAttributeList] = useState([]);
   const [brands, setBrands] = useState([]);

   //Temporary store data
   const [productCreateClicked, setProductCreateClicked] = useState(false);

   const emptyAll = () => {
      setProductName('');
      setProductDescription('');
      setWarrantyDescription('');
      setProductImages([]);
      setProductFields([]);
      setSelectedBrand(null);
      setProductCreateClicked(false);
      setSelectedAttribute('');
      setFieldUnit('');
      setSelectedCategory(null);
      setSelectedSubCategory(null);
   };

   const emptyAttributes = () => {
      setSelectedAttribute('');
      setFieldUnit('');
      setSelectedViews([]);
   };

   //State for tab
   const [tab, setTab] = useState(0);
   const [mainTab, setMainTab] = useState(0);

   console.log(attributeList);

   const handleTabChange = (event, newValue) => {
      setTab(newValue);
   };
   const handleMainTabChange = (event, newValue) => {
      setMainTab(newValue);
   };

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
   }, [selectedSubCategory]);

   const onSubmit = async (e) => {
      e.preventDefault();
      const warrantyDocs = generateUrl(warrantyDocuments);
      const productDocs = generateUrl(productDocuments);
      console.log(productDocs);
      if (
         selectedCategory === null ||
         selectedSubCategory === null ||
         productName === '' ||
         productDescription === '' ||
         productDocs.length === 0 ||
         warrantyDocs.length === 0 ||
         warrantyDescription === '' ||
         productImages.length === 0 ||
         productFields.length === 0
      ) {
         toast.error('Please fill all the fields');
         if (productDocs.length === 0) {
            toast.error('Please upload product documents');
         }
         if (warrantyDocs.length === 0) {
            toast.error('Please upload warranty documents');
         }
      } else {
         if (productImages.length < 3 || productImages.length > 5) {
            toast.error('Please upload 3 to 5 images');
         } else {
            let images = [];
            //get url from array and store as string in the array
            images = productImages.map((image) => {
               return image.url;
            });

            let data = {
               name: productName,
               category_id: selectedCategory,
               description: productDescription,
               attributes: productFields,
               product_description: productDescription,
               warranty_description: warrantyDescription,
               documents: [...warrantyDocs, ...productDocs],
               images: images,
               //TODO : NEED TO CHANGE THE BRAND NAME
               brand_id: selectedBrand,
            };

            console.log(data);

            createProduct(data, dispatch).then((response) => {
               if (response && (response.message = 'Product created')) {
                  toast.success('Product created successfully');
                  emptyAll();
               } else {
                  toast.error('Product creation failed');
               }
            });
         }
      }
   };

   const [productDocuments, setProductDocuments] = useState([]);
   const [documentNameError, setDocumentNameError] = useState('');
   const productNameRef = useRef(null);

   console.log(productDocuments);

   const onDropProductDocument = useCallback((acceptedFiles, rejectedFiles) => {
      if (productNameRef.current.value.trim().length === 0) {
         productNameRef.current.focus();
         setDocumentNameError('Please enter Certificate name');
         return;
      }
      const mappedAcceptedFiles = acceptedFiles.map((file) => {
         setDocumentNameError('');
         console.log(file);
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
      console.log(url);
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

   console.log(warrantyDocuments);

   const handleDragEnd = (result) => {
      const { destination, source } = result;
      if (!destination) return;
      if (
         destination.droppableId === source.droppableId &&
         destination.index === source.index
      )
         return;
      const newItemList = [...productFields];
      const draggedItem = newItemList.splice(source.index, 1)[0];
      newItemList.splice(destination.index, 0, draggedItem);
      setProductFields(newItemList);
   };

   return (
      <Container maxWidth='xl'>
         <TabPanel
            handleTabChange={handleMainTabChange}
            activeTab={mainTab}
            tabs={['Add Product', 'Add Attribute']}
         />
         {mainTab === 0 && (
            <div>
               <div className='d-flex my-4 justify-content-between align-items-center'>
                  <Typography
                     variant='h5'
                     gutterBottom
                     style={{
                        fontWeight: 'bold',
                        fontSize: '1.4rem',
                     }}
                     className='mt-2'
                  >
                     Add Product
                  </Typography>
                  <YellowButton
                     variant='contained'
                     color='primary'
                     style={{
                        padding: '0.6rem 2.8rem',
                     }}
                     onClick={onSubmit}
                  >
                     Save Product
                  </YellowButton>
               </div>
               {!productCreateClicked && (
                  <div className='d-flex my-3'>
                     {/* <AutoCompleteSelect
                        style={{
                           marginRight: '1rem',
                           backgroundColor: '#ffffff',
                        }}
                        options={categories}
                        value={selectedCategory}
                        setValue={setSelectedCategory}
                        label='Select Category'
                     /> */}

                     <SolrufTextFieldGray
                        select
                        size='small'
                        label='Select Category'
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        sx={{ mr: 2 }}
                     >
                        {categories.map(({ category_id, name }) => (
                           <MenuItem value={category_id}>{name}</MenuItem>
                        ))}
                     </SolrufTextFieldGray>

                     {/* <AutoCompleteSelect
                        options={subCategories}
                        value={selectedSubCategory}
                        setValue={setSelectedSubCategory}
                        label='Select Sub Category'
                        style={{ backgroundColor: '#ffffff' }}
                     /> */}

                     <SolrufTextFieldGray
                        select
                        size='small'
                        label='Select Sub Category'
                        value={selectedSubCategory}
                        onChange={(e) => setSelectedSubCategory(e.target.value)}
                     >
                        {subCategories.map(({ category_id, name }) => (
                           <MenuItem value={category_id}>{name}</MenuItem>
                        ))}
                     </SolrufTextFieldGray>
                  </div>
               )}
               <div>
                  {!productCreateClicked && (
                     <>
                        <Typography variant='h6' gutterBottom className='mt-4'>
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
                     <div className='upload-background mt-4 d-flex justify-content-between w-100'>
                        <p className='mt-3'>{productName}</p>
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
                     </div>
                  )}
                  <div className='my-5'>
                     {/* <AutoCompleteSelect
                        options={brands || []}
                        value={selectedBrand}
                        setValue={setSelectedBrand}
                        label='Select Brand'
                        style={{ backgroundColor: '#ffffff' }}
                        disabled={selectedCategory === null ? true : false}
                     /> */}
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
                  </div>
                  <AppTextInputButton
                     textArea={true}
                     placeholder='Product Description'
                     className='mt-2'
                     value={productDescription}
                     onChange={(e) => {
                        setProductDescription(e.target.value);
                     }}
                  />
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
                        <input
                           {...getInputProps()}
                           multiple
                           // onChange={(e) => console.log(e.target.files)}
                        />
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
               </DocumentUploadBox>
               {/* //? document upload box for warrantee end// */}

               <div>
                  <Typography variant='h6' gutterBottom className='mt-4 pl-3'>
                     Add Product Images
                  </Typography>
                  <FileUploadWithProgress
                     document={productImages}
                     setDocument={setProductImages}
                     name='Add Product Images (3-5MB)'
                  />
               </div>
               <div>
                  <Typography
                     variant='h6'
                     gutterBottom
                     className='my-4 text-center'
                  >
                     Product Fields
                  </Typography>
                  <div className='d-flex align-items-center'>
                     <div className='w-100 pt-1 col-6 col-md-3'>
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
                        />
                     </div>
                     <div className='w-100 col-6 col-md-3'>
                        <FieldUnitBox>
                           <input
                              type='number'
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
                                 <option value={unit}>{unit}</option>
                              ))}
                           </select>
                        </FieldUnitBox>
                     </div>
                     <div className='w-100 col-6 col-md-4'>
                        <SelectCheckBox
                           selected={selectedViews}
                           setSelected={setSelectedViews}
                           options={ViewPointOptions}
                        />
                     </div>
                     <div className='col-6 col-md-2'>
                        <YellowButton
                           variant='contained'
                           color='primary'
                           style={{
                              padding: '0.6rem 2.8rem',
                           }}
                           onClick={() => {
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
                                          console.log(selectedAttribute);
                                          return {
                                             ...productField,
                                             attribute_id: selectedAttribute.id,
                                             value: selectedAttribute.name,
                                             editable: true,
                                             value_unit: fieldUnit,
                                             value_unit_type: selectedUnit,
                                             views: {
                                                list: {
                                                   level:
                                                      productFields.indexOf(
                                                         selectedAttribute
                                                      ) + 1,
                                                   visibility:
                                                      selectedViews.indexOf(
                                                         'List View'
                                                      ) > -1
                                                         ? true
                                                         : false,
                                                },
                                                grid: {
                                                   level:
                                                      productFields.indexOf(
                                                         selectedAttribute
                                                      ) + 1,
                                                   visibility:
                                                      selectedViews.indexOf(
                                                         'Grid View'
                                                      ) > -1
                                                         ? true
                                                         : false,
                                                },
                                                main: {
                                                   level:
                                                      productFields.indexOf(
                                                         selectedAttribute
                                                      ) + 1,
                                                   visibility:
                                                      selectedViews.indexOf(
                                                         'Product Main Page'
                                                      ) > -1,
                                                },
                                             },
                                             fieldViewPoints: selectedViews,
                                          };
                                       }
                                       return productField;
                                    })
                                 );
                              } else {
                                 setProductFields([
                                    ...productFields,
                                    {
                                       attribute_id: selectedAttribute?.id,
                                       value: selectedAttribute.name,
                                       editable: true,
                                       value_unit: fieldUnit,
                                       value_unit_type: selectedUnit,
                                       views: {
                                          list: {
                                             level:
                                                productFields.indexOf(
                                                   selectedAttribute
                                                ) + 1,
                                             visibility:
                                                selectedViews.indexOf(
                                                   'List View'
                                                ) > -1
                                                   ? true
                                                   : false,
                                          },
                                          grid: {
                                             level:
                                                productFields.indexOf(
                                                   selectedAttribute
                                                ) + 1,
                                             visibility:
                                                selectedViews.indexOf(
                                                   'Grid View'
                                                ) > -1
                                                   ? true
                                                   : false,
                                          },
                                          main: {
                                             level:
                                                productFields.indexOf(
                                                   selectedAttribute
                                                ) + 1,
                                             visibility:
                                                selectedViews.indexOf(
                                                   'Product Main Page'
                                                ) > -1,
                                          },
                                       },
                                       fieldViewPoints: selectedViews,
                                       nanoid: nanoid(),
                                    },
                                 ]);
                              }
                              emptyAttributes();
                              setEditId(null);
                           }}
                        >
                           Save
                        </YellowButton>
                     </div>
                  </div>
               </div>
               <div className='my-5 px-0'>
                  <Container maxWidth='xl'>
                     <TabPanel
                        handleTabChange={handleTabChange}
                        activeTab={tab}
                        tabs={[
                           'List View / Grid View',
                           // 'Grid View',
                           // 'Product Main Page',
                           'All',
                        ]}
                     />
                     {tab === 0 && (
                        <>
                           <div>
                              <DragDropContext onDragEnd={handleDragEnd}>
                                 <Droppable droppableId='droppable'>
                                    {/* {productFields
                                       .filter(
                                          (list) =>
                                             list.views.list.visibility === true
                                       )
                                       .map((filteredList) => (
                                          <ListViewTable
                                             list={filteredList}
                                             onClickEdit={() => {
                                                onClickEdit(
                                                   filteredList.nanoid
                                                );
                                             }}
                                          />
                                       ))} */}
                                    {(provided) => (
                                       <div
                                          {...provided.droppableProps}
                                          ref={provided.innerRef}
                                          style={{ minHeight: '300px' }}
                                       >
                                          {productFields
                                             .filter(
                                                (list) =>
                                                   list.views.list
                                                      .visibility === true
                                             )
                                             .map((filteredList, i) => (
                                                <Draggable
                                                   key={
                                                      filteredList.attribute_id
                                                   }
                                                   draggableId={filteredList?.attribute_id?.toString()}
                                                   index={i}
                                                >
                                                   {(provided) => (
                                                      <div
                                                         draggable='true'
                                                         {...provided.draggableProps}
                                                         {...provided.dragHandleProps}
                                                         ref={provided.innerRef}
                                                         list={filteredList}
                                                      >
                                                         <ListViewTable
                                                            unit={selectedUnit}
                                                            list={filteredList}
                                                            onClickEdit={() => {
                                                               onClickEdit(
                                                                  filteredList.nanoid
                                                               );
                                                            }}
                                                         />
                                                      </div>
                                                   )}
                                                </Draggable>
                                             ))}
                                       </div>
                                    )}
                                 </Droppable>
                              </DragDropContext>
                           </div>
                        </>
                     )}
                     {tab === 1 && (
                        <>
                           <div>
                              {productFields
                                 .filter(
                                    (list) =>
                                       list.views.grid.visibility === true
                                 )
                                 .map((filteredList) => (
                                    <ListViewTable
                                       list={filteredList}
                                       onClickEdit={() => {
                                          onClickEdit(filteredList.nanoid);
                                       }}
                                    />
                                 ))}
                           </div>
                        </>
                     )}
                     {/* {tab === 2 && (
                        <>
                           <div>
                              {productFields
                                 .filter(
                                    (list) =>
                                       list.views.main.visibility === true
                                 )
                                 .map((filteredList) => (
                                    <ListViewTable
                                       list={filteredList}
                                       onClickEdit={() => {
                                          onClickEdit(filteredList.nanoid);
                                       }}
                                    />
                                 ))}
                           </div>
                        </>
                     )}
                     {tab === 3 && (
                        <>
                           <div>
                              {productFields.map((filteredList) => (
                                 <ListViewTable
                                    list={filteredList}
                                    onClickEdit={() => {
                                       onClickEdit(filteredList.nanoid);
                                    }}
                                 />
                              ))}
                           </div>
                        </>
                     )} */}
                  </Container>
               </div>
               <Backdrop
                  sx={{
                     color: '#fff',
                     zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={createProductSelector.loading}
               >
                  <CircularProgress color='inherit' />
               </Backdrop>
            </div>
         )}
         {mainTab === 1 && <AddAttribute />}
      </Container>
   );
};

export default AddProduct;
