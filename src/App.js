import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import { theme } from './theme/theme';
import { store } from './redux/store';

import './App.css';

import Home from './webui/home/home';
import Dashboard from './pages/Dashboard/Dashboard';
import Dragging from './components/Dragging/Dragging';
import Checkout from './pages/Checkout/Checkout';
import BookProductInAdvancePage from './pages/BookProductInAdvancePage/BookProductInAdvancePage';
import UserPortfolioProfile from './portfolio/UserPortfolioProfile';
import SearchProduct from './pages/SearchProduct/SearchProduct';
import PurchaseProductPage from './pages/PurchaseProductPage/PurchaseProductPage';
import AddProduct from './pages/AdminPages/AddProduct/AddProduct';
import CustomizeProduct from './pages/CustomizeProduct/CustomizeProduct';
import FinalizeProduct from './pages/FinalizeProduct/FinalizeProduct';
import MyPortfolio from './pages/MyPortfolio/MyPortfolio';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';
import AddProject from './pages/AddProject/AddProject';

import Layout from './components/Layout/Layout';
import AddProjectForMobile from './pages/AddProjectForMobile/AddProjectForMobile';
import EditProjectForMobile from './pages/EditProjectForMobile/EditProjectForMobile';
import { useSelector } from 'react-redux';
import { removeUser } from './redux/slices/userSlice';
import MyDashboard from './pages/MyDashboard/MyDashboard';
import DashboardPortfolio from './pages/Dashboard/DashboardPortfolio/DashboardPortfolio';
import CustomerLeads from './pages/Dashboard/CustomerLeads/CustomerLeads';
import Blogs from './pages/Blogs/Blogs';
import SolarMaintenance from './pages/Blogs/SolarMaintenance/SolarMaintenance';
import PvSystems from './pages/Blogs/PvSystems/PvSystems';
import SolarSteps from './pages/Dashboard/SolarSteps/SolarSteps';
import SolarInstallationProcess from './pages/Blogs/SolarInstallationProcess/SolarInstallationProcess';
import SolarComponents from './pages/Blogs/SolarComponents/SolarComponents';
import SolarDesign from './pages/Blogs/SolarDesign/SolarDesign';
import SolarProducts from './pages/Blogs/SolarProducts/SolarProducts';
import NetMetering from './pages/Blogs/NetMetering/NetMetering';
import Maharashtra from './pages/Blogs/NetMetering/Maharashtra/Maharashtra';
import Dilhi from './pages/Blogs/NetMetering/Dilhi/Dilhi';
import Gujrat from './pages/Blogs/NetMetering/Gujrat/Gujrat';
import Haryana from './pages/Blogs/NetMetering/Haryana/Haryana';
import Karnataka from './pages/Blogs/NetMetering/Karnataka/Karnataka';
import Punjab from './pages/Blogs/NetMetering/Punjab/Punjab';
import WestBengal from './pages/Blogs/NetMetering/WestBengal/WestBengal';
import ProtectedRoute from './routes/ProtectedRoute/ProtectedRoute';
// import VendorRoute from './routes/ProtectedRoute/VendorRoute';
import { axiAuth } from './utils/axiosInstance';
import ProductBooking from './pages/ProductBooking/ProductBooking';
import AdminRoute from './routes/AdminRoute';
import AddAttribute from './pages/AdminPages/AddAttribute/AddAttribute';
import Toast from './components/Toast';
import { EnquiryForm } from './components/EnquiryForm/EnquiryForm';
import EnquiryPage from './pages/EnquiryPage/EnquiryPage';

import 'swiper/swiper-bundle.css';
import 'swiper/swiper.min.css';
import 'swiper/modules/scrollbar/scrollbar.scss';
import 'swiper/modules/scrollbar/scrollbar.scss';

