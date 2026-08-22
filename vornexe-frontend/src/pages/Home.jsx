import React from 'react';
import Header from '../components/layout/Header';
import SEO from '../components/common/SEO';
import HeroSection from '../components/layout/HeroSection';
import FeaturedProducts from '../components/layout/FeaturedProducts';
import CollabSection from '../components/layout/CollabSection';
import Footer from '../components/layout/Footer';

const Home = () => {
  return (
    <>
      <SEO />
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CollabSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;
