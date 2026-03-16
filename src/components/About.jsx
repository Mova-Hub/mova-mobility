import React from 'react';
import ReservationModal from './ReservationModal';

function About() {
    
  return (
  <section className="about__v4 section" id="about" style={{ backgroundColor: '#fefdfb' }}>
  <div className="container">
    <div className="row">
      <div className="col-md-6 order-md-2">
        <div className="row justify-content-end">
          <div className="col-md-11 mb-4 mb-md-0">
            <span 
              className="subtitle text-uppercase mb-3 d-inline-block" 
              data-aos="fade-up" 
              data-aos-delay="0"
              style={{ fontWeight: 600 }}
            >
              À propos de nous
            </span>
            <h2 
              className="mb-4" 
              data-aos="fade-up" 
              data-aos-delay="100"
              style={{ color: '#005921' }}
            >
              Nous redéfinissons la mobilité urbaine avec des solutions agiles, fiables et pensées pour l’Afrique Central
            </h2>
            <div data-aos="fade-up" data-aos-delay="200" style={{ color: '#333' }}>
              <p>
                Née d’une vision audacieuse, <strong >Móva Mobility</strong> transforme les déplacements urbains grâce à des solutions de transport fiables, inclusives et intelligentes
              </p>
              <p>
                Notre plateforme moderne garantit des trajets fluides et confortables, vous permettant de vous déplacer en toute confiance, que ce soit pour un événement spécial ou vos trajets quotidiens.
              </p>
            </div>
            <h4 
              className="small fw-bold mt-4 mb-3" 
              data-aos="fade-up" 
              data-aos-delay="300"
              style={{ color: '#005921' }}
            >
              Valeurs et vision
            </h4>
            <ul className="d-flex flex-row flex-wrap list-unstyled gap-3 features" data-aos="fade-up" data-aos-delay="400">
              {['Innovation', 'Fiabilité', 'Accessibilité', 'Confort', 'Engagement'].map((item, index) => (
                <li 
                  key={index}
                  className="d-flex align-items-center gap-2"
                  style={{ color: '#005921' }}
                >
                  <span 
                    className="icon rounded-circle text-center d-inline-flex align-items-center justify-content-center"
                    style={{ 
                      color: 'white', 
                      width: '32px', 
                      height: '32px' 
                    }}
                  >
                    <i className="bi bi-check"></i>
                  </span>
                  <span className="text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="col-md-6"> 
        <div className="img-wrap position-relative">
          <img 
            className="img-fluid rounded-4" 
            src="/assets/images/bus.jpg" 
            alt="Image d'un bus Móva Mobility" 
            data-aos="fade-up" 
            data-aos-delay="0" 
          />
          <div 
            className="mission-statement p-4 rounded-4 d-flex gap-4 align-items-start mt-4"
            data-aos="fade-up" 
            data-aos-delay="100"
            style={{ 
              backgroundColor: '#005921', 
              color: 'white', 
              boxShadow: '0 0 10px rgba(0,0,0,0.1)' 
            }}
          >
            <div 
              className="mission-icon text-center rounded-circle d-flex align-items-center justify-content-center"
              style={{ 
                color: 'white', 
                width: '48px', 
                height: '48px' 
              }}
            >
              <i className="bi bi-bus-front fs-4"></i>
            </div>
            <div>
              <h3 className="text-uppercase fw-bold" >Notre mission</h3>
              <p className="fs-5 mb-0">Faciliter les déplacements de chacun en offrant des services de transport fiables, confortables et accessibles à tous.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  );

}
export default About;