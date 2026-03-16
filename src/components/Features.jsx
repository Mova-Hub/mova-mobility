import React from 'react';
import ReservationModal from './ReservationModal';

function Features() {
    
  return (
<section className="section features__v2" id="features">
  <div className="container">
    <div className="row">
      <div className="col-12">
        <div 
          className="d-lg-flex p-5 rounded-4 content" 
          data-aos="fade-in" 
          data-aos-delay="0"
          style={{ backgroundColor: '#fefdfb', border: '1px solid #e9ecef' }}
        >
          <div className="row">
            <div className="col-lg-5 mb-5 mb-lg-0" data-aos="fade-up" data-aos-delay="0">
              <div className="row"> 
                <div className="col-lg-11">
                  <div className="h-100 flex-column justify-content-between d-flex">
                    <div>
                      <h2 className="mb-4" style={{ color: '#005921' }}>
                        Pourquoi Choisir <strong>Móva Mobility</strong>
                      </h2>
                      <p className="mb-5" style={{ color: '#333' }}>
                        Parce que se déplacer ne devrait jamais être un casse-tête. Chez 
                        <strong> Móva Mobility</strong>, nous croyons que la mobilité urbaine peut être fluide, inclusive et agréable, quel que soit votre âge, votre situation ou votre destination.
                      </p>
                    </div>
                    <div className="align-self-start">
                      <a 
                        className="glightbox btn btn-play d-inline-flex align-items-center gap-2" 
                        href="#" 
                        data-gallery="video"
                        style={{ color: 'white', fontWeight: 600 }}
                      >
                        <i className="bi bi-play-fill"></i> Voir la video
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="row justify-content-end">
                <div className="col-lg-11">
                  <div className="row">
                    {[
                      { icon: 'bi-bus-front', title: 'Réservation Facile', text: 'Planifiez vos trajets ou réservez un bus en quelques clics via notre site ou application mobile.' },
                      { icon: 'bi-shield-check', title: 'Fiabilité Garantie', text: 'Des bus modernes et ponctuels pour assurer un transport sans faille à chaque événement.' },
                      { icon: 'bi-headset', title: 'Support Client Dédié', text: 'Assistance 24/7 par chat, email ou téléphone pour répondre à toutes vos questions.' },
                      { icon: 'bi-ticket-perforated', title: 'Mova Pass Avantages', text: 'Trajets illimités et réductions exclusives pour une mobilité urbaine sans contraintes.' },
                    ].map((feature, i) => (
                      <div className="col-sm-6" data-aos="fade-up" data-aos-delay={`${i * 100}`}>
                        <div 
                          className="icon text-center mb-4 d-inline-block" 
                          style={{ 
                            
                            backgroundColor: '#0059210D', 
                            padding: '12px', 
                            borderRadius: '50%', 
                            fontSize: '24px' 
                          }}
                        >
                          <i className={`bi ${feature.icon} fs-4`}></i>
                        </div>
                        <h3 className="fs-6 fw-bold mb-3" style={{ color: '#005921' }}>{feature.title}</h3>
                        <p style={{ color: '#333' }}>{feature.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


  );
}

export default Features;