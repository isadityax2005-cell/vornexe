import React from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/layout/HeroSection';
import SizeGuideSection from '../components/layout/SizeGuideSection';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SizeGuideSection />
      </main>
    </>
  );
};

export default Home;
