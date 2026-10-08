import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import IPhone11 from './device/IPhone11';
import StoreButtons from './StoreButtons';
import SCREENS from '../data/appScreens';
import './app-showcase.css';

/*
 * The app, on the home page.
 *
 * Was a Mova Pass section with three screenshots of the old app. The app is
 * now booking, payment, live tracking, Mova Pass and support in one place,
 * so the section walks through those five chapters on a real-proportion
 * iPhone 11, then shows the rest of the screens in a gallery.
 */

const CHAPTERS = [
  {
    key: 'book',
    icon: 'bi-plus-circle',
    title: 'Réservez un trajet',
    text: 'Départ, arrivée, date, véhicules : un mariage, un séminaire ou une sortie scolaire se réserve en quelques étapes. Le prix s’affiche avant de payer.',
    screen: SCREENS.book,
    chip: { icon: 'bi-receipt', label: 'Prix fixé avant de payer' },
  },
  {
    key: 'pay',
    icon: 'bi-phone',
    title: 'Payez comme vous voulez',
    text: 'MTN MoMo, Airtel Money, carte ou Mova Credit. La confirmation arrive dans l’app, avec votre reçu.',
    screen: SCREENS.pay,
    chip: { icon: 'bi-check-circle-fill', label: 'Paiement confirmé' },
  },
  {
    key: 'live',
    icon: 'bi-geo-alt',
    title: 'Suivez votre bus en direct',
    text: 'Le véhicule sur la carte en temps réel et l’heure d’arrivée. Une question ? Écrivez ou appelez l’équipe sans quitter l’app.',
    screen: SCREENS.live,
    chip: { icon: 'bi-bus-front', label: 'Arrivée dans 4 min' },
  },
  {
    key: 'pass',
    icon: 'bi-credit-card-2-front',
    title: 'Voyagez avec le Mova Pass',
    text: 'Votre abonnement sur une carte NFC. Activez-la d’un geste, suivez vos validations, renouvelez en Mobile Money.',
    screen: SCREENS.pass,
    chip: { icon: 'bi-broadcast', label: 'Pass valide' },
    link: { to: '/movapass', label: 'Découvrir le Mova Pass' },
  },
  {
    key: 'help',
    icon: 'bi-life-preserver',
    title: 'De l’aide, vraiment',
    text: 'Le support répond dans l’app, et vous appelle sans frais d’itinérance. Chaque trajet peut être noté, chaque avis est lu.',
    screen: SCREENS.support,
    chip: { icon: 'bi-headset', label: 'Le support vous répond' },
  },
];

const GALLERY = [SCREENS.home, SCREENS.quote, SCREENS.trips, SCREENS.messages, SCREENS.call, SCREENS.passScan, SCREENS.eclair, SCREENS.account];

const DURATION = 6500;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return undefined;
    const on = () => setReduced(mq.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  return reduced;
}

export default function AppShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);

  // Only advance while the section is on screen, like a video that pauses.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = inView && !paused && !reduced;
  const next = () => setActive((i) => (i + 1) % CHAPTERS.length);

  const scrollGallery = (dir) => {
    const el = galleryRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  const chapter = CHAPTERS[active];

  return (
    <section className="asx" id="application" ref={sectionRef}>
      {/* Kept so older links to /#movapass still land here. */}
      <span id="movapass" className="asx-anchor" aria-hidden="true" />

      <div className="container">
        <header className="asx-head" data-aos="fade-up">
          <span className="asx-eyebrow">L’application Mova</span>
          <h2 className="asx-title">Tout Mova.<br /><span>Dans votre poche.</span></h2>
          <p className="asx-lead">
            Réserver un bus, payer, le suivre en direct, voyager avec le Mova Pass et parler à l’équipe : une seule app, pensée pour le Congo.
          </p>
        </header>

        <div className="asx-stage" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <ol className="asx-chapters" aria-label="Fonctions de l’app">
            {CHAPTERS.map((c, i) => {
              const on = i === active;
              return (
                <li key={c.key} className={`asx-chapter ${on ? 'is-active' : ''}`}>
                  <button type="button" onClick={() => setActive(i)} aria-expanded={on} aria-controls={`asx-panel-${c.key}`} className="asx-chapter-btn">
                    <span className="asx-chapter-icon"><i className={`bi ${c.icon}`}></i></span>
                    <span className="asx-chapter-title">{c.title}</span>
                  </button>
                  <div id={`asx-panel-${c.key}`} className="asx-chapter-body" hidden={!on}>
                    <p>{c.text}</p>
                    {c.link && <Link to={c.link.to} className="asx-link">{c.link.label} <i className="bi bi-arrow-right"></i></Link>}
                  </div>
                  <span className="asx-progress" aria-hidden="true">
                    {on && (
                      <span
                        key={active}
                        className={`asx-progress-fill ${reduced ? '' : 'is-animated'}`}
                        style={{ animationDuration: `${DURATION}ms`, animationPlayState: running ? 'running' : 'paused' }}
                        onAnimationEnd={next}
                      />
                    )}
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="asx-device">
            <div className="asx-glow" aria-hidden="true" />
            <IPhone11 screens={CHAPTERS.map((c) => c.screen)} active={active} width="min(300px, 68vw)" />
            <div key={chapter.key} className="asx-chip" aria-hidden="true">
              <i className={`bi ${chapter.chip.icon}`}></i>{chapter.chip.label}
            </div>
            <div className="asx-dots" role="tablist" aria-label="Écrans">
              {CHAPTERS.map((c, i) => (
                <button key={c.key} type="button" role="tab" aria-selected={i === active} aria-label={c.title}
                  className={i === active ? 'is-active' : ''} onClick={() => setActive(i)} />
              ))}
            </div>
          </div>
        </div>

        <div className="asx-gallery-head" data-aos="fade-up">
          <h3>Et tout le reste.</h3>
          <div className="asx-arrows">
            <button type="button" onClick={() => scrollGallery(-1)} aria-label="Écrans précédents"><i className="bi bi-chevron-left"></i></button>
            <button type="button" onClick={() => scrollGallery(1)} aria-label="Écrans suivants"><i className="bi bi-chevron-right"></i></button>
          </div>
        </div>
        <div className="asx-gallery" ref={galleryRef} tabIndex={0} aria-label="Galerie des écrans de l’app">
          {GALLERY.map((s) => (
            <figure key={s.src} className="asx-gallery-item">
              <IPhone11 screen={s} width="220px" />
              <figcaption>{s.title}</figcaption>
            </figure>
          ))}
        </div>

        <div className="asx-download" data-aos="fade-up">
          <div>
            <p className="asx-download-title">Gratuite sur iPhone et Android.</p>
            <p className="asx-download-text">Créez votre compte avec votre numéro, en moins d’une minute.</p>
          </div>
          <StoreButtons />
        </div>
      </div>
    </section>
  );
}
