import React, { useState, useEffect } from 'react';
import ReservationModal from './ReservationModal';

function Navbar({setShowModal}) {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const toggleOffcanvas = () => setIsOffcanvasOpen(!isOffcanvasOpen);

  useEffect(() => {
    // Initialize AOS for animations
    window.AOS.init({ once: true });
  }, []);

  return (
    <>
      <header className="fbs__net-navbar navbar navbar-expand-lg dark" style={{ zIndex: 200 }} aria-label="freebootstrap.net navbar">
        <div className="container d-flex align-items-center justify-content-between">
          <a className="navbar-brand w-auto" href="#home">
            <img className="logo dark img-fluid" src="/assets/images/logo/logo.png" style={{ height: '45px' }} alt="Mova Logo" />
            <img className="logo light img-fluid" src="/assets/images/logo/logo.png" style={{ height: '45px' }} alt="Mova Logo" />
          </a>
          <div className={`offcanvas offcanvas-start w-75 ${isOffcanvasOpen ? 'show' : ''}`} id="fbs__net-navbars" tabIndex="-1" aria-labelledby="fbs__net-navbarsLabel">
            <div className="offcanvas-header">
              <div className="offcanvas-header-logo">
                <a className="logo-link" id="fbs__net-navbarsLabel" href="#home">
                  <img className="logo dark img-fluid" src="/assets/images/logo/logo.png" style={{ height: '45px' }} alt="Mova Logo" />
                  <img className="logo light img-fluid" src="/assets/images/logo/logo.png" style={{ height: '45px' }} alt="Mova Logo" />
                </a>
              </div>
              <button className="btn-close btn-close-black" type="button" onClick={toggleOffcanvas} aria-label="Close"></button>
            </div>
            <div className="offcanvas-body align-items-lg-center">
              <ul className="navbar-nav nav me-auto ps-lg-5 mb-2 mb-lg-0">
                <li className="nav-item"><a className="nav-link scroll-link active" aria-current="page" href="#about">Qui sommes nous?</a></li>
                <li className="nav-item"><a className="nav-link scroll-link" href="#busAccess">BusAccess</a></li>
                <li className="nav-item"><a className="nav-link scroll-link" href="#movapass">Mova Pass</a></li>
                <li className="nav-item"><a className="nav-link scroll-link" href="#terrain-impact">Terrain & Impact</a></li>
                <li className="nav-item"><a className="nav-link scroll-link" href="#contact">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="ms-auto w-auto">
            <div className="header-social d-flex align-items-center gap-1">
              <button className="btn btn-primary py-2 rounded-5" onClick={() => setShowModal(true)}>Je réserve mon bus</button>
              <button className="fbs__net-navbar-toggler justify-content-center align-items-center ms-auto" onClick={toggleOffcanvas} aria-label="Toggle navigation">
                <svg className="fbs__net-icon-menu" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="21" x2="3" y1="6" y2="6"></line>
                  <line x1="15" x2="3" y1="12" y2="12"></line>
                  <line x1="17" x2="3" y1="18" y2="18"></line>
                </svg>
                <svg className="fbs__net-icon-close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;