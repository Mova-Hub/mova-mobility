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
  };
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

// Soumettre une candidature (ROUTE PUBLIQUE)
// formData doit être un objet FormData (multipart/form-data) contenant le CV
async function applyToJob(formData) {
  const res = await api.post(`/candidates`, formData);
  return res;
}

export default { 
  getPublicJobs, 
  applyToJob,
  getLabel,
  WORK_MODES,
  CONTRACT_TYPES,
  DEFAULT_DEPARTMENTS,
  DEFAULT_COUNTRIES,
  DEFAULT_CITIES
};