import React from 'react';
import Header from '../components/layout/Header';
import SizeGuideSection from '../components/layout/SizeGuideSection';

const SizeGuide = () => {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#000' }}>
        <SizeGuideSection />
      </main>
    </>
  );
};

export default SizeGuide;
