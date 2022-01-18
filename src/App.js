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

import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import Layout from './components/Layout/Layout';

function App() {
   const [showDashboard, setShowDashboard] = useState(false);
   const [user, setUser] = useLocalStorage('user', null);

   return (
      <Provider store={store}>
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
                        path='/dashboard'
                        element={
                           <Layout>
                              <Dashboard />
                           </Layout>
                        }
                     />
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
                        path='/myPortfolio'
                        element={
                           <Layout>
                              <MyPortfolio />
                           </Layout>
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
                     <Route path='/about' element={<Layout header2={true} header={false}><UserPortfolioProfile /></Layout>} />
                  </Routes>
               </div>
            </Router>
         </ThemeProvider>
      </Provider>
   );
}

export default App;
