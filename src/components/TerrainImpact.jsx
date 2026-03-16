import React from 'react';
import ReservationModal from './ReservationModal';

function TerrainImpact() {
    
  return (
        <section className="section stats__v3" id="terrain-impact">
          <div className="container">
            <div className="row mb-5">
              <div className="col-md-8 mx-auto text-center">
                <span className="subtitle text-uppercase mb-3" data-aos="fade-up" data-aos-delay="0">How it works</span>
                <h2 className="mb-3" data-aos="fade-up" data-aos-delay="100">Notre impact sur la mobilité</h2>
                <p data-aos="fade-up" data-aos-delay="200">Découvrez comment Móva Mobility transforme les déplacements avec des services fiables et des partenariats solides.</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="d-flex flex-wrap content rounded-4" data-aos="fade-up" data-aos-delay="0">
                  <div className="rounded-borders">
                    <div className="rounded-border-1"></div>
                    <div className="rounded-border-2"></div>
                    <div className="rounded-border-3"></div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0 text-center" data-aos="fade-up" data-aos-delay="100">
                    <div className="stat-item">
                      <h3 className="fs-1 fw-bold"><span className="purecounter" data-purecounter-start="0" data-purecounter-end="10000" data-purecounter-duration="2">0</span><span>+</span></h3>
                      <p className="mb-0">Courses réalisées</p>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0 text-center" data-aos="fade-up" data-aos-delay="200">
                    <div className="stat-item">
                      <h3 className="fs-1 fw-bold"><span className="purecounter" data-purecounter-start="0" data-purecounter-end="95" data-purecounter-duration="2">0</span><span>%</span></h3>
                      <p className="mb-0">Satisfaction client</p>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0 text-center" data-aos="fade-up" data-aos-delay="300">
                    <div className="stat-item">
                      <h3 className="fs-1 fw-bold"><span className="purecounter" data-purecounter-start="0" data-purecounter-end="50" data-purecounter-duration="2">0</span><span>+</span></h3>
                      <p className="mb-0">Partenaires</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-6 mx-auto text-center">
                <h4 className="mb-4" data-aos="fade-up" data-aos-delay="400">Nos partenaires</h4>
                <div className="logos-images d-flex gap-4 align-items-center justify-content-center" data-aos="fade-up" data-aos-delay="500">
                  <img className="img-fluid" src="/assets/images/partner/pepite.png" alt="Partenaire 1" style={{ width: "110px" }} />
                  {/* <img className="img-fluid" src="/assets/images/partner/koverae.png" alt="Partenaire 2" style={{ width: "110px" }} /> */}
                  {/* <img className="img-fluid" src="/assets/images/partner3-logo.jpg" alt="Partenaire 3" style={{ width: "110px" }} /> */}
                </div>
                <p className="mt-4" data-aos="fade-up" data-aos-delay="600">Rejoignez le mouvement #MonTrajetMova</p>
              </div>
            </div>
          </div>
        </section>
  );
}

export default TerrainImpact;