// src/components/HomeJobSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function HomeJobSection() {
  return (
    <section className="py-16 font-sans bg-gray-50 lg:py-24" id="careers-intro">
      <div className="container px-4 mx-auto max-w-7xl">
        
        {/* EN-TÊTE & ILLUSTRATION */}
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
          <div className="w-full lg:w-1/2" data-aos="fade-right">
            <span className="text-[var(--bs-primary,#0d6efd)] font-semibold tracking-wider uppercase text-xs mb-3 block">
              Rejoignez l'aventure
            </span>
            <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-gray-900 lg:text-5xl">
              Construisons ensemble <br className="hidden lg:block" /> la mobilité de demain.
            </h2>
            <p className="max-w-xl mb-8 text-lg leading-relaxed text-gray-600">
              Chez Mova, nous cherchons des esprits brillants pour résoudre des défis complexes et rendre les villes (en France comme en République du Congo) plus accessibles et fluides.
            </p>
            
            {/* CALL TO ACTION VERS LA PAGE CARRIÈRES */}
            <a 
              href="/carrieres" 
              className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-bold text-white bg-[var(--bs-primary,#0d6efd)] rounded-full hover:brightness-110 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 group !no-underline"
              style={{ textDecoration: 'none' }}
            >
              Voir les postes disponibles
              <i className="transition-transform bi bi-arrow-right group-hover:translate-x-1"></i>
            </a>
          </div>
          
          <div className="w-full lg:w-5/12" data-aos="fade-left" data-aos-delay="100">
            <div className="relative overflow-hidden shadow-2xl rounded-3xl">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-transparent mix-blend-multiply"></div>
              <img 
                src="/assets/images/about_2-min.jpg" 
                alt="L'équipe Mova Mobility" 
                className="w-full h-[320px] lg:h-[420px] object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HomeJobSection;