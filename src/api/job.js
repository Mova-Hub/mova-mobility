import api, { buildQuery } from "./apiService";

/* ----------------------------- Dictionaries (Value/Label) ------------------------- */

export const WORK_MODES = [
  { value: "onsite", label: "Présentiel" },
  { value: "hybrid", label: "Hybride" },
  { value: "remote", label: "Télétravail" },
];

export const CONTRACT_TYPES = [
  { value: "full_time", label: "Temps plein" },
  { value: "part_time", label: "Temps partiel" },
  { value: "cdi", label: "CDI" },
  { value: "cdd", label: "CDD" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Stage" },
  { value: "apprenticeship", label: "Alternance" },
];

export const DEFAULT_DEPARTMENTS = [
  { value: "engineering", label: "Ingénierie" },
  { value: "marketing", label: "Marketing" },
  { value: "operations", label: "Opérations" },
  { value: "support", label: "Support Client" },
  { value: "design", label: "Design & UX" },
];

export const DEFAULT_COUNTRIES = [
  { value: "cg", label: "Congo-Brazzaville" },
  { value: "cd", label: "Rép. Démocratique du Congo" },
  { value: "fr", label: "France" },
  { value: "sn", label: "Sénégal" },
  { value: "ci", label: "Côte d'Ivoire" },
  { value: "cm", label: "Cameroun" },
];

export const DEFAULT_CITIES = [
  { value: "bzv", label: "Brazzaville" },
  { value: "pnr", label: "Pointe-Noire" },
  { value: "dol", label: "Dolisie" },
  { value: "kin", label: "Kinshasa" },
  { value: "par", label: "Paris" },
];

export function getLabel(list, val) {
  if (!val) return "—";
  const item = list.find(item => item.value === val);
  return item ? item.label : val;
}

/* ------------------------------ Transforms -------------------------------- */
// Transforme les données JSON brutes en objet plus propre pour le frontend
function toJob(dto) {
  return {
    id: String(dto.id),
    title: dto.title,
    department: dto.department,
    location: dto.location,
    country: dto.country,
    workMode: dto.work_mode,
    contractType: dto.contract_type,
    shortDesc: dto.short_desc,
    responsibilities: dto.responsibilities || [],
    requirements: dto.requirements || [],
    benefits: dto.benefits || [],
    status: dto.status || "draft",
    createdAt: dto.created_at,
    // The API withholds the amounts when the salary is not disclosed.
    salaryDisclosed: Boolean(dto.salary_disclosed),
    salaryMin: dto.salary_min ?? null,
    salaryMax: dto.salary_max ?? null,
    salaryCurrency: dto.salary_currency || "XAF",
    salaryPeriod: dto.salary_period || null,
    seniority: dto.seniority || null,
    experienceYears: dto.experience_years ?? null,
    openings: dto.openings ?? 1,
    closesAt: dto.closes_at || null,
    // When the offer was opened, not drafted. Older offers may lack it.
    publishedAt: dto.published_at || dto.created_at || null,
    applyEmail: dto.apply_email || null,
    isClosedToApplications: Boolean(dto.is_closed_to_applications),
  };
}

export const SENIORITY = [
  { value: "intern", label: "Stagiaire" },
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Confirmé" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
];

export const SALARY_PERIODS = [
  { value: "hour", label: "par heure" },
  { value: "day", label: "par jour" },
  { value: "month", label: "par mois" },
  { value: "year", label: "par an" },
];

/** "350 000 – 500 000 XAF par mois", or null when not disclosed. */
export function formatSalary(job) {
  if (!job?.salaryDisclosed || (job.salaryMin == null && job.salaryMax == null)) return null;
  const fmt = (n) => new Intl.NumberFormat("fr-FR").format(Number(n));
  const cur = job.salaryCurrency === "XAF" ? "FCFA" : job.salaryCurrency;
  const period = job.salaryPeriod ? ` ${getLabel(SALARY_PERIODS, job.salaryPeriod)}` : "";
  if (job.salaryMin != null && job.salaryMax != null && Number(job.salaryMin) !== Number(job.salaryMax)) {
    return `${fmt(job.salaryMin)} – ${fmt(job.salaryMax)} ${cur}${period}`;
  }
  return `${fmt(job.salaryMin ?? job.salaryMax)} ${cur}${period}`;
}

/* -------------------------------- Client ---------------------------------- */

// Récupérer la liste des offres publiées (ROUTE PUBLIQUE)
async function getPublicJobs(params) {
  // On force le statut à "open" pour ne récupérer que les offres actives
  const qs = buildQuery({ ...params, status: 'open' });
  const res = await api.get(`/jobs/public${qs}`);
  
  return {
    ...res,
    data: {
      rows: res.data.data.map(toJob),
      meta: res.data.meta,
    },
  };
}

// Une offre ouverte, pour sa propre page (ROUTE PUBLIQUE).
// Une offre fermée, en brouillon ou expirée répond 404, comme si elle n'existait pas.
async function getPublicJob(id) {
  const res = await api.get(`/public/jobs/${encodeURIComponent(id)}`);
  const dto = res.data?.data ?? res.data;
  return toJob(dto);
}

// Soumettre une candidature (ROUTE PUBLIQUE)
// formData doit être un objet FormData (multipart/form-data) contenant le CV
async function applyToJob(formData) {
  const res = await api.post(`/candidates`, formData);
  return res;
}

export default { 
  getPublicJobs,
  getPublicJob,
  applyToJob,
  formatSalary,
  SENIORITY,
  SALARY_PERIODS,
  getLabel,
  WORK_MODES,
  CONTRACT_TYPES,
  DEFAULT_DEPARTMENTS,
  DEFAULT_COUNTRIES,
  DEFAULT_CITIES
};