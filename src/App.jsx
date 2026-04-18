import React, { useState, useEffect } from 'react'; // Add useEffect
import { Routes, Route, useLocation } from 'react-router-dom'; // Add useLocation
import { Helmet } from 'react-helmet-async';
import AOS from 'aos'; // Import the AOS library

// Composants globaux
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';

// Pages
import Home from './pages/Home';
import Careers from './pages/Careers';
import SEO from './components/SEO';
import Contact from './pages/Contact';
import About from './pages/About';
import Privacy from './pages/Privacy';

function App() {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation(); // Allows us to track route changes

  // Initialize AOS once when the app starts
  useEffect(() => {
    AOS.init({
      duration: 800, // Durée par défaut de l'animation en ms
      easing: 'ease-in-out',
      once: true, // L'animation ne se joue qu'une seule fois en descendant
      offset: 50, // Décale le point de déclenchement (en px)
    });
  }, []);

  // Tell AOS to refresh whenever the URL changes
  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen site-wrap" style={{ overflowX: 'hidden' }}>{/* Valeurs par défaut pour tout le site */}
      <SEO
        title="Accueil"
        description="Móva Mobility, c’est la liberté de se déplacer autrement. Réservez un bus pour vos événements ou trajets quotidiens."
      />

      <Navbar setShowModal={setShowModal} />
      
      {/* Le contenu principal (qui change selon l'URL) prend l'espace restant */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrieres" element={<Careers />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          {/* <Route path="/a-propos" element={<AboutPage />} /> */}
          
          {/* Route 404 (Page non trouvée) */}
          <Route path="*" element={<div className="py-32 text-2xl font-bold text-center">Page introuvable</div>} />
        </Routes>
      </main>

      <Footer />
      <ReservationModal show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
}

export default App;