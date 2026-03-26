import React from 'react';

function MovaPass() {
  return (
    <section className="mova-pass-section bg-white" id="movapass">
      <div className="container">
        
        {/* En-tête */}
        <div className="row justify-content-center text-center mova-header">
          <div className="col-lg-8">
            <h2 className="fw-semibold text-dark mova-title">
              Une mobilité sans friction.
            </h2>
            <p className="text-black mova-subtitle mx-auto">
              Découvrez Mova Pass. Une seule application pour réserver, suivre vos trajets en temps réel et maîtriser votre budget avec nos forfaits mensuels.
            </p>
          </div>
        </div>

        <div className="mova-content-wrapper">
          
          {/* Mockup (Gauche) - Fond dynamique utilisant votre couleur primaire */}
          <div className="mova-mockup-container text-center">
            <div className="mova-mockup-backdrop"></div>
            <img 
              src="/assets/images/mova-app-mockup.png" 
              alt="Interface de l'application Mova Mobility" 
              className="img-fluid mova-mockup-img" 
            />
          </div>

          {/* Contenu & Fonctionnalités (Droite) */}
          <div className="mova-features-container">
            <h3 className="fw-semibold text-dark mb-5">Tout ce dont vous avez besoin, dans votre poche.</h3>
            
            <div className="mova-features-grid">
              
              <div className="mova-feature-item">
                <i className="bi bi-calendar2-check mova-icon"></i>
                <div>
                  <h5 className="fw-semibold text-dark mb-1">Pass Mensuels</h5>
                  <p className="text-black mb-0">Trajets prédéfinis pour un budget maîtrisé.</p>
                </div>
              </div>

              <div className="mova-feature-item">
                <i className="bi bi-clock-history mova-icon"></i>
                <div>
                  <h5 className="fw-semibold text-dark mb-1">Priorité à bord</h5>
                  <p className="text-black mb-0">Confirmation rapide et accès prioritaire.</p>
                </div>
              </div>

              <div className="mova-feature-item">
                <i className="bi bi-geo-alt mova-icon"></i>
                <div>
                  <h5 className="fw-semibold text-dark mb-1">Suivi en direct</h5>
                  <p className="text-black mb-0">Localisez votre transport instantanément.</p>
                </div>
              </div>

              <div className="mova-feature-item">
                <i className="bi bi-credit-card mova-icon"></i>
                <div>
                  <h5 className="fw-semibold text-dark mb-1">Paiement sécurisé</h5>
                  <p className="text-black mb-0">Gérez vos abonnements directement via l'app.</p>
                </div>
              </div>

            </div>

            {/* Boutons de téléchargement */}
            <div className="mova-store-buttons">
              <a href="#" className="mova-btn-store">
                <i className="bi bi-apple fs-4"></i>
                <div className="text-start lh-1">
                  <small className="d-block mb-1">Télécharger dans l'</small>
                  <span className="fw-bold fs-6">App Store</span>
                </div>
              </a>
              
              <a href="#" className="mova-btn-store">
                <i className="bi bi-google-play fs-4"></i>
                <div className="text-start lh-1">
                  <small className="d-block mb-1">Disponible sur</small>
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