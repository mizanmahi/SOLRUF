import React from 'react';
import Header from '../../webui/header/header';
import SecondaryHeader from '../SecondaryHeader/SecondaryHeader';

const Layout = ({ children, header = true, header2 }) => {
   return (
      <>
         {header && <Header />}
         {header2 && <SecondaryHeader />}
         {children}
      </>
   );
};

export default Layout;
