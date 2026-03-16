import React from 'react';
import ReservationModal from './ReservationModal';

function Hero({setShowModal}) {
    
  return (
        <section className="section" id="home" style={{ marginTop: "45px" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <div className="row">
                  <div className="col-lg-11"><span className="hero-subtitle text-uppercase" data-aos="fade-up" data-aos-delay="0">Móva Mobility</span>
                    <h1 className="hero-title mb-3" data-aos="fade-up" data-aos-delay="100">Parce que se déplacer, <span className="" style={{ color: "#005921" }}>c'est exister</span></h1>
                    <p className="hero-description mb-4 mb-lg-5" data-aos="fade-up" data-aos-delay="200">Móva Mobility, c’est la liberté de se déplacer autrement : simple, agile et à portée de main.</p>
                    <div className=" d-flex gap-2 mb-4 mb-lg-5" data-aos="fade-up" data-aos-delay="300">
                      <a className="btn btn-primary rounded-5" href="tel:+242067633232">Je réserve mon bus</a>
                      <a className="btn btn-white-outline rounded-5" href="#">En savoir plus 
                        <svg className="lucide lucide-arrow-up-right" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M7 7h10v10"></path>
                          <path d="M7 17 17 7"></path>
                        </svg>
                        </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="hero-img">
                  <img className="img-main rounded-4" src="/assets/images/buses.jpg" width="700px" alt="Hero Image" data-aos="fade-in" data-aos-delay="500" /></div>
              </div>
            </div>
          </div>
           {/* End Hero */}
        </section>
  );
}

export default Hero;