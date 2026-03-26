import React from 'react';

function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Planifiez votre trajet",
      desc: "Définissez vos points de départ, d'arrivée et le nombre de passagers à transporter.",
      icon: "bi-calendar-event",
      delay: 100,
    },
    {
      id: 2,
      title: "Adaptez votre flotte",
      desc: "Choisissez un ou plusieurs bus selon vos besoins de confort et la taille de votre groupe.",
      icon: "bi-bus-front",
      delay: 200,
      reverse: true
    },
    {
      id: 3,
      title: "Réservez en ligne",
      desc: "Recevez votre devis instantané et confirmez votre réservation via notre paiement sécurisé.",
      icon: "bi-credit-card-2-front",
      delay: 300,
    },
    {
      id: 4,
      title: "Voyagez sereinement",
      desc: "Nos chauffeurs certifiés assurent la logistique pour que votre groupe arrive à bon port.",
      icon: "bi-shield-check",
      delay: 400,
      last: true
    }
  ];

  return (
    <section className="py-20 section howitworks__v1 bg-gray-50" id="how-it-works">
      <div className="container">
        
        {/* En-tête de section */}
        <div className="mb-5 row justify-content-center">
          <div className="mx-auto text-center col-md-8 col-lg-7">
            <div className="gap-2 mb-3 d-flex align-items-center justify-content-center" data-aos="fade-up" data-aos-delay="0">
              <span style={{ width: '30px', height: '2px', backgroundColor: '#005921' }}></span>
              <span className="text-uppercase fw-bold" style={{ color: '#005921', fontSize: '0.8rem', letterSpacing: '2px' }}>
                Comment ça marche, Bus Access
              </span>
              <span style={{ width: '30px', height: '2px', backgroundColor: '#005921' }}></span>
            </div>
            <h2 className="mb-4 display-8 fw-semibold text-dark" data-aos="fade-up" data-aos-delay="100">
              Réservez vos trajets de groupe en <span style={{ color: '#005921' }}>quelques clics</span>
            </h2>
            <p className="mx-auto fs-6 mova-subtitle text-muted" data-aos="fade-up" data-aos-delay="200">
              Que ce soit pour un séminaire, un événement familial ou un transport scolaire, <strong>Bus Access</strong> vous permet de gérer votre flotte de transport privée sans aucune complexité logistique.
            </p>
          </div>
        </div>

        {/* Grille des étapes */}
        <div className="mt-4 row g-4 g-md-5 position-relative">
          {steps.map((step) => (
            <div className="col-md-6 col-lg-3" key={step.id}>
              <div 
                className={`text-center step-card h-100 d-flex flex-column justify-content-start position-relative group ${step.reverse ? 'reverse' : ''} ${step.last ? 'last' : ''}`}
                data-aos="fade-up" 
                data-aos-delay={step.delay}
              >
                {/* Ligne décorative */}
                {!step.last && (
                  <div className="d-none d-lg-block" data-aos="fade-in" data-aos-delay={step.delay + 300}>
                    <img 
                      className={`arch-line ${step.reverse ? 'reverse' : ''}`} 
                      src={`/assets/images/arch-line${step.reverse ? '-reverse' : ''}.svg`} 
                      alt="Ligne de connexion" 
                      style={{ opacity: 0.6 }}
                    />
                  </div>
                )}

                {/* Bulle Numéro */}
                <div 
                  className="mx-auto mb-4 text-center transition-all duration-300 shadow-sm cursor-pointer step-number rounded-circle fw-bold d-flex align-items-center justify-content-center group-hover:-translate-y-2"
                  style={{ 
                    width: '64px', 
                    height: '64px', 
                    backgroundColor: '#005921', 
                    color: 'white',
                    fontSize: '1.5rem',
                    zIndex: 2,
                    border: '4px solid #f8f9fa'
                  }}
                >
                  {step.id}
                </div>

                {/* Contenu de l'étape */}
                <div className="px-3">
                  <div className="mb-3 transition-transform duration-300 cursor-pointer group-hover:scale-110" style={{ color: '#005921' }}>
                    <i className={`bi ${step.icon} fs-1 opacity-75`}></i>
                  </div>
                  <h3 className="mb-3 fs-5 fw-semibold text-dark">{step.title}</h3>
                  <p className="text-muted small lh-relaxed">{step.desc}</p>
                </div>
                
              </div>
            </div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .step-card {
          padding: 1.5rem 0;
          transition: all 0.3s ease;
        }
        .step-card:hover .step-number {
          box-shadow: 0 12px 24px rgba(0, 89, 33, 0.25) !important;
          background-color: #007a2d !important;
        }
        .arch-line {
          position: absolute;
          top: 35px;
          left: 65%;
          width: 75%;
          z-index: 1;
        }
        .arch-line.reverse {
          top: 45px;
        }
      `}} />
    </section>
  );
}

export default HowItWorks;