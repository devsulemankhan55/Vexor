import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useShopContext } from '../../context/ShopContext';

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  const { setIsLoading } = useShopContext();
  
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [pathname, setIsLoading]);

  return null;
};
