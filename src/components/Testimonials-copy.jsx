import React, { useEffect, useRef, useState } from 'react';
import SEO from '../components/SEO';

const Counter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const finalValue = parseInt(end.replace(/\s/g, ''), 10);
    const totalFrames = 60;
    const increment = finalValue / totalFrames;
    const intervalTime = duration / totalFrames;
    const timer = setInterval(() => {
      start += increment;
      if (start >= finalValue) {
        setCount(finalValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, intervalTime);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span ref={countRef}>{count.toLocaleString().replace(/,/g, ' ')}</span>;
};

const About = () => {
  const stats = [
    { value: "200", suffix: "+", label: "Courses réalisées", delay: 100 },
    { value: "2300", suffix: "", label: "Km parcourus", delay: 200 },
    { value: "95", suffix: "%", label: "Satisfaction client", delay: 300 },
    { value: "32", suffix: "+", label: "Abonnés", delay: 400 }
  ];

  const accomplishments = [
    { 
      title: "Pépite Congo 2024", 
      desc: "Lauréat du programme d'accompagnement des startups innovantes.", 
      category: "Prix", 
      icon: "bi-trophy" 
    },
    { 
      title: "Challenge Startupper", 
      desc: "Finaliste du concours TotalEnergies pour l'innovation en mobilité.", 
      category: "Challenge", 
      icon: "bi-award" 
    },
    { 
      title: "Tech Transition", 
      desc: "Reconnaissance pour l'impact écologique et digital en zone urbaine.", 
      category: "Certification", 
      icon: "bi-patch-check" 
    }
  ];

  return (
    <main className="overflow-hidden bg-white about-page">
      <SEO 
        title="À Propos | Móva Mobility" 
        description="Découvrez l'équipe et les succès de Móva Mobility, le leader de la mobilité intelligente en Afrique Centrale."
      />

      {/* --- 1. HERO: Airy & Bold --- */}
      <section className="py-24 bg-white position-relative">
        <div className="container">
          <div className="row align-items-center">
            <div className="mb-5 col-lg-6 mb-lg-0" data-aos="fade-up">
              <span className="mb-3 tracking-widest text-success fw-bold text-uppercase small d-block">Notre Histoire</span>
              <h1 className="mb-4 display-4 fw-black text-dark lh-sm">
                L'Afrique mérite une mobilité de <span className="text-outline">classe mondiale</span>.
              </h1>
              <p className="text-muted fs-5 fw-light pe-lg-5">
                Móva Mobility n'est pas seulement une application, c'est un engagement pour la dignité et l'efficacité des déplacements quotidiens.
              </p>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="position-relative ps-lg-5">
                <img src="/assets/images/bus-1.jpg" alt="Transport Mova" className="shadow-2xl img-fluid rounded-5 main-hero-img" />
                <div className="bottom-0 p-4 bg-white border shadow-xl floating-card rounded-4 position-absolute start-0 translate-middle-x d-none d-md-block border-light">
                  <div className="gap-3 d-flex align-items-center">
                    <div className="text-white icon-box bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                      <i className="bi bi-rocket-takeoff"></i>
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">Lancé en 2024</h6>
                      <p className="mb-0 small text-muted">Brazzaville, Congo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. ACCOMPLISHMENTS: The "Proof" Section --- */}
      <section className="py-24 bg-light-soft border-top border-bottom">
        <div className="container mb-5 text-center">
          <h6 className="tracking-widest text-success fw-bold text-uppercase small">Palmarès</h6>
          <h2 className="fw-bold text-dark">Nos succès & distinctions</h2>
        </div>
        <div className="container">
          <div className="row g-4">
            {accomplishments.map((item, i) => (
              <div className="col-md-4" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="p-5 transition-all bg-white border shadow-sm h-100 rounded-5 hover-translate-up">
                  <div className="mb-4 text-success display-6">
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <span className="px-3 py-2 mb-3 badge bg-success-soft text-success rounded-pill text-uppercase fw-bold" style={{ fontSize: '0.65rem' }}>
                    {item.category}
                  </span>
                  <h4 className="mb-3 fw-bold text-dark">{item.title}</h4>
                  <p className="mb-0 text-muted lh-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. TEAM: Enhanced Cards --- */}
      <section className="py-24 bg-white">
        <div className="container mb-5 text-center">
          <h6 className="tracking-widest text-success fw-bold text-uppercase small">L'Équipe</h6>
          <h2 className="display-6 fw-bold">Les architectes du projet</h2>
        </div>
        <div className="container">
          <div className="row g-4 justify-content-center">
            {[
              { role: "CEO & Co-fondateur", name: "Van Christ BOUETOUMOUSSA", img: "/assets/images/van.png" },
              { role: "COO & Co-fondateur", name: "Switch Aimé", img: "/assets/images/switch.jpg" },
              { role: "Lead Software Developer", name: "Arden BOUETOUMOUSSA", img: "/assets/images/arden.png" },
              { role: "Responsable Opérationnelle", name: "Christina Inkiame", img: "/assets/images/christina.jpg" }
            ].map((member, i) => (
              <div className="col-6 col-md-3" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="text-center group">
                  <div className="mx-auto mb-4 overflow-hidden shadow-lg rounded-circle member-img-wrapper" style={{ width: '160px', height: '160px' }}>
                    <img src={member.img} alt={member.name} className="transition-all duration-500 img-fluid grayscale-hover object-fit-cover w-100 h-100" />
                  </div>
                  <h6 className="mb-1 fw-bold text-dark">{member.name}</h6>
                  <p className="tracking-wider text-success fw-bold x-small text-uppercase">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. CHIFFRES CLÉS: Impact Bar --- */}
      <section className="container py-10">
        <div className="p-5 overflow-hidden shadow-2xl rounded-5 position-relative" style={{ backgroundColor: '#005921' }} data-aos="zoom-in">
          <div className="text-center row g-4 position-relative z-1">
            {stats.map((stat, index) => (
              <div key={index} className="col-6 col-md-3">
                <h3 className="mb-1 text-white display-5 fw-black">
                  <Counter end={stat.value} />
                  <span className="opacity-75 fs-3 ms-1">{stat.suffix}</span>
                </h3>
                <p className="mb-0 tracking-widest text-white-50 text-uppercase fw-bold x-small">{stat.label}</p>
              </div>
            ))}
          </div>
          {/* Decorative lines in the stats box */}
          <div className="top-0 pointer-events-none position-absolute start-0 w-100 h-100 opacity-10">
            <div className="border border-white rounded-circle position-absolute" style={{ width: '300px', height: '300px', top: '-150px', left: '-100px' }}></div>
            <div className="border border-white rounded-circle position-absolute" style={{ width: '200px', height: '200px', bottom: '-50px', right: '-50px' }}></div>
          </div>
        </div>
      </section>

      {/* --- 5. FINAL CTA --- */}
      <section className="py-24 text-center">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="mb-4 display-5 fw-black text-dark">Prêt à réinventer vos déplacements ?</h2>
            <p className="mb-5 text-muted fs-5 fw-light">Rejoignez une communauté qui privilégie le confort et la technologie.</p>
            <div className="flex-wrap gap-3 d-flex justify-content-center">
              <button className="px-5 py-3 shadow-xl btn btn-dark btn-lg rounded-pill fw-bold hover-translate-up">Nous contacter</button>
              <button className="px-5 py-3 btn btn-outline-success btn-lg rounded-pill fw-bold">Voir nos offres</button>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .bg-light-soft { background-color: #fafafa; }
        .bg-success-soft { background-color: rgba(0, 89, 33, 0.05); }
        .fw-black { font-weight: 900; }
        .text-outline { color: transparent; -webkit-text-stroke: 1.5px #005921; }
        .x-small { font-size: 0.7rem; }
        .tracking-widest { letter-spacing: 0.25em; }
        .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); }
        .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
        
        .hover-translate-up:hover { transform: translateY(-10px); }
        .grayscale-hover { filter: grayscale(100%); }
        .grayscale-hover:hover { filter: grayscale(0%); transform: scale(1.05); }

        .main-hero-img { 
          border-radius: 40px 120px 40px 40px; 
          max-height: 500px;
          object-fit: cover;
          width: 100%;
        }

        .member-img-wrapper { border: 4px solid #fff; }

        @media (max-width: 768px) {
          .display-4 { font-size: 2.5rem; }
          .display-5 { font-size: 2rem; }
        }
      `}} />
    </main>
  );
};

export default About;