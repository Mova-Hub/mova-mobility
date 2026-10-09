import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import SEO from '../components/SEO';
import jobApi from '../api/job';

const MAX_FILE = 5 * 1024 * 1024;
const ACCEPTED = ['pdf', 'doc', 'docx'];

const PROCESS = [
  { icon: 'bi-send', title: 'Candidature', text: 'Vous postulez en quelques minutes, directement sur cette page.' },
  { icon: 'bi-person-check', title: 'Étude du profil', text: 'L’équipe lit chaque candidature et revient vers vous sous 10 jours ouvrés.' },
  { icon: 'bi-chat-dots', title: 'Entretiens', text: 'Un échange avec le responsable du poste, puis avec l’équipe.' },
  { icon: 'bi-flag', title: 'Proposition', text: 'Une réponse claire, que la décision soit positive ou non.' },
];

const label = (dict, v) => (v ? jobApi.getLabel(dict, v) : null);

function formatDate(iso, opts = { day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d.toLocaleDateString('fr-FR', opts);
}

/** "aujourd'hui", "il y a 3 jours", "il y a 2 semaines"... */
function publishedAgo(iso) {
  if (!iso) return null;
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (Number.isNaN(days) || days < 0) return null;
  if (days === 0) return 'Publiée aujourd’hui';
  if (days === 1) return 'Publiée hier';
  if (days < 14) return `Publiée il y a ${days} jours`;
  if (days < 60) return `Publiée il y a ${Math.round(days / 7)} semaines`;
  return `Publiée le ${formatDate(iso)}`;
}

/** Days left before the closing date, counting today; null without one. */
function daysLeft(dateStr) {
  if (!dateStr) return null;
  const end = new Date(`${dateStr}T23:59:59`);
  return Math.ceil((end.getTime() - Date.now()) / 86400000);
}

/**
 * One job offer at its own address, `/carrieres/:id`.
 *
 * It replaces the dialog the careers page used to open: an offer now has a
 * link that can be shared, bookmarked and indexed (with JobPosting
 * structured data for search engines), and the application form sits on the
 * page instead of in a scrolling modal.
 */
export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [state, setState] = useState('loading'); // loading | ready | missing | error
  const [related, setRelated] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    let alive = true;
    setState('loading');
    window.scrollTo({ top: 0 });
    jobApi
      .getPublicJob(id)
      .then((j) => {
        if (!alive) return;
        setJob(j);
        setState('ready');
      })
      .catch((err) => {
        if (!alive) return;
        setState(err?.status === 404 ? 'missing' : 'error');
      });
    return () => { alive = false; };
  }, [id]);

  // Other open offers, same department first. Failing quietly is fine here.
  useEffect(() => {
    if (!job) return;
    let alive = true;
    jobApi
      .getPublicJobs({ per_page: 50 })
      .then((res) => {
        if (!alive) return;
        const others = res.data.rows.filter((j) => j.id !== job.id);
        others.sort((a, b) => (b.department === job.department) - (a.department === job.department));
        setRelated(others.slice(0, 3));
      })
      .catch(() => {});
    return () => { alive = false; };
  }, [job]);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // The page's styles ride along with every state: the error page's button
  // uses them too, and rendered as a bare link without them.
  const styles = <style dangerouslySetInnerHTML={{ __html: STYLES }} />;
  if (state === 'loading') return <>{styles}<DetailSkeleton /></>;
  if (state === 'missing' || state === 'error') return <>{styles}<NotFound missing={state === 'missing'} /></>;

  const salary = jobApi.formatSalary(job);
  const left = daysLeft(job.closesAt);
  const closed = job.isClosedToApplications || (left !== null && left < 0);
  const city = label(jobApi.DEFAULT_CITIES, job.location);
  const country = label(jobApi.DEFAULT_COUNTRIES, job.country);
  const place = [city, country].filter(Boolean).join(', ');

  const facts = [
    { icon: 'bi-briefcase', k: 'Contrat', v: label(jobApi.CONTRACT_TYPES, job.contractType) },
    { icon: 'bi-geo-alt', k: 'Lieu', v: place || null },
    { icon: 'bi-laptop', k: 'Mode de travail', v: label(jobApi.WORK_MODES, job.workMode) },
    { icon: 'bi-bar-chart-steps', k: 'Niveau', v: label(jobApi.SENIORITY, job.seniority) },
    {
      icon: 'bi-hourglass-split',
      k: 'Expérience',
      v: job.experienceYears != null ? (Number(job.experienceYears) === 0 ? 'Débutant accepté' : `${job.experienceYears} an${job.experienceYears > 1 ? 's' : ''} minimum`) : null,
    },
    { icon: 'bi-cash-coin', k: 'Rémunération', v: salary || 'Selon profil' },
    { icon: 'bi-people', k: 'Postes ouverts', v: job.openings > 1 ? String(job.openings) : null },
    { icon: 'bi-calendar-event', k: 'Date limite', v: job.closesAt ? formatDate(job.closesAt) : null },
  ].filter((f) => f.v);

  return (
    <div className="min-h-screen pt-24 pb-24 font-sans bg-gray-50/60 lg:pb-16">
      <SEO
        title={`${job.title} – Carrières`}
        description={job.shortDesc || `Rejoignez Mova Mobility en tant que ${job.title}.`}
      />
      <JobPostingSchema job={job} />

      {/* Header */}
      <header className="container px-4 mx-auto max-w-7xl">
        <nav aria-label="Fil d’Ariane" className="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <Link to="/carrieres" className="inline-flex items-center gap-1.5 text-gray-600 no-underline hover:text-[var(--bs-primary)] transition-colors">
            <i className="bi bi-arrow-left"></i> Toutes les offres
          </Link>
          <span aria-hidden="true">/</span>
          <span className="truncate">{label(jobApi.DEFAULT_DEPARTMENTS, job.department)}</span>
        </nav>

        <div className="relative overflow-hidden bg-white border border-gray-100 shadow-sm rounded-[2rem] p-6 sm:p-10 jd-fade">
          <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-[var(--bs-primary)]/5" aria-hidden="true"></div>
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="px-3 py-1 text-xs font-semibold text-[var(--bs-primary)] bg-[var(--bs-primary)]/10 rounded-full">
                {label(jobApi.DEFAULT_DEPARTMENTS, job.department)}
              </span>
              {job.workMode === 'remote' && (
                <span className="px-3 py-1 text-xs font-semibold text-emerald-700 rounded-full bg-emerald-50">Télétravail</span>
              )}
              {closed ? (
                <span className="px-3 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full">Candidatures closes</span>
              ) : left !== null && left <= 7 ? (
                <span className="px-3 py-1 text-xs font-semibold rounded-full text-amber-800 bg-amber-50">
                  {left <= 1 ? 'Dernier jour pour postuler' : `Plus que ${left} jours pour postuler`}
                </span>
              ) : null}
            </div>

            <h1 className="max-w-4xl mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{job.title}</h1>

            <div className="flex flex-wrap items-center text-sm font-medium text-gray-600 gap-x-5 gap-y-2">
              {place && <span className="flex items-center gap-1.5"><i className="bi bi-geo-alt"></i>{place}</span>}
              {job.contractType && <span className="flex items-center gap-1.5"><i className="bi bi-briefcase"></i>{label(jobApi.CONTRACT_TYPES, job.contractType)}</span>}
              {job.workMode && <span className="flex items-center gap-1.5"><i className="bi bi-laptop"></i>{label(jobApi.WORK_MODES, job.workMode)}</span>}
              {salary && <span className="flex items-center gap-1.5"><i className="bi bi-cash-coin"></i>{salary}</span>}
              {publishedAgo(job.publishedAt) && <span className="flex items-center gap-1.5 text-gray-400"><i className="bi bi-clock"></i>{publishedAgo(job.publishedAt)}</span>}
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              {!closed && (
                <button type="button" onClick={scrollToForm} className="jd-btn-primary">
                  Postuler maintenant <i className="bi bi-arrow-down-short"></i>
                </button>
              )}
              <ShareMenu job={job} />
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container grid grid-cols-1 gap-8 px-4 mx-auto mt-8 max-w-7xl lg:grid-cols-[minmax(0,1fr)_340px]">
        <main className="space-y-8 min-w-0">
          {job.shortDesc && (
            <Section title="Le poste en bref" icon="bi-info-circle">
              <p className="mb-0 leading-relaxed text-gray-700 whitespace-pre-line">{job.shortDesc}</p>
            </Section>
          )}

          {job.responsibilities.length > 0 && (
            <Section title="Vos missions" icon="bi-list-check">
              <ul className="p-0 m-0 space-y-3 list-none">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-0.5 text-xs font-bold text-[var(--bs-primary)] rounded-full bg-[var(--bs-primary)]/10">{i + 1}</span>
                    <span className="leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {job.requirements.length > 0 && (
            <Section title="Profil recherché" icon="bi-person-badge">
              <ul className="p-0 m-0 space-y-3 list-none">
                {job.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <i className="bi bi-check2-circle text-[var(--bs-primary)] text-lg leading-none mt-0.5"></i>
                    <span className="leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {job.benefits.length > 0 && (
            <Section title="Ce que nous offrons" icon="bi-stars">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {job.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 border border-gray-100 rounded-2xl bg-gray-50/70">
                    <i className="bi bi-gift text-[var(--bs-primary)] mt-0.5"></i>
                    <span className="text-sm font-medium text-gray-800">{b}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          <Section title="Comment se passe le recrutement" icon="bi-signpost-split">
            <ol className="grid grid-cols-1 gap-4 p-0 m-0 list-none sm:grid-cols-2">
              {PROCESS.map((s, i) => (
                <li key={s.title} className="relative p-5 bg-white border border-gray-100 rounded-2xl">
                  <span className="absolute text-xs font-bold text-gray-300 top-4 right-5">0{i + 1}</span>
                  <i className={`bi ${s.icon} text-xl text-[var(--bs-primary)]`}></i>
                  <p className="mt-3 mb-1 font-semibold text-gray-900">{s.title}</p>
                  <p className="mb-0 text-sm leading-relaxed text-gray-600">{s.text}</p>
                </li>
              ))}
            </ol>
          </Section>

          <div ref={formRef} id="postuler" className="scroll-mt-28">
            {closed ? (
              <div className="p-8 text-center bg-white border border-gray-100 shadow-sm rounded-3xl">
                <i className="text-4xl text-gray-400 bi bi-lock"></i>
                <h2 className="mt-3 mb-2 text-xl font-semibold text-gray-900">Cette offre n’accepte plus de candidatures</h2>
                <p className="mb-5 text-gray-600">Les autres postes ouverts sont listés sur la page carrières.</p>
                <Link to="/carrieres" className="no-underline jd-btn-primary">Voir les offres ouvertes</Link>
              </div>
            ) : (
              <ApplicationForm job={job} />
            )}
          </div>
        </main>

        {/* Sticky summary */}
        <aside className="hidden lg:block">
          <div className="sticky space-y-4 top-28">
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl">
              <p className="mb-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">En résumé</p>
              <dl className="m-0 space-y-4">
                {facts.map((f) => (
                  <div key={f.k} className="flex items-start gap-3">
                    <i className={`bi ${f.icon} text-gray-400 mt-0.5`}></i>
                    <div className="min-w-0">
                      <dt className="text-xs font-medium text-gray-500">{f.k}</dt>
                      <dd className="m-0 text-sm font-semibold text-gray-900">{f.v}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              {!closed && (
                <button type="button" onClick={scrollToForm} className="w-full mt-6 jd-btn-primary">
                  Postuler
                </button>
              )}
              {job.applyEmail && (
                <p className="mt-4 mb-0 text-xs text-center text-gray-500">
                  Une question ? <a href={`mailto:${job.applyEmail}?subject=${encodeURIComponent(job.title)}`} className="text-[var(--bs-primary)]">{job.applyEmail}</a>
                </p>
              )}
            </div>
            <div className="p-6 text-white rounded-3xl bg-[var(--bs-primary)]">
              <p className="mb-2 font-semibold">Pourquoi Mova ?</p>
              <p className="mb-0 text-sm leading-relaxed text-white/80">
                Nous construisons la mobilité de demain au Congo : réservation de bus, suivi en direct, Mova Pass sans contact. Un produit concret, utilisé chaque jour.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="container px-4 mx-auto mt-16 max-w-7xl">
          <div className="flex items-end justify-between mb-6">
            <h2 className="mb-0 text-2xl font-bold text-gray-900">Autres offres</h2>
            <Link to="/carrieres" className="text-sm font-semibold no-underline text-[var(--bs-primary)]">Tout voir <i className="bi bi-arrow-right"></i></Link>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {related.map((j) => (
              <Link key={j.id} to={`/carrieres/${j.id}`} className="block p-6 no-underline transition-all bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-lg hover:-translate-y-0.5 group">
                <span className="text-xs font-semibold text-gray-500">{label(jobApi.DEFAULT_DEPARTMENTS, j.department)}</span>
                <p className="mt-2 mb-3 text-lg font-semibold leading-snug text-gray-900 group-hover:text-[var(--bs-primary)]">{j.title}</p>
                <span className="text-xs text-gray-500"><i className="bi bi-geo-alt"></i> {label(jobApi.DEFAULT_CITIES, j.location)} · {label(jobApi.CONTRACT_TYPES, j.contractType)}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Mobile apply bar */}
      {!closed && (
        <div className="fixed inset-x-0 bottom-0 z-40 p-3 bg-white/90 border-t border-gray-200 backdrop-blur lg:hidden" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
          <button type="button" onClick={scrollToForm} className="w-full jd-btn-primary">Postuler à cette offre</button>
        </div>
      )}

      {styles}
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <section className="p-6 bg-white border border-gray-100 shadow-sm sm:p-8 rounded-3xl jd-fade">
      <h2 className="flex items-center gap-2 mb-5 text-xl font-bold text-gray-900">
        <i className={`bi ${icon} text-[var(--bs-primary)]`}></i>
        {title}
      </h2>
      {children}
    </section>
  );
}

function ShareMenu({ job }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const text = `${job.title} chez Mova Mobility`;

  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: text, url }); return; } catch { /* cancelled */ }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard refused */ }
  };

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={share} className="jd-btn-ghost" aria-live="polite">
        <i className={`bi ${copied ? 'bi-check2' : 'bi-share'}`}></i> {copied ? 'Lien copié' : 'Partager'}
      </button>
      <a className="jd-icon-btn" aria-label="Partager sur LinkedIn" target="_blank" rel="noopener noreferrer"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}>
        <i className="bi bi-linkedin"></i>
      </a>
      <a className="jd-icon-btn" aria-label="Partager sur WhatsApp" target="_blank" rel="noopener noreferrer"
        href={`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`}>
        <i className="bi bi-whatsapp"></i>
      </a>
    </div>
  );
}

function FileDrop({ id, label: text, hint, file, onFile, required }) {
  const [over, setOver] = useState(false);
  return (
    <label
      htmlFor={id}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); onFile(e.dataTransfer.files?.[0] || null); }}
      className={`flex items-center gap-4 p-4 border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${
        file || over ? 'border-[var(--bs-primary)] bg-[var(--bs-primary)]/5' : 'border-gray-200 hover:border-[var(--bs-primary)]/60'
      }`}
    >
      <span className={`flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0 ${file ? 'bg-[var(--bs-primary)] text-white' : 'bg-gray-100 text-gray-500'}`}>
        <i className={`bi ${file ? 'bi-file-earmark-check' : 'bi-cloud-arrow-up'} text-lg`}></i>
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-gray-900">{text}{required && ' *'}</span>
        <span className="block text-xs text-gray-500 truncate">{file ? file.name : hint}</span>
      </span>
      {file && (
        <button type="button" className="ml-auto text-gray-400 hover:text-gray-700" aria-label="Retirer le fichier"
          onClick={(e) => { e.preventDefault(); onFile(null); }}>
          <i className="bi bi-x-lg"></i>
        </button>
      )}
      <input id={id} type="file" className="sr-only" accept=".pdf,.doc,.docx"
        onChange={(e) => { onFile(e.target.files?.[0] || null); e.target.value = ''; }} />
    </label>
  );
}

