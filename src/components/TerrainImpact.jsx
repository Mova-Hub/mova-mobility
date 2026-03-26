import React, { useState, useEffect, useRef } from 'react';

// Sub-component for the counting animation
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

function TerrainImpact() {
  const stats = [
    { value: "200", suffix: "+", label: "Courses réalisées", delay: 100 },
    { value: "2300", suffix: "", label: "Km parcourus", delay: 200 },
    { value: "95", suffix: "%", label: "Satisfaction client", delay: 300 },
    { value: "32", suffix: "+", label: "Abonnés", delay: 400 }
  ];

  return (
    <section className="py-24 overflow-hidden section stats__v3 position-relative" id="terrain-impact" style={{ backgroundColor: '#ffffff' }}>
      
      {/* Background Decor */}
      <div className="top-0 pointer-events-none position-absolute start-0 w-100 h-100 opacity-5" 
           style={{ backgroundImage: 'radial-gradient(#005921 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="container position-relative z-1">
        
        {/* Header */}
        <div className="mb-5 row pb-lg-4">
          <div className="mx-auto text-center col-md-8">
            <div className="gap-2 mb-3 d-flex align-items-center justify-content-center" data-aos="fade-up">
              <span style={{ width: '20px', height: '2px', backgroundColor: '#005921' }}></span>
              <span className="text-uppercase fw-bold" style={{ color: '#005921', fontSize: '0.75rem', letterSpacing: '2px' }}>
                Chiffres Clés
              </span>
              <span style={{ width: '20px', height: '2px', backgroundColor: '#005921' }}></span>
            </div>
            <h2 className="mb-3 display-8 fw-bolder text-dark" data-aos="fade-up" data-aos-delay="100">
              Notre impact sur la mobilité
            </h2>
            <p className="text-muted fs-6" data-aos="fade-up" data-aos-delay="200">
              Découvrez comment <strong>Móva Mobility</strong> transforme les déplacements avec des services fiables et des performances mesurables.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="row g-0">
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
        </div>

        {/* Partners Section */}
        <div className="mt-5 row pt-lg-5">
          <div className="mx-auto text-center col-md-6">
            <h4 className="mt-2 mb-4 fs-6 fw-bold text-uppercase text-muted" data-aos="fade-up" data-aos-delay="500" style={{ letterSpacing: '1px' }}>
              Ils soutiennent le mouvement
            </h4>
            
            <div className="flex-wrap gap-5 d-flex align-items-center justify-content-center grayscale-filter" data-aos="fade-up" data-aos-delay="600">
              <img 
                src="/assets/images/partner/pepite.png" 
                alt="Pépite" 
                className="img-fluid partner-logo" 
                style={{ width: "120px", opacity: 0.6, transition: 'all 0.3s ease' }} 
              />
            </div>

            <div className="mt-5" data-aos="fade-up" data-aos-delay="700">
              <span className="px-4 py-2 border rounded-pill bg-light fw-bold text-dark" style={{ fontSize: '0.85rem' }}>
                🚀 Rejoignez le mouvement <span style={{ color: '#005921' }}>#MonTrajetMova</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .partner-logo:hover {
          filter: grayscale(0%);
          opacity: 1 !important;
          transform: scale(1.05);
        }
        .grayscale-filter img {
          filter: grayscale(100%);
        }
        .rounded-borders div {
          position: absolute;
          border: 1px solid white;
          border-radius: 50%;
        }
        .rounded-border-1 { width: 300px; height: 300px; top: -150px; left: -100px; }
        .rounded-border-2 { width: 200px; height: 200px; bottom: -100px; right: -50px; }
        .rounded-border-3 { width: 100px; height: 100px; top: 20%; right: 10%; }

        @media (max-width: 768px) {
          .stat-item h3 {
            font-size: calc(1.5rem + 1.5vw) !important;
          }
        }
      `}} />
    </section>
  );
}

export default TerrainImpact;