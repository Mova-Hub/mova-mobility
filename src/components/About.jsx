import React from 'react';
// (ReservationModal can be kept if you plan to add a booking button here later)

function About() {
  return (
    <section className="py-20 overflow-hidden about__v4 section position-relative" id="about" style={{ backgroundColor: '#f9fafb' }}>
      
      {/* Élément décoratif en arrière-plan (cercle flou) */}
      <div className="absolute z-[100] top-0 right-0 w-[500px] h-[500px] bg-[#005921] opacity-[0.03] blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container position-relative z-1">
        <div className="row align-items-center g-5">
          
          {/* --- COLONNE TEXTE (Droite sur Desktop) --- */}
          <div className="col-md-6 order-md-2">
            <div className="row justify-content-end">
              <div className="mb-4 col-md-11 mb-md-0 ps-lg-4">
                
                {/* Sous-titre / Badge */}
                <div className="gap-2 mb-3 d-flex align-items-center" data-aos="fade-up" data-aos-delay="0">
                  <span style={{ width: '30px', height: '2px', backgroundColor: '#005921' }}></span>
                  <span 
                    className="text-uppercase fw-bold" 
                    style={{ color: '#005921', fontSize: '0.8rem', letterSpacing: '2px' }}
                  >
                    À propos de nous
                  </span>
                </div>

                {/* Titre Principal */}
                <h2 
                  className="mb-4 display-8 fw-semibold" 
                  data-aos="fade-up" 
                  data-aos-delay="100"
                  style={{ color: '#111827', letterSpacing: '-0.02em', lineHeight: '1.2' }}
                >
                  Nous redéfinissons la mobilité urbaine avec des solutions <span style={{ color: '#005921' }}>agiles et fiables</span> pour l’Afrique Centrale.
                </h2>
                
                {/* Paragraphes de description */}
                <div data-aos="fade-up" data-aos-delay="200">
                  <p className="mb-4 fs-6" style={{ color: '#4b5563', lineHeight: '1.8' }}>
                    Née d’une vision audacieuse, <strong>Móva Mobility</strong> transforme les déplacements urbains grâce à des solutions de transport inclusives et intelligentes, conçues pour répondre aux défis d'aujourd'hui.
                  </p>
                  <p className="mb-5 fs-6" style={{ color: '#4b5563', lineHeight: '1.8' }}>
                    Notre plateforme moderne garantit des trajets fluides et confortables. Que ce soit pour un événement spécial, un voyage d'entreprise ou vos trajets quotidiens, nous vous permettons de vous déplacer en toute confiance.
                  </p>
                </div>

                {/* Section Valeurs */}
                <div className="p-4 bg-white border shadow-sm rounded-4" data-aos="fade-up" data-aos-delay="300" style={{ borderColor: '#f3f4f6' }}>
                  <h4 className="mb-4 fs-6 fw-bold text-uppercase" style={{ color: '#111827', letterSpacing: '1px' }}>
                    Nos Valeurs Fondamentales
                  </h4>
                  <ul className="flex-row flex-wrap gap-3 m-0 d-flex list-unstyled features">
                    {['Innovation', 'Fiabilité', 'Accessibilité', 'Confort', 'Engagement'].map((item, index) => (
                      <li 
                        key={index}
                        className="gap-2 px-3 py-1 d-flex align-items-center rounded-pill bg-light"
                      >
                        <span 
                          className="icon rounded-circle d-inline-flex align-items-center justify-content-center"
                          style={{ 
                            backgroundColor: '#005921',
                            color: 'white', 
                            width: '20px', 
                            height: '20px',
                            fontSize: '12px'
                          }}
                        >
                          <i className="bi bi-check-lg"></i>
                        </span>
                        <span className="text fw-medium" style={{ color: '#374151', fontSize: '0.95rem' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>

          {/* --- COLONNE IMAGE & MISSION (Gauche sur Desktop) --- */}
          <div className="col-md-6 order-md-1"> 
            <div className="img-wrap position-relative pe-lg-4">
              
              {/* Image Principale */}
              <div className="overflow-hidden shadow-lg rounded-5" data-aos="fade-up" data-aos-delay="0">
                <img 
                  className="transition-transform duration-700 img-fluid w-100 hover:scale-105" 
                  src="/assets/images/bus.jpg" 
                  alt="Bus Móva Mobility en circulation" 
                  style={{ objectFit: 'cover', minHeight: '400px' }}
                />
              </div>
              
              {/* Carte "Mission" Flottante (Superposée sur l'image) */}
              <div 
                className="bottom-0 gap-4 p-4 mission-statement rounded-4 d-flex align-items-start position-absolute end-0 translate-middle-y me-lg-n4"
                data-aos="fade-up" 
                data-aos-delay="200"
                style={{ 
                  backgroundColor: '#005921', 
                  color: 'white', 
                  boxShadow: '0 20px 25px -5px rgba(0, 89, 33, 0.4), 0 8px 10px -6px rgba(0, 89, 33, 0.1)',
                  maxWidth: '85%',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div 
                  className="flex-shrink-0 text-center mission-icon rounded-circle d-flex align-items-center justify-content-center bg-white/20"
                  style={{ 
                    color: 'white', 
                    width: '56px', 
                    height: '56px' 
                  }}
                >
                  <i className="bi bi-bus-front-fill fs-3"></i>
                </div>
                <div>
                  <h3 className="mb-2 fs-6 text-uppercase fw-bold" style={{ letterSpacing: '1px', color: 'rgba(255,255,255,0.9)' }}>
                    Notre mission
                  </h3>
                  <p className="mb-0 fs-6 fw-medium lh-base">
                    Faciliter les déplacements de chacun en offrant des services de transport fiables, confortables et accessibles à tous.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Style additionnel pour forcer la carte mission à s'empiler sur mobile */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 767.98px) {
          .mission-statement {
            position: relative !important;
            transform: none !important;
            margin-top: -30px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            max-width: 90% !important;
            z-index: 2;
          }
        }
      `}} />
    </section>
  );
}

export default About;