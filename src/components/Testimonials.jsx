import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Mwana Christel Emmanuel",
    role: "Étudiant",
    videoUrl: "https://res.cloudinary.com/dgd1b6g44/video/upload/v1775127731/IMG_8840_cxd52d.mov",
    posterUrl: "https://res.cloudinary.com/dgd1b6g44/video/upload/v1775127731/IMG_8840_cxd52d.jpg",
    stars: 5
  },
  {
    id: 2,
    name: "Ngakono Rich",
    role: "Étudiant",
    videoUrl: "https://res.cloudinary.com/dgd1b6g44/video/upload/v1775127740/IMG_8762_apfv74.mov",
    posterUrl: "https://res.cloudinary.com/dgd1b6g44/video/upload/v1775127740/IMG_8762_apfv74.jpg",
    stars: 5
  },
  {
    id: 3,
    name: "Emmanuel Tinanga",
    role: "Étudiant",
    videoUrl: "https://res.cloudinary.com/dgd1b6g44/video/upload/v1775127744/IMG_8744_yw8rg2.mov",
    posterUrl: "https://res.cloudinary.com/dgd1b6g44/video/upload/v1775127744/IMG_8744_yw8rg2.jpg",
    stars: 5
  },
  {
    id: 4,
    name: "Etudiant ESGAE",
    role: "Étudiant",
    videoUrl: "https://res.cloudinary.com/dgd1b6g44/video/upload/v1775127883/1000873943_pwcsco.mp4",
    posterUrl: "https://res.cloudinary.com/dgd1b6g44/video/upload/v1775127883/1000873943_pwcsco.jpg",
    stars: 5
  },
  {
    id: 5,
    name: "Expérience Mova Pass",
    role: "Étudiants",
    videoUrl: "https://res.cloudinary.com/dgd1b6g44/video/upload/v1775127900/1000873380_a4vbsv.mov",
    posterUrl: "https://res.cloudinary.com/dgd1b6g44/video/upload/v1775127900/1000873380_a4vbsv.jpg",
    stars: 5
  },
  {
    id: 6,
    name: "Semain découverte - Vague du soir",
    role: "Etudiants",
    videoUrl: "https://res.cloudinary.com/dgd1b6g44/video/upload/v1775127742/IMG_8813_jgjada.mov",
    posterUrl: "https://res.cloudinary.com/dgd1b6g44/video/upload/v1775127742/IMG_8813_jgjada.jpg",
    stars: 5
  },
];