function ApplicationForm({ job }) {
  const [values, setValues] = useState({ first_name: '', last_name: '', email: '', linkedin_profile: '', website: '' });
  const [phone, setPhone] = useState('');
  const [resume, setResume] = useState(null);
  const [cover, setCover] = useState(null);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const set = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const pickFile = (setter, key) => (file) => {
    if (!file) { setter(null); return; }
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ACCEPTED.includes(ext)) { setErrors((e) => ({ ...e, [key]: 'Formats acceptés : PDF, DOC ou DOCX.' })); return; }
    if (file.size > MAX_FILE) { setErrors((e) => ({ ...e, [key]: 'Le fichier dépasse 5 Mo.' })); return; }
    setErrors((e) => ({ ...e, [key]: undefined }));
    setter(file);
  };

  const filled = useMemo(
    () => [values.first_name, values.last_name, values.email, resume, consent].filter(Boolean).length,
    [values, resume, consent],
  );

  const submit = async (e) => {
    e.preventDefault();
    const local = {};
    if (!resume) local.resume = 'Ajoutez votre CV.';
    if (!consent) local.consent = 'Merci d’accepter le traitement de votre candidature.';
    if (Object.keys(local).length) { setErrors(local); return; }

    const fd = new FormData();
    fd.append('emploi_id', job.id);
    Object.entries(values).forEach(([k, v]) => { if (v.trim()) fd.append(k, v.trim()); });
    if (phone) fd.append('phone', phone);
    fd.append('resume', resume);
    if (cover) fd.append('cover_letter', cover);

    setSending(true);
    setErrors({});
    try {
      await jobApi.applyToJob(fd);
      setDone(true);
    } catch (err) {
      if (err?.status === 429) {
        setErrors({ form: 'Trop de candidatures envoyées depuis ce réseau. Réessayez dans une heure.' });
      } else if (err?.payload?.errors) {
        const fieldErrors = Object.fromEntries(Object.entries(err.payload.errors).map(([k, v]) => [k, v[0]]));
        setErrors({ ...fieldErrors, form: fieldErrors.emploi_id || 'Certains champs sont à corriger.' });
      } else {
        setErrors({ form: err?.message || 'L’envoi a échoué. Réessayez dans un instant.' });
      }
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="p-8 text-center bg-white border shadow-sm sm:p-12 rounded-3xl border-emerald-100 jd-fade" role="status">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-3xl rounded-full text-emerald-600 bg-emerald-50">
          <i className="bi bi-check-lg"></i>
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Candidature envoyée</h2>
        <p className="max-w-md mx-auto mb-6 text-gray-600">
          Merci {values.first_name}. Votre candidature au poste « {job.title} » est bien arrivée. Nous revenons vers vous à {values.email} sous 10 jours ouvrés.
        </p>
        <Link to="/carrieres" className="no-underline jd-btn-ghost">Voir les autres offres</Link>
      </div>
    );
  }

  const input = (name, labelText, props = {}) => (
    <div>
      <label htmlFor={`f-${name}`} className="block mb-1.5 text-sm font-semibold text-gray-900">{labelText}</label>
      <input id={`f-${name}`} name={name} value={values[name]} onChange={set}
        className={`jd-input ${errors[name] ? 'jd-input-error' : ''}`} aria-invalid={Boolean(errors[name])} {...props} />
      {errors[name] && <p className="mt-1 mb-0 text-xs text-red-600">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate={false} className="p-6 bg-white border border-gray-100 shadow-sm sm:p-10 rounded-3xl">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h2 className="mb-1 text-2xl font-bold text-gray-900">Postuler</h2>
          <p className="mb-0 text-sm text-gray-500">Environ 3 minutes. Les champs marqués * sont obligatoires.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500" aria-hidden="true">
          <div className="w-28 h-1.5 overflow-hidden bg-gray-100 rounded-full">
            <div className="h-full transition-all duration-500 bg-[var(--bs-primary)]" style={{ width: `${(filled / 5) * 100}%` }}></div>
          </div>
          {filled}/5
        </div>
      </div>

      {errors.form && (
        <div className="flex items-start gap-2 p-3 mb-6 text-sm text-red-700 border border-red-100 rounded-xl bg-red-50" role="alert">
          <i className="bi bi-exclamation-circle mt-0.5"></i>{errors.form}
        </div>
      )}

      <fieldset className="mb-8">
        <legend className="mb-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">Vous</legend>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {input('first_name', 'Prénom *', { required: true, autoComplete: 'given-name', maxLength: 255 })}
          {input('last_name', 'Nom *', { required: true, autoComplete: 'family-name', maxLength: 255 })}
          {input('email', 'E-mail *', { type: 'email', required: true, autoComplete: 'email', maxLength: 255 })}
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-900">Téléphone</label>
            <PhoneInput international defaultCountry="CG" value={phone} onChange={(v) => setPhone(v || '')} className="jd-phone" />
            {errors.phone && <p className="mt-1 mb-0 text-xs text-red-600">{errors.phone}</p>}
          </div>
        </div>
      </fieldset>

      <fieldset className="mb-8">
        <legend className="mb-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">Documents</legend>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <FileDrop id="f-resume" label="CV" hint="PDF, DOC ou DOCX, 5 Mo max." file={resume} onFile={pickFile(setResume, 'resume')} required />
            {errors.resume && <p className="mt-1 mb-0 text-xs text-red-600">{errors.resume}</p>}
          </div>
          <div>
            <FileDrop id="f-cover" label="Lettre de motivation" hint="Facultative. PDF, DOC ou DOCX." file={cover} onFile={pickFile(setCover, 'cover_letter')} />
            {errors.cover_letter && <p className="mt-1 mb-0 text-xs text-red-600">{errors.cover_letter}</p>}
          </div>
        </div>
      </fieldset>

      <fieldset className="mb-8">
        <legend className="mb-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">Liens (facultatif)</legend>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {input('linkedin_profile', 'Profil LinkedIn', { type: 'url', placeholder: 'https://linkedin.com/in/…', maxLength: 255 })}
          {input('website', 'Portfolio ou site', { type: 'url', placeholder: 'https://…', maxLength: 255 })}
        </div>
      </fieldset>

      <label className="flex items-start gap-3 mb-2 text-sm text-gray-600 cursor-pointer">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 accent-[var(--bs-primary)]" />
        <span>
          J’accepte que Mova Mobility traite ma candidature pour ce recrutement. Mes documents sont conservés de façon privée et je peux demander leur suppression à tout moment (<Link to="/privacy" className="text-[var(--bs-primary)]">confidentialité</Link>).
        </span>
      </label>
      {errors.consent && <p className="mb-0 text-xs text-red-600">{errors.consent}</p>}

      <div className="flex justify-end mt-8">
        <button type="submit" disabled={sending} className="w-full sm:w-auto jd-btn-primary">
          {sending ? (<><span className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"></span> Envoi…</>) : (<>Envoyer ma candidature <i className="bi bi-send"></i></>)}
        </button>
      </div>
    </form>
  );
}

/** Structured data so the offer can appear in search engines' job results. */
function JobPostingSchema({ job }) {
  const data = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: [job.shortDesc, ...job.responsibilities, ...job.requirements].filter(Boolean).join('\n'),
    datePosted: job.publishedAt ? job.publishedAt.slice(0, 10) : undefined,
    validThrough: job.closesAt || undefined,
    employmentType: { full_time: 'FULL_TIME', part_time: 'PART_TIME', freelance: 'CONTRACTOR', internship: 'INTERN', cdd: 'TEMPORARY', cdi: 'FULL_TIME' }[job.contractType],
    hiringOrganization: { '@type': 'Organization', name: 'Mova Mobility', sameAs: 'https://mova-mobility.com', logo: 'https://mova-mobility.com/assets/images/logo.png' },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: jobApi.getLabel(jobApi.DEFAULT_CITIES, job.location),
        addressCountry: (job.country || 'cg').toUpperCase(),
      },
    },
    jobLocationType: job.workMode === 'remote' ? 'TELECOMMUTE' : undefined,
    directApply: true,
  };
  if (job.salaryDisclosed && (job.salaryMin != null || job.salaryMax != null)) {
    data.baseSalary = {
      '@type': 'MonetaryAmount',
      currency: job.salaryCurrency,
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.salaryMin ?? job.salaryMax,
        maxValue: job.salaryMax ?? job.salaryMin,
        unitText: { hour: 'HOUR', day: 'DAY', month: 'MONTH', year: 'YEAR' }[job.salaryPeriod] || 'MONTH',
      },
    };
  }
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

