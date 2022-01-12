import {
   Box,
   Button,
   Checkbox,
   Container,
   FormControlLabel,
   Grid,
   MenuItem,
   styled,
   Tab,
   Tabs,
   Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomSelect from '../../../components/CustomSelect/CustomSelect';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SolrufTextField from '../../../components/TextField/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import YellowButton from '../../../components/YellowButton/YellowButton';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Wrapper = styled('div')(({ theme }) => ({
   background: theme.palette.primary.light,
   padding: theme.spacing(2),
}));
const CategoryArea = styled('div')(({ theme }) => ({
   marginTop: theme.spacing(2),
}));

const CheckBoxBox = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}));

const SearchProductInput = styled('div')(({ theme }) => {
   return {
      width: '100%',
      border: '3px solid #FFD05B',
      margin: '1rem auto',
      marginLeft: '0rem',
      borderRadius: '5px',
      fontFamily: theme.typography.fontFamily,
      height: '55px',
      overflow: 'hidden',
      display: 'flex',
      '& input': {
         border: 'none',
         width: '80%',
         height: '100%',
         padding: '1rem',
      },
   };
});

const SelectedProduct = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   background: theme.palette.secondary.light,
   padding: theme.spacing(1),
   borderRadius: '5px',
   boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
   marginBottom: theme.spacing(1.5),
}));

const TabPanel = styled(Tabs)(({ theme }) => ({
   '& .MuiButtonBase-root': {
      fontSize: '1.2rem',
      paddingLeft: '2.5rem',
      paddingRight: '2.5rem',
   },
   '& .Mui-selected': {
      fontWeight: 'bold',
      color: '#000000',
   },
   '& .MuiTabs-flexContainer': {
      justifyContent: 'space-around',
   }
}));

