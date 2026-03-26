import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Features from '../components/Features';
import BusAccess from '../components/BusAccess';
import HowItWorks from '../components/HowItWorks';
import MovaPass from '../components/MovaPass';
import TerrainImpact from '../components/TerrainImpact';
import HomeJobSection from '../components/HomeJobSection';

function Home() {
  return (
    <>
      <SEO 
        title="Parce que se déplacer, c'est exister" 
        description="Découvrez Mova, l'application qui révolutionne vos trajets en ville. Bus, itinéraires, et Mova Pass."
      />
      <Hero />
      <Features />
      <HowItWorks />
      <BusAccess />
      <MovaPass />
      <TerrainImpact />
      <HomeJobSection />
    </>
  );
}

export default Home;