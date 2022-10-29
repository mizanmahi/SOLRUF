import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, ...rest }) => {
   const location = useLocation();

   const { user } = useSelector((state) => state.user);
   // console.log(location);

   // if (!user) {
   //    dispatch(openLoginModal());
   // }

   if (user) return children;
   return <Navigate to='/' state={{ from: location }} />;
};

export default ProtectedRoute;
