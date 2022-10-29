import { useEffect } from 'react';

const useOutsideClick = (ref1, ref2, callback) => {
   useEffect(() => {
      // * Alert if clicked on outside of element

      function handleClickOutside(event) {
         if (
            ref1.current &&
            !ref1.current.contains(event.target) &&
            !ref2.current.contains(event.target)
         ) {
            callback();
         }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         // Unbind the event listener on clean up
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [ref1, ref2, callback]);
};

export default useOutsideClick;

