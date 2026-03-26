import React, { useState, useEffect, useMemo } from 'react';
import SEO from '../components/SEO';

// MOCK DATA ENRICHIES
const JOB_OPENINGS = [
  {
    id: 1,
    title: "Ingénieur(e) React Native Senior",
    department: "Ingénierie",
    location: "Paris",
    country: "France",
    workMode: "Hybride",
    contractType: "Temps plein",
    shortDesc: "Rejoignez notre équipe mobile pour perfectionner l'application Mova au cœur de l'expérience de nos utilisateurs.",
    responsibilities: [
      "Développer et maintenir de nouvelles fonctionnalités pour l'application Mova Pass.",
      "Optimiser les performances et la fluidité de l'interface sur iOS et Android.",
      "Collaborer étroitement avec l'équipe de design pour garantir une UI/UX irréprochable.",
      "Mentorer les développeurs juniors de l'équipe."
    ],
    requirements: [
      "5+ années d'expérience en développement mobile (React Native exigé).",
      "Maîtrise de TypeScript et de la gestion d'état (Redux, Zustand ou Context).",
      "Expérience avec l'intégration d'APIs de cartographie (Mapbox/Google Maps).",
      "Sens aigu du détail et du design (Pixel perfect)."
    ],
    benefits: [
      "Mutuelle d'entreprise prise en charge à 100%.",
      "Mova Pass illimité gratuit.",
      "Budget d'équipement pour le télétravail.",
      "Titres-restaurant (Carte Swile)."
    ]
  },
  {
    id: 2,
    title: "Product Manager - Mobilité",
    department: "Produit",
    location: "Brazzaville",
    country: "République du Congo",
    workMode: "Sur site",
    contractType: "Temps plein",
    shortDesc: "Pilotez la vision de notre offre Mova Pass et définissez la roadmap pour révolutionner le transport urbain.",
    responsibilities: [
      "Définir la vision produit et la roadmap stratégique du Mova Pass.",
      "Analyser les données d'utilisation pour identifier les opportunités d'amélioration.",
      "Animer les rituels agiles avec l'équipe technique.",
      "Interagir avec les utilisateurs pour comprendre leurs besoins profonds."
    ],
    requirements: [
      "3+ années d'expérience en tant que Product Manager dans la tech ou la mobilité.",
      "Excellente capacité de communication et de leadership.",
      "Approche data-driven (amplitude, mixpanel, SQL de base).",
      "Capacité à simplifier des problèmes complexes."
    ],
    benefits: [
      "Assurance santé premium.",
      "Primes de performance annuelles.",
      "Mova Pass illimité gratuit.",
      "Accès à des formations continues de haut niveau."
    ]
  },
  {
    id: 3,
    title: "Spécialiste Support Client",
    department: "Opérations",
    location: "Pointe-Noire",
    country: "République du Congo",
    workMode: "Remote",
    contractType: "Temps plein",
    shortDesc: "Soyez la voix de Mova et accompagnez nos usagers au quotidien pour leur garantir la meilleure expérience possible.",
    responsibilities: [
      "Répondre aux demandes des utilisateurs via chat, email et téléphone.",
      "Résoudre les problèmes liés aux abonnements Mova Pass.",
      "Faire remonter les bugs critiques à l'équipe technique.",
      "Contribuer à l'amélioration de notre centre d'aide (FAQ)."
    ],
    requirements: [
      "Excellente expression écrite et orale en français.",
      "Forte empathie et patience à toute épreuve.",
      "Aisance avec les outils informatiques (Zendesk, Intercom, etc.).",
      "Une première expérience en support client est un plus."
    ],
    benefits: [
      "Horaires flexibles (100% Remote).",
      "Allocation internet et téléphone.",
      "Mova Pass illimité gratuit.",
      "Équipe bienveillante et dynamique."
    ]
  }
];

