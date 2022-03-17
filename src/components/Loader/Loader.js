import React from 'react';

import LoaderImage from '../../media/Loader.svg';
import classes from './loader.module.css';

const Loader = ({styles}) => {
   return (
      <div className={classes.loader_wrapper}  style={{...styles}} > 
         <img src={LoaderImage} alt='spinner'/>
      </div>
   );
};

export default Loader;
