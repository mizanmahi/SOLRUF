import React from 'react';
import Header from '../../webui/header/header';
import SecondaryHeader from '../SecondaryHeader/SecondaryHeader';
import Footer from '../Footer/Footer';
import MainHeader from '../MainHeader/MainHeader';

const Layout = ({ children, header = true, header2 }) => {
   return (
      <>
         {/* {header && <Header />} */}
         {header2 && <SecondaryHeader />}
         {<MainHeader />}
         {children}
         {<Footer />}
      </>
   );
};

export default Layout;
