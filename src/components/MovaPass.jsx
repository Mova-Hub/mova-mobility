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

        <div className="mova-content-wrapper">
          
          {/* Mockup (Gauche) - Fond dynamique utilisant votre couleur primaire */}
          <div className="text-center mova-mockup-container">
            <div className="mova-mockup-backdrop"></div>
            <img 
              src="/assets/images/mova-app-mockup.png" 
              alt="Interface de l'application Mova Mobility" 
              className="img-fluid mova-mockup-img" 
            />
          </div>

          {/* Contenu & Fonctionnalités (Droite) */}
          <div className="mova-features-container">
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
              <a href="#" className="mova-btn-store">
                <i className="bi bi-apple fs-4"></i>
                <div className="text-start lh-1">
                  <small className="mb-1 d-block">Télécharger dans l'</small>
                  <span className="fw-bold fs-6">App Store</span>
                </div>
              </a>
              
              <a href="#" className="mova-btn-store">
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

    </section>
  );
}

export default MovaPass;