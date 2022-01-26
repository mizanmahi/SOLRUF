import { Box } from '@mui/system';
import nextArrowCss from './nextArrow.module.css';

function SampleNextArrow(props) {
   const {
      className,
      style,
      onClick,
      projectDetailsModal,
      productDetailModal,
   } = props;

   console.log({productDetailModal});


   if (productDetailModal) {
      return (
         <Box
            className={`${className} ${nextArrowCss.slickNext}`}
            style={{
               ...style,
               display: 'block',
               background: 'red',
               marginRight: '0',
            }}
            onClick={onClick}
         ></Box>
      );
   }

   return (
      <Box
         className={`${className} ${nextArrowCss.slickNext}`}
         style={{
            ...style,
            display: 'block',
            background: 'gray',
            marginRight: `${projectDetailsModal ? '1.2rem' : '2rem'}`,
         }}
         onClick={onClick}
      ></Box>
   );
}

export default SampleNextArrow;
