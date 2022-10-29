import { Fragment, useState, useEffect } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { Container } from '@mui/material';
import DragDrop from './DragDrop';
import { ViewPointOptions } from './AddProduct';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import PrimaryButton from '../../../components/Custom/PrimaryButton/PrimaryButton';

const CustomTab = styled(Tab)(({ theme }) => ({
   fontSize: '1rem',
   '&.Mui-selected': {
      fontWeight: 'bold',
      color: theme.palette.secondary.main,
   },
}));

const FilterModal = ({ modalProps }) => {
   const {
      openModal,
      setopenModal,
      productFields,
      onClickEdit,
      setProductFields,
   } = modalProps;

   const [tab, setTab] = useState(0);
   const [listView, setListView] = useState([]);
   const [gridView, setGridView] = useState([]);
   const [mainView, setMainView] = useState([]);
   const [priceView, setPriceView] = useState([]);
   const [bookingPriceView, setBookingPriceView] = useState([]);

   console.log(productFields);


   useEffect(() => {
      let listData = productFields.filter(
         (lst) => lst.views.portfolioCard.visibility === true
      );
      listData.sort(
         (a, b) => a.views.portfolioCard.level - b.views.portfolioCard.level
      );
      setListView(listData);

      let gridData = productFields.filter(
         (grd) => grd.views.procurementCard.visibility === true
      );
      gridData.sort(
         (a, b) => a.views.procurementCard.level - b.views.procurementCard.level
      );
      setGridView(gridData);

      let mainData = productFields.filter(
         (mn) => mn.views.vendorEditablePurchase.visibility === true
      );
      mainData.sort(
         (a, b) =>
            a.views.vendorEditablePurchase.level -
            b.views.vendorEditablePurchase.level
      );
      setMainView(mainData);

      let priceData = productFields.filter(
         (prc) => prc.views.vendorEditableBooking.visibility === true
      );
      priceData.sort(
         (a, b) =>
            a.views.vendorEditableBooking.level -
            b.views.vendorEditableBooking.level
      );
      setPriceView(priceData);

      let bookingPriceData = productFields.filter(
         (lst) => lst.views.productFeatureList.visibility === true
      );
      bookingPriceData.sort(
         (a, b) =>
            a.views.productFeatureList.level - b.views.productFeatureList.level
      );
      setBookingPriceView(bookingPriceData);
   }, [productFields]);


   const handleTabChange = (event, newValue) => {
      setTab(newValue);
   };

   return (
      <Fragment>
         <Modal
            title='Filter Features'
            centered
            visible={openModal}
            onCancel={() => setopenModal(false)}
            width={1500}
            footer={null}
         >
            <div className='mb-5 px-0'>
               <Container maxWidth='xl'>
                  {/* <TabPanel
                        handleTabChange={handleTabChange}
                        activeTab={tab}
                        tabs={ViewPointOptions}
                     /> */}

                  <Tabs
                     value={tab}
                     onChange={handleTabChange}
                     variant='scrollable'
                     scrollButtons
                     allowScrollButtonsMobile
                     aria-label='features tab'
                     sx={{
                        '& .MuiTabs-indicator': {
                           height: 5,
                        },
                        '& .MuiButtonBase-root': {
                           padding: '1rem',
                        },
                     }}
                  >
                     {ViewPointOptions.map((item, id) => {
                        return (
                           <CustomTab
                              key={id}
                              label={item}
                              sx={{
                                 fontSize: '1.2rem',
                                 '&.Mui-selected': {
                                    fontWeight: 'bold',
                                    color: 'secondary.main',
                                 },
                              }}
                           />
                        );
                     })}
                  </Tabs>

                  {tab === 0 && (
                     <>
                        <div>
                           <DragDrop
                              tabType='portfolioCard'
                              viewType={listView}
                              setDataList={setListView}
                              dragProps={{
                                 productFields,
                                 setProductFields,
                                 onClickEdit,
                              }}
                           />
                        </div>
                     </>
                  )}
                  {tab === 1 && (
                     <>
                        <div>
                           <DragDrop
                              tabType='procurementCard'
                              viewType={gridView}
                              setDataList={setGridView}
                              dragProps={{
                                 productFields,
                                 setProductFields,
                                 onClickEdit,
                              }}
                           />
                        </div>
                     </>
                  )}
                  {tab === 2 && (
                     <>
                        <div>
                           <DragDrop
                              tabType='vendorEditablePurchase'
                              viewType={mainView}
                              setDataList={setMainView}
                              dragProps={{
                                 productFields,
                                 setProductFields,
                                 onClickEdit,
                              }}
                           />
                        </div>
                     </>
                  )}
                  {tab === 3 && (
                     <>
                        <div>
                           <DragDrop
                              tabType='vendorEditableBooking'
                              viewType={priceView}
                              setDataList={setPriceView}
                              dragProps={{
                                 productFields,
                                 setProductFields,
                                 onClickEdit,
                              }}
                           />
                        </div>
                     </>
                  )}
                  {tab === 4 && (
                     <>
                        <div>
                           <DragDrop
                              tabType='productFeatureList'
                              viewType={bookingPriceView}
                              setDataList={setBookingPriceView}
                              dragProps={{
                                 productFields,
                                 setProductFields,
                                 onClickEdit,
                              }}
                           />
                        </div>
                     </>
                  )}

                  <PrimaryButton sx={{
                     mt: 2,
                     px: 5,
                  }}>Save</PrimaryButton>
               </Container>
            </div>
         </Modal>
      </Fragment>
   );
};

export default FilterModal;
