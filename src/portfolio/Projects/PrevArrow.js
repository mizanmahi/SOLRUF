import nextArrowCss from './prevArrow.module.css';

function PrevArrow(props) {
   const {
      className,
      style,
      onClick,
      projectDetailsModal,
      productDetailModal,
   } = props;

   if (productDetailModal) {
      return (
         <div
            className={`${className} ${nextArrowCss.slickNext}`}
            style={{
               ...style,
               display: 'block',
               background: 'gray',
               marginLeft: `0`,
            }}
            onClick={onClick}
         ></div>
      );
   }

   return (
      <div
         className={`${className} ${nextArrowCss.slickNext}`}
         style={{
            ...style,
            display: 'block',
            background: 'gray',
            marginLeft: `${projectDetailsModal ? '.5rem' : '2rem'}`,
         }}
         onClick={onClick}
      ></div>
   );
}

export default PrevArrow;