function DetailSkeleton() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50/60" aria-busy="true" aria-label="Chargement de l’offre">
      <div className="container px-4 mx-auto max-w-7xl animate-pulse">
        <div className="w-32 h-4 mb-6 bg-gray-200 rounded"></div>
        <div className="p-10 bg-white border border-gray-100 rounded-[2rem]">
          <div className="w-24 h-6 mb-5 bg-gray-100 rounded-full"></div>
          <div className="w-2/3 h-10 mb-4 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-4 bg-gray-100 rounded"></div>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            {[0, 1, 2].map((i) => <div key={i} className="h-48 bg-white border border-gray-100 rounded-3xl"></div>)}
          </div>
          <div className="hidden h-96 bg-white border border-gray-100 lg:block rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
}

function NotFound({ missing }) {
  return (
    <div className="flex items-center min-h-screen pt-24 pb-16 bg-gray-50/60">
      <div className="container max-w-xl px-4 mx-auto text-center">
        <i className={`bi ${missing ? 'bi-briefcase' : 'bi-wifi-off'} text-5xl text-gray-300`}></i>
        <h1 className="mt-4 mb-3 text-2xl font-bold text-gray-900">
          {missing ? 'Cette offre n’est plus disponible' : 'Impossible de charger l’offre'}
        </h1>
        <p className="mb-6 text-gray-600">
          {missing
            ? 'Le poste a peut-être été pourvu ou l’offre a expiré. D’autres opportunités vous attendent.'
            : 'Vérifiez votre connexion puis réessayez.'}
        </p>
        <Link to="/carrieres" className="no-underline jd-btn-primary">Voir les offres ouvertes</Link>
      </div>
    </div>
  );
}

