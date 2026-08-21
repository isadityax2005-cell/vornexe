import React from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/layout/HeroSection';
import SizeGuideSection from '../components/layout/SizeGuideSection';
import CollabSection from '../components/layout/CollabSection';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SizeGuideSection />
        <CollabSection />
      </main>
    </>
  );
};

export default Home;
