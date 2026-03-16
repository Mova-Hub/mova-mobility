import React from 'react';
import { useState } from 'react'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import BusAccess from './components/BusAccess';
import HowItWorks from './components/HowItWorks';
import MovaPass from './components/MovaPass';
import TerrainImpact from './components/TerrainImpact';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';

function App() {
  const [count, setCount] = useState(0)
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="site-wrap" style={{ overflowX: 'hidden' }}>
      <Navbar setShowModal={setShowModal} />
      <main>
        <Hero />
        <About />
        <Features />
        <BusAccess />
        <HowItWorks />
        <MovaPass />
        <TerrainImpact />
        <FAQ />
        <Contact />
        <Footer />
      </main>
      <ReservationModal show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  )
}

export default App
