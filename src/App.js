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

function App() {
   const [showDashboard, setShowDashboard] = useState(false);
   const [user, setUser] = useLocalStorage('user', null);

   return (
      <Provider store={store}>
         <ThemeProvider theme={theme}>
            <Router>
               <div className='App'>
                  <Header />
                  <Routes>
                     <Route
                        path='/'
                        element={
                           <Home
                              setShowDashboard={setShowDashboard}
                              showDashboard={showDashboard}
                           />
                        }
                     />
                     <Route path='/dashboard' element={<Dashboard />} />
                     <Route
                        path='/profileSharing/:profileId'
                        element={<ProfileSharingPage />}
                     />
                     <Route path='/dragging' element={<Dragging />} />
                     <Route path='/checkout' element={<Checkout />} />

                     <Route
                        path='/book-product-in-advance'
                        element={<BookProductInAdvancePage />}
                     />
                  </Routes>
                  <Routes>
                     <Route path='/about' element={<UserPortfolioProfile />} />
                     <Route path='/searchProduct' element={<SearchProduct />} />
                     <Route
                        path='/purchaseProduct'
                        element={<PurchaseProductPage />}
                     />
                     <Route path='/addProduct' element={<AddProduct />} />
                     <Route
                        path='/customizeProduct'
                        element={<CustomizeProduct />}
                     />
                     <Route
                        path='/finalizeProduct'
                        element={<FinalizeProduct />}
                     />
                     <Route path='/myPortfolio' element={<MyPortfolio />} />
                     <Route path='/projects' element={<ProjectsPage />} />
                     <Route
                        path='/about/project/details'
                        element={<ProjectDetails />}
                     />

                     <Route
                        exact
                        path='/addProject'
                        element={
                           <>
                              <Container maxWidth='xl'>
                                 <AddProject />
                              </Container>
                           </>
                        }
                     />
                  </Routes>
               </div>
            </Router>
         </ThemeProvider>
      </Provider>
   );
}

export default App;
