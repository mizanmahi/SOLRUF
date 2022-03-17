import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const VendorRoute = ({ children, ...rest }) => {
   const location = useLocation();

   const { user, role } = useSelector((state) => state.user);
   console.log(location);
   console.log(role);

   // if (!user) {
   //    dispatch(openLoginModal());
   // }
   if (user && role === 'Vendor') return children;
   return <Navigate to='/' state={{ from: location }} />;
};

export default VendorRoute;
