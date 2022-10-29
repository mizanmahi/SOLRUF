import {
   Button,
   Checkbox,
   FormControlLabel,
   Radio,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Typography,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import React, { useCallback, useRef, useState } from 'react';
import BackToButton from '../BackToButton/BackToButton';
import CustomAccordionForDrawer from '../Custom/CustomAccordionForDrawer/CustomAccordionForDrawer';
import DownloadButton from '../Custom/DownloadButton/DownloadButton';
import FeatureDetail from '../FeatureDetail/FeatureDetail';
import ProductDetailsCardForMobile from '../ProductDetailsCardForMobile/ProductDetailsCardForMobile';
import YellowButton from '../YellowButton/YellowButton';
import SolrufTextField from '../TextField/TextField';
import DatePicker from '../Custom/DatePicker/DatePicker';
import UploadError from '../../pages/MyPortfolio/UploadError';
import SingleFIleUploadWithProgress from '../../pages/MyPortfolio/SingleFIleUploadWithProgress';

// icons
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagIcon from '@mui/icons-material/Flag';
import { PlusIcon } from '@heroicons/react/solid';
import { useDropzone } from 'react-dropzone';
import { tableCellClasses } from '@mui/material/TableCell';

const TermLinkButton = styled(Button)(({ theme }) => ({
   background: '#d6dcff',
   color: '#2448FC',
   fontWeight: 'bold',
   '&:hover': {
      background: '#d6dcff',
   },
}));

const Nav = styled(Box)(({ theme }) => ({
   background: theme.palette.secondary.light,
   textAlign: 'center',
   position: 'relative',
}));

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
}));

const FormWrapper = styled(Box)(({ theme }) => ({
   padding: '1rem',
}));

const DocumentUploadBox = styled('div')(({ theme }) => {
   return {
      width: '100%',
      padding: '1rem',
      background: theme.palette.secondary.light,
      borderRadius: '5px',
      margin: '1rem 0',
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
const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#ffffff',
      color: theme.palette.primary.dark,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
   },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
   },
   // hide last border
   '&:last-child td, &:last-child th': {
      border: 0,
   },
}));

function createData(name, calories, fat, carbs, protein) {
   return { name, calories, fat, carbs, protein };
}

const rows = [
   createData('Quality', 159, 6.0, 24, 4.0),
   createData('Discount', 237, 9.0, 37, 4.3),
   createData('Price per pay', 262, 16.0, 24, 6.0),
];

