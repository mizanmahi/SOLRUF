import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const UserOutlet = () => {
   const { user } = useAuth();

   if (user) return <Outlet />;
   return <Navigate to='/' />;
};

export default UserOutlet;