const AddProduct = () => {
   const [category, setCategory] = useState({ category: '', category_id: '' });
   const [subCategory, setSubCategory] = useState('');
   const [categories, setCategories] = useState([]);
   const [subCategories, setSubCategories] = useState([]);
   const [saved, setSaved] = useState(false);
   const [showInputBox, setShowInputBox] = useState(true);
   const [tab, setTab] = React.useState(0);

   const handleChange = (event, newValue) => {
      setTab(newValue);
      console.log(newValue);
   };

  

   const handleCategoryChange = (event) => {
      setCategory({
         category: event.target.value,
         category_id: categories.filter(
            (cat) => cat.name.toUpperCase() === event.target.value
         )[0].category_id,
      });
   };

   const handleSubCategoryChange = (event) => {
      setSubCategory(event.target.value);
   };

   const [inputList, setInputList] = useState([]);
   const [inputList2, setInputList2] = useState([]);

   const saveHandler = () => {
      setSaved(true);
      setShowInputBox(false);
      setInputList2(inputList)
   };

   // handle input change
   const handleInputChange = (e, index) => {
      const { name, value, checked } = e.target;
      if (name === 'listView' || name === 'gridView' || name === 'editable') {
         setInputList((prevState) => {
            return prevState.map((input, i) => {
               if (i === index) {
                  return {
                     ...input,
                     [name]: checked,
                  };
               }
               return input;
            });
         });
      } else {
         const list = [...inputList];
         list[index][name] = value;
         setInputList(list);
      }
   };

   // remove a field
   const handleRemoveClick = (index) => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
   };

   // handle add field
   const handleAddClick = () => {
      setShowInputBox(true);
      setSaved(false);
      setInputList([
         ...inputList,
         {
            fieldName: '',
            fieldValue: '',
            viewPoint: '',
            listView: false,
            gridView: false,
            editable: false,
         },
      ]);
   };

   useEffect(() => {
      axios
         .get('https://api-dev.solruf.com/api/categories')
         .then(({ data }) => {
            console.log(data);
            setCategories(data.categories);
         });
   }, []);

   useEffect(() => {
      axios
         .get(
            `https://api-dev.solruf.com/api/categories?parent=${category.category_id}`
         )
         .then(({ data }) => {
            setSubCategories(data.categories);
         });
   }, [category]);

   console.log(inputList);

   const [editMode, setEditMode] = useState(false);

   const handleEditModeHandler = (e, i) => {
      console.log(i);
      setEditMode(!editMode);
   };

   const dragEndHandler = (result) => {
      const { destination, source } = result;
      if (!destination) return;
      if (
         destination.droppableId === source.droppableId &&
         destination.index === source.index
      )
         return;
      const newItemList = [...inputList];
      const draggedItem = newItemList.splice(source.index, 1)[0];
      newItemList.splice(destination.index, 0, draggedItem);
      setInputList(newItemList);
   };

   return (
      <Wrapper>
         <Container maxWidth='xl'>
            <Typography
               variant='h4'
               textAlign='center'
               sx={{ fontWeight: 600 }}
            >
               Add Product
            </Typography>

            {/* === categories and subcategories */}
            <CategoryArea>
               <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                     <CustomSelect
                        label='Select Category'
                        value={category.category}
                        changeHandler={(e) => handleCategoryChange(e)}
                     >
                        {categories.map((category) => (
                           <MenuItem
                              key={category.id}
                              value={category?.name?.toUpperCase()}
                           >
                              {category?.name}
                           </MenuItem>
                        ))}
                     </CustomSelect>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <CustomSelect
                        value={subCategory}
                        changeHandler={handleSubCategoryChange}
                        label='Select Sub Category'
                     >
                        {subCategories.map((category) => (
                           <MenuItem
                              key={category.id}
                              value={category?.name?.toLowerCase()}
                           >
                              {category?.name}
                           </MenuItem>
                        ))}
                     </CustomSelect>
                  </Grid>
                  <Grid item xs={12} md={12}>
                     <SearchProductInput>
                        <input
                           type='text'
                           placeholder='https://frederik.info'
                        />

                        <label
                           htmlFor='serviceFile'
                           style={{
                              width: '20%',
                              minWidth: '100px',
                              height: '100%',
                              background: '#ffd05b',
                           }}
                        >
                           <Box
                              sx={{
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 height: '100%',
                              }}
                           >
                              <Typography
                                 variant='body1'
                                 sx={{ cursor: 'pointer' }}
                              >
                                 Save
                              </Typography>
                           </Box>
                        </label>
                     </SearchProductInput>
                  </Grid>
               </Grid>
            </CategoryArea>
            <Box>
               <Typography variant='h6' sx={{ my: 2 }}>
                  Product Name
               </Typography>
               <SelectedProduct>
                  <Typography>selected product #1</Typography>
                  <EditIcon />
               </SelectedProduct>
            </Box>
            <Button
               endIcon={<AddIcon></AddIcon>}
               sx={{ mx: 'auto', display: 'flex', color: '#080808', my: 2 }}
               onClick={handleAddClick}
            >
               Product Field
            </Button>
            {showInputBox &&
               inputList.map((input, index) => (
                  <Box sx={{ mb: 2, display: 'flex' }} key={index}>
                     <Grid container spacing={2} alignItems='center'>
                        <Grid item xs={12} md={4}>
                           <CustomSelect
                              value={input.fieldName}
                              changeHandler={(e) => handleInputChange(e, index)}
                              name='fieldName'
                              label='Select Field'
                           >
                              <MenuItem value={'field1'}>Field #1</MenuItem>
                              <MenuItem value={'field2'}>Field #2</MenuItem>
                              <MenuItem value={'field3'}>Field #3</MenuItem>
                           </CustomSelect>
                        </Grid>
                        <Grid item xs={12} md={4}>
                           <SolrufTextField
                              sx={{ background: '#fff' }}
                              label='Field Value'
                              value={input.fieldValue}
                              name='fieldValue'
                              onChange={(e) => handleInputChange(e, index)}
                           />
                        </Grid>
                        <Grid item xs={12} md={4}>
                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CheckBoxBox>
                                 <Checkbox
                                    checked={input.listView}
                                    onChange={(e) =>
                                       handleInputChange(e, index)
                                    }
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    name='listView'
                                 />
                                 <Typography variant='body2'>
                                    List View
                                 </Typography>
                              </CheckBoxBox>
                              <CheckBoxBox>
                                 <Checkbox
                                    checked={input.gridView}
                                    onChange={(e) =>
                                       handleInputChange(e, index)
                                    }
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    name='gridView'
                                 />
                                 <Typography variant='body2'>
                                    Grid View
                                 </Typography>
                              </CheckBoxBox>
                              <CheckBoxBox>
                                 <Checkbox
                                    checked={input.editable}
                                    onChange={(e) =>
                                       handleInputChange(e, index)
                                    }
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    name='editable'
                                 />
                                 <Typography variant='body2'>
                                    Editable
                                 </Typography>
                              </CheckBoxBox>
                           </Box>
                        </Grid>
                     </Grid>
                     <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                        <Button
                           onClick={() => handleRemoveClick(index)}
                           color='error'
                           endIcon={<DeleteIcon />}
                        ></Button>
                     </Box>
                  </Box>
               ))}

            {editMode && (
               <Box sx={{ mb: 2, display: 'flex' }}>
                  <Grid container spacing={2} alignItems='center'>
                     <Grid item xs={12} md={4}>
                        <CustomSelect name='fieldName' label='Select Field'>
                           <MenuItem value={'field1'}>Field #1</MenuItem>
                           <MenuItem value={'field2'}>Field #2</MenuItem>
                           <MenuItem value={'field3'}>Field #3</MenuItem>
                        </CustomSelect>
                     </Grid>
                     <Grid item xs={12} md={4}>
                        <SolrufTextField
                           sx={{ background: '#fff' }}
                           label='Field Value'
                           name='fieldValue'
                        />
                     </Grid>
                     <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                           <CheckBoxBox>
                              <Checkbox
                                 inputProps={{ 'aria-label': 'controlled' }}
                                 name='listView'
                              />
                              <Typography variant='body2'>List View</Typography>
                           </CheckBoxBox>
                           <CheckBoxBox>
                              <Checkbox
                                 inputProps={{ 'aria-label': 'controlled' }}
                                 name='gridView'
                              />
                              <Typography variant='body2'>Grid View</Typography>
                           </CheckBoxBox>
                           <CheckBoxBox>
                              <Checkbox
                                 inputProps={{ 'aria-label': 'controlled' }}
                                 name='editable'
                              />
                              <Typography variant='body2'>Editable</Typography>
                           </CheckBoxBox>
                        </Box>
                     </Grid>
                  </Grid>
                  <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                     <Button color='error' endIcon={<DeleteIcon />}></Button>
                  </Box>
               </Box>
            )}

            <YellowButton
               style={{
                  marginLeft: 'auto',
                  display: 'block',
                  marginTop: '2rem',
                  background: `${!showInputBox ? 'gray' : ''}`,
                  marginBottom: '1rem'
               }}
               onClick={saveHandler}
               disabled={!showInputBox}
            >
               Save
            </YellowButton>

               {saved && (<DragDropContext>
               <Droppable droppableId='characters'>
                  {(provided) => (
                     <Box
                        sx={{ my: 3 }}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                     >
                        {saved &&
                           inputList2.map((input, i) => (
                              <Draggable
                                 key={input.fieldName}
                                 // draggableId={input.fieldName}
                                 index={i}
                              >
                                 {(provided) => (
                                    <Box
                                       {...provided.draggableProps}
                                       {...provided.dragHandleProps}
                                       ref={provided.innerRef}
                                       sx={{
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          alignItems: 'center',
                                          background: '#D0D7D9',
                                          p: 1.5,
                                          mb: 1,
                                       }}
                                    >
                                       <Typography
                                          sx={{ flexGrow: 1, width: '33%' }}
                                       >
                                          {input.fieldName}
                                       </Typography>
                                       <Typography
                                          sx={{ flexGrow: 1, width: '33%' }}
                                       >
                                          {input.fieldValue}
                                       </Typography>
                                       <Box
                                          sx={{
                                             display: 'flex',
                                             flexGrow: 1,
                                             width: '33%',
                                             justifyContent: 'flex-end',
                                             alignItems: 'center',
                                          }}
                                       >
                                          {input.listView && (
                                             <Typography variant='body2'>
                                                List View,{' '}
                                             </Typography>
                                          )}
                                          {input.gridView && (
                                             <Typography variant='body2'>
                                                Grid View,{' '}
                                             </Typography>
                                          )}
                                          {input.editable && (
                                             <Typography variant='body2'>
                                                Editable
                                             </Typography>
                                          )}
                                          <Button
                                             endIcon={
                                                <EditIcon color='secondary' />
                                             }
                                             onClick={handleEditModeHandler}
                                          ></Button>
                                       </Box>
                                    </Box>
                                 )}
                              </Draggable>
                           ))}
                        {provided.placeholder}
                     </Box>
                  )}
               </Droppable>
            </DragDropContext>)}

            <Box sx={{background: '#ffffff', py: 1, px: 2, boxShadow: '0 4px 15px rgba(0,0,0,0.1)', borderRadius: 2, display: saved ? 'block': 'none'}}>
              {saved && ( <TabPanel
                  value={tab}
                  onChange={handleChange}
                  centered
                  sx={{ background: '#f7f7f7', borderRadius: 1.5, mt: 3,  }}
               >
                  <Tab label='List View' />
                  <Tab label='Grid View' />
                  <Tab label='Main Page' />
               </TabPanel>)}
               {tab === 0 && (<DragDropContext onDragEnd={dragEndHandler}>
               <Droppable droppableId='characters'>
                  {(provided) => (
                     <Box
                        sx={{ my: 3 }}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                     >
                        {saved &&
                           inputList.filter(inp => inp.listView === true).map((input, i) => (
                              <Draggable
                                 key={input.fieldName}
                                 draggableId={input.fieldName}
                                 index={i}
                              >
                                 {(provided) => (
                                    <Box
                                       {...provided.draggableProps}
                                       {...provided.dragHandleProps}
                                       ref={provided.innerRef}
                                       sx={{
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          alignItems: 'center',
                                          background: '#D0D7D9',
                                          p: 1.5,
                                          mb: 1,
                                       }}
                                    >
                                       <Typography
                                          sx={{ flexGrow: 1, width: '33%' }}
                                       >
                                          {input.fieldName}
                                       </Typography>
                                       <Typography
                                          sx={{ flexGrow: 1, width: '33%' }}
                                       >
                                          {input.fieldValue}
                                       </Typography>
                                       <Box
                                          sx={{
                                             display: 'flex',
                                             flexGrow: 1,
                                             width: '33%',
                                             justifyContent: 'flex-end',
                                             alignItems: 'center',
                                          }}
                                       >
                                          {input.listView && (
                                             <Typography variant='body2'>
                                                List View,{' '}
                                             </Typography>
                                          )}
                                          {input.gridView && (
                                             <Typography variant='body2'>
                                                Grid View,{' '}
                                             </Typography>
                                          )}
                                          {input.editable && (
                                             <Typography variant='body2'>
                                                Editable
                                             </Typography>
                                          )}
                                          <Button
                                             endIcon={
                                                <EditIcon color='secondary' />
                                             }
                                             onClick={handleEditModeHandler}
                                          ></Button>
                                       </Box>
                                    </Box>
                                 )}
                              </Draggable>
                           ))}
                        {provided.placeholder}
                     </Box>
                  )}
               </Droppable>
            </DragDropContext>)}
            </Box>
         </Container>
      </Wrapper>
   );
};

export default AddProduct;