const EnquiryDetailsForUserMobile = () => {
   const [date, setDate] = useState(new Date());
   const [isEdit, setIsEdit] = useState(false);
   const documentNameRef = useRef(null);
   const [documents, setDocuments] = useState([]);
   const [documentNameError, setDocumentNameError] = useState('');

   const editHandler = () => {
      if (isEdit) {
         setIsEdit(false);
      } else {
         setIsEdit(true);
      }
   };

   const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
      if (documentNameRef.current.value.trim().length === 0) {
         documentNameRef.current.focus();
         setDocumentNameError('Please enter Certificate name');
         return;
      }
      const mappedAcceptedFiles = acceptedFiles.map((file) => {
         setDocumentNameError('');
         file.givenName = documentNameRef.current.value;
         return {
            file,
            error: [],
         };
      });
      setDocuments((cur) => [...cur, ...mappedAcceptedFiles, ...rejectedFiles]);
   }, []);

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      maxSize: 5000000,
   });

   const onFileUpload = (url, file) => {
      setDocuments((cur) =>
         cur.map((fw) => {
            if (fw.file === file) {
               return { ...fw, url };
            }
            return fw;
         })
      );
   };

   const deleteHandler = (file) => {
      setDocuments((cur) => cur.filter((fw) => fw.file !== file));
   };

   return (
      <Box sx={{ background: '#f3f3f3', px: 1 }}>
         <Nav sx={{ alignItems: 'center' }}>
            <BackToButton
               sx={{ position: 'absolute', left: 0, top: 0 }}
            ></BackToButton>
            <Typography sx={{ p: 1 }}>Back To Dashboard</Typography>
         </Nav>
         <ProductDetailsCardForMobile></ProductDetailsCardForMobile>

         <Box sx={{ mt: 2 }}>
            <CustomAccordionForDrawer
               title='Order Details'
               noPadding={true}
               paddingOff={true}
            >
               {!isEdit && (
                  <Box sx={{ p: 2 }}>
                     <Flex
                        sx={{
                           justifyContent: 'flex-start',
                           alignItems: 'flex-start',
                           mt: 1,
                           flexDirection: 'column',
                        }}
                     >
                        <Box sx={{ minWidth: '50%' }}>
                           <FeatureDetail
                              icon={<ProductionQuantityLimitsIcon />}
                              title='Quantity'
                              value={3}
                           />
                           <FeatureDetail
                              icon={<LocationCityIcon />}
                              title='City/District'
                              value='Mumbai'
                           />
                           <FeatureDetail
                              icon={<LocationOnIcon />}
                              title='Street'
                              value='1089/25, Shiv Motor Market, Kashmere Gate Delhi, Delhi, 110001, 01123929957'
                           />
                        </Box>
                        <Box>
                           <FeatureDetail
                              icon={<DateRangeIcon />}
                              title='Date'
                              value='20th Aug, 2022'
                           />

                           <FeatureDetail
                              icon={<FlagIcon />}
                              title='Pin Code / Zip Code'
                              value='259875'
                           />
                        </Box>
                     </Flex>

                     {/* Download buttons  */}
                     <Flex sx={{ my: 2, flexDirection: 'column' }}>
                        <DownloadButton>Download Doc</DownloadButton>
                        <DownloadButton sx={{ my: 2 }}>
                           Download Doc
                        </DownloadButton>
                        <DownloadButton>Download Doc</DownloadButton>
                     </Flex>

                     {/*  check boxes */}
                     <Flex
                        sx={{
                           flexDirection: 'column',
                           '& .MuiFormControlLabel-root': {
                              margin: 0,
                           },
                        }}
                     >
                        <FormControlLabel
                           sx={{
                              '& .MuiTypography-root': {
                                 fontWeight: 'bold',
                              },
                           }}
                           control={<Checkbox defaultChecked />}
                           label='Accept Products from other Brand?'
                        />
                        <FormControlLabel
                           sx={{
                              '& .MuiTypography-root': {
                                 fontWeight: 'bold',
                              },
                           }}
                           control={<Checkbox />}
                           label='Share your Company Information with Supplier?'
                        />
                     </Flex>
                  </Box>
               )}

               {/* ============================== edit form ============================== */}
               {isEdit && (
                  <FormWrapper sx={{ pt: 0 }}>
                     <BackToButton onClick={editHandler}>Back</BackToButton>
                     <Flex sx={{ flexDirection: 'column' }}>
                        <Box>
                           <SolrufTextField label='Quantity' />
                           <SolrufTextField
                              label='City / District'
                              sx={{ my: 2 }}
                           />
                        </Box>
                        <Box>
                           <DatePicker
                              date={date}
                              setDate={setDate}
                              sx={{ maxWidth: '100%' }}
                           />
                           <SolrufTextField
                              label='Pin code / Zip code'
                              sx={{ mt: 2 }}
                           />
                        </Box>
                     </Flex>
                     <SolrufTextField label='Street' sx={{ mt: 2 }} />

                     <DocumentUploadBox>
                        <Typography
                           variant='h6'
                           gutterBottom
                           sx={{ color: '#000000' }}
                        >
                           Add Booking Documents
                        </Typography>
                        <CertificateNameBox>
                           <input
                              type='text'
                              placeholder='Document Name'
                              ref={documentNameRef}
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

                        {documents.map((fileWrapper, i) => {
                           return fileWrapper?.errors?.length ? (
                              <UploadError
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
                     </DocumentUploadBox>
                  </FormWrapper>
               )}

               {/* ============================== edit form end ============================== */}
               <YellowButton
                  style={{
                     width: '100%',
                     background: isEdit ? '#ffd05b' : '#D0D7D9',
                     borderRadius: '0 0 10px 10px',
                  }}
                  onClick={editHandler}
               >
                  {isEdit ? 'Save' : 'Edit'}
               </YellowButton>
            </CustomAccordionForDrawer>
         </Box>

         <Box sx={{ mt: 3 }}>
            <CustomAccordionForDrawer title='Vendor Bids' paddingOff={true}>
               <TableContainer component={Box} sx={{}}>
                  <Table
                     sx={{ width: '100%', minWidth: 600 }}
                     aria-label='simple table'
                  >
                     <TableHead>
                        <TableRow>
                           <StyledTableCell
                              align='left'
                              sx={{
                                 fontWeight: 600,
                                 fontSize: '1rem',
                              }}
                           >
                              Name
                           </StyledTableCell>
                           <StyledTableCell
                              align='right'
                              sx={{
                                 fontWeight: 600,
                                 fontSize: '1rem',
                              }}
                           >
                              Bid
                           </StyledTableCell>
                           <StyledTableCell
                              align='right'
                              sx={{
                                 fontWeight: 600,
                                 fontSize: '1rem',
                              }}
                           >
                              Portfolio & Supply terms
                           </StyledTableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {rows.map((row) => (
                           <StyledTableRow
                              key={row.name}
                              sx={{
                                 '&:last-child td, &:last-child th': {
                                    border: 0,
                                 },
                              }}
                           >
                              <TableCell
                                 component='th'
                                 scope='row'
                                 align='left'
                                 sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                 }}
                              >
                                 <Radio
                                    value='a'
                                    checked={true}
                                    name='radio-buttons'
                                    inputProps={{
                                       'aria-label': 'A',
                                    }}
                                 />
                                 <Typography sx={{ fontWeight: 600 }}>
                                    Amaz Zain
                                 </Typography>
                              </TableCell>
                              <TableCell
                                 component='th'
                                 scope='row'
                                 align='right'
                              >
                                 ₹5000
                              </TableCell>
                              <TableCell align='right'>
                                 <TermLinkButton>Link</TermLinkButton>
                              </TableCell>
                           </StyledTableRow>
                        ))}
                     </TableBody>
                  </Table>
               </TableContainer>
               <YellowButton
                  style={{
                     width: '100%',
                     borderRadius: '0 0 10px 10px',
                  }}
               >
                  Confirm Order
               </YellowButton>
            </CustomAccordionForDrawer>
         </Box>
      </Box>
   );
};

export default EnquiryDetailsForUserMobile;
