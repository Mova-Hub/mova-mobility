import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../SEO';

/*
 * The frame shared by the privacy policy and the terms: a hero, a summary in
 * plain words, a table of contents that follows the reader, and numbered
 * sections. Each page only supplies its content.
 */
export default function LegalPage({ seo, eyebrow, title, accent, intro, updated, summary, sections, related }) {
  const [active, setActive] = useState(sections[0]?.id);

  // Highlights the section being read in the table of contents.
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!('IntersectionObserver' in window) || els.length === 0) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-110px 0px -60% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const go = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <div className="bg-white legal-page">
      <SEO title={seo.title} description={seo.description} />

      <section className="bg-light border-bottom" style={{ paddingTop: '7rem', paddingBottom: '4.5rem' }}>
        <div className="container">
          <div className="text-center row justify-content-center">
            <div className="col-lg-8" data-aos="fade-up">
              <div className="gap-2 mb-3 d-flex align-items-center justify-content-center">
                <span className="legal-rule"></span>
                <span className="text-uppercase fw-bold legal-eyebrow">{eyebrow}</span>
                <span className="legal-rule"></span>
              </div>
              <h1 className="mb-4 display-6 fw-semibold text-dark">
                {title} <span style={{ color: 'var(--bs-primary)' }}>{accent}</span>
              </h1>
              <p className="text-muted fs-5">{intro}</p>
              <div className="flex-wrap gap-3 mt-4 d-flex justify-content-center align-items-center">
                <span className="small fw-bold text-muted">Dernière mise à jour : {updated}</span>
                <button type="button" onClick={() => window.print()} className="px-3 btn btn-sm btn-outline-secondary rounded-pill d-print-none">
                  <i className="bi bi-printer me-1"></i> Imprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" style={{ marginTop: '1rem', marginBottom: '3rem' }}>
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4 d-none d-lg-block d-print-none">
              <nav className="p-4 border-0 shadow-sm card rounded-4 legal-toc" aria-label="Sommaire">
                <p className="mb-3 fw-bold text-dark small text-uppercase legal-eyebrow-muted">Sommaire</p>
                <ol className="p-0 m-0 list-unstyled">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} onClick={(e) => go(e, s.id)} className={`legal-toc-link ${active === s.id ? 'is-active' : ''}`}
                        aria-current={active === s.id ? 'true' : undefined}>
                        <span className="legal-toc-num">{String(i + 1).padStart(2, '0')}</span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            <div className="col-lg-8">
              {summary && (
                <div className="p-4 mb-5 p-md-5 rounded-4 legal-summary" data-aos="fade-up">
                  <p className="mb-3 fw-bold text-dark"><i className="bi bi-lightning-charge me-2" style={{ color: 'var(--bs-primary)' }}></i>L’essentiel en 30 secondes</p>
                  <ul className="p-0 m-0 list-unstyled row g-3">
                    {summary.map((item) => (
                      <li key={item.title} className="col-md-6">
                        <div className="gap-3 d-flex">
                          <i className={`bi ${item.icon} legal-summary-icon`}></i>
                          <div>
                            <p className="mb-1 fw-semibold text-dark">{item.title}</p>
                            <p className="mb-0 small text-muted">{item.text}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="mb-5 legal-section">
                  <h2 className="mb-3 fw-bold text-dark">
                    <span className="legal-num">{i + 1}.</span> {s.title}
                  </h2>
                  {s.body}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-white border-top d-print-none">
        <div className="container">
          <div className="gap-4 p-5 border shadow-sm rounded-5 d-flex flex-column flex-md-row align-items-center justify-content-between" style={{ backgroundColor: '#f9fafb' }}>
            <div className="text-center text-md-start">
              <h3 className="mb-2 h4 fw-bolder text-dark">Une question sur ce document ?</h3>
              <p className="mb-0 text-muted">Écrivez-nous, nous répondons sous 30 jours au plus.</p>
            </div>
            <div className="gap-3 d-flex flex-column flex-sm-row">
              {related && (
                <Link to={related.to} className="px-4 py-3 bg-white border btn rounded-pill fw-bold text-dark">{related.label}</Link>
              )}
              <a href="mailto:privacy@mova-mobility.com" className="px-4 py-3 btn btn-dark rounded-pill fw-bold">privacy@mova-mobility.com</a>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: LEGAL_STYLES }} />
    </div>
  );
}

/** A table that stays readable on a phone: rows become cards below 768px. */
export function LegalTable({ head, rows }) {
  return (
    <div className="my-4 legal-table-wrap">
      <table className="table mb-0 align-top legal-table">
        <thead>
          <tr>{head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => <td key={j} data-label={head[j]}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Callout({ icon = 'bi-info-circle', title, children }) {
  return (
    <div className="gap-3 p-4 my-4 d-flex legal-callout rounded-4">
      <i className={`bi ${icon} fs-4`} style={{ color: 'var(--bs-primary)' }}></i>
      <div>
        {title && <p className="mb-1 fw-bold text-dark">{title}</p>}
        <div className="text-muted">{children}</div>
      </div>
    </div>
  );
}

const LEGAL_STYLES = `
  .legal-rule { width: 20px; height: 2px; background: var(--bs-primary); }
  .legal-eyebrow { color: var(--bs-primary); font-size: .75rem; letter-spacing: 2px; }
  .legal-eyebrow-muted { letter-spacing: .1em; }
  .legal-toc { position: sticky; top: 100px; background: #f9fafb; max-height: calc(100vh - 130px); overflow-y: auto; }
  .legal-toc-link {
    display: flex; gap: .75rem; padding: .5rem .75rem; border-radius: 10px;
    color: #6b7280; font-weight: 600; font-size: .92rem; text-decoration: none; line-height: 1.4;
    border-left: 2px solid transparent; transition: all .2s;
  }
  .legal-toc-link:hover { color: var(--bs-primary); background: rgba(0, 89, 33, .05); }
  .legal-toc-link.is-active { color: var(--bs-primary); background: rgba(0, 89, 33, .08); border-left-color: var(--bs-primary); }
  .legal-toc-num { font-variant-numeric: tabular-nums; opacity: .5; }
  .legal-summary { background: linear-gradient(135deg, rgba(0, 89, 33, .06), rgba(0, 89, 33, .02)); border: 1px solid rgba(0, 89, 33, .12); }
  .legal-summary-icon { font-size: 1.25rem; color: var(--bs-primary); }
  .legal-section { scroll-margin-top: 110px; }
  .legal-section h2 { font-size: 1.5rem; letter-spacing: -.02em; }
  .legal-section h3 { font-size: 1.1rem; font-weight: 700; color: #111827; margin-top: 1.5rem; }
  .legal-num { color: var(--bs-primary); }
  .legal-section p, .legal-section li { line-height: 1.8; font-size: 1.02rem; color: #4b5563; }
  .legal-section ul { padding-left: 1.2rem; }
  .legal-section a { color: var(--bs-primary); }
  .legal-callout { background: #f9fafb; border: 1px solid #e5e7eb; }
  .legal-table-wrap { border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; }
  .legal-table th { background: #f9fafb; font-size: .8rem; text-transform: uppercase; letter-spacing: .05em; color: #6b7280; padding: .9rem 1rem; }
  .legal-table td { font-size: .95rem; color: #374151; padding: .9rem 1rem; line-height: 1.6; }
  .legal-table tr:last-child td { border-bottom: 0; }
  @media (max-width: 767.98px) {
    .legal-table thead { display: none; }
    .legal-table tr { display: block; border-bottom: 1px solid #e5e7eb; padding: .5rem 0; }
    .legal-table td { display: block; border: 0; padding: .35rem 1rem; }
    .legal-table td::before { content: attr(data-label); display: block; font-size: .7rem; text-transform: uppercase; letter-spacing: .05em; color: #9ca3af; font-weight: 700; }
  }
  @media print {
    .legal-page nav, footer, header, .navbar { display: none !important; }
    .legal-section { break-inside: avoid-page; }
  }
`;
