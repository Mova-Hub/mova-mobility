import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import IPhone11 from '../components/device/IPhone11';
import StoreButtons from '../components/StoreButtons';
import { PassCard } from '../components/pass/PassArt';
import SCREENS from '../data/appScreens';
import './mova-pass.css';

/*
 * /movapass, the Mova Pass product page.
 *
 * Built like a product page rather than a feature list: one idea per screen,
 * large type, the device carrying the story. Prices are not quoted here on
 * purpose: plans are managed in the back office and shown in the app, and a
 * figure copied onto the website would go stale the day one changes.
 */

const SECTIONS = [
  { id: 'apercu', label: 'Aperçu' },
  { id: 'fonctionnement', label: 'Comment ça marche' },
  { id: 'eclair', label: 'Pass Éclair' },
  { id: 'securite', label: 'Sécurité' },
  { id: 'faq', label: 'Questions' },
];

const STEPS = [
  {
    n: '01',
    title: 'Activez votre carte.',
    text: 'Approchez la carte de votre téléphone : l’app la lit par NFC et la rattache à votre compte. Pas de guichet, pas de formulaire.',
    screen: SCREENS.passScan,
    chip: { icon: 'bi-broadcast', label: 'Carte détectée' },
  },
  {
    n: '02',
    title: 'Choisissez votre formule.',
    text: 'Les formules disponibles et leurs prix sont affichés dans l’app, avant tout paiement. Payez en MTN MoMo ou Airtel Money.',
    screen: SCREENS.passPlans,
    chip: { icon: 'bi-check-circle-fill', label: 'Paiement confirmé' },
  },
  {
    n: '03',
    title: 'Montez. C’est tout.',
    text: 'À bord, présentez la carte au contrôleur. La validation prend une seconde, même sans réseau, et apparaît ensuite dans votre historique.',
    screen: SCREENS.pass,
    chip: { icon: 'bi-check-circle-fill', label: 'Validé · 07:42' },
  },
];

const SECURITY = [
  { icon: 'bi-patch-check', title: 'Signée, donc infalsifiable', text: 'Chaque carte et chaque QR porte une signature cryptographique. Une copie ou une date modifiée est refusée au contrôle.' },
  { icon: 'bi-wifi-off', title: 'Contrôle hors ligne', text: 'Le terminal du contrôleur vérifie la signature sans connexion. Le bus ne s’arrête pas pour un réseau capricieux.' },
  { icon: 'bi-slash-circle', title: 'Carte perdue, carte bloquée', text: 'Signalez-la : elle est bloquée immédiatement, et votre abonnement passe sur une nouvelle carte.' },
  { icon: 'bi-eye-slash', title: 'Le minimum sur la carte', text: 'Pas de nom, pas de numéro de téléphone. Le lieu d’une validation est effacé après 90 jours.' },
];

/*
 * Payment methods, with the operators' and networks' official marks
 * (public/assets/images/payments/). Card is Visa and Mastercard together.
 * Mova Credit wears the Mova logo: it is our own closed-loop credit.
 */
const PAYMENTS = [
  { name: 'MTN Mobile Money', logos: [{ src: '/assets/images/payments/mtn.svg', alt: 'MTN', h: 56 }] },
  { name: 'Airtel Money', logos: [{ src: '/assets/images/payments/airtel.svg', alt: 'Airtel', h: 56 }] },
  {
    name: 'Carte bancaire',
    logos: [
      { src: '/assets/images/payments/visa.svg', alt: 'Visa', h: 22 },
      { src: '/assets/images/payments/mastercard.svg', alt: 'Mastercard', h: 46 },
    ],
  },
  { name: 'Mova Credit', logos: [{ src: '/assets/images/logo/logo.png', alt: 'Mova', h: 30 }] },
];

