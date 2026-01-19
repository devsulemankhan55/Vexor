import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { LoadingScreen } from '../components/ui/LoadingScreen';
import { ScrollToTop } from '../components/ui/ScrollToTop';
import { useShopContext } from '../context/ShopContext';

export const MainLayout: React.FC = () => {
  const { isLoading } = useShopContext();

  return (
    <>
      <ScrollToTop />
      {isLoading && <LoadingScreen />}
      <Header />
      <main className="min-h-screen pt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
