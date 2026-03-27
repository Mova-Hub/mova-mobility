import React, { useState, useEffect, useMemo, useRef } from 'react';
import SEO from '../components/SEO';
import jobApi from '../api/job';

// IMPORT DU PACKAGE TELEPHONE
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

function Careers() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedJob, setSelectedJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  
  // NOUVEAU : État spécifique pour le numéro de téléphone
  const [phoneValue, setPhoneValue] = useState('');

  // Fetch des offres d'emploi publiques
  useEffect(() => {
    let isMounted = true;
    
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await jobApi.getPublicJobs({ per_page: 100 });
        if (isMounted) {
          setJobs(response.data.rows);
        }
      } catch (err) {
        console.error("Erreur de chargement des offres:", err);
        if (isMounted) setError("Impossible de charger les offres d'emploi.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchJobs();
    return () => { isMounted = false; };
  }, []);

  // ÉTATS DES FILTRES
  const [filters, setFilters] = useState({
    country: '',
    department: '',
    workMode: '',
    contractType: ''
  });

  const filterOptions = useMemo(() => {
    return {
      countries: [...new Set(jobs.map(job => job.country))],
      departments: [...new Set(jobs.map(job => job.department))],
      workModes: [...new Set(jobs.map(job => job.workMode))],
      contractTypes: [...new Set(jobs.map(job => job.contractType))]
    };
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      return (
        (filters.country === '' || job.country === filters.country) &&
        (filters.department === '' || job.department === filters.department) &&
        (filters.workMode === '' || job.workMode === filters.workMode) &&
        (filters.contractType === '' || job.contractType === filters.contractType)
      );
    });
  }, [filters, jobs]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = 'hidden';
      setHasSubmitted(false);
      setFormError(null);
      setSelectedFile(null); 
      setPhoneValue(''); // Reset du téléphone quand on ouvre une nouvelle offre
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedJob]);

  // Gérer la sélection du fichier pour l'UI
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormError("Le fichier est trop volumineux (Max 5MB).");
        e.target.value = null;
        setSelectedFile(null);
      } else {
        setSelectedFile(file);
        setFormError(null);
      }
    } else {
      setSelectedFile(null);
    }
  };

  // Soumission de candidature
  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    const form = e.target;
    const file = selectedFile; 

    if (!file) {
      setFormError("Veuillez sélectionner un fichier CV.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('emploi_id', selectedJob.id);
    
    const fullName = form.fullName.value.trim();
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || ' ';

    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', form.email.value);
    
    // On utilise l'état du téléphone (formaté E.164)
    if (phoneValue) formData.append('phone', phoneValue);
    
    formData.append('resume', file);

    let internalNotes = "";
    if (form.linkedin?.value) internalNotes += `LinkedIn: ${form.linkedin.value}\n`;
    if (form.message?.value) internalNotes += `Message:\n${form.message.value}`;
    if (internalNotes) formData.append('notes', internalNotes);

    try {
      await jobApi.applyToJob(formData);
      setHasSubmitted(true);
    } catch (err) {
      console.error("Erreur lors de la candidature:", err);
      if (err.payload && err.payload.errors) {
        const errorMessages = Object.values(err.payload.errors).map(msgArray => msgArray[0]);
        setFormError(errorMessages.join(' '));
      } else {
        setFormError(err.message || "Une erreur est survenue lors de l'envoi.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const FilterSelect = ({ name, value, options, placeholder, dict }) => (
    <div className="relative w-full">
      <select
        name={name}
        value={value}
        onChange={handleFilterChange}
        className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--bs-primary,#0d6efd)]/20 focus:border-[var(--bs-primary,#0d6efd)] transition-all cursor-pointer shadow-sm text-sm font-medium"
      >
        <option value="">{placeholder}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {dict ? jobApi.getLabel(dict, opt) : opt}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 pointer-events-none">
        <i className="text-xs bi bi-chevron-down"></i>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 font-sans bg-gray-50/50">
      <SEO 
        title="Carrières & Emplois" 
        description="Rejoignez l'équipe Mova Mobility. Découvrez nos offres d'emploi en ingénierie, produit et opérations."
      />

      {/* PAGE HERO SECTION */}
      <div className="container px-4 pt-2 pb-12 mx-auto max-w-8xl">
        <section className="relative flex flex-col items-center justify-center min-h-[60vh] overflow-hidden bg-gray-900 rounded-[2rem]">
          <img 
            src="https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2072&auto=format&fit=crop" 
            alt="Mobilité urbaine Mova" 
            className="absolute inset-0 object-cover w-full h-full opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-3xl px-6 py-20 mx-auto text-center">
            <span 
              data-aos="fade-down"
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-semibold tracking-widest text-white uppercase border rounded-full border-white/20 bg-black/40 backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Nous recrutons
            </span>
            <h1 
              data-aos="fade-up" data-aos-delay="100"
              className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Façonnez l'avenir de la mobilité urbaine
            </h1>
            <p 
              data-aos="fade-up" data-aos-delay="200"
              className="max-w-2xl text-lg font-normal leading-relaxed text-gray-200 sm:text-xl"
            >
              Chez Mova, nous ne faisons pas que déplacer des bus, nous connectons des vies. 
              Rejoignez une équipe de passionnés et aidez-nous à réinventer les déplacements de millions de personnes.
            </p>
            <button 
              onClick={() => { document.getElementById('open-positions').scrollIntoView({ behavior: 'smooth' }); }}
              data-aos="fade-up" data-aos-delay="300"
              className="flex items-center justify-center mt-12 transition-all border rounded-full w-14 h-14 text-white/90 border-white/30 hover:bg-white hover:text-gray-900 focus:outline-none hover:scale-105"
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
          <div className="flex items-center gap-2 mb-4 font-semibold text-gray-900">
            <i className="bi bi-funnel"></i> Filtrer les offres
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FilterSelect name="country" value={filters.country} options={filterOptions.countries} placeholder="Tous les pays" dict={jobApi.DEFAULT_COUNTRIES} />
            <FilterSelect name="department" value={filters.department} options={filterOptions.departments} placeholder="Tous les départements" dict={jobApi.DEFAULT_DEPARTMENTS} />
            <FilterSelect name="workMode" value={filters.workMode} options={filterOptions.workModes} placeholder="Mode de travail" dict={jobApi.WORK_MODES} />
            <FilterSelect name="contractType" value={filters.contractType} options={filterOptions.contractTypes} placeholder="Type de contrat" dict={jobApi.CONTRACT_TYPES} />
          </div>
        </div> */}

        {/* LISTE DES OFFRES */}
        <div data-aos="fade-up" data-aos-delay="100">
          <h3 className="flex items-end justify-between pb-4 mb-8 text-xl font-semibold text-gray-900 border-b border-gray-200">
            <span>Postes ouverts</span>
            <span className="px-3 py-1 text-sm font-medium text-[var(--bs-primary,#0d6efd)] bg-[var(--bs-primary,#0d6efd)]/10 rounded-full">
              {filteredJobs.length} résultat(s)
            </span>
          </h3>
          
          {isLoading ? (
            <div className="py-20 text-center">
              <div className="inline-block w-8 h-8 border-4 border-[var(--bs-primary,#0d6efd)] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 font-medium text-gray-500">Chargement des opportunités...</p>
            </div>
          ) : error ? (
             <div className="py-16 text-center text-red-500 border border-red-100 bg-red-50 rounded-2xl">
               <i className="block mb-3 text-4xl bi bi-exclamation-triangle"></i>
               <h4 className="text-lg font-semibold">Oups !</h4>
               <p className="mt-2">{error}</p>
             </div>
          ) : filteredJobs.length > 0 ? (
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
                        {jobApi.getLabel(jobApi.DEFAULT_DEPARTMENTS, job.department)}
                      </span>
                      {job.workMode === 'remote' && (
                        <span className="inline-block px-2 py-1 text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 rounded uppercase tracking-wider">
                          Remote
                        </span>
                      )}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[var(--bs-primary,#0d6efd)] transition-colors leading-tight">
                      {job.title}
                    </h4>
                    <div className="flex flex-wrap items-center text-xs font-medium text-gray-500 gap-x-3 gap-y-2">
                      <span className="flex items-center gap-1.5">
                        <i className="bi bi-geo-alt"></i> 
                        {jobApi.getLabel(jobApi.DEFAULT_CITIES, job.location)}, {jobApi.getLabel(jobApi.DEFAULT_COUNTRIES, job.country)}
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="flex items-center gap-1.5">
                        <i className="bi bi-briefcase"></i> 
                        {jobApi.getLabel(jobApi.CONTRACT_TYPES, job.contractType)}
                      </span>
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
            <div className="py-16 text-center bg-white border border-gray-100 shadow-sm rounded-2xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50">
                <i className="text-2xl text-gray-400 bi bi-search"></i>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Aucune offre ne correspond à vos critères</h4>
              <p className="mt-2 text-sm text-gray-500">Essayez de modifier vos filtres ou revenez plus tard.</p>
              <button 
                onClick={() => setFilters({ country: '', department: '', workMode: '', contractType: '' })}
                className="mt-6 px-4 py-2 text-sm font-semibold text-white bg-[var(--bs-primary,#0d6efd)] rounded-lg hover:bg-blue-600 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

      </div>

{/* MODALE DE DÉTAILS DE L'OFFRE & CANDIDATURE */}
{selectedJob && (
  <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 sm:p-6">
    <div 
      className="absolute inset-0 transition-opacity bg-gray-900/70 backdrop-blur-sm"
      onClick={() => setSelectedJob(null)}
    ></div>

    <div className="relative bg-white rounded-none sm:rounded-3xl shadow-2xl w-full max-w-4xl h-full sm:max-h-[90vh] flex flex-col z-10 animate-fade-in-up overflow-hidden">
      
      {/* Header Fixe */}
      <div className="flex items-start justify-between px-6 py-4 bg-white border-b border-gray-100 sm:px-10 sm:py-6 shrink-0">
        <div className="pr-8">
          <h2 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            {selectedJob.title}
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-gray-600 sm:text-sm sm:gap-4">
            <span className="flex items-center gap-1.5">
              <i className="bi bi-geo-alt text-[var(--bs-primary,#0d6efd)]"></i> 
              {jobApi.getLabel(jobApi.DEFAULT_CITIES, selectedJob.location)}
            </span>
            <span className="hidden w-1.5 h-1.5 bg-gray-300 rounded-full sm:block"></span>
            <span className="flex items-center gap-1.5">
              <i className="bi bi-building text-[var(--bs-primary,#0d6efd)]"></i> 
              {jobApi.getLabel(jobApi.WORK_MODES, selectedJob.workMode)}
            </span>
            <span className="hidden w-1.5 h-1.5 bg-gray-300 rounded-full sm:block"></span>
            <span className="flex items-center gap-1.5">
              <i className="bi bi-clock text-[var(--bs-primary,#0d6efd)]"></i> 
              {jobApi.getLabel(jobApi.CONTRACT_TYPES, selectedJob.contractType)}
            </span>
          </div>
        </div>
        
        <button 
          onClick={() => setSelectedJob(null)}
          className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-gray-400 transition-colors rounded-full hover:text-gray-900 bg-gray-50 hover:bg-gray-200 focus:outline-none"
        >
          <i className="text-xl leading-none bi bi-x-lg"></i>
        </button>
      </div>

      {/* Corps Scrollable */}
      <div className="flex-grow overflow-y-auto bg-white custom-scrollbar">
        <div className="p-6 sm:p-10">
          
          <div className="prose prose-gray max-w-none">
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 sm:text-xl">À propos du rôle</h3>
              <p className="text-sm leading-relaxed text-gray-600 sm:text-base">{selectedJob.shortDesc}</p>
            </div>

            <div className="grid grid-cols-1 gap-10 mb-10 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900 sm:text-xl">Vos responsabilités</h3>
                <ul className="space-y-4">
                  {selectedJob.responsibilities?.map((resp, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600 sm:text-base">
                      <i className="bi bi-check2 text-[var(--bs-primary,#0d6efd)] mt-1 mr-3 text-lg leading-none font-semibold"></i>
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900 sm:text-xl">Profil recherché</h3>
                <ul className="space-y-4">
                  {selectedJob.requirements?.map((req, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600 sm:text-base">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 mr-3 flex-shrink-0"></span>
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {selectedJob.benefits?.length > 0 && (
              <div className="p-1 mb-12 border border-blue-50 sm:p-6 bg-blue-50/50 rounded-2xl">
                <h3 className="flex items-center gap-2 p-3 mb-4 text-lg font-semibold text-gray-900 sm:text-xl">
                  <i className="bi bi-stars text-[var(--bs-primary,#0d6efd)]"></i> Ce que nous offrons
                </h3>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {selectedJob.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-gray-800 font-medium text-sm border-l-2 border-[var(--bs-primary,#0d6efd)] pl-3">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <hr className="mb-12 border-gray-100" />

          {/* Section : Formulaire de candidature */}
          <div id="application-form" className="pb-10 sm:pb-0">
            <div className="mb-10 text-center">
              <h3 className="mb-2 text-xl font-semibold text-gray-900 sm:text-2xl">Postuler pour ce poste</h3>
              <p className="text-sm text-gray-500">Remplissez le formulaire ci-dessous et notre équipe vous recontactera rapidement.</p>
            </div>

            {hasSubmitted ? (
              <div className="p-8 text-center text-green-800 border border-green-200 bg-green-50 rounded-2xl animate-fade-in-up">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-3xl text-green-600 bg-green-100 rounded-full">
                  <i className="bi bi-check-lg"></i>
                </div>
                <h4 className="mb-2 text-xl font-semibold sm:text-2xl">Candidature envoyée !</h4>
                <p className="text-sm text-green-700 sm:text-base">Merci de votre intérêt pour Mova. Nous examinerons votre profil avec attention.</p>
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="mt-6 px-6 py-2.5 bg-white border border-green-300 text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-colors"
                >
                  Fermer la fenêtre
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-6">
                
                {formError && (
                  <div className="p-3 text-sm text-red-600 border border-red-200 rounded-lg bg-red-50">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-900">Nom complet *</label>
                    <input 
                      type="text" 
                      name="fullName"
                      required
                      placeholder="Ex: Arden BOUET"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--bs-primary,#0d6efd)]/20 focus:border-[var(--bs-primary,#0d6efd)] transition-all placeholder-gray-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-900">Adresse Email *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="arden@exemple.com"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--bs-primary,#0d6efd)]/20 focus:border-[var(--bs-primary,#0d6efd)] transition-all placeholder-gray-400 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-900">Profil LinkedIn (Optionnel)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                      <i className="bi bi-linkedin"></i>
                    </span>
                    <input 
                      type="url" 
                      name="linkedin"
                      placeholder="https://linkedin.com/in/votre-profil"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3 pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--bs-primary,#0d6efd)]/20 focus:border-[var(--bs-primary,#0d6efd)] transition-all placeholder-gray-400 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-900">Téléphone</label>
                    {/* INTÉGRATION DE PHONE INPUT */}
                    <PhoneInput
                      international
                      defaultCountry="CG"
                      value={phoneValue}
                      onChange={setPhoneValue}
                      className="custom-phone-input"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-900">Curriculum Vitae (CV) *</label>
                    <label 
                      htmlFor="file-upload"
                      className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-colors cursor-pointer relative group ${
                        selectedFile 
                          ? "border-[var(--bs-primary,#0d6efd)] bg-[var(--bs-primary,#0d6efd)]/5" 
                          : "border-gray-300 hover:border-[var(--bs-primary,#0d6efd)] hover:bg-[var(--bs-primary,#0d6efd)]/5"
                      }`}
                    >
                      <div className="space-y-1 text-center">
                        {selectedFile ? (
                           <i className="bi bi-file-earmark-check-fill text-3xl text-[var(--bs-primary,#0d6efd)]"></i>
                        ) : (
                           <i className="bi bi-cloud-arrow-up text-3xl text-gray-400 transition-colors group-hover:text-[var(--bs-primary,#0d6efd)]"></i>
                        )}
                        
                        <div className="flex justify-center text-sm text-gray-600">
                          <span className="font-semibold text-[var(--bs-primary,#0d6efd)] group-hover:underline">
                            {selectedFile ? "Changer de fichier" : "Télécharger un fichier"}
                          </span>
                          <input 
                            id="file-upload" 
                            name="resume" 
                            type="file" 
                            ref={fileInputRef}
                            className="sr-only" 
                            required 
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange} 
                          />
                          {!selectedFile && <p className="hidden pl-1 sm:block">ou glisser-déposer</p>}
                        </div>
                        
                        {selectedFile ? (
                          <p className="font-medium text-[var(--bs-primary,#0d6efd)] text-xs truncate max-w-[200px] mx-auto">
                            {selectedFile.name}
                          </p>
                        ) : (
                          <p className="text-xs text-gray-500">PDF, DOCX jusqu'à 5MB</p>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-900">Lettre de motivation / Message (Optionnel)</label>
                  <textarea 
                    name="message"
                    rows="4"
                    placeholder="Parlez-nous de vous..."
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--bs-primary,#0d6efd)]/20 focus:border-[var(--bs-primary,#0d6efd)] transition-all placeholder-gray-400 resize-y text-sm"
                  ></textarea>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-[var(--bs-primary,#0d6efd)] rounded-xl hover:brightness-110 transition-all flex justify-center items-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed border-none"
                  >
                    {isSubmitting ? (
                      <><span className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin"></span> Envoi...</>
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

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
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

        /* STYLES PERSONNALISÉS POUR REACT-PHONE-NUMBER-INPUT */
        .custom-phone-input {
          display: flex;
          align-items: center;
          width: 100%;
          background-color: #f9fafb; /* bg-gray-50 */
          border: 1px solid #e5e7eb; /* border-gray-200 */
          border-radius: 0.75rem; /* rounded-xl */
          padding: 0.75rem 1rem; /* py-3 px-4 */
          transition: all 0.2s;
        }
        .custom-phone-input:focus-within {
          outline: none;
          border-color: var(--bs-primary, #0d6efd);
          box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.2);
        }
        .custom-phone-input .PhoneInputInput {
          flex: 1;
          min-width: 0;
          background: transparent;
          border: none;
          outline: none;
          color: #111827; /* text-gray-900 */
          font-size: 0.875rem; /* text-sm */
        }
        .custom-phone-input .PhoneInputCountry {
          margin-right: 0.75rem;
        }
        .custom-phone-input .PhoneInputCountrySelectArrow {
          opacity: 0.5;
        }
      `}} />
    </div>
  );
}

export default Careers;