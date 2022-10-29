import { useSelector } from 'react-redux';

const useAuth = () => {
   const { role, user } = useSelector((state) => state.user);

   return {
      role,
      user,
      token: user?.token,
      userFirstName: user?.user.first_name,
      userLastName: user?.user.last_name,
      userEmail: user?.user.email,
      mobile: user?.user.mobile,
      profileImage: user?.user.profile_image,
   };
};

export default useAuth;
