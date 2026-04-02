import React, { useState } from 'react';

function Hero() {
  const [showHeroVideo, setShowHeroVideo] = useState(false);

  // Cloudinary URLs
  const videoUrl = "https://res.cloudinary.com/dgd1b6g44/video/upload/v1775127900/1000873380_a4vbsv.mov";
  const posterUrl = "https://res.cloudinary.com/dgd1b6g44/video/upload/v1775127900/1000873380_a4vbsv.jpg";

  return (
    <>
      <section className="relative pb-16 overflow-hidden bg-white pt-28 lg:pt-36 lg:pb-24" id="home">
        
        {/* Lueur d'arrière-plan logicielle */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-[var(--bs-primary,#0d6efd)]/5 blur-[100px] rounded-full"></div>
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-7xl">
          <div className="row align-items-center g-5">
            
            {/* TEXT CONTENT */}
            <div className="mb-5 col-lg-6 mb-lg-0">
              <div className="pe-lg-5">
                <div data-aos="fade-up">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-[10px] font-black tracking-[0.2em] text-success uppercase bg-success/5 border border-success/10 rounded-full">
                    <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
                    The Future of Mobility
                  </span>
                </div>
                
                <h1 
                  className="mb-6 text-5xl font-black leading-[1.1] tracking-tighter text-dark md:text-7xl" 
                  data-aos="fade-up" data-aos-delay="100"
                >
                  Déplacez-vous sans <br />
                  <span style={{ color: "#005921" }}>friction.</span>
                </h1>
                
                <p 
                  className="max-w-lg mb-10 text-lg leading-relaxed text-gray-600 md:text-xl" 
                  data-aos="fade-up" data-aos-delay="200"
                >
                  Móva Mobility transforme chaque trajet en une expérience fluide. Suivez votre bus en temps réel et gérez vos abonnements depuis votre poche.
                </p>
                
                <div 
                  className="flex flex-wrap items-center gap-3" 
                  data-aos="fade-up" data-aos-delay="300"
                >
                  <a 
                    href="/#movapass" 
                    className="px-8 py-3.5 text-sm font-bold text-white bg-[var(--bs-primary,#0d6efd)] border-none rounded-full hover:bg-[var(--bs-primary-hover,#0a58a2)] transition-all shadow-xl hover:-translate-y-1 flex items-center gap-2 !no-underline"
                  >
                    Obtenir l'App
                    <i className="bi bi-apple"></i>
                    <i className="bi bi-google-play"></i>
                  </a>
                  
                  <a 
                    href="/contact" 
                    className="px-8 py-3.5 text-sm font-bold text-dark bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all flex items-center gap-2 !no-underline"
                  >
                    Besoin d'une flotte ?
                    <svg 
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" 
                      xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M7 7h10v10"></path>
                      <path d="M7 17 17 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* VIDEO TRIGGER COLUMN */}
            <div className="col-lg-6">
              <div 
                className="relative cursor-pointer group"
                data-aos="zoom-in" data-aos-delay="400"
                onClick={() => setShowHeroVideo(true)}
              >
                {/* Static Image / Poster */}
                <div className="relative overflow-hidden shadow-2xl rounded-[2.5rem] bg-gray-100 aspect-video lg:aspect-square">
                  <img 
                    src={posterUrl} 
                    alt="Mova Video Preview" 
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle Dark Overlay */}
                  <div className="absolute inset-0 transition-opacity bg-black/20 group-hover:opacity-40"></div>

                  {/* Glass Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center justify-center w-20 h-20 transition-all border rounded-full shadow-2xl bg-white/20 backdrop-blur-md border-white/30 group-hover:scale-110 group-hover:bg-white/30">
                       <div className="flex items-center justify-center bg-white rounded-full shadow-lg w-14 h-14">
                          <i className="text-3xl bi bi-play-fill text-success ms-1"></i>
                       </div>
                    </div>
                  </div>

                  {/* Floating Caption */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="p-4 border bg-white/10 backdrop-blur-lg border-white/10 rounded-2xl">
                       <p className="flex items-center gap-2 mb-0 text-sm font-bold text-white">
                         <i className="bi bi-info-circle"></i>
                         Découvrir Móva en 45 secondes
                       </p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute w-32 h-32 rounded-full -z-1 -bottom-6 -right-6 bg-success/10 blur-2xl"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CINEMATIC VIDEO MODAL */}
      {showHeroVideo && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4" onClick={() => setShowHeroVideo(false)}>
          <div className="absolute inset-0 transition-opacity bg-black/95 backdrop-blur-xl"></div>
          
          <div className="relative w-full max-w-5xl overflow-hidden shadow-2xl aspect-video rounded-3xl animate-modal-pop" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute z-20 flex items-center justify-center w-10 h-10 text-white transition-colors rounded-full top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-md"
              onClick={() => setShowHeroVideo(false)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
            
            <video 
              controls 
              autoPlay 
              className="object-contain w-full h-full bg-black"
              src={videoUrl}
            />
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .fw-black { font-weight: 900; }
        .text-outline { color: transparent; -webkit-text-stroke: 1px #005921; }
        
        @keyframes modal-pop {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-pop {
          animation: modal-pop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </>
  );
}

export default Hero;

