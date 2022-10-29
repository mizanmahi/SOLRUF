import { Drawer } from 'antd';
import './customBottomDrawer.css';
import CloseIcon from '@mui/icons-material/Close';

const CustomBottomDrawer = ({onClose, visible,title,children}) => {
   
   return (
      <>
         <Drawer
            title={title}
            placement='bottom'
            onClose={onClose}
            visible={visible}
            closeIcon={<CloseIcon />}
            closable={true}
            contentWrapperStyle={{
               '& .ant-drawer-content': {
                  borderRadius: '15px',
               },
            }}
         >
            {children}
         </Drawer>
      </>
   );
};

export default CustomBottomDrawer;
