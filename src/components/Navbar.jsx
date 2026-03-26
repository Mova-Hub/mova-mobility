import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ setShowModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Détection du scroll avec un seuil très court pour réactivité immédiate
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Mova Pass', path: '/movapass' },
    { name: 'Carrières', path: '/carrieres' },
    { name: 'Notre Vision', path: '/a-propos' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-[40] transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'py-2' 
            : 'py-2' 
        }`}
      >
        <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className={`relative flex items-center justify-between transition-all duration-500 rounded-2xl ${
            isScrolled 
              ? 'bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 px-6 py-3' 
              : 'bg-transparent px-2 py-2'
          }`}>
            
            {/* LOGO */}
            <div className="flex items-center flex-shrink-0">
              <Link 
                to="/" 
                className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--bs-primary,#0d6efd)] rounded-lg !no-underline"
                style={{ textDecoration: 'none' }}
              >
                <img 
                  className="object-contain w-auto transition-transform duration-300 h-9 sm:h-10 hover:opacity-80" 
                  src="/assets/images/logo/logo.png" 
                  alt="Mova Mobility" 
                />
              </Link>
            </div>

            {/* NAVIGATION DESKTOP */}
            <nav className="items-center justify-center flex-1 hidden mx-8 space-x-1 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative px-4 py-2 text-sm font-semibold !no-underline transition-all duration-300 rounded-xl group"
                  style={{ textDecoration: 'none' }}
                >
                  <span className={`relative z-10 transition-colors duration-200 ${
                    isActive(link.path) ? 'text-[var(--bs-primary,#0d6efd)]' : 'text-gray-500 group-hover:text-gray-900'
                  }`}>
                    {link.name}
                  </span>
                  
                  {/* Effet de survol (Pill background) */}
                  <span className={`absolute inset-0 bg-gray-50 rounded-xl scale-90 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 ${
                    isActive(link.path) ? 'scale-100 opacity-100 bg-gray-50/80' : ''
                  }`}></span>
                </Link>
              ))}
            </nav>

            {/* CALL TO ACTION DESKTOP */}
            <div className="items-center hidden space-x-4 lg:flex shrink-0">
              <Link 
                to="/contact" 
                className="px-2 text-sm font-semibold text-gray-500 !no-underline transition-colors hover:text-gray-900"
                style={{ textDecoration: 'none' }}
              >
                Contact
              </Link>
              <button 
                onClick={() => setShowModal(true)}
                className="bg-[var(--bs-primary,#0d6efd)] text-white hover:brightness-110 px-6 py-2.5 !rounded-full text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 group border-none"
                style={{ borderRadius: '9999px' }}
              >
                Réserver mon bus 
                <i className="transition-transform duration-300 bi bi-arrow-right group-hover:translate-x-1"></i>
              </button>
            </div>

            {/* BOUTON MENU MOBILE */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -mr-2 text-gray-900 transition-colors rounded-lg hover:bg-gray-50 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <i className="text-2xl bi bi-x-lg"></i>
                ) : (
                  <div className="space-y-1.5">
                    <span className="block w-6 h-0.5 bg-gray-900 rounded-full"></span>
                    <span className="block w-5 h-0.5 bg-gray-900 rounded-full ml-auto"></span>
                  </div>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* OVERLAY MOBILE */}
      <div 
        className={`fixed inset-0 z-[50] bg-gray-900/40 backdrop-blur-sm transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      ></div>

      {/* TIROIR MOBILE */}
      <div 
        className={`fixed top-4 right-4 bottom-4 w-[calc(100%-2rem)] max-w-sm bg-white rounded-3xl z-[60] transform transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) lg:hidden flex flex-col shadow-2xl overflow-hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-[120%]'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-50">
          <img className="w-auto h-8" src="/assets/images/logo/logo.png" alt="Mova" />
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-gray-100 border-none rounded-full hover:text-gray-900 hover:bg-gray-200"
          >
            <i className="text-sm bi bi-x-lg"></i>
          </button>
        </div>

        <div className="flex-1 px-6 py-8 overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-4 rounded-2xl text-lg font-bold transition-all flex items-center justify-between !no-underline ${
                  isActive(link.path)
                    ? 'bg-[var(--bs-primary,#0d6efd)]/10 text-[var(--bs-primary,#0d6efd)]'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
                style={{ textDecoration: 'none' }}
              >
                {link.name}
                {isActive(link.path) && <i className="text-sm bi bi-chevron-right"></i>}
              </Link>
            ))}
            <Link
              to="/contact"
              className="px-4 py-4 text-lg font-bold text-gray-900 !no-underline transition-all rounded-2xl hover:bg-gray-50"
              style={{ textDecoration: 'none' }}
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="p-6 bg-gray-50/50">
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              setShowModal(true);
            }}
            className="w-full bg-[var(--bs-primary,#0d6efd)] text-white px-5 py-4 !rounded-full text-base font-bold transition-all hover:brightness-110 flex justify-center items-center gap-2 shadow-md border-none"
            style={{ borderRadius: '9999px' }}
          >
            Réserver mon bus <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;