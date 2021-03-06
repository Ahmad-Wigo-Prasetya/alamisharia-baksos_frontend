/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
import { useEffect } from 'react';

function useOuterClickNotifier(onOuterClick, innerRef) {
  useEffect(
    () => {
      // only add listener, if the element exists
      if (innerRef.current) {
        document.addEventListener('click', handleClick);
      }

      // unmount previous first in case inputs have changed
      return () => document.removeEventListener('click', handleClick);

      function handleClick(e) {
        innerRef.current && !innerRef.current.contains(e.target) && onOuterClick(e);
      }
    },
    [onOuterClick, innerRef], // invoke again, if inputs have changed
  );
}

export default useOuterClickNotifier;
