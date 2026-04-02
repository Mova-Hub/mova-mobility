import React from 'react';

function MovaPass() {
  return (
    <section className="bg-white mova-pass-section" id="movapass">
      <div className="container">
        
        {/* En-tête */}
        <div className="mb-5 text-center row justify-content-center pb-lg-4">
          <div className="col-lg-7">
            <div className="gap-2 mb-3 d-flex align-items-center justify-content-center" data-aos="fade-up">
              <span className="px-3 py-1 rounded-pill fw-bold text-uppercase" style={{ backgroundColor: '#00592115', color: '#005921', fontSize: '0.75rem', letterSpacing: '1px' }}>
                L'Application Mova Pass
              </span>
            </div>
            <h2 className="mb-4 display-7 fw-semibold text-dark" data-aos="fade-up" data-aos-delay="100">
              Une mobilité <span style={{ color: '#005921' }}>sans friction</span>.
            </h2>
            <p className="mx-auto text-black fs-5" data-aos="fade-up" data-aos-delay="200" style={{ maxWidth: '600px' }}>
              Une seule interface pour réserver, suivre vos trajets et maîtriser votre budget avec nos forfaits intelligents.
            </p>
          </div>
        </div>


        <div className="row align-items-center g-5">
          
          
          {/* CREATIVE MOCKUP SIDE (Left) */}
          <div className="order-2 col-lg-6 order-lg-1" data-aos="fade-right">
            <div className="mova-screens-perspective">
              {/* Decorative Backdrop Glow */}
              <div className="mova-perspective-glow"></div>
              
              {/* Screen 1: Back Left */}
              <div className="shadow-lg mova-screen-item back-left">
                <img src="/assets/images/screens/booking.JPG" alt="Mova Map View" />
              </div>

              {/* Screen 2: Back Right */}
              <div className="shadow-lg mova-screen-item back-right">
                <img src="/assets/images/screens/trajets.JPG" alt="Mova Payment" />
              </div>

              {/* Screen 3: Main Front Center */}
              <div className="shadow-2xl mova-screen-item main-front">
                <img src="/assets/images/screens/home.JPG" alt="Mova Home" />
              </div>
            </div>
          </div>

          {/* Contenu & Fonctionnalités (Droite) */}
          <div className="order-1 mova-features-container">
            <h3 className="mb-5 fw-semibold text-dark">Tout ce dont vous avez besoin, dans votre poche.</h3>
            
            <div className="mova-features-grid">
              
              <div className="mova-feature-item">
                <i className="bi bi-calendar2-check mova-icon"></i>
                <div>
                  <h5 className="mb-1 fw-semibold text-dark">Pass Mensuels</h5>
                  <p className="mb-0 text-black">Trajets prédéfinis pour un budget maîtrisé.</p>
                </div>
              </div>

              <div className="mova-feature-item">
                <i className="bi bi-clock-history mova-icon"></i>
                <div>
                  <h5 className="mb-1 fw-semibold text-dark">Priorité à bord</h5>
                  <p className="mb-0 text-black">Confirmation rapide et accès prioritaire.</p>
                </div>
              </div>

              <div className="mova-feature-item">
                <i className="bi bi-geo-alt mova-icon"></i>
                <div>
                  <h5 className="mb-1 fw-semibold text-dark">Suivi en direct</h5>
                  <p className="mb-0 text-black">Localisez votre transport instantanément.</p>
                </div>
              </div>

              <div className="mova-feature-item">
                <i className="bi bi-credit-card mova-icon"></i>
                <div>
                  <h5 className="mb-1 fw-semibold text-dark">Paiement sécurisé</h5>
                  <p className="mb-0 text-black">Gérez vos abonnements directement via l'app.</p>
                </div>
              </div>

            </div>

            {/* Boutons de téléchargement */}
            <div className="mova-store-buttons">
              <a href="https://apps.apple.com/app/id1591234567" target="_blank" rel="noopener noreferrer" className="mova-btn-store">
                <i className="bi bi-apple fs-4"></i>
                <div className="text-start lh-1">
                  <small className="mb-1 d-block">Télécharger dans l'</small>
                  <span className="fw-bold fs-6">App Store</span>
                </div>
              </a>
              
              <a href="https://play.google.com/store/apps/details?id=com.busaccess.client" target="_blank" className="mova-btn-store">
                <i className="bi bi-google-play fs-4"></i>
                <div className="text-start lh-1">
                  <small className="mb-1 d-block">Disponible sur</small>
                  <span className="fw-bold fs-6">Google Play</span>
                </div>
              </a>
            </div>

          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .fw-black { font-weight: 900; }
        
        /* Perspective Container */
        .mova-screens-perspective {
          position: relative;
          height: 550px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1500px;
        }

        .mova-perspective-glow {
          position: absolute;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(0, 89, 33, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 0;
        }

        .mova-screen-item {
          position: absolute;
          width: 240px;
          border-radius: 32px; /* Individually rounded */
          overflow: hidden;
          background: #000;
          border: 6px solid #1a1a1a;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mova-screen-item img {
          width: 100%;
          display: block;
        }

        /* Initial Positions */
        .back-left {
          transform: translateX(-100px) rotateY(25deg) scale(0.85);
          z-index: 1;
          opacity: 0.6;
        }

        .back-right {
          transform: translateX(100px) rotateY(-25deg) scale(0.85);
          z-index: 1;
          opacity: 0.6;
        }

        .main-front {
          z-index: 3;
          transform: translateZ(50px);
          box-shadow: 0 40px 80px -20px rgba(0,0,0,0.3) !important;
        }

        /* Interaction: Spread on Hover */
        .mova-screens-perspective:hover .back-left {
          transform: translateX(-180px) rotateY(15deg) scale(0.9);
          opacity: 1;
        }

        .mova-screens-perspective:hover .back-right {
          transform: translateX(180px) rotateY(-15deg) scale(0.9);
          opacity: 1;
        }

        .mova-screens-perspective:hover .main-front {
          transform: translateZ(100px) scale(1.05);
        }

        /* UI Elements */
        .mova-icon-box {
          width: 44px; height: 44px;
          background: #f0fdf4;
          color: #005921;
          display: flex; align-items: center; justify-content: center;
          border-radius: 12px;
          font-size: 1.25rem;
        }

        .mova-feature-card:hover {
          background: #f9fafb;
          transform: translateY(-5px);
        }

        .hover-scale:hover {
          transform: scale(1.05);
          background: #000 !important;
        }

        @media (max-width: 991px) {
          .mova-screens-perspective { height: 400px; transform: scale(0.8); }
          .mova-screen-item { width: 180px; }
        }
      `}} />

    </section>
  );
}

export default MovaPass;