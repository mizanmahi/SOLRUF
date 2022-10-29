import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
import { theme } from "./theme/theme";
import { store } from "./redux/store";

import "animate.css";
import "./App.css";

import Toast from "./components/Toast";
import Layout from "./components/Layout/Layout";

import { removeUser } from "./redux/slices/userSlice";
import { axiAuth } from "./utils/axiosInstance";

import ProductBooking from "./pages/ProductBooking/ProductBooking";

import Profile from "./pages/UserDashboard/Profile/Profile";
import useAuth from "./hooks/useAuth";

// swiper css imports
import "swiper/swiper-bundle.css";
import "swiper/swiper.min.css";
import "swiper/modules/scrollbar/scrollbar.scss";
import "swiper/modules/scrollbar/scrollbar.scss";

import { Helmet } from "react-helmet";
import {
  saveStates,
  setNetworkSnackbar2Open,
  setNetworkSnackbarOpen,
  setSnackbarInitiated,
} from "./redux/slices/utils/utils.slice";
import LoginModal from "./components/LoginModal/LoginModal";
import AuthGuard from "./components/AuthGuard/AuthGuard";
import { useSelector } from "react-redux";
import Home from "./pages/home/home";
import { removeCart } from "./redux/slices/cart/cartSlice";

import ErrorPage from "./pages/404";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./components/Fallback/Fallback";
import NetworkFallback from "./components/Fallback/NetworkFallback";
import { useNetwork } from "./hooks/useNetwork";
import SnackbarAlert from "./components/Custom/SnackbarAlert/SnackbarAlert";
import SnackbarAlert2 from "./components/Custom/SnackbarAlert/SnackbarAlert2";
// import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import OrderStatus from "./pages/OrderStatus/OrderStatus";
import PurchaseDetailsPage from "./pages/OrderStatus/PurchaseDetailsPage";
import OrderStatusFromProfile from "./pages/OrderStatus/OrderStatusFromProfile";

import Loader from "./components/Loader/Loader";

import AddProduct from "./pages/AdminPages/AddProduct/AddProduct";
import ProductList from "./pages/AdminPages/ProductList/ProductList";
import UpdateProduct from "./pages/AdminPages/AddProduct/UpdateProduct";

const CustomerLeads = lazy(() =>
  import("./pages/Dashboard/CustomerLeads/CustomerLeads")
);
const SalesEnquiries = lazy(() =>
  import("./pages/Dashboard/SalesEnquiries/SalesEnquiries")
);
const Purchases = lazy(() => import("./pages/Dashboard/Purchase/Purchases"));
const Consultation = lazy(() =>
  import("./pages/UserDashboard/Consultation/Consultation")
);

// import CustomerLeads from './pages/Dashboard/CustomerLeads/CustomerLeads';
// import SalesEnquiries from './pages/Dashboard/SalesEnquiries/SalesEnquiries';
// import Purchases from './pages/Dashboard/Purchase/Purchases';
// import Consultation from './pages/UserDashboard/Consultation/Consultation';

// const AddProduct = lazy(() =>
//   import("./pages/AdminPages/AddProduct/AddProduct")
// );
// const ProductList = lazy(() =>
//   import("./pages/AdminPages/ProductList/ProductList")
// );

const SolarMaintenance = lazy(() =>
  import("./pages/Blogs/SolarMaintenance/SolarMaintenance")
);
const PvSystems = lazy(() => import("./pages/Blogs/PvSystems/PvSystems"));
const SolarSteps = lazy(() =>
  import("./pages/Dashboard/SolarSteps/SolarSteps")
);
const SolarComponents = lazy(() =>
  import("./pages/Blogs/SolarComponents/SolarComponents")
);
const SolarInstallationProcess = lazy(() =>
  import("./pages/Blogs/SolarInstallationProcess/SolarInstallationProcess")
);
const SolarDesign = lazy(() => import("./pages/Blogs/SolarDesign/SolarDesign"));
const SolarProducts = lazy(() =>
  import("./pages/Blogs/SolarProducts/SolarProducts")
);

const KwattCourses = lazy(() =>
  import("./pages/Blogs/KwattCourses/KwattCourses")
);

const Procurement = lazy(() => import("./pages/Procurement/Procurement"));
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs.js"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const SearchProduct = lazy(() => import("./pages/SearchProduct/SearchProduct"));
const PurchaseProductPage = lazy(() =>
  import("./pages/PurchaseProductPage/PurchaseProductPage")
);
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy/PrivacyPolicy"));
const UserPortfolioProfile = lazy(() =>
  import("./portfolio/UserPortfolioProfile")
);
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const MyDashboard = lazy(() => import("./pages/MyDashboard/MyDashboard"));
const UserDashboard = lazy(() => import("./pages/UserDashboard/UserDashboard"));

