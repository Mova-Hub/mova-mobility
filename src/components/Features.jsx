import React, { useState } from 'react';

function Features() {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <>
      <section className="py-20 section features__v2 position-relative" id="features">
        
        {/* Motif d'arrière-plan subtil (Lignes topographiques/Transport) */}
        <div className="absolute inset-0 pointer-events-none opacity-5" 
             style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%230d6efd\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}>
        </div>

        <div className="container position-relative z-1">
          <div className="row">
            <div className="col-12">
              <div 
                className="p-5 shadow-sm d-lg-flex rounded-5 content" 
                data-aos="fade-up" 
                data-aos-duration="1000"
                style={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid rgba(0,0,0,0.05)',
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.03)' 
                }}
              >
                <div className="m-0 row w-100">
                  
                  {/* --- COLONNE GAUCHE (Titre & Vidéo) --- */}
                  <div className="mb-5 col-lg-5 mb-lg-0 pe-lg-5" data-aos="fade-right" data-aos-delay="100">
                    <div className="h-100 flex-column justify-content-between d-flex">
                      
                      <div>
                        {/* Petit badge introductif */}
                        <div className="gap-2 mb-3 d-flex align-items-center">
                          <span style={{ width: '30px', height: '2px', backgroundColor: '#005921' }}></span>
                          <span className="text-uppercase fw-bold" style={{ color: '#005921', fontSize: '0.8rem', letterSpacing: '2px' }}>
                            Notre promesse
                          </span>
                        </div>

                        <h2 className="mb-4 display-8 fw-semibold" style={{ color: '#111827', letterSpacing: '-0.03em' }}>
                          Pourquoi choisir <br />
                          <span style={{ color: '#005921' }}>Móva Mobility</span> ?
                        </h2>
                        <p className="mb-5 fs-6" style={{ color: '#4b5563', lineHeight: '1.8' }}>
                          Parce que se déplacer ne devrait jamais être un casse-tête. 
                          Nous redessinons la carte de la mobilité urbaine pour la rendre <strong>fluide, inclusive et agréable</strong>, quel que soit votre destination.
                        </p>
                      </div>

                      {/* Bouton Vidéo */}
                      <div className="mt-auto align-self-start">
                        <button 
                          onClick={() => setShowVideoModal(true)}
                          className="gap-3 px-4 py-3 transition-all border-0 shadow-sm btn d-inline-flex align-items-center rounded-pill" 
                          style={{ 
                            backgroundColor: '#005921', 
                            color: 'white', 
                            fontWeight: 600,
                            transform: 'translateY(0)'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                          <span className="bg-white d-flex align-items-center justify-content-center rounded-circle" style={{ width: '36px', height: '36px', color: '#005921' }}>
                            <i className="bi bi-play-fill fs-5 ms-1"></i>
                          </span>
                          Découvrir en vidéo
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* --- COLONNE DROITE (Grille des Features) --- */}
                  <div className="col-lg-7 ps-lg-4 border-start border-light d-flex align-items-center">
                    <div className="row g-4 g-lg-5 w-100">
                      {[

                      { icon: 'bi-bus-front', title: 'Réservation Facile', text: 'Planifiez vos trajets ou réservez un bus en quelques clics via notre site ou application mobile.' },
                      { icon: 'bi-shield-check', title: 'Fiabilité Garantie', text: 'Des bus modernes et ponctuels pour assurer un transport sans faille à chaque événement.' },
                      { icon: 'bi-headset', title: 'Support Client 24/7', text: 'Une équipe dédiée toujours prête à vous assister, par chat, email ou téléphone.' },
                      { icon: 'bi-ticket-perforated', title: 'Mova Pass Avantages', text: 'Trajets illimités et réductions exclusives pour une mobilité urbaine sans contraintes.' },
                      ].map((feature, i) => (
                        <div className="col-md-6" key={i} data-aos="fade-up" data-aos-delay={`${(i + 1) * 100}`}>
                          <div className="feature-item">
                            <div 
                              className="mb-4 shadow-sm icon d-inline-flex align-items-center justify-content-center" 
                              style={{ 
                                backgroundColor: '#ffffff', 
                                border: '1px solid #e5e7eb',
                                width: '56px',
                                height: '56px',
                                borderRadius: '16px', 
                                color: '#005921',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <i className={`bi ${feature.icon} fs-4`}></i>
                            </div>
                            <h3 className="mb-2 fs-5 fw-semibold" style={{ color: '#111827' }}>{feature.title}</h3>
                            <p className="m-0" style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6' }}>{feature.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MODALE VIDÉO PERSONNALISÉE --- */}
      {showVideoModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          {/* Overlay sombre */}
          <div 
            className="absolute inset-0 transition-opacity bg-black/90 backdrop-blur-sm"
            onClick={() => setShowVideoModal(false)}
            style={{ animation: 'fadeIn 0.3s ease-out' }}
          ></div>

          {/* Conteneur de la vidéo */}
          <div 
            className="relative z-10 w-full max-w-5xl overflow-hidden bg-black shadow-2xl rounded-2xl aspect-video"
            style={{ animation: 'scaleUp 0.3s ease-out' }}
          >
            {/* Bouton Fermer */}
            <button 
              onClick={() => setShowVideoModal(false)}
              className="absolute z-20 flex items-center justify-center w-10 h-10 text-white transition-colors rounded-full top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-md"
              aria-label="Fermer la vidéo"
            >
              <i className="text-xl bi bi-x-lg"></i>
            </button>

            {/* IFRAME VIDÉO (Exemple YouTube) 
                Remplacez l'URL par le vrai lien de votre vidéo promotionnelle */}
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="Mova Mobility Présentation" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>
      )}

      {/* Styles pour les animations de la modale */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        /* Hover effect pour les icônes */
        .feature-item:hover .icon {
          background-color: #005921 !important;
          color: #ffffff !important;
          transform: translateY(-3px);
        }
      `}} />
    </>
  );
}

export default Features;