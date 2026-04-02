import React, { useEffect, useRef, useState } from 'react';
import SEO from '../components/SEO';

const Counter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (countRef.current) observer.observe(countRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    // Clean the string (remove spaces) and convert to number
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

  return (
    <span ref={countRef}>
      {count.toLocaleString().replace(/,/g, ' ')}
    </span>
  );
};

const About = () => {

  const stats = [
    { value: "200", suffix: "+", label: "Courses réalisées", delay: 100 },
    { value: "2300", suffix: "", label: "Km parcourus", delay: 200 },
    { value: "95", suffix: "%", label: "Satisfaction client", delay: 300 },
    { value: "32", suffix: "+", label: "Abonnés", delay: 400 }
  ];

  return (
    <main className="overflow-hidden bg-white about-page">
      <SEO 
        title="À Propos | Móva Mobility" 
        description="Découvrez l'équipe et la vision derrière Móva Mobility en Afrique Centrale."
      />

      {/*  1. HERO: Design conservé, Tailles ajustées  */}
      <section className="py-20 bg-white position-relative">
        <div className="container">
          <div className="row align-items-center">
            <div className="mb-5 col-lg-6 mb-lg-0" data-aos="fade-up">
              <span className="mb-3 tracking-widest text-success fw-bold text-uppercase small d-block">Est. 2024</span>
              <h1 className="mb-4 display-5 fw-black text-dark lh-sm">
                La liberté de se déplacer <span className="text-outline">autrement</span>.
              </h1>
              <p className="text-muted fw-light pe-lg-5">
                Móva Mobility transforme le paysage urbain en Afrique Centrale avec des solutions agiles et à portée de main.
              </p>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="image-stack position-relative">
                <img 
                  src="/assets/images/bus-1.jpg" 
                  alt="Modern Transport Africa" 
                  className="shadow-lg img-fluid rounded-5 main-hero-img"
                />
                <div className="p-3 bg-white border shadow-lg experience-badge rounded-4 position-absolute top-50 start-0 translate-middle-x d-none d-md-block">
                  <span className="h4 fw-bold text-success">2300+</span>
                  <p className="mb-0 text-uppercase small fw-bold text-muted">Km parcourus</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  2. CEO SECTION: L'autorité  */}
      <section className="py-20 bg-light-soft">
        <div className="container">
          <div className="row align-items-center">
            <div className="mb-5 col-lg-5 mb-lg-0" data-aos="fade-right">
              <div className="position-relative">
                <img 
                  src="/assets/images/van.png" 
                  alt="CEO Móva" 
                  className="shadow-lg img-fluid rounded-5"
                />
                <div className="bottom-0 p-3 m-3 text-white shadow-lg bg-dark rounded-4 position-absolute end-0">
                  <h6 className="mb-0 text-white small fw-bold">Visionnaire en Chef</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-7 ps-lg-5" data-aos="fade-left">
              <h6 className="mb-3 text-success fw-bold text-uppercase small">Le Mot du Fondateur</h6>
              <h2 className="mb-4 h1 fw-semibold">"L'Afrique mérite une mobilité de classe mondiale."</h2>
              <div className="p-3 border-3 text-muted lh-base border-start border-success ps-4">
                <p>Née d’une vision audacieuse, Móva Mobility redéfinit les déplacements urbains grâce à des solutions inclusives et intelligentes, conçues pour répondre aux défis d'aujourd'hui.</p>
                <p className="mt-3 mb-0 fw-bold text-dark">Fondateur & CEO</p>
                <span className="small text-uppercase text-success">Móva Mobility</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/*  2. NOTRE MISSION: Focus Afrique Centrale  */}
      <section className="py-24 bg-light-soft">
        <div className="container">
          <div className="overflow-hidden bg-white border shadow-sm row g-0 align-items-stretch rounded-5">
            <div className="p-5 col-lg-6 p-lg-10 d-flex flex-column justify-content-center">
              <h6 className="mb-4 tracking-wider text-success fw-bold text-uppercase">Notre Vision</h6>
              <h2 className="mb-4 display-8 fw-bold">Une mobilité inclusive et intelligente.</h2>
              <div className="text-muted fs-7 lh-lg">
                <p>Née d’une vision audacieuse, Móva Mobility répond aux défis complexes du transport en Afrique Centrale. Nous ne faisons pas que déplacer des passagers ; nous créons des connexions fluides entre les foyers, les bureaux et les écoles.</p>
                <p className="mb-0">Que ce soit via notre <strong>Mova Pass</strong> pour vos trajets quotidiens ou <strong>Bus Access</strong> pour vos événements de groupe, notre promesse reste la même : un transport sans casse-tête.</p>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div 
                className="h-100 min-vh-50"
                style={{ 
                  backgroundImage: 'url("https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/*  3. TEAM: L'Équipe  */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="mb-5 text-center">
            <h6 className="tracking-widest text-success fw-bold text-uppercase small">L'Équipe</h6>
            <h2 className="h2 fw-bold">Les esprits derrière Mova.</h2>
          </div>
          <div className="row g-4 justify-content-center">
            {[
              { role: "CEO, Co-fondateur", name: "Van Christ BOUETOUMOUSSA", img: "/assets/images/van.png" },
              { role: "COO, Co-fondateur", name: "Switch Aimé", img: "/assets/images/switch.jpg" },
              { role: "Lead Software Developer", name: "Arden BOUETOUMOUSSA", img: "/assets/images/arden.png" },
              { role: "Responsable du centre opérationnel", name: "Christina Inkiame", img: "/assets/images/christina.jpg" }
            ].map((member, i) => (
              <div className="col-6 col-md-3" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="text-center">
                  <div className="mx-auto mb-3 overflow-hidden rounded-circle" style={{ width: '120px', height: '120px' }}>
                    <img src={member.img} alt={member.name} className="img-fluid grayscale-hover object-fit-cover w-100 h-100" />
                  </div>
                  <h6 className="mb-1 fw-bold">{member.name}</h6>
                  <p className="mb-0 text-uppercase text-success fw-bold" style={{ fontSize: '0.7rem' }}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  4. CHIFFRES CLÉS: Impact  */}
        <section className="row g-0">
          <div className="col-12">
            <div 
              className="flex-wrap p-5 overflow-hidden border shadow-sm content rounded-5 d-flex justify-content-around align-items-center position-relative" 
              data-aos="fade-up" 
              style={{ backgroundColor: '#005921' }} // Changed to primary green for a bold look
            >
              {/* Internal decorative lines */}
              <div className="rounded-borders opacity-10">
                <div className="rounded-border-1"></div>
                <div className="rounded-border-2"></div>
                <div className="rounded-border-3"></div>
              </div>

              {stats.map((stat, index) => (
                <div key={index} className="px-2 mb-4 text-center col-6 col-md-3 mb-md-0 position-relative z-1" data-aos="fade-up" data-aos-delay={stat.delay}>
                  <div className="stat-item">
                    <h3 className="mb-1 text-white display-5 fw-bolder">
                      <Counter end={stat.value} />
                      <span className="fs-3 ms-1" style={{ opacity: 0.8 }}>{stat.suffix}</span>
                    </h3>
                    <p className="mb-0 text-white-50 fw-medium text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


      <style dangerouslySetInnerHTML={{__html: `
        .bg-light-soft { background-color: #fcfcfc; }
        .fw-black { font-weight: 900; }
        .text-outline { color: transparent; -webkit-text-stroke: 1px #005921; }
        .x-small { font-size: 0.75rem; }
        
        .shadow-lg { box-shadow: 0 1rem 3rem rgba(0,0,0,.1) !important; }

        .grayscale-hover {
          filter: grayscale(100%);
          transition: 0.4s ease;
        }
        .grayscale-hover:hover {
          filter: grayscale(0%);
        }

        .main-hero-img { 
          border-radius: 30px 80px 30px 30px; 
          max-height: 450px;
          object-fit: cover;
        }
        
        .bg-circle-accent {
          position: absolute; top: -50%; right: -10%;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .hover-scale:hover { transform: translateY(-3px); transition: 0.3s; }

        @media (max-width: 991px) {
          .display-5 { font-size: 2.2rem; }
        }
      `}} />
    </main>
  );
};

export default About;