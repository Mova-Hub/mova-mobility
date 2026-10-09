/*
 * The app screens shown on the website, in one place.
 *
 * To add or replace a screen, drop a screenshot from an iPhone 11 (or any
 * 828 x 1792 / 1242 x 2688 / 1170 x 2532 portrait capture) into
 * `public/assets/images/app/` under the file name below. Nothing else changes.
 *
 * Until a file exists, `fallback` is used (an older capture), then `mock` (the
 * screen drawn in HTML, see components/device/ScreenMocks.jsx), and without
 * either a drawn placeholder with the screen's title, so a page never shows a broken
 * image.
 */
const DIR = '/assets/images/app';
const OLD = '/assets/images/screens';

export const SCREENS = {
  home: {
    src: `${DIR}/accueil.png`,
    // fallback: `${OLD}/acceuil.png`,
    title: 'Accueil',
    icon: 'bi-house-door',
    alt: 'Écran d’accueil de l’app Mova',
  },
  book: {
    src: `${DIR}/reservation.png`,
    // fallback: `${OLD}/reservation.png`,
    title: 'Réserver',
    icon: 'bi-plus-circle',
    alt: 'Réservation d’un trajet : départ, arrivée, date et véhicules',
  },
  quote: {
    src: `${DIR}/devis.png`,
    title: 'Votre devis',
    icon: 'bi-receipt',
    alt: 'Récapitulatif et prix du trajet avant paiement',
  },
  pay: {
    src: `${DIR}/paiement.png`,
    title: 'Paiement',
    icon: 'bi-phone',
    alt: 'Paiement par MTN MoMo, Airtel Money ou Mova Credit',
  },
  live: {
    src: `${DIR}/suivi.png`,
    title: 'Suivi en direct',
    icon: 'bi-geo-alt',
    alt: 'Le bus sur la carte, en temps réel',
  },
  trips: {
    src: `${DIR}/trips.png`,
    fallback: `${OLD}/trajets.JPG`,
    title: 'Mes trajets',
    icon: 'bi-list-ul',
    alt: 'Historique et trajets à venir',
  },
  messages: {
    src: `${DIR}/messages.png`,
    title: 'Messages',
    icon: 'bi-chat-dots',
    alt: 'Messagerie avec l’équipe pendant un trajet',
  },
  call: {
    src: `${DIR}/appel.png`,
    title: 'Appel',
    icon: 'bi-telephone',
    alt: 'Appel audio avec le support, depuis l’app',
  },
  pass: {
    src: `${DIR}/pass.png`,
    mock: 'pass',
    title: 'Mova Pass',
    icon: 'bi-credit-card-2-front',
    alt: 'L’onglet Mova Pass avec la carte et l’abonnement',
  },
  passScan: {
    src: `${DIR}/pass-activation.png`,
    mock: 'passScan',
    title: 'Activer la carte',
    icon: 'bi-broadcast',
    alt: 'Activation de la carte Mova Pass par NFC',
  },
  passPlans: {
    src: `${DIR}/pass-formules.png`,
    mock: 'passPlans',
    title: 'Formules',
    icon: 'bi-grid',
    alt: 'Choix d’une formule d’abonnement',
  },
  passHistory: {
    src: `${DIR}/pass-historique.png`,
    mock: 'passHistory',
    title: 'Historique',
    icon: 'bi-clock-history',
    alt: 'Historique des validations du Mova Pass',
  },
  eclair: {
    src: `${DIR}/pass-eclair.png`,
    mock: 'eclair',
    title: 'Pass Éclair',
    icon: 'bi-qr-code',
    alt: 'QR Pass Éclair valable la journée',
  },
  support: {
    src: `${DIR}/support.png`,
    title: 'Support',
    icon: 'bi-life-preserver',
    alt: 'Demande d’aide au support',
  },
  account: {
    src: `${DIR}/compte.png`,
    title: 'Compte',
    icon: 'bi-person-circle',
    alt: 'Profil, adresses et moyens de paiement',
  },
};

export default SCREENS;