const STYLES = `
  .jd-btn-primary {
    display: inline-flex; align-items: center; justify-content: center; gap: .5rem;
    padding: .85rem 1.5rem; border-radius: 999px; border: 0;
    background: var(--bs-primary); color: #fff; font-weight: 600; font-size: .95rem; text-decoration: none;
    transition: transform .15s ease, box-shadow .2s ease, filter .2s ease;
  }
  .jd-btn-primary:hover { filter: brightness(1.12); box-shadow: 0 8px 24px rgba(0, 89, 33, .25); color: #fff; }
  .jd-btn-primary:active { transform: scale(.98); }
  .jd-btn-primary:disabled { opacity: .7; cursor: not-allowed; }
  .jd-btn-ghost {
    display: inline-flex; align-items: center; gap: .5rem;
    padding: .8rem 1.25rem; border-radius: 999px; border: 1px solid #e5e7eb;
    background: #fff; color: #111827; font-weight: 600; font-size: .95rem; text-decoration: none; transition: border-color .2s, background .2s;
  }
  .jd-btn-ghost:hover { border-color: var(--bs-primary); color: var(--bs-primary); }
  .jd-icon-btn {
    width: 44px; height: 44px; display: inline-flex; align-items: center; justify-content: center;
    border-radius: 999px; border: 1px solid #e5e7eb; background: #fff; color: #4b5563; transition: all .2s;
  }
  .jd-icon-btn:hover { border-color: var(--bs-primary); color: var(--bs-primary); }
  .jd-input {
    width: 100%; padding: .8rem 1rem; border-radius: .9rem; border: 1px solid #e5e7eb;
    background: #f9fafb; color: #111827; font-size: .9rem; transition: all .2s;
  }
  .jd-input:focus { outline: none; background: #fff; border-color: var(--bs-primary); box-shadow: 0 0 0 4px rgba(0, 89, 33, .1); }
  .jd-input-error { border-color: #f87171; background: #fef2f2; }
  .jd-phone {
    display: flex; align-items: center; width: 100%; padding: .8rem 1rem; border-radius: .9rem;
    border: 1px solid #e5e7eb; background: #f9fafb; transition: all .2s;
  }
  .jd-phone:focus-within { background: #fff; border-color: var(--bs-primary); box-shadow: 0 0 0 4px rgba(0, 89, 33, .1); }
  .jd-phone .PhoneInputInput { flex: 1; min-width: 0; border: 0; outline: none; background: transparent; font-size: .9rem; color: #111827; }
  .jd-phone .PhoneInputCountry { margin-right: .75rem; }
  @keyframes jdFade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
  .jd-fade { animation: jdFade .5s cubic-bezier(.16, 1, .3, 1) both; }
  @media (prefers-reduced-motion: reduce) { .jd-fade { animation: none; } html { scroll-behavior: auto; } }
`;