function App() {
   const { user, role, token } = useSelector((state) => state.user);

   console.log({ user, role, token });

   return (
      <ThemeProvider theme={theme}>
         <Router>
            <div className='App'>
               <Routes>
                  <Route
                     path='/'
                     element={
                        <Layout>
                           <Home />
                        </Layout>
                     }
                  />
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route
                     path='/dashboard/*'
                     element={
                        <ProtectedRoute>
                           <Layout noFooter={true}>
                              <Dashboard />
                           </Layout>
                        </ProtectedRoute>
                     }
                  >
                     <Route path='myDashboard' element={<MyDashboard />} />
                     <Route
                        path='portfolio'
                        element={<DashboardPortfolio noPadding={true} />}
                     />
                     <Route path='customerLeads' element={<CustomerLeads />} />
                  </Route>

                  <Route
                     path='/dragging'
                     element={
                        <Layout>
                           <Dragging />
                        </Layout>
                     }
                  />
                  <Route
                     path='/checkout'
                     element={
                        <Layout>
                           <Checkout />
                        </Layout>
                     }
                  />
                  <Route
                     path='/book-product-in-advance'
                     element={
                        <Layout>
                           <BookProductInAdvancePage />
                        </Layout>
                     }
                  />
                  <Route
                     path='/searchProduct'
                     element={
                        <Layout>
                           <SearchProduct />
                        </Layout>
                     }
                  />
                  <Route
                     path='/purchaseProduct'
                     element={
                        <AdminRoute>
                           <Layout>
                              <PurchaseProductPage />
                           </Layout>
                        </AdminRoute>
                     }
                  />
                  <Route
                     path='/admin/create/new'
                     element={
                        <Layout>
                           <AddProduct />
                        </Layout>
                     }
                  />
                  <Route
                     path='/addAttribute'
                     element={
                        <Layout>
                           <AddAttribute />
                        </Layout>
                     }
                  />
                  <Route
                     path='/customizeProduct'
                     element={
                        <Layout>
                           <CustomizeProduct />
                        </Layout>
                     }
                  />
                  <Route
                     path='/finalizeProduct'
                     element={
                        <Layout>
                           <FinalizeProduct />
                        </Layout>
                     }
                  />
                  <Route
                     path='/adminPortfolio'
                     element={
                        <ProtectedRoute>
                           <Layout>
                              <MyPortfolio />
                           </Layout>
                        </ProtectedRoute>
                     }
                  />
                  <Route
                     path='/projects'
                     element={
                        <Layout>
                           <ProjectsPage />
                        </Layout>
                     }
                  />
                  <Route
                     path='/projectDetails'
                     element={
                        <Layout>
                           <ProjectDetails />
                        </Layout>
                     }
                  />
                  <Route
                     path='/enquiry-jabez'
                     element={
                        <Layout>
                           <EnquiryForm />
                        </Layout>
                     }
                  />

                  <Route
                     exact
                     path='/addProject'
                     element={
                        <>
                           <Layout>
                              <Container maxWidth='xl'>
                                 <AddProject />
                              </Container>
                           </Layout>
                        </>
                     }
                  />
                  <Route
                     exact
                     path='/editProjectMobile/:projectId'
                     element={
                        <>
                           <Layout>
                              <Container maxWidth='xl'>
                                 <EditProjectForMobile />
                              </Container>
                           </Layout>
                        </>
                     }
                  />
                  <Route
                     exact
                     path='/m.addProject'
                     element={
                        <>
                           <Layout>
                              <Container maxWidth='xl'>
                                 <AddProjectForMobile />
                              </Container>
                           </Layout>
                        </>
                     }
                  />
                  <Route
                     path='/profile/:name'
                     element={<UserPortfolioProfile />}
                  />
                  {/*  ========= blogs ========= */}
                  <Route
                     path='/blogs'
                     element={
                        <Layout header={false}>
                           <Blogs />
                        </Layout>
                     }
                  />

                  <Route
                     path='/blogs/maintenance'
                     element={
                        <Layout header={false}>
                           <SolarMaintenance />{' '}
                        </Layout>
                     }
                  />
                  <Route
                     path='/blogs/typesOfPvSystems'
                     element={
                        <Layout header={false}>
                           <PvSystems />{' '}
                        </Layout>
                     }
                  />
                  <Route
                     path='/blogs/solarSteps'
                     element={
                        <Layout header={false}>
                           <SolarSteps />{' '}
                        </Layout>
                     }
                  />
                  <Route
                     path='/blogs/solarInstallationProcess'
                     element={
                        <Layout header={false}>
                           <SolarInstallationProcess />{' '}
                        </Layout>
                     }
                  />
                  <Route
                     path='/blogs/solarComponents'
                     element={
                        <Layout header={false}>
                           <SolarComponents />{' '}
                        </Layout>
                     }
                  />
                  <Route
                     path='/blogs/solarDesign'
                     element={
                        <Layout header={false}>
                           <SolarDesign />{' '}
                        </Layout>
                     }
                  />
                  <Route
                     path='/blogs/solarProducts'
                     element={
                        <Layout header={false}>
                           <SolarProducts />{' '}
                        </Layout>
                     }
                  />
                  <Route
                     path='/blogs/netMetering'
                     element={
                        <Layout header={false}>
                           <NetMetering />{' '}
                        </Layout>
                     }
                  />

                  {/* net metering policy, state wise */}

                  <Route
                     path='/blogs/netMetering/maharashtra'
                     element={
                        <Layout header={false}>
                           <Maharashtra />{' '}
                        </Layout>
                     }
                  />
                  <Route
                     path='/blogs/netMetering/dilhi'
                     element={
                        <Layout header={false}>
                           <Dilhi />{' '}
                        </Layout>
                     }
                  />
                  <Route
                     path='/blogs/netMetering/gujrat'
                     element={
                        <Layout header={false}>
                           <Gujrat />{' '}
                        </Layout>
                     }
                  />
                  <Route
                     path='/blogs/netMetering/haryana'
                     element={
                        <Layout header={false}>
                           <Haryana />{' '}
                        </Layout>
                     }
                  />
                  <Route
                     path='/blogs/net-metering/karnataka'
                     element={
                        <Layout header={false}>
                           <Karnataka />{' '}
                        </Layout>
                     }
                  />
                  <Route
                     path='/blogs/net-metering/punjab'
                     element={
                        <Layout header={false}>
                           <Punjab />{' '}
                        </Layout>
                     }
                  />

                  <Route
                     path='/blogs/net-metering/west-bengal'
                     element={
                        <Layout header={false}>
                           <WestBengal />{' '}
                        </Layout>
                     }
                  />

                  {/*  product booking  */}
                  <Route path='/product-booking' element={<ProductBooking />} />
                  <Route path='/enquiry' element={<EnquiryPage />} />
               </Routes>
               <Toast />
            </div>
         </Router>
      </ThemeProvider>
   );
}

export default App;

/** Intercept any unauthorized request.
 * dispatch logout action accordingly **/
const UNAUTHORIZED = 401;
const { dispatch } = store; // direct access to redux store.

axiAuth.interceptors.request.use((config) => {
   const token = store.getState().user.token;
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});

axiAuth.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response) {
         const { status } = error?.response;
         if (status === UNAUTHORIZED) {
            dispatch(removeUser());
         }
         return Promise.reject(error);
      }
   }
);
