import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { openLoginModal } from '../../redux/slices/loginModalSlice';

const ProtectedRoute = ({ children, ...rest }) => {
   const location = useLocation();
   const dispatch = useDispatch();
   // const navigate = useNavigate();

   const { user } = useSelector((state) => state.user);
   console.log(location);

   // if (!user) {
   //    dispatch(openLoginModal());
   // }
   if (user) return children;
   return <Navigate to='/' state={{ from: location }} />;
};

export default ProtectedRoute;
