import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { Container } from '@mui/material';
import { theme } from './theme/theme';
import { store } from './redux/store';

import './App.css';

import Header from './webui/header/header';
import Home from './webui/home/home';
import Dashboard from './pages/Dashboard/Dashboard';
import ProfileSharingPage from './pages/ProfileSharingPage/ProfileSharingPage';
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

import { useEffect, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import Layout from './components/Layout/Layout';
import AddProjectForMobile from './pages/AddProjectForMobile/AddProjectForMobile';
import EditProjectForMobile from './pages/EditProjectForMobile/EditProjectForMobile';
import { useDispatch } from 'react-redux';
import { saveUser } from './redux/slices/userSlice';
import LoginModal from './components/LoginModal/LoginModal';
import Login from './login/login';
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

function App() {
   const [showDashboard, setShowDashboard] = useState(false);
   const [user, setUser] = useLocalStorage('user', null);
   const dispatch = useDispatch();

   useEffect(() => {
      console.log(user);
      if (user) {
         dispatch(saveUser(user));
      }
   }, [user, dispatch]);

   return (
      <ThemeProvider theme={theme}>
         <Router>
            <div className='App'>
               {/* <Header /> */}

               <Routes>
                  <Route
                     path='/'
                     element={
                        <Layout>
                           <Home
                              setShowDashboard={setShowDashboard}
                              showDashboard={showDashboard}
                           />
                        </Layout>
                     }
                  />
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
                     <Route path='profile' element={<ProfileSharingPage />} />
                     <Route
                        path='portfolio'
                        element={<DashboardPortfolio noPadding={true} />}
                     />
                     <Route path='customerLeads' element={<CustomerLeads />} />
                  </Route>
                  <Route
                     path='/profileSharing/:profileId'
                     element={
                        <Layout>
                           <ProfileSharingPage />
                        </Layout>
                     }
                  />
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
                        <Layout>
                           <PurchaseProductPage />
                        </Layout>
                     }
                  />
                  <Route
                     path='/addProduct'
                     element={
                        <Layout>
                           <AddProduct />
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
                     path='/about'
                     element={
                        <Layout header={false}>
                           <UserPortfolioProfile />
                        </Layout>
                     }
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
               </Routes>
            </div>
         </Router>
      </ThemeProvider>
   );
}

export default App;
