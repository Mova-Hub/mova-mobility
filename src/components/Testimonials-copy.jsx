import React from 'react';

function MovaPass() {
  const features = [
    { icon: "bi-calendar2-check", title: "Pass Mensuels", desc: "Forfaits adaptés à vos trajets fréquents." },
    { icon: "bi-clock-history", title: "Priorité à bord", desc: "Confirmation rapide et accès prioritaire." },
    { icon: "bi-geo-alt", title: "Suivi en direct", desc: "Localisez votre transport instantanément." },
    { icon: "bi-credit-card", title: "Paiement sécurisé", desc: "Gérez vos abonnements via l'application." }
  ];

  return (
    <section className="py-24 overflow-hidden bg-white mova-pass-section" id="movapass">
      <div className="container">
        
        {/* Header */}
        <div className="mb-5 text-center row justify-content-center pb-lg-5">
          <div className="col-lg-7">
            <div className="gap-2 mb-3 d-flex align-items-center justify-content-center" data-aos="fade-up">
              <span className="px-3 py-1 rounded-pill fw-bold text-uppercase" style={{ backgroundColor: '#00592115', color: '#005921', fontSize: '0.75rem', letterSpacing: '1px' }}>
                L'Écosystème Mova Pass
              </span>
            </div>
            <h2 className="mb-4 display-5 fw-black text-dark" data-aos="fade-up" data-aos-delay="100">
              Une mobilité <span style={{ color: '#005921' }}>sans friction</span>.
            </h2>
            <p className="mx-auto text-muted fs-5" data-aos="fade-up" data-aos-delay="200" style={{ maxWidth: '600px' }}>
              Une seule interface pour réserver, suivre vos trajets et maîtriser votre budget avec nos forfaits intelligents.
            </p>
          </div>
        </div>

        <div className="row align-items-center g-5">
          
          {/* CREATIVE MOCKUP SIDE (Left) */}
          <div className="order-2 col-lg-6 order-lg-1" data-aos="fade-right">
            <div className="mova-screens-perspective">
              {/* Decorative Backdrop Glow */}
              <div className="mova-perspective-glow"></div>
              
              {/* Screen 1: Back Left */}
              <div className="shadow-lg mova-screen-item back-left">
                <img src="/assets/images/screens/home.JPG" alt="Mova Map View" />
              </div>

              {/* Screen 2: Back Right */}
              <div className="shadow-lg mova-screen-item back-right">
                <img src="/assets/images/screens/booking.JPG" alt="Mova Payment" />
              </div>

              {/* Screen 3: Main Front Center */}
              <div className="shadow-2xl mova-screen-item main-front">
                <img src="/assets/images/screens/trajets.JPG" alt="Mova Home" />
              </div>
            </div>
          </div>

          {/* CONTENT SIDE (Right) */}
          <div className="order-1 col-lg-6 order-lg-2 ps-lg-5" data-aos="fade-up">
            <h3 className="mb-5 display-7 fw-bold text-dark lh-sm">
              Tout ce dont vous avez besoin, <br />
              <span className="text-muted fw-light">dans votre poche.</span>
            </h3>
            
            <div className="mb-5 row g-4">
              {features.map((f, i) => (
                <div className="col-sm-6" key={i}>
                  <div className="p-3 transition-all mova-feature-card rounded-4">
                    <div className="mb-3 shadow-sm mova-icon-box">
                      <i className={`bi ${f.icon}`}></i>
                    </div>
                    <h5 className="mb-2 fw-bold text-dark fs-6">{f.title}</h5>
                    <p className="mb-0 small text-muted">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Store Buttons */}
            <div className="flex-wrap gap-3 d-flex">
              <a href="#" className="gap-3 px-4 py-2 transition-all btn btn-dark d-flex align-items-center rounded-4 hover-scale">
                <i className="bi bi-apple fs-2"></i>
                <div className="text-start lh-1">
                  <small style={{ fontSize: '0.65rem' }} className="opacity-50 text-uppercase">Download on the</small>
                  <div className="fw-bold fs-6">App Store</div>
                </div>
              </a>
              <a href="#" className="gap-3 px-4 py-2 transition-all btn btn-dark d-flex align-items-center rounded-4 hover-scale">
                <i className="bi bi-google-play fs-2"></i>
                <div className="text-start lh-1">
                  <small style={{ fontSize: '0.65rem' }} className="opacity-50 text-uppercase">Get it on</small>
                  <div className="fw-bold fs-6">Google Play</div>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .fw-black { font-weight: 900; }
        
        /* Perspective Container */
        .mova-screens-perspective {
          position: relative;
          height: 550px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1500px;
        }

        .mova-perspective-glow {
          position: absolute;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(0, 89, 33, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 0;
        }

        .mova-screen-item {
          position: absolute;
          width: 240px;
          border-radius: 32px; /* Individually rounded */
          overflow: hidden;
          background: #000;
          border: 6px solid #1a1a1a;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mova-screen-item img {
          width: 100%;
          display: block;
        }

        /* Initial Positions */
        .back-left {
          transform: translateX(-100px) rotateY(25deg) scale(0.85);
          z-index: 1;
          opacity: 0.6;
        }

        .back-right {
          transform: translateX(100px) rotateY(-25deg) scale(0.85);
          z-index: 1;
          opacity: 0.6;
        }

        .main-front {
          z-index: 3;
          transform: translateZ(50px);
          box-shadow: 0 40px 80px -20px rgba(0,0,0,0.3) !important;
        }

        /* Interaction: Spread on Hover */
        .mova-screens-perspective:hover .back-left {
          transform: translateX(-180px) rotateY(15deg) scale(0.9);
          opacity: 1;
        }

        .mova-screens-perspective:hover .back-right {
          transform: translateX(180px) rotateY(-15deg) scale(0.9);
          opacity: 1;
        }

        .mova-screens-perspective:hover .main-front {
          transform: translateZ(100px) scale(1.05);
        }

        /* UI Elements */
        .mova-icon-box {
          width: 44px; height: 44px;
          background: #f0fdf4;
          color: #005921;
          display: flex; align-items: center; justify-content: center;
          border-radius: 12px;
          font-size: 1.25rem;
        }

        .mova-feature-card:hover {
          background: #f9fafb;
          transform: translateY(-5px);
        }

        .hover-scale:hover {
          transform: scale(1.05);
          background: #000 !important;
        }

        @media (max-width: 991px) {
          .mova-screens-perspective { height: 400px; transform: scale(0.8); }
          .mova-screen-item { width: 180px; }
        }
      `}} />
    </section>
  );
}

export default MovaPass;