function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // ÉTATS DES FILTRES
  const [filters, setFilters] = useState({
    country: '',
    department: '',
    workMode: '',
    contractType: ''
  });

  // Extraction dynamique des options de filtres
  const filterOptions = useMemo(() => {
    return {
      countries: [...new Set(JOB_OPENINGS.map(job => job.country))],
      departments: [...new Set(JOB_OPENINGS.map(job => job.department))],
      workModes: [...new Set(JOB_OPENINGS.map(job => job.workMode))],
      contractTypes: [...new Set(JOB_OPENINGS.map(job => job.contractType))]
    };
  }, []);

  // Filtrage des offres
  const filteredJobs = useMemo(() => {
    return JOB_OPENINGS.filter(job => {
      return (
        (filters.country === '' || job.country === filters.country) &&
        (filters.department === '' || job.department === filters.department) &&
        (filters.workMode === '' || job.workMode === filters.workMode) &&
        (filters.contractType === '' || job.contractType === filters.contractType)
      );
    });
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Verrouiller le défilement et réinitialiser le form quand la modale change
  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = 'hidden';
      setHasSubmitted(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedJob]);

  // Simulation de soumission de candidature
  const handleSubmitApplication = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simuler un appel API
    setTimeout(() => {
      setIsSubmitting(false);
      setHasSubmitted(true);
    }, 1500);
  };

  // Composant réutilisable pour les Selects des filtres
  const FilterSelect = ({ name, value, options, placeholder }) => (
    <div className="relative w-full">
      <select
        name={name}
        value={value}
        onChange={handleFilterChange}
        className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--bs-primary,#0d6efd)]/20 focus:border-[var(--bs-primary,#0d6efd)] transition-all cursor-pointer shadow-sm text-sm font-medium"
      >
        <option value="">{placeholder}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 pointer-events-none">
        <i className="text-xs bi bi-chevron-down"></i>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 font-sans">
      <SEO 
        title="Carrières & Emplois" 
        description="Rejoignez l'équipe Mova Mobility. Découvrez nos offres d'emploi en ingénierie, produit et opérations."
      />

     {/* PAGE HERO SECTION */}
      <div className="container px-4 pt-2 pb-12 mx-auto max-w-8xl">
        <section className="relative flex flex-col items-center justify-center min-h-[60vh] overflow-hidden bg-gray-900 rounded-[2rem]">
          
          {/* Background Image */}
          <img 
            src="https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2072&auto=format&fit=crop" 
            alt="Mobilité urbaine Mova" 
            className="absolute inset-0 object-cover w-full h-full"
          />

          {/* Solid, uniform overlay: No gradients, no messy blurs, ensuring perfect text contrast */}
          <div className="absolute inset-0 bg-gray-900/65"></div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center w-full max-w-3xl px-6 py-20 mx-auto text-center">
            
            {/* Minimalist Badge */}
            <span 
              data-aos="fade-down"
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-bold tracking-widest text-white uppercase border rounded-full border-white/20 bg-black/40"
            >
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Nous recrutons
            </span>

            {/* Sharp Typography */}
            <h1 
              data-aos="fade-up" data-aos-delay="100"
              className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Façonnez l'avenir de la mobilité urbaine
            </h1>

            {/* Readable, balanced paragraph */}
            <p 
              data-aos="fade-up" data-aos-delay="200"
              className="max-w-2xl text-lg font-normal leading-relaxed text-gray-200 sm:text-xl"
            >
              Chez Mova, nous ne faisons pas que déplacer des bus, nous connectons des vies. 
              Rejoignez une équipe de passionnés et aidez-nous à réinventer les déplacements de millions de personnes.
            </p>

            {/* Elegant, clean interaction button */}
            <button 
              onClick={() => {
                document.getElementById('open-positions').scrollIntoView({ behavior: 'smooth' });
              }}
              data-aos="fade-up" data-aos-delay="300"
              className="flex items-center justify-center mt-12 transition-colors border rounded-full w-14 h-14 text-white/90 border-white/30 hover:bg-white hover:text-gray-900 focus:outline-none"
              aria-label="Voir les offres"
            >
              <i className="text-xl bi bi-arrow-down"></i>
            </button>
          </div>
        </section>
      </div>

      <div className="container px-4 pb-24 mx-auto max-w-7xl" id="open-positions">
        
        {/* SYSTÈME DE FILTRAGE */}
        {/* <div className="p-4 mb-10 bg-white border border-gray-100 shadow-sm sm:p-6 rounded-2xl" data-aos="fade-up">
          <div className="flex items-center gap-2 mb-4 font-bold text-gray-900">
            <i className="bi bi-funnel"></i> Filtrer les offres
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FilterSelect name="country" value={filters.country} options={filterOptions.countries} placeholder="Tous les pays" />
            <FilterSelect name="department" value={filters.department} options={filterOptions.departments} placeholder="Tous les départements" />
            <FilterSelect name="workMode" value={filters.workMode} options={filterOptions.workModes} placeholder="Mode de travail" />
            <FilterSelect name="contractType" value={filters.contractType} options={filterOptions.contractTypes} placeholder="Type de contrat" />
          </div>
        </div> */}

        {/* LISTE DES OFFRES */}
        <div data-aos="fade-up" data-aos-delay="100">
          <h3 className="flex items-end justify-between pb-4 mb-8 text-xl font-bold text-gray-900 border-b border-gray-200">
            <span>Postes ouverts</span>
            <span className="px-3 py-1 text-sm font-medium text-gray-500 bg-gray-100 rounded-full">{filteredJobs.length} résultat(s)</span>
          </h3>
          
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <div 
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="flex flex-col h-full p-8 transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer rounded-2xl hover:shadow-xl hover:-translate-y-1 hover:border-[var(--bs-primary,#0d6efd)]/30 group"
                >
                  <div className="mb-5">
                    <div className="flex items-start justify-between mb-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">
                        {job.department}
                      </span>
                      {job.workMode === 'Remote' && (
                        <span className="inline-block px-2 py-1 text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 rounded uppercase tracking-wider">
                          Remote
                        </span>
                      )}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--bs-primary,#0d6efd)] transition-colors leading-tight">
                      {job.title}
                    </h4>
                    <div className="flex flex-wrap items-center text-xs font-medium text-gray-500 gap-x-3 gap-y-2">
                      <span className="flex items-center gap-1.5"><i className="bi bi-geo-alt"></i> {job.location}, {job.country}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="flex items-center gap-1.5"><i className="bi bi-briefcase"></i> {job.contractType}</span>
                    </div>
                  </div>
                  
                  <p className="flex-grow mb-6 text-sm leading-relaxed text-gray-600 line-clamp-3">
                    {job.shortDesc}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-[var(--bs-primary,#0d6efd)] font-semibold text-sm">
                    Découvrir le poste 
                    <i className="ml-2 transition-transform bi bi-arrow-right group-hover:translate-x-1"></i>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-white border border-gray-100 rounded-2xl">
              <i className="block mb-3 text-4xl text-gray-300 bi bi-search"></i>
              <h4 className="text-lg font-bold text-gray-900">Aucune offre ne correspond à vos critères</h4>
              <p className="mt-2 text-gray-500">Essayez de modifier vos filtres pour voir d'autres opportunités.</p>
              <button 
                onClick={() => setFilters({ country: '', department: '', workMode: '', contractType: '' })}
                className="mt-4 text-sm font-semibold text-[var(--bs-primary,#0d6efd)] hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

      </div>

      {/* MODALE DE DÉTAILS DE L'OFFRE & CANDIDATURE (Unchanged) */}
      {selectedJob && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 transition-opacity bg-gray-900/70 backdrop-blur-sm"
            onClick={() => setSelectedJob(null)}
          ></div>

          <div 
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col z-10 animate-fade-in-up overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Header Fixe */}
            <div className="flex items-start justify-between px-6 py-5 bg-white border-b border-gray-100 sm:px-10 sm:py-6 shrink-0">
              <div>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {selectedJob.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-600 sm:gap-4">
                  <span className="flex items-center gap-1.5"><i className="bi bi-geo-alt text-[var(--bs-primary,#0d6efd)]"></i> {selectedJob.location}, {selectedJob.country}</span>
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                  <span className="flex items-center gap-1.5"><i className="bi bi-building text-[var(--bs-primary,#0d6efd)]"></i> {selectedJob.workMode}</span>
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                  <span className="flex items-center gap-1.5"><i className="bi bi-clock text-[var(--bs-primary,#0d6efd)]"></i> {selectedJob.contractType}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedJob(null)}
                className="flex items-center justify-center w-10 h-10 text-gray-400 transition-colors rounded-full hover:text-gray-900 bg-gray-50 hover:bg-gray-200 focus:outline-none"
              >
                <i className="text-xl leading-none bi bi-x-lg"></i>
              </button>
            </div>

            {/* Corps Scrollable */}
            <div className="flex-grow overflow-y-auto bg-white custom-scrollbar">
              <div className="p-6 sm:p-10">
                
                {/* Section : Détails du poste */}
                <div className="prose prose-gray max-w-none">
                  <div className="mb-10">
                    <h3 className="mb-4 text-xl font-bold text-gray-900">À propos du rôle</h3>
                    <p className="text-base leading-relaxed text-gray-600">{selectedJob.shortDesc}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-10 mb-10 md:grid-cols-2">
                    <div>
                      <h3 className="mb-4 text-xl font-bold text-gray-900">Vos responsabilités</h3>
                      <ul className="space-y-4">
                        {selectedJob.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start text-gray-600">
                            <i className="bi bi-check2 text-[var(--bs-primary,#0d6efd)] mt-1 mr-3 text-lg leading-none font-bold"></i>
                            <span className="leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-4 text-xl font-bold text-gray-900">Profil recherché</h3>
                      <ul className="space-y-4">
                        {selectedJob.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 mr-3 flex-shrink-0"></span>
                            <span className="leading-relaxed">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 mb-12 border border-gray-100 bg-gray-50 rounded-2xl">
                    <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-900">
                      <i className="bi bi-stars text-[var(--bs-primary,#0d6efd)]"></i> Ce que nous offrons
                    </h3>
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {selectedJob.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center text-gray-700 font-medium text-sm border-l-2 border-[var(--bs-primary,#0d6efd)]/30 pl-3">
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <hr className="mb-12 border-gray-200" />

                {/* Section : Formulaire de candidature */}
                <div id="application-form">
                  <div className="mb-10 text-center">
                    <h3 className="mb-2 text-2xl font-bold text-gray-900">Postuler pour ce poste</h3>
                    <p className="text-gray-500">Remplissez le formulaire ci-dessous et notre équipe vous recontactera rapidement.</p>
                  </div>

                  {hasSubmitted ? (
                    <div className="p-8 text-center text-green-800 border border-green-200 bg-green-50 rounded-2xl animate-fade-in-up">
                      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-3xl text-green-600 bg-green-100 rounded-full">
                        <i className="bi bi-check-lg"></i>
                      </div>
                      <h4 className="mb-2 text-2xl font-bold">Candidature envoyée !</h4>
                      <p className="text-green-700">Merci de votre intérêt pour Mova. Nous examinerons votre profil avec attention.</p>
                      <button 
                        onClick={() => setSelectedJob(null)}
                        className="mt-6 px-6 py-2.5 bg-white border border-green-300 text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-colors"
                      >
                        Fermer la fenêtre
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitApplication} className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Nom */}
                        <div>
                          <label className="block mb-2 text-sm font-semibold text-gray-900">Nom complet *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Ex: Dominique Dos Santos"
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--bs-primary,#0d6efd)]/20 focus:border-[var(--bs-primary,#0d6efd)] transition-all placeholder-gray-400"
                          />
                        </div>
                        {/* Email */}
                        <div>
                          <label className="block mb-2 text-sm font-semibold text-gray-900">Adresse Email *</label>
                          <input 
                            type="email" 
                            required
                            placeholder="dominique@exemple.com"
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--bs-primary,#0d6efd)]/20 focus:border-[var(--bs-primary,#0d6efd)] transition-all placeholder-gray-400"
                          />
                        </div>
                      </div>

                      {/* LinkedIn */}
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-900">Profil LinkedIn (Optionnel)</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                            <i className="bi bi-linkedin"></i>
                          </span>
                          <input 
                            type="url" 
                            placeholder="https://linkedin.com/in/votre-profil"
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3 pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--bs-primary,#0d6efd)]/20 focus:border-[var(--bs-primary,#0d6efd)] transition-all placeholder-gray-400"
                          />
                        </div>
                      </div>

                      {/* Upload CV */}
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-900">Curriculum Vitae (CV) *</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-[var(--bs-primary,#0d6efd)] hover:bg-[var(--bs-primary,#0d6efd)]/5 transition-colors cursor-pointer relative group">
                          <div className="space-y-1 text-center">
                            <i className="bi bi-cloud-arrow-up text-3xl text-gray-400 group-hover:text-[var(--bs-primary,#0d6efd)] transition-colors"></i>
                            <div className="flex justify-center text-sm text-gray-600">
                              <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-semibold text-[var(--bs-primary,#0d6efd)] focus-within:outline-none hover:underline">
                                <span>Télécharger un fichier</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" required accept=".pdf,.doc,.docx" />
                              </label>
                              <p className="pl-1">ou glisser-déposer</p>
                            </div>
                            <p className="text-xs text-gray-500">PDF, DOCX jusqu'à 5MB</p>
                          </div>
                        </div>
                      </div>

                      {/* Lettre de motivation */}
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-900">Lettre de motivation / Message *</label>
                        <textarea 
                          rows="4"
                          required
                          placeholder="Parlez-nous de vous et de ce qui vous motive à rejoindre Mova..."
                          className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--bs-primary,#0d6efd)]/20 focus:border-[var(--bs-primary,#0d6efd)] transition-all placeholder-gray-400 resize-y"
                        ></textarea>
                      </div>

                      {/* Bouton Soumettre */}
                      <div className="flex justify-end pt-4">
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-white bg-[var(--bs-primary,#0d6efd)] rounded-full hover:brightness-110 transition-all flex justify-center items-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed border-none"
                        >
                          {isSubmitting ? (
                            <><span className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin"></span> Envoi en cours...</>
                          ) : (
                            <>Envoyer ma candidature <i className="text-sm bi bi-send-fill"></i></>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* STYLES PERSONNALISÉS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        /* Scrollbar élégante pour la modale */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9fafb;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 8px;
          border: 2px solid #f9fafb;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #9ca3af;
        }
      `}} />
    </div>
  );
}

export default Careers;