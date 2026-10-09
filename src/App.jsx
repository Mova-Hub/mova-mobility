import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Add useLocation
import { Helmet } from 'react-helmet-async';
import AOS from 'aos'; // Import the AOS library

// Composants globaux
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Careers from './pages/Careers';
import SEO from './components/SEO';
import Contact from './pages/Contact';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import MovaPassPage from './pages/MovaPassPage';
import JobDetail from './pages/JobDetail';
import NewsletterAction from './pages/NewsletterAction';

function App() {
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
    <div className="flex flex-col min-h-screen site-wrap" style={{ overflowX: 'clip' }}>
      {/*
        overflow-x: clip, not hidden. Hidden turns this wrapper into a scroll
        container, and every position: sticky inside it (the /movapass sub-nav,
        its pinned phone) then sticks to a box that never scrolls, i.e. not at all.
      */}
      <SEO
        title="Accueil"
        description="Móva Mobility, c’est la liberté de se déplacer autrement. Réservez un bus pour vos événements ou trajets quotidiens."
      />

      <Navbar />
      
      {/* Le contenu principal (qui change selon l'URL) prend l'espace restant */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movapass" element={<MovaPassPage />} />
          <Route path="/carrieres" element={<Careers />} />
          <Route path="/carrieres/:id" element={<JobDetail />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/conditions" element={<Terms />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/newsletter/confirmation" element={<NewsletterAction mode="confirm" />} />
          <Route path="/newsletter/desinscription" element={<NewsletterAction mode="unsubscribe" />} />
          {/* <Route path="/a-propos" element={<AboutPage />} /> */}
          
          {/* Route 404 (Page non trouvée) */}
          <Route path="*" element={<div className="py-32 text-2xl font-bold text-center">Page introuvable</div>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;