import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Features from '../components/Features';
import BusAccess from '../components/BusAccess';
import HowItWorks from '../components/HowItWorks';
import AppShowcase from '../components/AppShowcase';
import TerrainImpact from '../components/TerrainImpact';
import HomeJobSection from '../components/HomeJobSection';
import About from '../components/About';
import Testimonials from '../components/Testimonials';

function Home() {
  return (
    <>
      <SEO 
        title="Transport et Mobilité Urbaine" 
        description="Découvrez Mova, l'application qui révolutionne vos trajets en ville. Bus, itinéraires, et Mova Pass."
      />
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <Testimonials />
      {/* <BusAccess /> */}
      <AppShowcase />
      <TerrainImpact />
      <HomeJobSection />
    </>
  );
}

export default Home;