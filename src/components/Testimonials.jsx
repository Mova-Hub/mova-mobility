import React from 'react';

const testimonials = [
  {
    id: 1,
    name: "Jean-Paul M'Boussi",
    role: "Responsable RH, LogiCorp",
    content: "Móva Mobility a radicalement changé la gestion de nos navettes d'entreprise. Ponctualité exemplaire et service client ultra-réactif.",
    avatar: "https://i.pravatar.cc/150?u=jp",
    stars: 5
  },
  {
    id: 2,
    name: "Sandrine Ngaloula",
    role: "Organisatrice d'événements",
    content: "Pour le transport de nos invités lors du dernier gala, la flotte était impeccable. Le suivi en temps réel est un vrai gage de sérénité.",
    avatar: "https://i.pravatar.cc/150?u=sn",
    stars: 5
  },
  {
    id: 3,
    name: "Patrice Zola",
    role: "Particulier",
    content: "Réserver un bus pour un voyage familial n'a jamais été aussi simple. L'application est intuitive et les chauffeurs sont très professionnels.",
    avatar: "https://i.pravatar.cc/150?u=pz",
    stars: 5
  },
  {
    id: 4,
    name: "Marie-Ève Itoua",
    role: "Directrice d'École",
    content: "La sécurité de nos élèves est notre priorité. Avec Móva, nous avons trouvé un partenaire de confiance pour toutes nos sorties scolaires.",
    avatar: "https://i.pravatar.cc/150?u=mi",
    stars: 5
  },
  {
    id: 5,
    name: "Christian Bakongo",
    role: "Consultant Logistique",
    content: "Une solution de mobilité moderne qui manquait à la région. Efficace, digitalisée et surtout très fiable au quotidien.",
    avatar: "https://i.pravatar.cc/150?u=cb",
    stars: 5
  }
];

function Testimonials() {
  // We duplicate the list to create a seamless infinite loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 overflow-hidden bg-gray-50 section testimonials__v1" id="testimonials">
      <div className="container mb-5">
        <div className="text-center row justify-content-center">
          <div className="col-lg-7">
            <div className="gap-2 mb-3 d-flex align-items-center justify-content-center" data-aos="fade-up">
              <span style={{ width: '20px', height: '2px', backgroundColor: '#005921' }}></span>
              <span className="text-uppercase fw-bold" style={{ color: '#005921', fontSize: '0.75rem', letterSpacing: '2px' }}>
                Témoignages
              </span>
              <span style={{ width: '20px', height: '2px', backgroundColor: '#005921' }}></span>
            </div>
            <h2 className="mb-4 display-7 fw-bolder text-dark" data-aos="fade-up" data-aos-delay="100">
              Ils nous font <span style={{ color: '#005921' }}>confiance</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Marquee Wrapper */}
      <div className="mt-4 testimonials-marquee">
        <div className="marquee-content">
          {duplicatedTestimonials.map((t, index) => (
            <div className="p-4 mx-3 bg-white border-0 shadow-sm testimonial-card rounded-4" key={index}>
              <div className="gap-3 mb-4 d-flex align-items-center">
                <div>
                  <h6 className="mb-0 fw-bold text-dark">{t.name}</h6>
                  <small className="text-muted">{t.role}</small>
                </div>
              </div>
              
              <div className="gap-1 mb-3 d-flex" style={{ color: '#ffc107', fontSize: '0.8rem' }}>
                {[...Array(t.stars)].map((_, i) => (
                  <i key={i} className="bi bi-star-fill"></i>
                ))}
              </div>

              <p className="mb-0 italic text-dark fs-6 lh-relaxed">
                "{t.content}"
              </p>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .testimonials-marquee {
          display: flex;
          overflow: hidden;
          user-select: none;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .marquee-content {
          display: flex;
          flex-shrink: 0;
          gap: 20px;
          min-width: 100%;
          animation: scroll-left 40s linear infinite;
        }

        .testimonial-card {
          width: 380px;
          flex-shrink: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px -10px rgba(0,0,0,0.1) !important;
        }

        .testimonials-marquee:hover .marquee-content {
          animation-play-state: paused;
        }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          .testimonial-card {
            width: 300px;
          }
          .marquee-content {
            animation-duration: 30s;
          }
        }
      `}} />
    </section>
  );
}

export default Testimonials;