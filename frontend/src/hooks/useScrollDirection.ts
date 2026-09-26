import { useEffect, useState } from 'react';

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';

      if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > 10) {
        setScrollDirection(direction);
      }

      setLastScrollY(scrollY);
    };

    const throttledUpdateScrollDirection = () => {
      requestAnimationFrame(updateScrollDirection);
    };

    window.addEventListener('scroll', throttledUpdateScrollDirection);

    return () => {
      window.removeEventListener('scroll', throttledUpdateScrollDirection);
    };
  }, [scrollDirection, lastScrollY]);

  return scrollDirection;
};