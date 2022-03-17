import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children, ...rest }) => {
   const location = useLocation();

   const { user, role } = useSelector((state) => state.user);

//    console.log(user.user.role);

   // if (!user) {
   //    dispatch(openLoginModal());
   // }

   console.log(role);

   if (user && user.user.role === 'Vendor') return children;
   return <Navigate to='/' state={{ from: location }} />;
};

export default AdminRoute;