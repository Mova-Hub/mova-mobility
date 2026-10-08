import React from 'react';
import { Link } from 'react-router-dom';
import LegalPage, { LegalTable, Callout } from '../components/legal/LegalPage';

/*
 * Privacy policy for the Mova app, Mova Pass and this website.
 *
 * Every processor, permission and retention period named here matches what
 * the app and the API actually do. When one changes in the code, it changes
 * here too: a policy that describes another product is worse than none.
 */

const UPDATED = '8 octobre 2026';

const SUMMARY = [
  { icon: 'bi-shop', title: 'Nous ne vendons pas vos données', text: 'Ni à des annonceurs, ni à personne. Elles servent à faire fonctionner Mova.' },
  { icon: 'bi-geo-alt', title: 'Votre position, seulement quand vous l’utilisez', text: 'Jamais en arrière-plan. Elle sert à trouver votre point de prise en charge.' },
  { icon: 'bi-credit-card', title: 'Aucun numéro de carte chez nous', text: 'Les paiements passent par MTN MoMo, Airtel Money ou nos prestataires agréés.' },
  { icon: 'bi-trash', title: 'Supprimer votre compte en deux gestes', text: 'Directement dans l’app : Compte, puis Supprimer mon compte.' },
];

const sections = [
  {
    id: 'qui',
    title: 'Qui sommes-nous',
    body: (
      <>
        <p>
          Le responsable du traitement de vos données est <strong>Mova Mobility</strong>, joignable à Brazzaville (1er étage, Immeuble Monte Christo, Rond-point de la Gare, République du Congo) et à Puteaux (74/80 rue Roque de Fillol, 92800, France).
        </p>
        <p>
          Cette politique couvre l’application mobile Mova (iOS et Android), le Mova Pass (carte NFC et Pass Éclair), le site mova-mobility.com et nos échanges avec vous (support, appels, e-mails). Elle s’applique à toute personne qui utilise nos services, réserve un trajet, voyage avec un Mova Pass, nous écrit ou postule chez nous.
        </p>
      </>
    ),
  },
  {
    id: 'collecte',
    title: 'Les données que nous collectons',
    body: (
      <>
        <p>Nous ne collectons que ce qui sert à rendre le service. Voici, concrètement, ce que cela recouvre :</p>
        <LegalTable
          head={['Catégorie', 'Ce que cela comprend', 'D’où cela vient']}
          rows={[
            ['Compte', 'Nom, numéro de téléphone, e-mail, photo de profil (facultative), mot de passe (stocké chiffré, jamais en clair). Si vous vous connectez avec Google ou Apple : l’identifiant et l’e-mail que ce service nous transmet.', 'Vous'],
            ['Réservations et trajets', 'Adresses de départ et d’arrivée, adresses enregistrées, dates, nombre de passagers, options, devis, statut du trajet, évaluations laissées après le voyage.', 'Vous, l’app'],
            ['Localisation', 'La position de votre téléphone, uniquement quand l’app est ouverte et avec votre accord, pour proposer votre point de prise en charge. La position du véhicule pendant un trajet, pour le suivi en direct.', 'Votre appareil, le véhicule'],
            ['Mova Pass', 'Numéro de carte, abonnements et leurs dates de validité, validations (date, heure, et lieu du contrôle), QR Pass Éclair générés.', 'L’app, nos contrôleurs'],
            ['Paiements', 'Montant, moyen de paiement, référence de la transaction, numéro Mobile Money utilisé, solde et mouvements Mova Credit. Pas de numéro de carte bancaire complet.', 'Vous, nos prestataires de paiement'],
            ['Échanges', 'Messages au support et dans un trajet, demandes envoyées depuis le site, journal des appels passés dans l’app (date, durée). Le contenu des appels n’est pas enregistré.', 'Vous, notre équipe'],
            ['Appareil et usage', 'Modèle, système et version de l’app, jeton de notification, adresse IP, journaux d’erreurs, événements d’usage anonymisés (écrans vus, fonctions utilisées).', 'Votre appareil'],
            ['Site web', 'Formulaire de contact (nom, e-mail, téléphone, message), inscription à la newsletter (e-mail, nom facultatif, date et adresse IP du consentement), candidatures (identité, CV, lettre, liens).', 'Vous'],
          ]}
        />
        <p className="small">
          Les autorisations du téléphone sont demandées au moment où elles servent, jamais au lancement : localisation (point de prise en charge), appareil photo et photos (photo de profil), micro (appel au support), NFC (lire votre carte Mova Pass), Face ID ou empreinte (déverrouiller l’app), notifications. Vous pouvez les retirer à tout moment dans les réglages du téléphone.
        </p>
      </>
    ),
  },
  {
    id: 'finalites',
    title: 'Pourquoi nous les utilisons',
    body: (
      <LegalTable
        head={['Finalité', 'Base légale']}
        rows={[
          ['Créer et sécuriser votre compte, vérifier votre numéro par code SMS ou WhatsApp', 'Exécution du contrat'],
          ['Établir un devis, confirmer et organiser votre réservation, vous mettre en relation avec le chauffeur', 'Exécution du contrat'],
          ['Afficher le bus en direct, vous prévenir d’un retard ou d’un changement', 'Exécution du contrat'],
          ['Émettre, contrôler et renouveler votre Mova Pass', 'Exécution du contrat'],
          ['Encaisser, rembourser, émettre factures et reçus', 'Exécution du contrat, obligation légale'],
          ['Répondre à vos demandes de support et à vos appels', 'Exécution du contrat, intérêt légitime'],
          ['Détecter la fraude, protéger les comptes, tracer les accès de notre personnel', 'Intérêt légitime, obligation légale'],
          ['Corriger les erreurs et améliorer l’app à partir de statistiques d’usage', 'Intérêt légitime'],
          ['Utiliser votre position, vous envoyer des notifications', 'Consentement (retirable dans le téléphone)'],
          ['Vous envoyer la newsletter', 'Consentement, confirmé par e-mail'],
          ['Étudier une candidature', 'Mesures précontractuelles'],
        ]}
      />
    ),
  },
  {
    id: 'partage',
    title: 'Avec qui nous les partageons',
    body: (
      <>
        <p>Mova ne vend <strong>jamais</strong> vos données. Nous les transmettons uniquement à :</p>
        <ul>
          <li><strong>Le chauffeur et l’opérateur du véhicule</strong> : votre nom, votre point de prise en charge et ce qu’il faut pour vous joindre pendant le trajet. Rien de plus.</li>
          <li><strong>Notre personnel</strong>, selon son rôle : chaque accès est limité à ce que la personne doit faire et il est journalisé.</li>
          <li><strong>Nos prestataires techniques</strong>, qui agissent sur nos instructions et ne peuvent pas utiliser vos données pour eux-mêmes :</li>
        </ul>
        <LegalTable
          head={['Prestataire', 'Rôle']}
          rows={[
            ['OVHcloud', 'Hébergement des serveurs et de la base de données'],
            ['Cloudflare', 'Protection du site et de l’API, stockage des fichiers (photos, documents)'],
            ['Infobip, Twilio', 'Envoi des codes de vérification par SMS et WhatsApp'],
            ['Expo, Google (Firebase Cloud Messaging), Apple (APNs)', 'Acheminement des notifications'],
            ['Agora', 'Appels audio dans l’app (non enregistrés)'],
            ['Google Maps', 'Cartes, recherche d’adresses et itinéraires'],
            ['Google, Apple', 'Connexion avec un compte Google ou Apple, si vous la choisissez'],
            ['MTN Mobile Money, Airtel Money, Yabetoo', 'Traitement des paiements'],
            ['Sentry', 'Rapports d’erreurs de l’app et du serveur'],
            ['PostHog', 'Statistiques d’usage de l’app'],
            ['Notre prestataire d’e-mail', 'Envoi des e-mails (reçus, réponses du support, newsletter)'],
          ]}
        />
        <p>
          Nous pouvons aussi communiquer des données si la loi l’exige ou sur demande d’une autorité judiciaire, et pour défendre nos droits ou la sécurité des passagers.
        </p>
      </>
    ),
  },
  {
    id: 'transferts',
    title: 'Où sont vos données',
    body: (
      <p>
        Certains de nos prestataires traitent des données hors de la République du Congo, notamment dans l’Union européenne et aux États-Unis. Nous choisissons des prestataires qui offrent des garanties contractuelles de protection (clauses contractuelles types ou équivalent) et nous limitons ce que nous leur transmettons au strict nécessaire.
      </p>
    ),
  },
  {
    id: 'conservation',
    title: 'Combien de temps nous les gardons',
    body: (
      <>
        <LegalTable
          head={['Donnée', 'Durée']}
          rows={[
            ['Compte et adresses enregistrées', 'Tant que le compte existe. Supprimés quand vous supprimez votre compte.'],
            ['Position du véhicule pendant un trajet', '7 jours'],
            ['Lieu de validation d’un Mova Pass', '90 jours'],
            ['Journal d’activité de notre personnel', '400 jours (90 jours pour la consultation de données sensibles)'],
            ['Paiements, factures et reçus', 'La durée imposée par la loi comptable (10 ans dans l’espace OHADA)'],
            ['Inscription à la newsletter non confirmée', '7 jours, puis effacée'],
            ['Désinscription de la newsletter', 'L’e-mail seul est gardé, pour ne pas vous réinscrire par erreur. Effacement sur demande.'],
            ['Messages au support et demandes du site', 'Le temps de traiter la demande, puis 3 ans au plus'],
            ['Candidatures', 'La durée du recrutement, puis 2 ans au plus pour vous proposer un autre poste, sauf opposition'],
          ]}
        />
        <p className="small">Passé ces durées, les données sont supprimées ou rendues anonymes, c’est-à-dire qu’elles ne permettent plus de vous identifier.</p>
      </>
    ),
  },
  {
    id: 'securite',
    title: 'Comment nous les protégeons',
    body: (
      <ul>
        <li>Toutes les connexions sont chiffrées (HTTPS). Les mots de passe sont stockés sous forme chiffrée irréversible.</li>
        <li>Les cartes Mova Pass et les QR Pass Éclair sont signés cryptographiquement : une carte copiée ou un QR modifié est refusé au contrôle.</li>
        <li>Notre personnel accède aux données par rôle, avec des droits limités dans le temps et par lieu si besoin, et chaque action est journalisée.</li>
        <li>Les CV et documents sont stockés de façon privée et ne sont lisibles que par des liens temporaires.</li>
        <li>Les codes de vérification n’apparaissent jamais dans nos journaux, et les numéros de téléphone y sont masqués.</li>
      </ul>
    ),
  },
  {
    id: 'droits',
    title: 'Vos droits',
    body: (
      <>
        <p>
          Vous pouvez à tout moment accéder à vos données, les rectifier, les faire supprimer, vous opposer à un traitement ou en demander la limitation, recevoir vos données dans un format lisible (portabilité) et retirer un consentement donné. Ces droits vous sont reconnus par la loi congolaise sur la protection des données personnelles et, lorsqu’il s’applique, par le RGPD.
        </p>
        <Callout icon="bi-trash" title="Supprimer votre compte">
          <p className="mb-2"><strong>Dans l’app</strong> : onglet <em>Compte</em>, puis <em>Supprimer mon compte</em>. La suppression est immédiate et définitive.</p>
          <p className="mb-0"><strong>Sans l’app</strong> : écrivez à <a href="mailto:privacy@mova-mobility.com">privacy@mova-mobility.com</a> depuis l’adresse ou avec le numéro de votre compte. Nous traitons la demande sous 14 jours.</p>
        </Callout>
        <p>
          Pour exercer un autre droit, écrivez à <a href="mailto:privacy@mova-mobility.com">privacy@mova-mobility.com</a>. Nous répondons sous 30 jours au plus et pouvons vous demander de prouver votre identité. Si notre réponse ne vous satisfait pas, vous pouvez saisir l’autorité de protection des données compétente (en France, la CNIL).
        </p>
        <p className="mb-0">
          La newsletter contient un lien de désinscription dans chaque e-mail. La localisation et les notifications se retirent dans les réglages de votre téléphone.
        </p>
      </>
    ),
  },
  {
    id: 'mineurs',
    title: 'Les mineurs',
    body: (
      <p className="mb-0">
        Un compte Mova est réservé aux personnes de 15 ans et plus. Un Mova Pass peut être utilisé par un enfant plus jeune lorsqu’il est géré par un parent ou un établissement, qui en reste responsable. Si vous pensez qu’un enfant nous a transmis des données sans accord, écrivez-nous et nous les supprimerons.
      </p>
    ),
  },
  {
    id: 'site',
    title: 'Cookies et site web',
    body: (
      <p className="mb-0">
        Le site mova-mobility.com n’utilise pas de cookie publicitaire ni de traceur tiers. Il garde seulement, dans votre navigateur, ce qu’il faut pour fonctionner. Les formulaires du site (contact, newsletter, candidature) envoient vos données directement à nos serveurs ; voir <Link to="/conditions">nos conditions</Link> pour l’usage du site.
      </p>
    ),
  },
  {
    id: 'changements',
    title: 'Changements de cette politique',
    body: (
      <p className="mb-0">
        Nous mettons cette politique à jour quand nos services évoluent. La date en haut de page indique la dernière version. Si un changement modifie de façon importante l’usage de vos données, nous vous prévenons dans l’app ou par e-mail avant qu’il ne s’applique.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Nous contacter',
    body: (
      <p className="mb-0">
        Pour toute question sur vos données : <a href="mailto:privacy@mova-mobility.com">privacy@mova-mobility.com</a>. Pour tout autre sujet, notre <Link to="/contact">page contact</Link>.
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <LegalPage
      seo={{ title: 'Politique de confidentialité', description: 'Comment Mova collecte, utilise et protège vos données dans l’app, le Mova Pass et sur le site.' }}
      eyebrow="Légal et transparence"
      title="Politique de"
      accent="confidentialité"
      intro="Ce que nous collectons, pourquoi, avec qui nous le partageons et comment vous gardez la main. En clair."
      updated={UPDATED}
      summary={SUMMARY}
      sections={sections}
      related={{ to: '/conditions', label: 'Conditions d’utilisation' }}
    />
  );
}
