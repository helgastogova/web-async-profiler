import React, { useEffect } from 'react';

export function useClickOutside<T extends HTMLElement>(
  refs: React.MutableRefObject<T | null>[],
  callback: (event: MouseEvent) => void,
): void {
  const handleClick = (e: MouseEvent): void => {
    if (!refs.some((ref) => ref.current && ref.current.contains(e.target as Node))) {
      return callback(e);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  });
}