function Testimonials() {
  const [activeVideo, setActiveVideo] = useState(null);
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeVideo]);

  return (
    <section className="py-24 overflow-hidden bg-white section testimonials__v2" id="testimonials">
      <div className="container mb-5">
        <div className="text-center row justify-content-center">
          <div className="col-lg-8">
            <div className="gap-2 mb-3 d-flex align-items-center justify-content-center" data-aos="fade-up">
              <span style={{ width: '30px', height: '2px', backgroundColor: '#005921' }}></span>
              <span className="tracking-widest text-uppercase fw-bold text-success" style={{ fontSize: '0.75rem' }}>
                La Voix de nos Usagers
              </span>
              <span style={{ width: '30px', height: '2px', backgroundColor: '#005921' }}></span>
            </div>
            <h2 className="mb-3 display-8 fw-bolder text-dark" data-aos="fade-up" data-aos-delay="100">
              Leur expérience <span style={{ color: '#005921' }}>Móva</span> en vidéo
            </h2>
            <p className="mx-auto text-muted fs-6" style={{ maxWidth: '600px' }} data-aos="fade-up" data-aos-delay="200">
              Découvrez pourquoi des dizaines d'étudiants et professionnels choisissent <strong>Móva</strong> pour transformer leurs trajets quotidiens.
            </p>
          </div>
        </div>
      </div>

      <div className="testimonials-marquee-wrapper">
        <div className="marquee-track">
          {duplicatedTestimonials.map((t, index) => (
            <div 
              className="testimonial-reel-card" 
              key={`${t.id}-${index}`}
              onClick={() => setActiveVideo(t)}
            >
              <div className="shadow-xl reel-thumb-container">
                <img src={t.posterUrl} alt={t.name} className="reel-poster" loading="lazy" />
                <div className="reel-overlay-top">
                   <div className="stars-pill">
                     <i className="bi bi-star-fill me-1"></i> {t.stars}.0
                   </div>
                </div>
                <div className="reel-overlay-bottom">
                  <h6 className="mb-0 text-white fw-bold">{t.name}</h6>
                  <p className="mb-0 text-white-50 small">{t.role}</p>
                </div>
                <div className="play-hint">
                  <div className="play-pulse">
                    <i className="bi bi-play-fill"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeVideo && (
        <div className="cinematic-modal-overlay" onClick={() => setActiveVideo(null)}>
          <div className="cinematic-modal-content" onClick={e => e.stopPropagation()}>
            
            {/* Improved Close Button Position */}
            <button className="btn-close-cinematic" onClick={() => setActiveVideo(null)} aria-label="Close">
              <i className="bi bi-x-lg"></i>
            </button>
            
            <div className="overflow-hidden shadow-2xl video-wrapper rounded-5">
                <video 
                  controls 
                  autoPlay 
                  playsInline
                  preload="auto"
                  src={activeVideo.videoUrl}
                  className="main-video-player"
                >
                  Votre navigateur ne supporte pas la vidéo.
                </video>
            </div>

            <div className="mt-3 text-center text-white mt-md-4 modal-caption">
               <h4 className="mb-1 fw-bold fs-5 fs-md-4">{activeVideo.name}</h4>
               <p className="opacity-75 small fs-md-6">{activeVideo.role}</p>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .fw-black { font-weight: 900; }
        .tracking-widest { letter-spacing: 0.2em; }

        .testimonials-marquee-wrapper {
          position: relative;
          padding: 20px 0;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }

        .marquee-track {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: marquee-scroll 60s linear infinite;
        }

        .marquee-track:hover { animation-play-state: paused; }

        .testimonial-reel-card {
          width: 280px;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.2, 1, 0.3, 1);
        }

        .testimonial-reel-card:hover { transform: scale(1.03) translateY(-8px); }

        .reel-thumb-container {
          position: relative;
          aspect-ratio: 9/16;
          border-radius: 24px;
          overflow: hidden;
          background: #111;
        }

        .reel-poster {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .testimonial-reel-card:hover .reel-poster { transform: scale(1.1); }

        .reel-overlay-top {
          position: absolute;
          top: 15px;
          left: 15px;
        }

        .stars-pill {
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
          color: #ffc107;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: bold;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .reel-overlay-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 30px 20px 20px;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        }

        .play-hint {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.1);
          opacity: 0;
          transition: 0.3s;
        }

        .testimonial-reel-card:hover .play-hint { opacity: 1; }

        .play-pulse {
          width: 60px;
          height: 60px;
          background: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #005921;
          font-size: 1.5rem;
          box-shadow: 0 0 0 0 rgba(255,255,255,0.4);
          animation: pulse-white 2s infinite;
        }

        @keyframes pulse-white {
          0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.4); }
          70% { box-shadow: 0 0 0 15px rgba(255,255,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }

        /* Modal Cinematic Player Optimized */
        .cinematic-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.95);
          backdrop-filter: blur(15px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px; /* Reduced for small devices */
        }

        .cinematic-modal-content {
          width: 100%;
          max-width: 420px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .video-wrapper {
          position: relative;
          width: 100%;
          background: #000;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .main-video-player {
          width: 100%;
          height: auto;
          max-height: 75vh;
          display: block;
        }

        /* Responsive Close Button */
        .btn-close-cinematic {
          position: absolute;
          top: -15px;
          right: -15px;
          width: 44px;
          height: 44px;
          background: #fff;
          border: none;
          color: #000;
          border-radius: 50%;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10001;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          transition: transform 0.2s ease;
        }

        .btn-close-cinematic:active {
          transform: scale(0.9);
        }

        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          .testimonial-reel-card { width: 200px; }
          .marquee-track { animation-duration: 35s; gap: 15px; }
          .display-5 { font-size: 2rem !important; }
          
          /* Mobile Modal specific adjustments */
          .cinematic-modal-content {
            max-width: 90vw;
          }
          .btn-close-cinematic {
            top: 10px;
            right: 10px;
            width: 36px;
            height: 36px;
            background: rgba(255,255,255,0.8);
            backdrop-filter: blur(4px);
          }
          .main-video-player {
            max-height: 70vh;
          }
        }
      `}} />
    </section>
  );
}

export default Testimonials;