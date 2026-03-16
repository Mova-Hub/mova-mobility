import React from 'react';
import ReservationModal from './ReservationModal';

function HowItWorks() {
    
  return (
    
        <section className="section howitworks__v1" id="how-it-works">
          <div className="container">
            <div className="row mb-5">
              <div className="col-md-6 text-center mx-auto">
                <span className="subtitle text-uppercase mb-3" data-aos="fade-up" data-aos-delay="0">Comment ça marche</span>
                <h2 data-aos="fade-up" data-aos-delay="100">Réservez Votre Bus en Toute Simplicité</h2>
                <p data-aos="fade-up" data-aos-delay="200">Avec BusAccess de Móva Mobility, organiser le transport pour vos événements est rapide et sans stress. Suivez ces étapes pour réserver votre bus :</p>
              </div>
            </div>
            <div className="row g-md-5">
              <div className="col-md-6 col-lg-3">
                <div className="step-card text-center h-100 d-flex flex-column justify-content-start position-relative" data-aos="fade-up" data-aos-delay="0">
                  <div data-aos="fade-right" data-aos-delay="500">
                    <img className="arch-line" src="/assets/images/arch-line.svg" alt="Ligne décorative" /></div>
                  <span className="step-number rounded-circle text-center fw-bold mb-5 mx-auto">1</span>
                  <div>
                    <h3 className="fs-5 mb-4">Choisissez votre événement</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="600">
                <div className="step-card reverse text-center h-100 d-flex flex-column justify-content-start position-relative">
                  <div data-aos="fade-right" data-aos-delay="1100"><img className="arch-line reverse" src="/assets/images/arch-line-reverse.svg" alt="Ligne décorative inversée" /></div>
                  <span className="step-number rounded-circle text-center fw-bold mb-5 mx-auto">2</span>
                  <h3 className="fs-5 mb-4">Personnalisez votre réservation</h3>
                </div>
              </div>
              <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="1200">
                <div className="step-card text-center h-100 d-flex flex-column justify-content-start position-relative">
                  <div data-aos="fade-right" data-aos-delay="1700"><img className="arch-line" src="/assets/images/arch-line.svg" alt="Ligne décorative" /></div>
                  <span className="step-number rounded-circle text-center fw-bold mb-5 mx-auto">3</span>
                  <h3 className="fs-5 mb-4">Confirmez et payez</h3>
                </div>
              </div>
              <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="1800">
                <div className="step-card last text-center h-100 d-flex flex-column justify-content-start position-relative">
                  <span className="step-number rounded-circle text-center fw-bold mb-5 mx-auto">4</span>
                  <div>
                    <h3 className="fs-5 mb-4">Profitez du trajet</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  );
}

export default HowItWorks;