const EditProjectForMobile = lazy(() =>
  import("./pages/EditProjectForMobile/EditProjectForMobile")
);
const AddProjectForMobile = lazy(() =>
  import("./pages/AddProjectForMobile/AddProjectForMobile")
);

const DashboardPortfolio = lazy(() =>
  import("./pages/Dashboard/DashboardPortfolio/DashboardPortfolio")
);

const Blogs = lazy(() => import("./pages/Blogs/Blogs"));

const NetMetering = lazy(() => import("./pages/Blogs/NetMetering/NetMetering"));

const UserOutlet = lazy(() => import("./privateOutlets/UserOutlet"));
const VendorOutlet = lazy(() => import("./privateOutlets/VendorOutlet"));
const AdminOutlet = lazy(() => import("./privateOutlets/AdminOutlet"));

const Maharashtra = lazy(() =>
  import("./pages/Blogs/NetMetering/Maharashtra/Maharashtra")
);
const Dilhi = lazy(() => import("./pages/Blogs/NetMetering/Dilhi/Dilhi"));
const Gujrat = lazy(() => import("./pages/Blogs/NetMetering/Gujrat/Gujrat"));
const Haryana = lazy(() => import("./pages/Blogs/NetMetering/Haryana/Haryana"));
const Karnataka = lazy(() =>
  import("./pages/Blogs/NetMetering/Karnataka/Karnataka")
);
const Punjab = lazy(() => import("./pages/Blogs/NetMetering/Punjab/Punjab"));
const WestBengal = lazy(() =>
  import("./pages/Blogs/NetMetering/WestBengal/WestBengal")
);

const EnquiryPage = lazy(() => import("./pages/EnquiryPage/EnquiryPage"));

