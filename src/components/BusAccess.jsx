import React from 'react';
import ReservationModal from './ReservationModal';

function BusAccess() {
    
  return (
        <section className="section testimonials__v2 services__v3" id="busAccess">
          <div className="container">
            <div className="row mb-5">
              <div className="col-md-8 mx-auto text-center"><span className="subtitle text-uppercase mb-3" data-aos="fade-up" data-aos-delay="0">BusAccess</span>
                <h2 className="mb-3" data-aos="fade-up" data-aos-delay="100">Location de bus pour tous vos événements</h2>
                <p data-aos="fade-up" data-aos-delay="200">Réservez un bus pour vos mariages, obsèques, sorties scolaires ou tout autre événement avec Móva Mobility.</p>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="0">
                <div className="service-card p-4 rounded-4 h-100 d-flex flex-column justify-content-between gap-5">
                  <div>
                    <span className="icon mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        <circle cx="7" cy="18" r="2"></circle>
                        <circle cx="17" cy="18" r="2"></circle>
                      </svg>
                    </span>
                    <h3 className="fs-5 mb-3">Mariages</h3>
                    <p className="mb-4">Transportez vos invités en toute élégance pour votre jour spécial.</p>
                  </div>
                  <a className="special-link d-inline-flex gap-2 align-items-center text-decoration-none" href="tel:+242067633232">
                    <span className="icons"><i className="icon-1 bi bi-arrow-right-short"></i><i className="icon-2 bi bi-arrow-right-short"></i></span>
                    <span>Réserver maintenant</span>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
                <div className="service-card p-4 rounded-4 h-100 d-flex flex-column justify-content-between gap-5">
                  <div>
                    <span className="icon mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        <circle cx="7" cy="18" r="2"></circle>
                        <circle cx="17" cy="18" r="2"></circle>
                      </svg>
                    </span>
                    <h3 className="fs-5 mb-3">Obsèques</h3>
                    <p className="mb-4">Un transport fiable et respectueux pour les cérémonies funéraires.</p>
                  </div>
                  <a className="special-link d-inline-flex gap-2 align-items-center text-decoration-none" href="tel:+242067633232">
                    <span className="icons"><i className="icon-1 bi bi-arrow-right-short"></i><i className="icon-2 bi bi-arrow-right-short"></i></span>
                    <span>Réserver maintenant</span>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
                <div className="service-card p-4 rounded-4 h-100 d-flex flex-column justify-content-between gap-5">
                  <div>
                    <span className="icon mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        <circle cx="7" cy="18" r="2"></circle>
                        <circle cx="17" cy="18" r="2"></circle>
                      </svg>
                    </span>
                    <h3 className="fs-5 mb-3">Sorties scolaires</h3>
                    <p className="mb-4">Des bus sécurisés pour les activités éducatives et récréatives.</p>
                  </div>
                  <a className="special-link d-inline-flex gap-2 align-items-center text-decoration-none" href="tel:+242067633232">
                    <span className="icons"><i className="icon-1 bi bi-arrow-right-short"></i><i className="icon-2 bi bi-arrow-right-short"></i></span>
                    <span>Réserver maintenant</span>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="row mt-5">
              <div className="col-md-6 mx-auto text-center">
                <h4 className="mb-4" data-aos="fade-up" data-aos-delay="300">Témoignage client</h4>
                <div className="testimonial rounded-4 p-4" data-aos="fade-up" data-aos-delay="400">
                  <blockquote className="mb-3">
                    “Grâce à BusAccess, nous avons pu organiser le transport pour notre mariage sans stress. Les bus étaient confortables et le service impeccable !”
                  </blockquote>
                  <div className="testimonial-author d-flex gap-3 align-items-center">
                    <div className="author-img">
                        <img className="rounded-circle img-fluid" src="/assets/images/person-sq-5-min.jpg" alt="Témoignage client" />
                        </div>
                    <div className="lh-base"><strong className="d-block">Alexy Xavier</strong><span>Client satisfait</span></div>
                  </div>
                </div>
                <a className="btn btn-primary mt-4" href="tel:+242067633232">Réserver un bus maintenant</a>
              </div>
            </div>

          </div>
        </section>
  );
}

export default BusAccess;