const FAQ = [
  { q: 'Où obtenir une carte Mova Pass ?', a: 'Auprès de nos agents et points de vente partenaires. Vous l’activez ensuite vous-même dans l’app, en l’approchant du téléphone.' },
  { q: 'Mon téléphone n’a pas de NFC. Puis-je utiliser le Mova Pass ?', a: 'Oui. Le NFC sert seulement à activer la carte dans l’app ; un agent Mova peut l’activer pour vous. À bord, c’est la carte qui est contrôlée, pas le téléphone.' },
  { q: 'Combien coûte un abonnement ?', a: 'Les formules et leurs prix sont affichés dans l’app, onglet Mova Pass, avant tout paiement. Ils peuvent varier selon la ligne et la durée.' },
  { q: 'J’ai oublié ma carte.', a: 'Ouvrez l’app et générez un Pass Éclair : un QR valable la journée, présenté au contrôleur à la place de la carte. Leur nombre par semaine est limité et affiché dans l’app.' },
  { q: 'Puis-je prêter mon Pass ?', a: 'Non, il est personnel. Un contrôleur peut vérifier à bord que vous en êtes le titulaire.' },
  { q: 'Que se passe-t-il à la fin de mon abonnement ?', a: 'L’app vous prévient avant l’échéance. Renouveler en avance prolonge simplement la période en cours, vous ne perdez aucun jour.' },
];

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/**
 * The phone stays pinned while the three steps scroll past it, then leaves
 * with the section.
 *
 * The pinned column is a grid item with `align-self: start`, so its sticky
 * range is exactly the steps column: it pins when the first step arrives and
 * is released when the last one has gone, without any scroll listener. The
 * active step is the one crossing the middle of the viewport.
 */