function App() {
  const { user } = useAuth();

  if (user) {
    console.log(user?.user);
  }

  const description = `
   Solruf is a solar marketplace is the pattern of narrative development that aims to make vivid a place, object, character, or group. Description is one of four rhetorical modes, along with exposition, argumentation, and narration. In practice it would be difficult to write literature that drew on just one of the four basic modes`;

  const { statesOfIndia, snackbarInitiated } = useSelector(
    (state) => state.utils
  );

  useEffect(() => {
    if (statesOfIndia.length === 0) {
      axiAuth
        .get("api/states")
        .then(({ data }) => {
          store.dispatch(
            saveStates(
              data.states.map((state) => {
                return state.charAt(0) + state.slice(1).toLowerCase();
              })
            )
          );
        })
        .catch((err) => {});
    }
  }, [statesOfIndia.length]);

  const errorHandler = (error, errorInfo) => {
    console.log("error boundary", error, errorInfo);
  };

  const { networkStatus } = useNetwork();

  if (!networkStatus.online) {
    dispatch(setNetworkSnackbarOpen(true));
    dispatch(setSnackbarInitiated(true));
  } else {
    if (snackbarInitiated) {
      dispatch(setNetworkSnackbarOpen(false));
      dispatch(setNetworkSnackbar2Open(true));
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
          <div className="App">
            <Helmet>
              <title>Solruf | Solar market place</title>
              <meta name="description" content={description} />
              <meta name="theme-color" content="#ffd05b" />
              <body class="light" />
            </Helmet>
            <Routes>
              <Route
                path="/products"
                element={
                  <Layout fixedFooter>
                    <Suspense fallback={<Loader />}>
                      <Procurement />
                    </Suspense>
                  </Layout>
                }
              />
              <Route
                path="/"
                element={
                  <Layout fixedFooter contactUs>
                    <Home />
                  </Layout>
                }
              />

              <Route
                path="/register"
                element={
                  <Layout fixedFooter contactUs>
                    <Home register />
                  </Layout>
                }
              />

              <Route
                path="/about-us"
                element={
                  <Layout fixedFooter contactUs>
                    <Suspense fallback={<Loader />}>
                      <AboutUs />
                    </Suspense>
                  </Layout>
                }
              />

              <Route
                path="/checkout"
                element={
                  <Layout>
                    <Suspense fallback={<Loader />}>
                      <Checkout />
                    </Suspense>
                  </Layout>
                }
              />
              <Route
                path="/portfolio-checkout"
                element={
                  <Layout>
                    <Suspense fallback={<Loader />}>
                      <Checkout />
                    </Suspense>
                  </Layout>
                }
              />

              <Route
                path="/searchProduct"
                element={
                  <Layout>
                    <Suspense fallback={<Loader />}>
                      <SearchProduct />
                    </Suspense>
                  </Layout>
                }
              />
              <Route
                path="/purchase-product/:vendorSlug/:productSlug"
                element={
                  <Layout dynamicHeader noFooter>
                    <Suspense fallback={<Loader />}>
                      <PurchaseProductPage />
                    </Suspense>
                  </Layout>
                }
              />

              <Route
                path="/privacyPolicy"
                element={
                  <Suspense fallback={<Loader />}>
                    <PrivacyPolicy />
                  </Suspense>
                }
              />

              {/* //? ================== All user protected routes will go here ================== */}
              <Route
                path="/"
                element={
                  <Suspense fallback={<Loader />}>
                    <UserOutlet />
                  </Suspense>
                }
              >
                <Route
                  path="user-dashboard/"
                  element={
                    <Layout noFooter={true}>
                      <Suspense fallback={<Loader />}>
                        <UserDashboard />
                      </Suspense>
                    </Layout>
                  }
                >
                  <Route
                    path="purchase-enquiries"
                    element={
                      <Suspense fallback={<Loader />}>
                        <Purchases />
                      </Suspense>
                    }
                  />
                  <Route path="profile" element={<Profile />} />
                </Route>
              </Route>
              {/* //? ================== All vendor routes will go here ================== */}
              <Route
                path="/vendor/"
                element={
                  <Suspense fallback={<Loader />}>
                    <VendorOutlet />
                  </Suspense>
                }
              >
                <Route
                  path="dashboard/"
                  element={
                    <Layout noFooter={true}>
                      <Suspense fallback={<Loader />}>
                        <Dashboard />
                      </Suspense>
                    </Layout>
                  }
                >
                  <Route
                    index
                    element={
                      <Suspense fallback={<Loader />}>
                        <MyDashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    index={true}
                    path="portfolio"
                    element={
                      <Suspense fallback={<Loader />}>
                        <DashboardPortfolio noPadding={true} />
                      </Suspense>
                    }
                  />
                  <Route
                    path="customerLeads"
                    element={
                      <Suspense fallback={<Loader />}>
                        <CustomerLeads />
                      </Suspense>
                    }
                  />
                  <Route
                    path="sale"
                    element={
                      // <Suspense fallback={<Loader />}>
                      <SalesEnquiries />
                      // </Suspense>
                    }
                  />
                  <Route
                    path="purchase"
                    element={
                      // <Suspense fallback={<Loader />}>
                      <Purchases />
                      // </Suspense>
                    }
                  />
                  <Route
                    path="consultation"
                    element={
                      <Suspense fallback={<Loader />}>
                        <Consultation />
                      </Suspense>
                    }
                  />
                  <Route path="profile" element={<Profile />} />
                </Route>
              </Route>

              {/* //? ================== All admin routes will go here ================== */}
              <Route
                path="/admin/"
                element={
                  <Suspense fallback={<Loader />}>
                    <AdminOutlet />
                  </Suspense>
                }
              >
                <Route
                  path="create/new"
                  element={
                    <Layout>
                      <Suspense fallback={<Loader />}>
                        <AddProduct />
                      </Suspense>
                    </Layout>
                  }
                />
                <Route
                  path="update/product/:product_id"
                  element={
                    <Layout>
                      <Suspense fallback={<Loader />}>
                        <UpdateProduct />
                      </Suspense>
                    </Layout>
                  }
                />
                <Route
                  path="products"
                  element={
                    <Layout noFooter={true}>
                      <Suspense fallback={<Loader />}>
                        <ProductList />
                      </Suspense>
                    </Layout>
                  }
                />
              </Route>

              <Route
                exact
                path="/editProjectMobile/:projectId"
                element={
                  <>
                    <Layout>
                      <Container maxWidth="xl">
                        <Suspense fallback={<Loader />}>
                          <EditProjectForMobile />
                        </Suspense>
                      </Container>
                    </Layout>
                  </>
                }
              />
              <Route
                exact
                path="/m.addProject"
                element={
                  <>
                    <Layout>
                      <Container maxWidth="xl">
                        <Suspense fallback={<Loader />}>
                          <AddProjectForMobile />
                        </Suspense>
                      </Container>
                    </Layout>
                  </>
                }
              />
              <Route
                path="/portfolio/:name"
                element={
                  <Layout profileHeader noFooter>
                    <Suspense fallback={<Loader />}>
                      <UserPortfolioProfile />
                    </Suspense>
                  </Layout>
                }
              />
              {/*  ============================== blogs ================================= */}
              <Route
                path="/blogs"
                element={
                  <Layout header={false}>
                    <Suspense fallback={<Loader />}>
                      <Blogs />
                    </Suspense>
                  </Layout>
                }
              />

              <Route
                path="/blogs/maintenance"
                element={
                  <Layout header={false}>
                    <Suspense fallback={<Loader />}>
                      <SolarMaintenance />
                    </Suspense>
                  </Layout>
                }
              />
              <Route
                path="/blogs/typesOfPvSystems"
                element={
                  <Layout header={false}>
                    <Suspense fallback={<Loader />}>
                      <PvSystems />
                    </Suspense>
                  </Layout>
                }
              />
              <Route
                path="/blogs/solarSteps"
                element={
                  <Layout header={false}>
                    <Suspense fallback={<Loader />}>
                      <SolarSteps />{" "}
                    </Suspense>
                  </Layout>
                }
              />
              <Route
                path="/blogs/solarInstallationProcess"
                element={
                  <Layout header={false}>
                    <Suspense fallback={<Loader />}>
                      <SolarInstallationProcess />{" "}
                    </Suspense>
                  </Layout>
                }
              />
              <Route
                path="/blogs/solarComponents"
                element={
                  <Layout header={false}>
                    <Suspense fallback={<Loader />}>
                      <SolarComponents />{" "}
                    </Suspense>
                  </Layout>
                }
              />
              <Route
                path="/blogs/solarDesign"
                element={
                  <Layout header={false}>
                    <Suspense fallback={<Loader />}>
                      <SolarDesign />{" "}
                    </Suspense>
                  </Layout>
                }
              />
              <Route
                path="/blogs/solarProducts"
                element={
                  <Layout header={false}>
                    <Suspense fallback={<Loader />}>
                      <SolarProducts />
                    </Suspense>
                  </Layout>
                }
              />

              <Route
                path="/blogs/kWatt-solar-courses"
                element={
                  <Layout header={false}>
                    <Suspense fallback={<Loader />}>
                      <KwattCourses />
                    </Suspense>
                  </Layout>
                }
              />
              <Route
                path="/blogs/netMetering"
                element={
                  <Layout header={false}>
                    <Suspense fallback={<Loader />}>
                      <NetMetering />
                    </Suspense>
                  </Layout>
                }
              />

              {/* net metering policy, state wise */}

              <Route
                path="/blogs/netMetering/maharashtra"
                element={
                  <Layout header={false}>
                    <Suspense fallback={<Loader />}>
                      <Maharashtra />
                    </Suspense>
                  </Layout>
                }
              />
              <Route
                path="/blogs/netMetering/dilhi"
                element={
                  <Layout header={false}>
                    <Suspense fallback={<Loader />}>
                      <Dilhi />
                    </Suspense>
                  </Layout>
                }
              />
              <Route
                path="/blogs/netMetering/gujrat"
                element={
                  <Layout header={false}>
                    <Suspense fallback={<Loader />}>
                      <Gujrat />
                    </Suspense>
                  </Layout>
                }
              />
              <Route
                path="/blogs/netMetering/haryana"
                element={
                  <Layout header={false}>
                    <Suspense fallback={<Loader />}>
                      <Haryana />
                    </Suspense>
                  </Layout>
                }
              />
              <Route
                path="/blogs/net-metering/karnataka"
                element={
                  <Layout header={false}>
                    <Suspense fallback={<Loader />}>
                      <Karnataka />
                    </Suspense>
                  </Layout>
                }
              />
              <Route
                path="/blogs/net-metering/punjab"
                element={
                  <Layout header={false}>
                    <Suspense fallback={<Loader />}>
                      <Punjab />
                    </Suspense>
                  </Layout>
                }
              />

              <Route
                path="/blogs/net-metering/west-bengal"
                element={
                  <Layout header={false}>
                    <Suspense fallback={<Loader />}>
                      <WestBengal />
                    </Suspense>
                  </Layout>
                }
              />

              {/*  product booking  */}
              <Route path="/product-booking" element={<ProductBooking />} />
              <Route
                path="/products/:productSlug"
                element={
                  <Layout noFooter>
                    <Suspense fallback={<Loader />}>
                      <EnquiryPage />
                    </Suspense>
                  </Layout>
                }
              />

              <Route
                path="/order-status"
                element={
                  <Layout noFooter={true}>
                    <OrderStatus />
                  </Layout>
                }
              />

              <Route
                path="/portfolio/order-status"
                element={
                  <Layout profileHeader noFooter={true}>
                    <OrderStatusFromProfile />
                  </Layout>
                }
              />
              <Route path="/fallback" element={<Fallback />} />

              <Route path="/net" element={<NetworkFallback />} />

              <Route path="/pdp" element={<PurchaseDetailsPage />} />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
            <Toast />
            <LoginModal>
              <AuthGuard />
            </LoginModal>
          </div>
          <SnackbarAlert />
          <SnackbarAlert2 />
        </ErrorBoundary>
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
        dispatch(removeCart());
      }
      return Promise.reject(error);
    }
  }
);
