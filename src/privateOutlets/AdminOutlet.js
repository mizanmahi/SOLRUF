import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminOutlet = () => {
   const { user, role } = useAuth();

   if (user && role === 'Administrator') return <Outlet />;
   return <Navigate to='/' />;
};

export default AdminOutlet;