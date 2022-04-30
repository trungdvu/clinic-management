import { useEffect } from 'react';

export function useClickOutside(ref: any, cb: Function) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      const className = event.toElement?.className;

      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !className?.contains('ant-select-item-option')
      ) {
        cb();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cb, ref]);
}
