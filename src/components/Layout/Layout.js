import { useSelector } from "react-redux";
import ContactUs from "../ContactUs/ContactUs";
import Footer from "../Footer/Footer";
import MainHeader from "../MainHeader/MainHeader";
import ProfileHeader from "../ProfileHeader/ProfileHeader";

const Layout = ({
  children,
  noFooter,
  dynamicHeader,
  profileHeader,
  contactUs,
}) => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      {dynamicHeader ? user ? <MainHeader /> : <ProfileHeader /> : null}
      {profileHeader && <ProfileHeader />}
      {!dynamicHeader && !profileHeader && <MainHeader />}
      {children}
      {contactUs && <ContactUs />}
      {!noFooter && <Footer />}
    </>
  );
};

export default Layout;
