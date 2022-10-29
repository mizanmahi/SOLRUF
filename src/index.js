import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import AOS from 'aos';
import 'react-toastify/dist/ReactToastify.css';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@zendeskgarden/react-theming';

let persistor = persistStore(store);

AOS.init();

ReactDOM.render(
   <>
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
               <App />
            </ThemeProvider>
         </PersistGate>
      </Provider>
   </>,
   document.getElementById('root')
);
