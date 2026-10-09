import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import jobApi from '../api/job';

const VALUES = [
  { icon: 'bi-geo-alt', title: 'Un impact visible', text: 'Ce que vous construisez transporte des passagers dès la semaine suivante, à Brazzaville et Pointe-Noire.' },
  { icon: 'bi-lightning-charge', title: 'Une équipe resserrée', text: 'Peu de couches, beaucoup de responsabilités. Les décisions se prennent vite, avec ceux qui font.' },
  { icon: 'bi-phone', title: 'Un vrai produit', text: 'Application de réservation, suivi en direct, Mova Pass NFC, outils terrain : de la technique concrète.' },
  { icon: 'bi-mortarboard', title: 'Apprendre en continu', text: 'Mentorat, formations et accès aux outils dont vous avez besoin pour progresser.' },
];

const EMPTY_FILTERS = { department: '', workMode: '', contractType: '' };

function isNew(job) {
  if (!job.publishedAt) return false;
  return Date.now() - new Date(job.publishedAt).getTime() < 7 * 86400000;
}

function FilterSelect({ name, value, options, placeholder, dict, onChange }) {
  return (
    <div className="relative w-full">
      <label className="visually-hidden" htmlFor={`filter-${name}`}>{placeholder}</label>
      <select
        id={`filter-${name}`}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--bs-primary)]/20 focus:border-[var(--bs-primary)] transition-all cursor-pointer shadow-sm text-sm font-medium"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{jobApi.getLabel(dict, opt)}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 pointer-events-none">
        <i className="text-xs bi bi-chevron-down"></i>
      </div>
    </div>
  );
}

/*
 * The careers page lists open offers; each card opens the offer's own page,
 * `/carrieres/:id`, where the application form lives. It used to open a
 * dialog, which gave an offer no link to share.
 */
