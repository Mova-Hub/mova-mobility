import React from 'react';
import ReservationModal from './ReservationModal';

function MovaPass() {
    
  return (
        <section className="section pricing__v2 mova-pass-section" id="movapass">
          <div className="container">
            <div className="row mb-5">
              <div className="col-md-8 mx-auto text-center">
                <span className="subtitle text-uppercase mb-3 mova-pass-subtitle" data-aos="fade-up" data-aos-delay="0">Mova Pass</span>
                <h2 className="h2 fw-bold mb-3 mova-pass-title" data-aos="fade-up" data-aos-delay="100">Liberté Urbaine Sans Limites</h2>
                <p className="text-lg text-muted max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                  Mova Pass, c'est la liberté de naviguer en ville comme jamais : trajets illimités, priorité à bord et une app qui rend chaque déplacement fluide et intuitif.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
                <div className="p-5 rounded-4 price-table popular mova-pass-card h-100">
                  <div className="row">
                    <div className="col-md-10">
                      <div className="mova-pass-img mb-4">
                        <img className="img-fluid rounded-3" src="/assets/images/logo/logo.png" style={{ height: "45px" }} alt="Vue urbaine avec un bus Móva Mobility" data-aos="zoom-in" data-aos-delay="350"/>
                      </div>
                      <h3 className="fs-4 mb-3 mova-pass-card-title">Mova Pass</h3>
                      <p className="mb-4">Déplacez-vous sans contraintes avec des trajets illimités, des avantages exclusifs et une application intuitive pour une mobilité urbaine sans pareille.</p>
                      <div className="pricing-features">
                        <h4 className="text-uppercase fw-bold mb-3">Avantages</h4>
                        <ul className="list-unstyled d-flex flex-column gap-3">
                          <li className="d-flex gap-2 align-items-start mb-0"><span className="icon rounded-circle position-relative mt-1"><i className="bi bi-bus-front-fill"></i></span><span>Trajets illimités en ville</span></li>
                          <li className="d-flex gap-2 align-items-start mb-0"><span className="icon rounded-circle position-relative mt-1"><i className="bi bi-bus-front-fill"></i></span><span>Réductions exclusives sur vos courses</span></li>
                          <li className="d-flex gap-2 align-items-start mb-0"><span className="icon rounded-circle position-relative mt-1"><i className="bi bi-bus-front-fill"></i></span><span>App mobile simple et intuitive</span></li>
                        </ul>
                      </div>
                      <div className="mt-4 mb-3"><a className="btn btn-primary bg-white text-black mova-pass-button" href="#">Pré-inscription</a></div>
                    </div>
                    <div className="col-2">
                      <img className="rounded-4 shadow-lg" src="/assets/images/mova-pass.jpg" style={{ height: "500px" }} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-6 mx-auto text-center">
                <p className="text-muted mb-4" data-aos="fade-up" data-aos-delay="400">Embarquez avec <strong>Mova Pass</strong> et <strong>bougez</strong> au rythme de la ville !</p>
                <a href="#contact" className="btn btn-white-outline mova-pass-button" data-aos="fade-up" data-aos-delay="500">En savoir plus 
                  <svg className="lucide lucide-arrow-up-right" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M7 7h10v10"></path>
                    <path d="M7 17 17 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
  );
}

export default MovaPass;