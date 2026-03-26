import React from 'react';
// (Note: ReservationModal n'est pas utilisé directement ici s'il est dans App.jsx, 
// mais nous utilisons setShowModal pour le bouton)

function Hero({ setShowModal }) {
  return (
    <section className="relative pb-16 overflow-hidden pt-28 bg-gray-50 lg:pt-36 lg:pb-24" id="home">
      
      {/* Lueur d'arrière-plan très subtile */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[var(--bs-primary,#0d6efd)]/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="container relative z-10 px-4 mx-auto max-w-7xl">
        <div className="row align-items-center g-5">
          
          {/* Colonne Gauche : Texte & Boutons */}
          <div className="mb-5 col-lg-6 mb-lg-0">
            <div className="pe-lg-4">
              
              {/* Badge Élégant */}
              <div data-aos="fade-up" data-aos-delay="0">
                <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-bold tracking-widest text-[var(--bs-primary,#0d6efd)] uppercase bg-[var(--bs-primary,#0d6efd)]/10 rounded-full">
                  <span className="w-1.5 h-1.5 bg-[var(--bs-primary,#0d6efd)] rounded-full"></span>
                  Móva Mobility
                </span>
              </div>
              
              {/* Titre Principal */}
              <h1 
                className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-6xl lg:leading-[1.1]" 
                data-aos="fade-up" 
                data-aos-delay="100"
              >
                Parce que se déplacer, <br />
                <span style={{ color: "#005921" }}>c'est exister</span>
              </h1>
              
              {/* Paragraphe de description */}
              <p 
                className="max-w-lg mb-10 text-lg leading-relaxed text-gray-600 md:text-xl" 
                data-aos="fade-up" 
                data-aos-delay="200"
              >
                Móva Mobility, c’est la liberté de se déplacer autrement : simple, agile et à portée de main. Découvrez une nouvelle dimension du transport urbain.
              </p>
              
              {/* Call to Actions (Boutons) */}
              <div 
                className="flex flex-wrap items-center gap-4" 
                data-aos="fade-up" 
                data-aos-delay="300"
              >
                {/* Bouton Principal (Ouvre la modale !) */}
                <button 
                  onClick={() => setShowModal(true)}
                  className="px-8 py-3.5 text-base font-bold text-white bg-[var(--bs-primary,#0d6efd)] border-none rounded-full hover:brightness-110 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 group"
                >
                  Je réserve mon bus
                  <i className="transition-transform duration-300 bi bi-arrow-right group-hover:translate-x-1"></i>
                </button>
                
                {/* Bouton Secondaire */}
                <a 
                  href="#features" 
                  className="px-8 py-3.5 text-base font-bold text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm flex items-center gap-2 group !no-underline"
                  style={{ textDecoration: 'none' }}
                >
                  En savoir plus 
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

          {/* Colonne Droite : Vidéo */}
          <div className="col-lg-6">
            <div 
              className="relative w-full overflow-hidden shadow-2xl rounded-[2.5rem] group bg-gray-900"
              data-aos="fade-in" 
              data-aos-delay="400"
            >
              {/* Vidéo HTML5 avec attributs obligatoires pour lecture automatique */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105 aspect-[4/3] sm:aspect-video lg:aspect-square"
                poster="/assets/images/buses.jpg" // Image affichée pendant le chargement
              >
                {/* REMPLACEZ CE LIEN PAR LE CHEMIN DE VOTRE VIDÉO */}
                <source src="/assets/videos/hero-video.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>

              {/* Overlay subtil pour donner un aspect premium "cinématique" */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/20 to-transparent mix-blend-multiply"></div>
              
              {/* Bordure intérieure subtile façon Apple */}
              <div className="absolute inset-0 border pointer-events-none border-white/10 rounded-[2.5rem]"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;