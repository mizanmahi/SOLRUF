import React from 'react';

import LoaderImage from '../../media/Loader.svg';
import classes from './loader.module.css';

const Loader = () => {
   return (
      <div className={classes.loader_wrapper}>
         <img src={LoaderImage} alt='spinner' />
      </div>
   );
};

export default Loader;
