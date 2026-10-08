import React from 'react';
import { Link } from 'react-router-dom';
import IPhone11 from '../device/IPhone11';
import StoreButtons from '../StoreButtons';
import SCREENS from '../../data/appScreens';
import { RouteIllustration, EcosystemIllustration } from './Illustrations';
import './about-story.css';

/*
 * The new middle of the About page: what Mova changes for a rider, how the
 * pieces fit together, what guides the team, and where it stands. Figures
 * are deliberately qualitative here; the measured ones stay in the stats
 * band the page already had.
 */

const BEFORE_AFTER = [
  ['Négocier le prix au téléphone', 'Le prix s’affiche avant de payer'],
  ['Attendre sans savoir où est le bus', 'Le bus sur la carte, en direct'],
  ['Chercher de la monnaie pour le ticket', 'Une carte, touchée en une seconde'],
  ['Un numéro qui ne répond pas', 'Le support dans l’app, appel compris'],
];

const PILLARS = [
  { title: 'Passagers', text: 'Réservent, paient, suivent leur bus et voyagent avec le Mova Pass depuis l’app.' },
  { title: 'Chauffeurs et opérateurs', text: 'Des partenaires locaux, avec des trajets planifiés et payés à temps.' },
  { title: 'Contrôleurs', text: 'Une app terrain qui vérifie les Pass en une seconde, même sans réseau.' },
  { title: 'Équipe Mova', text: 'Un centre opérationnel qui suit chaque trajet et répond aux passagers.' },
];

const VALUES = [
  { icon: 'bi-shield-check', title: 'Fiabilité', text: 'Un bus annoncé est un bus qui vient. Tout le reste en découle.' },
  { icon: 'bi-receipt', title: 'Prix clairs', text: 'Le prix est connu avant de payer. Pas de surprise à l’arrivée.' },
  { icon: 'bi-people', title: 'Proximité', text: 'Une équipe à Brazzaville, joignable, qui connaît les rues.' },
  { icon: 'bi-lock', title: 'Respect des données', text: 'Le strict nécessaire, protégé, jamais revendu.' },
];

const JOURNEY = [
  { when: '2025', title: 'Lancement à Brazzaville', text: 'Les premières réservations de bus pour les mariages, séminaires et sorties scolaires.' },
  { when: 'Ensuite', title: 'Tout passe dans l’app', text: 'Réservation, devis et paiement Mobile Money, sans appel ni déplacement.' },
  { when: 'Puis', title: 'Le Mova Pass', text: 'Une carte NFC pour les trajets du quotidien, contrôlée hors ligne.' },
  { when: 'Aujourd’hui', title: 'Suivi en direct et appels', text: 'Le bus sur la carte, les messages et les appels avec l’équipe dans l’app.' },
  { when: 'Demain', title: 'Plus de lignes, plus de villes', text: 'Le même service, ligne après ligne, ville après ville.' },
];

export default function AboutStory() {
  return (
    <>
      {/* What changes */}
      <section className="abs-section">
        <div className="container abs-split">
          <div data-aos="fade-up">
            <span className="abs-eyebrow">Ce que Mova change</span>
            <h2 className="abs-h2">Se déplacer en ville, <span>sans les tracas habituels.</span></h2>
            <ul className="abs-ba">
              {BEFORE_AFTER.map(([before, after]) => (
                <li key={before}>
                  <span className="abs-before"><i className="bi bi-x"></i>{before}</span>
                  <span className="abs-after"><i className="bi bi-check2"></i>{after}</span>
                </li>
              ))}
            </ul>
          </div>
          <div data-aos="fade-left">
            <RouteIllustration className="abs-illu" />
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="abs-section is-paper">
        <div className="container">
          <header className="abs-head" data-aos="fade-up">
            <span className="abs-eyebrow">Comment ça tient ensemble</span>
            <h2 className="abs-h2">Une plateforme, <span>quatre métiers.</span></h2>
            <p className="abs-lead">Mova n’est pas qu’une app. C’est un système qui relie chaque personne d’un trajet, du passager à l’équipe qui le suit.</p>
          </header>
          <div className="abs-eco" data-aos="zoom-in">
            <EcosystemIllustration className="abs-illu" />
          </div>
          <div className="abs-pillars">
            {PILLARS.map((p, i) => (
              <div key={p.title} data-aos="fade-up" data-aos-delay={i * 80}>
                <p className="abs-pillar-title">{p.title}</p>
                <p className="abs-pillar-text">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="abs-section">
        <div className="container">
          <header className="abs-head" data-aos="fade-up">
            <span className="abs-eyebrow">Ce qui nous guide</span>
            <h2 className="abs-h2">Quatre engagements, <span>tenus chaque jour.</span></h2>
          </header>
          <div className="abs-values">
            {VALUES.map((v, i) => (
              <article key={v.title} data-aos="fade-up" data-aos-delay={i * 80}>
                <i className={`bi ${v.icon}`}></i>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="abs-section is-paper">
        <div className="container">
          <header className="abs-head" data-aos="fade-up">
            <span className="abs-eyebrow">Notre parcours</span>
            <h2 className="abs-h2">D’un bus réservé <span>à un réseau.</span></h2>
          </header>
          <ol className="abs-journey">
            {JOURNEY.map((j, i) => (
              <li key={j.title} data-aos="fade-up" data-aos-delay={i * 70} className={i === JOURNEY.length - 1 ? 'is-next' : ''}>
                <span className="abs-when">{j.when}</span>
                <span className="abs-dot" aria-hidden="true" />
                <p className="abs-j-title">{j.title}</p>
                <p className="abs-j-text">{j.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* App */}
      <section className="abs-section">
        <div className="container abs-app">
          <div className="abs-app-device" data-aos="fade-up">
            <IPhone11 screen={SCREENS.pass} width="min(260px, 64vw)" />
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <span className="abs-eyebrow">L’app Mova</span>
            <h2 className="abs-h2">Toute cette histoire <span>tient dans votre poche.</span></h2>
            <p className="abs-lead is-left">Réservez un bus, suivez-le en direct, voyagez avec le Mova Pass. Gratuite sur iPhone et Android.</p>
            <StoreButtons />
            <Link to="/movapass" className="abs-link">Découvrir le Mova Pass <i className="bi bi-arrow-right"></i></Link>
          </div>
        </div>
      </section>
    </>
  );
}
