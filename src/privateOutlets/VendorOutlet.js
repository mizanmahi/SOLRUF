import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const VendorOutlet = () => {
   const { user, role } = useAuth();

   if (user && role === 'Vendor') return <Outlet />;
   return <Navigate to='/' />;
};

export default VendorOutlet;