function Careers() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  useEffect(() => {
    let isMounted = true;
    jobApi
      .getPublicJobs({ per_page: 100 })
      .then((response) => { if (isMounted) setJobs(response.data.rows); })
      .catch(() => { if (isMounted) setError("Impossible de charger les offres d'emploi."); })
      .finally(() => { if (isMounted) setIsLoading(false); });
    return () => { isMounted = false; };
  }, []);

  const filterOptions = useMemo(() => {
    const uniq = (key) => [...new Set(jobs.map((job) => job[key]).filter(Boolean))];
    return { departments: uniq('department'), workModes: uniq('workMode'), contractTypes: uniq('contractType') };
  }, [jobs]);

  const filteredJobs = useMemo(() => jobs.filter((job) => (
    (filters.department === '' || job.department === filters.department) &&
    (filters.workMode === '' || job.workMode === filters.workMode) &&
    (filters.contractType === '' || job.contractType === filters.contractType)
  )), [filters, jobs]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const hasFilters = Object.values(filters).some(Boolean);

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
            alt=""
            className="absolute inset-0 object-cover w-full h-full opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-3xl px-6 py-20 mx-auto text-center">
            <span
              data-aos="fade-down"
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-semibold tracking-widest text-white uppercase border rounded-full border-white/20 bg-black/40 backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              {jobs.length > 0 ? `${jobs.length} poste${jobs.length > 1 ? 's' : ''} ouvert${jobs.length > 1 ? 's' : ''}` : 'Nous recrutons'}
            </span>
            <h1 data-aos="fade-up" data-aos-delay="100" className="mb-6 t-display text-white">
              Façonnez l'avenir de la mobilité urbaine
            </h1>
            <p data-aos="fade-up" data-aos-delay="200" className="max-w-2xl text-lg font-normal leading-relaxed text-gray-200 sm:text-xl">
              Chez Mova, nous ne faisons pas que déplacer des bus, nous connectons des vies.
              Rejoignez une équipe de passionnés et aidez-nous à réinventer les déplacements de millions de personnes.
            </p>
            <a
              href="#open-positions"
              data-aos="fade-up" data-aos-delay="300"
              className="flex items-center justify-center mt-12 no-underline transition-all border rounded-full w-14 h-14 text-white/90 border-white/30 hover:bg-white hover:text-gray-900 hover:scale-105"
              aria-label="Voir les offres"
            >
              <i className="text-xl bi bi-arrow-down"></i>
            </a>
          </div>
        </section>
      </div>

      {/* WHY MOVA */}
      <section className="container px-4 pb-16 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <div key={v.title} data-aos="fade-up" data-aos-delay={i * 80} className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <span className="flex items-center justify-center mb-4 w-11 h-11 rounded-xl bg-[var(--bs-primary)]/10 text-[var(--bs-primary)]">
                <i className={`bi ${v.icon} text-lg`}></i>
              </span>
              <p className="mb-2 font-semibold text-gray-900">{v.title}</p>
              <p className="mb-0 text-sm leading-relaxed text-gray-600">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="container px-4 pb-24 mx-auto max-w-7xl scroll-mt-24" id="open-positions">
        <div data-aos="fade-up">
          <div className="flex flex-wrap items-end justify-between gap-4 pb-4 mb-6 border-b border-gray-200">
            <h2 className="mb-0 t-title text-gray-900">Postes ouverts</h2>
            <span className="px-3 py-1 text-sm font-medium text-[var(--bs-primary)] bg-[var(--bs-primary)]/10 rounded-full">
              {filteredJobs.length} résultat{filteredJobs.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Filters only earn their place once there is something to filter. */}
          {jobs.length > 3 && (
            <div className="grid grid-cols-1 gap-3 mb-8 sm:grid-cols-3">
              <FilterSelect name="department" value={filters.department} options={filterOptions.departments} placeholder="Tous les départements" dict={jobApi.DEFAULT_DEPARTMENTS} onChange={handleFilterChange} />
              <FilterSelect name="workMode" value={filters.workMode} options={filterOptions.workModes} placeholder="Tous les modes de travail" dict={jobApi.WORK_MODES} onChange={handleFilterChange} />
              <FilterSelect name="contractType" value={filters.contractType} options={filterOptions.contractTypes} placeholder="Tous les contrats" dict={jobApi.CONTRACT_TYPES} onChange={handleFilterChange} />
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
              {[0, 1, 2].map((i) => <div key={i} className="h-64 bg-white border border-gray-100 rounded-2xl animate-pulse"></div>)}
            </div>
          ) : error ? (
            <div className="py-16 text-center text-red-500 border border-red-100 bg-red-50 rounded-2xl">
              <i className="block mb-3 text-4xl bi bi-exclamation-triangle"></i>
              <h4 className="text-lg font-semibold">Oups !</h4>
              <p className="mt-2">{error}</p>
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => {
                const salary = jobApi.formatSalary(job);
                return (
                  <Link
                    key={job.id}
                    to={`/carrieres/${job.id}`}
                    className="flex flex-col h-full p-8 no-underline transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-xl hover:-translate-y-1 hover:border-[var(--bs-primary)]/30 group"
                  >
                    <div className="mb-5">
                      <div className="flex items-start justify-between gap-2 mb-4">
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">
                          {jobApi.getLabel(jobApi.DEFAULT_DEPARTMENTS, job.department)}
                        </span>
                        <span className="flex gap-1.5">
                          {isNew(job) && (
                            <span className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded text-[var(--bs-primary)] bg-[var(--bs-primary)]/10">Nouveau</span>
                          )}
                          {job.workMode === 'remote' && (
                            <span className="px-2 py-1 text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 rounded uppercase tracking-wider">Remote</span>
                          )}
                        </span>
                      </div>
                      <h3 className="t-subheading text-gray-900 mb-3 group-hover:text-[var(--bs-primary)] transition-colors">
                        {job.title}
                      </h3>
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
                        {salary && (
                          <>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span className="flex items-center gap-1.5"><i className="bi bi-cash-coin"></i>{salary}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <p className="flex-grow mb-6 text-sm leading-relaxed text-gray-600 line-clamp-3">{job.shortDesc}</p>

                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-[var(--bs-primary)] font-semibold text-sm">
                      <span>Découvrir le poste <i className="ml-1 transition-transform bi bi-arrow-right group-hover:translate-x-1 d-inline-block"></i></span>
                      {job.closesAt && (
                        <span className="text-xs font-medium text-gray-400">
                          Jusqu’au {new Date(`${job.closesAt}T00:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center bg-white border border-gray-100 shadow-sm rounded-2xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50">
                <i className="text-2xl text-gray-400 bi bi-search"></i>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">
                {hasFilters ? 'Aucune offre ne correspond à vos critères' : 'Aucun poste ouvert pour le moment'}
              </h4>
              <p className="mt-2 text-sm text-gray-500">
                {hasFilters ? 'Essayez de modifier vos filtres.' : 'Revenez bientôt, ou envoyez-nous une candidature spontanée.'}
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={() => setFilters(EMPTY_FILTERS)}
                  className="mt-6 px-4 py-2 text-sm font-semibold text-white bg-[var(--bs-primary)] rounded-lg hover:brightness-110 transition-all border-0"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          )}
        </div>

        {/* Spontaneous application */}
        <div className="flex flex-col items-start justify-between gap-6 p-8 mt-16 text-white sm:flex-row sm:items-center sm:p-10 rounded-3xl bg-[var(--bs-primary)]" data-aos="fade-up">
          <div>
            <h2 className="mb-2 t-heading text-white">Votre poste n’est pas listé ?</h2>
            <p className="mb-0 text-white/80">Envoyez-nous une candidature spontanée. Nous gardons les profils intéressants en tête.</p>
          </div>
          <a
            href="mailto:contact@mova-mobility.com?subject=Candidature%20spontan%C3%A9e"
            className="px-6 py-3 font-semibold text-gray-900 no-underline transition-transform bg-white rounded-full hover:scale-105 shrink-0"
          >
            Candidature spontanée
          </a>
        </div>
      </div>
    </div>
  );
}

export default Careers;