function HowItWorks() {
  const [step, setStep] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setStep(Number(e.target.dataset.step)); }),
      { rootMargin: '-48% 0px -48% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = STEPS[step];

  return (
    <section id="fonctionnement" className="mpp-how">
      <div className="container">
        <header className="mpp-section-head" data-aos="fade-up">
          <span className="mpp-eyebrow">Comment ça marche</span>
          <h2>Trois gestes.<br /><span>Puis plus rien à penser.</span></h2>
        </header>
        <div className="mpp-how-grid">
          <ol className="mpp-how-steps">
            {STEPS.map((s, i) => (
              <li key={s.n} data-step={i} ref={(el) => { refs.current[i] = el; }} className={`mpp-step ${step === i ? 'is-active' : ''} ${i < step ? 'is-done' : ''}`}>
                <span className="mpp-step-dot" aria-hidden="true" />
                <span className="mpp-step-n">Étape {s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="mpp-step-device">
                  <IPhone11 screen={s.screen} width="min(260px, 64vw)" />
                </div>
              </li>
            ))}
          </ol>

          <div className="mpp-how-sticky" aria-hidden="true">
            <div className="mpp-how-stage">
              <span className="mpp-how-halo" />
              <IPhone11 screens={STEPS.map((s) => s.screen)} active={step} width="var(--how-phone)" />
              <div key={step} className="mpp-how-chip">
                <i className={`bi ${current.chip.icon}`}></i>{current.chip.label}
              </div>
            </div>
            <div className="mpp-how-caption">
              <div className="mpp-how-rail">
                {STEPS.map((s, i) => (
                  <span key={s.n} className={i < step ? 'is-done' : i === step ? 'is-active' : ''} />
                ))}
              </div>
              <p><span>{current.n}</span> {current.title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A paper ticket, struck through: what the Pass replaces. */
function OldTicket() {
  return (
    <svg viewBox="0 0 150 76" className="mpp-ticket" aria-hidden="true">
      <path d="M8 2h134a6 6 0 0 1 6 6v20a10 10 0 0 0 0 20v20a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V48a10 10 0 0 0 0-20V8a6 6 0 0 1 6-6Z" fill="#fffdf7" stroke="#d8d1c2" strokeWidth="1.5" />
      <line x1="104" y1="8" x2="104" y2="68" stroke="#d8d1c2" strokeWidth="1.5" strokeDasharray="3 4" />
      <text x="16" y="30" fontSize="11" fontWeight="700" fill="#8a8273" fontFamily="inherit" letterSpacing="1.5">TICKET</text>
      <text x="16" y="48" fontSize="10" fill="#a39b8b" fontFamily="inherit">N° 004127</text>
      <text x="114" y="44" fontSize="9" fill="#a39b8b" fontFamily="inherit">BZV</text>
      <path d="M10 64 L140 12" stroke="#c2581b" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

/** A hand-drawn underline under the key words of the headline. */
function Scribble() {
  return (
    <svg viewBox="0 0 300 24" className="mpp-scribble" aria-hidden="true" preserveAspectRatio="none">
      <path d="M4 15 C 60 6, 120 5, 180 9 S 270 16, 296 8" fill="none" stroke="#d9772a" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export default function MovaPassPage() {
  const active = useActiveSection(SECTIONS.map((s) => s.id));
  const [open, setOpen] = useState(0);

  return (
    <div className="mpp">
      <SEO
        title="Mova Pass"
        description="Le Mova Pass : votre abonnement de bus sur une carte NFC. Activez-la dans l’app, payez en Mobile Money, montez sans ticket."
        image="/assets/images/movapass/bus-chauffeur.jpg"
      />

      {/* Local navigation, as on a product page. It scrolls away with the hero. */}
      <nav className="mpp-subnav" aria-label="Mova Pass">
        <div className="container mpp-subnav-inner">
          <span className="mpp-subnav-title">Mova Pass</span>
          <div className="mpp-subnav-links">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'is-active' : ''}>{s.label}</a>
            ))}
          </div>
          <a href="#obtenir" className="mpp-subnav-cta">Obtenir</a>
        </div>
      </nav>

      {/* Hero: light, editorial, built on a real street photo. */}
      <section id="apercu" className="mpp-hero">
        <svg className="mpp-hero-route" viewBox="0 0 1440 640" preserveAspectRatio="none" aria-hidden="true">
          <path d="M-20 520 C 240 520, 300 330, 560 360 S 900 560, 1120 300 S 1380 120, 1480 140" fill="none" stroke="#d9d3c4" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
        </svg>
        <div className="container mpp-hero-grid">
          <div className="mpp-hero-copy" data-aos="fade-up">
            <span className="mpp-pill"><span className="mpp-pill-dot" />Mova Pass · Brazzaville</span>
            <h1>
              Le bus,<br />
              <span className="mpp-hero-mark">sans ticket.<Scribble /></span>
            </h1>
            <p>
              Votre abonnement tient sur une carte NFC. Vous la présentez, vous montez. L’app Mova s’occupe du reste : activation, paiement, renouvellement.
            </p>
            <div className="mpp-hero-ctas">
              <a href="#obtenir" className="mpp-btn is-primary">Obtenir le Mova Pass</a>
              <a href="#fonctionnement" className="mpp-btn is-link">Comment ça marche <i className="bi bi-arrow-right"></i></a>
            </div>
            <dl className="mpp-hero-facts">
              <div><dt>1 s</dt><dd>pour valider à bord</dd></div>
              <div><dt>Hors ligne</dt><dd>le contrôle marche sans réseau</dd></div>
              <div><dt>24 h</dt><dd>de Pass Éclair si la carte est oubliée</dd></div>
            </dl>
          </div>

          <div className="mpp-hero-visual" data-aos="fade-left" data-aos-delay="100">
            <figure className="mpp-hero-photo">
              <img src="/assets/images/movapass/bus-chauffeur.jpg" alt="Un chauffeur souriant penché à la fenêtre de son minibus, dans une rue de Brazzaville" fetchpriority="high" />
            </figure>
            <OldTicket />
            <div className="mpp-toast" aria-hidden="true">
              <span className="mpp-toast-icon"><i className="bi bi-check-lg"></i></span>
              <span><b>Validé</b><small>Ligne Centre-ville · 07:42</small></span>
            </div>
            <IPhone11 screen={SCREENS.pass} width="clamp(190px, 17vw, 250px)" className="mpp-hero-phone" eager />
            <div className="mpp-hero-cardwrap">
              <span className="mpp-tap" aria-hidden="true"><span /><span /></span>
              <PassCard className="mpp-hero-card" />
            </div>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="mpp-statement">
        <div className="container">
          <p data-aos="fade-up">
            Plus de monnaie à préparer. <span>Plus de ticket à perdre.</span> Plus de file au guichet. <span>Juste vous, et le trajet.</span>
          </p>
        </div>
      </section>

      <HowItWorks />

      {/* The card */}
      <section className="mpp-cardsec">
        <div className="container mpp-split">
          <div data-aos="fade-up">
            <span className="mpp-eyebrow">La carte</span>
            <h2 className="mpp-h2">Petite carte.<br /><span>Grand trajet.</span></h2>
            <p className="mpp-p">
              Une carte NFC sans contact qui porte votre abonnement. Sa puce ne contient ni votre nom ni votre numéro de téléphone : seulement ce que le contrôleur doit vérifier, signé par Mova.
            </p>
            <ul className="mpp-checks">
              <li><i className="bi bi-check2"></i>Activation en un geste, depuis l’app</li>
              <li><i className="bi bi-check2"></i>Historique de chaque validation</li>
              <li><i className="bi bi-check2"></i>Renouvellement en Mobile Money</li>
            </ul>
          </div>
          <div className="mpp-cardstage" data-aos="zoom-in">
            <PassCard tilt />
            <div className="mpp-waves" aria-hidden="true"><span /><span /><span /></div>
          </div>
        </div>
      </section>

      {/* Pass Éclair */}
      <section id="eclair" className="mpp-eclair">
        <div className="container mpp-split is-reverse">
          <div className="mpp-eclair-visual" data-aos="fade-up">
            <IPhone11 screen={SCREENS.eclair} width="min(270px, 64vw)" />
            <div className="mpp-eclair-badge"><i className="bi bi-lightning-charge-fill"></i> Valable aujourd’hui</div>
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <span className="mpp-eyebrow"><i className="bi bi-lightning-charge-fill"></i> Pass Éclair</span>
            <h2 className="mpp-h2">Carte oubliée ?<br /><span>Pas de panique.</span></h2>
            <p className="mpp-p">
              L’app génère un QR valable toute la journée, que vous présentez à la place de la carte. Il est signé comme elle, et ne peut pas être réutilisé un autre jour.
            </p>
            <p className="mpp-note">Nombre de Pass Éclair par semaine limité, affiché dans l’app.</p>
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="securite" className="mpp-security">
        <div className="container">
          <header className="mpp-section-head" data-aos="fade-up">
            <span className="mpp-eyebrow">Sécurité</span>
            <h2>Conçu pour ne pas être copié.<br /><span>Ni par vous, ni par d’autres.</span></h2>
          </header>
          <div className="mpp-bento">
            {SECURITY.map((s, i) => (
              <article key={s.title} className="mpp-tile" data-aos="fade-up" data-aos-delay={i * 80}>
                <i className={`bi ${s.icon}`}></i>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Screens */}
      <section className="mpp-screens">
        <div className="container">
          <header className="mpp-section-head" data-aos="fade-up">
            <span className="mpp-eyebrow">Dans l’app</span>
            <h2>Votre Pass,<br /><span>toujours sous les yeux.</span></h2>
          </header>
          <div className="mpp-screens-row">
            {[SCREENS.pass, SCREENS.passHistory, SCREENS.passScan, SCREENS.eclair].map((s, i) => (
              <figure key={s.src} data-aos="fade-up" data-aos-delay={i * 90} className={i % 2 ? 'is-low' : ''}>
                <IPhone11 screen={s} width="min(230px, 70vw)" />
                <figcaption>{s.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Payments */}
      <section className="mpp-pay">
        <div className="container" data-aos="fade-up">
          <h2 className="mpp-h2 text-center">Payez avec ce que vous avez déjà.</h2>
          <p className="mpp-pay-lead">Le paiement se fait dans l’app, au moment de choisir votre formule. Vous recevez la confirmation et le reçu tout de suite.</p>
          <ul className="mpp-pay-list">
            {PAYMENTS.map((p) => (
              <li key={p.name} className="mpp-pay-item">
                <span className="mpp-pay-logos">
                  {p.logos.map((l) => (
                    <img key={l.src} src={l.src} alt={l.alt} style={{ height: l.h }} loading="lazy" />
                  ))}
                </span>
                <span className="mpp-pay-name">{p.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mpp-faq">
        <div className="container">
          <header className="mpp-section-head" data-aos="fade-up">
            <span className="mpp-eyebrow">Questions</span>
            <h2>Tout ce que vous voulez savoir.</h2>
          </header>
          <div className="mpp-faq-list">
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className={`mpp-faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} aria-controls={`faq-${i}`} id={`faq-q-${i}`}>
                    {f.q}
                    <i className="bi bi-plus-lg"></i>
                  </button>
                  <div id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="mpp-faq-a">
                    <div><p>{f.a}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mpp-faq-more">Une autre question ? <Link to="/contact">Écrivez-nous</Link>.</p>
        </div>
      </section>

      {/* Closing: light, with a photo. */}
      <section id="obtenir" className="mpp-cta">
        <div className="container mpp-cta-grid">
          <figure className="mpp-cta-photo" data-aos="fade-up">
            <img src="/assets/images/movapass/passagere.jpg" alt="Une passagère en terrasse, sa tablette à la main" loading="lazy" />
            <PassCard className="mpp-cta-card" />
          </figure>
          <div className="mpp-cta-copy" data-aos="fade-up" data-aos-delay="100">
            <span className="mpp-eyebrow">Obtenir le Mova Pass</span>
            <h2 className="mpp-h2">Montez à bord.</h2>
            <ol className="mpp-cta-steps">
              <li><span>1</span>Téléchargez l’app Mova</li>
              <li><span>2</span>Activez votre carte en l’approchant du téléphone</li>
              <li><span>3</span>Choisissez votre formule et payez en Mobile Money</li>
            </ol>
            <StoreButtons />
          </div>
        </div>
      </section>
    </div>
  );
}
