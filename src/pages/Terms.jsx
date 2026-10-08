import React from 'react';
import { Link } from 'react-router-dom';
import LegalPage, { Callout } from '../components/legal/LegalPage';

/*
 * General terms of use and sale for the Mova app, Mova Pass and the website.
 *
 * Amounts that the back office can change (cancellation fee, refund window,
 * Pass Éclair allowance) are deliberately NOT written here: the app shows the
 * figure in force before the customer commits, and this page points to it.
 * A number copied here would silently go stale the day ops changes it.
 */

const UPDATED = '8 octobre 2026';

const SUMMARY = [
  { icon: 'bi-receipt', title: 'Le prix est fixé avant de payer', text: 'Vous voyez le prix et les conditions d’annulation avant de confirmer.' },
  { icon: 'bi-person-badge', title: 'Le Mova Pass est personnel', text: 'Il ne se prête pas. Il peut être contrôlé à tout moment à bord.' },
  { icon: 'bi-wallet2', title: 'Le Mova Credit reste chez Mova', text: 'Il se dépense sur nos services, ne s’achète pas et ne se convertit pas en argent.' },
  { icon: 'bi-chat-heart', title: 'Un souci ? Parlons-en d’abord', text: 'Le support répond dans l’app, par e-mail ou au téléphone.' },
];

const sections = [
  {
    id: 'objet',
    title: 'Objet et acceptation',
    body: (
      <>
        <p>
          Les présentes conditions générales d’utilisation et de vente (les « Conditions ») encadrent l’usage de l’application mobile Mova, du Mova Pass et du site mova-mobility.com (ensemble, les « Services »), édités par <strong>Mova Mobility</strong> (« Mova », « nous »).
        </p>
        <p className="mb-0">
          En créant un compte, en réservant un trajet ou en utilisant un Mova Pass, vous acceptez ces Conditions. Si vous ne les acceptez pas, n’utilisez pas les Services. Le traitement de vos données est décrit dans notre <Link to="/privacy">politique de confidentialité</Link>, qui en fait partie.
        </p>
      </>
    ),
  },
  {
    id: 'editeur',
    title: 'Éditeur et contact',
    body: (
      <ul>
        <li><strong>Mova Mobility</strong>, 1er étage, Immeuble Monte Christo, Rond-point de la Gare, Brazzaville, République du Congo.</li>
        <li>Bureau en France : 74/80 rue Roque de Fillol, 92800 Puteaux.</li>
        <li>Téléphone : <a href="tel:+242067633232">+242 06 763 3232</a>. E-mail : <a href="mailto:contact@mova-mobility.com">contact@mova-mobility.com</a>.</li>
        <li>Le site est hébergé par Vercel Inc. (États-Unis) ; l’API et les données des Services par OVHcloud.</li>
      </ul>
    ),
  },
  {
    id: 'definitions',
    title: 'Définitions',
    body: (
      <ul>
        <li><strong>Client</strong> : toute personne qui utilise les Services, avec ou sans compte.</li>
        <li><strong>Réservation</strong> : la location d’un véhicule avec chauffeur pour un trajet ou un événement, commandée dans l’app.</li>
        <li><strong>Opérateur</strong> : le propriétaire ou l’exploitant du véhicule, partenaire de Mova, et son chauffeur.</li>
        <li><strong>Mova Pass</strong> : l’abonnement de transport et la carte NFC qui le porte.</li>
        <li><strong>Pass Éclair</strong> : un QR de dépannage, valable une journée, qui remplace la carte oubliée.</li>
        <li><strong>Mova Credit</strong> : un avoir accordé par Mova, utilisable uniquement sur les Services.</li>
      </ul>
    ),
  },
  {
    id: 'compte',
    title: 'Votre compte',
    body: (
      <>
        <p>
          Le compte se crée avec un numéro de téléphone vérifié par un code envoyé par SMS ou WhatsApp, ou avec un compte Google ou Apple. Il est réservé aux personnes de 15 ans et plus. Vous vous engagez à fournir des informations exactes et à les tenir à jour.
        </p>
        <p>
          Votre compte est personnel. Vous êtes responsable de ce qui est fait avec, et vous devez nous prévenir sans délai si vous pensez que quelqu’un d’autre y accède. Ne communiquez jamais un code de vérification : Mova ne vous le demandera jamais.
        </p>
        <p className="mb-0">
          Vous pouvez supprimer votre compte à tout moment dans l’app (onglet <em>Compte</em>, puis <em>Supprimer mon compte</em>). Une réservation en cours ou un abonnement actif ne sont pas remboursés du seul fait de la suppression ; écrivez au support avant si vous souhaitez les régler.
        </p>
      </>
    ),
  },
  {
    id: 'reservations',
    title: 'Réservations de véhicules',
    body: (
      <>
        <h3>Demande et prix</h3>
        <p>
          Vous indiquez dans l’app le départ, l’arrivée, la date, le nombre de passagers et les options souhaitées. L’app calcule un prix à partir de la distance, de la durée, du véhicule et de la période. Ce prix, toutes taxes comprises et exprimé en francs CFA (FCFA), vous est présenté avant toute confirmation, avec les conditions d’annulation applicables.
        </p>
        <h3>Confirmation</h3>
        <p>
          La réservation est ferme quand le paiement demandé est reçu et que vous recevez la confirmation dans l’app. Une réservation non payée dans le délai indiqué est annulée automatiquement. Mova attribue un véhicule et un chauffeur adaptés et peut, si nécessaire, remplacer le véhicule par un véhicule de catégorie équivalente ou supérieure, sans surcoût.
        </p>
        <h3>Le jour du trajet</h3>
        <p className="mb-0">
          Vous suivez le véhicule en direct dans l’app et pouvez échanger avec l’équipe par message ou appel. Le chauffeur attend au point de prise en charge pendant le délai indiqué dans la réservation ; au-delà, le trajet peut être considéré comme non effectué de votre fait. Un changement d’itinéraire ou un dépassement de durée demandé sur place peut être facturé en supplément, après accord.
        </p>
      </>
    ),
  },
  {
    id: 'annulation',
    title: 'Annulation et remboursement',
    body: (
      <>
        <ul>
          <li><strong>Par vous</strong> : vous pouvez annuler depuis l’app. Les frais éventuels et le délai pour être remboursé sont ceux affichés avant votre confirmation ; ils dépendent du moment de l’annulation.</li>
          <li><strong>Par Mova</strong> : si nous annulons ou ne pouvons pas assurer le trajet, vous êtes remboursé intégralement.</li>
          <li><strong>Retard important du véhicule de notre fait</strong> : contactez le support ; un geste commercial ou un remboursement partiel peut être accordé selon le préjudice.</li>
        </ul>
        <p className="mb-0">
          Les remboursements se font sur le moyen de paiement d’origine lorsque c’est possible, ou, si vous l’acceptez, en Mova Credit.
        </p>
      </>
    ),
  },
  {
    id: 'paiement',
    title: 'Paiement',
    body: (
      <>
        <p>
          Vous payez dans l’app par MTN Mobile Money, Airtel Money, Yabetoo, carte bancaire selon disponibilité, ou Mova Credit. Certains paiements (espèces, virement) peuvent être acceptés sur accord et sont confirmés par notre équipe à réception.
        </p>
        <p className="mb-0">
          Le paiement est traité par le prestataire choisi ; Mova ne voit ni ne stocke vos codes Mobile Money ou numéros de carte. Un reçu est disponible dans l’app pour chaque paiement. Les entreprises peuvent demander une facture au support.
        </p>
      </>
    ),
  },
  {
    id: 'pass',
    title: 'Mova Pass',
    body: (
      <>
        <p>
          Le Mova Pass donne accès aux lignes et services indiqués par la formule choisie, pendant sa période de validité. La carte est activée dans l’app et rattachée à un titulaire. L’abonnement se renouvelle seulement si vous le payez ; un renouvellement anticipé prolonge la période en cours.
        </p>
        <ul>
          <li><strong>Personnel</strong> : le Pass ne se prête ni ne se revend. Un contrôleur peut vérifier à bord que vous en êtes le titulaire.</li>
          <li><strong>Contrôle</strong> : chaque validation est enregistrée avec sa date, son heure et son lieu. Une carte invalide, copiée ou modifiée est refusée.</li>
          <li><strong>Carte oubliée</strong> : l’app peut générer un Pass Éclair, valable la journée, dans la limite hebdomadaire affichée dans l’app.</li>
          <li><strong>Carte perdue ou volée</strong> : signalez-la dans l’app ou au support ; elle est bloquée immédiatement et une nouvelle carte reprend votre abonnement. La fabrication d’une carte de remplacement peut être facturée.</li>
          <li><strong>Fraude</strong> : l’usage d’un Pass falsifié ou d’une autre personne entraîne le blocage de la carte et peut entraîner la résiliation du compte, sans remboursement.</li>
        </ul>
        <p className="mb-0">Une période d’abonnement commencée n’est pas remboursable, sauf interruption du service de notre fait.</p>
      </>
    ),
  },
  {
    id: 'credit',
    title: 'Mova Credit',
    body: (
      <>
        <p>
          Le Mova Credit est un avoir que Mova vous accorde, par exemple à la suite d’un remboursement, d’un geste commercial ou d’une offre promotionnelle. Il se dépense uniquement sur les Services.
        </p>
        <Callout icon="bi-shield-check" title="Ce que le Mova Credit n’est pas">
          Ce n’est pas de la monnaie électronique ni un compte de paiement. Il ne s’achète pas, ne se recharge pas, ne se convertit pas en argent et ne se transfère pas à une autre personne. Un crédit promotionnel peut avoir une date d’expiration, indiquée quand il est accordé.
        </Callout>
      </>
    ),
  },
  {
    id: 'bord',
    title: 'À bord et dans l’app',
    body: (
      <>
        <p>Pour la sécurité et le confort de tous, vous vous engagez à :</p>
        <ul>
          <li>respecter le chauffeur, les autres passagers et le véhicule, et suivre les consignes de sécurité ;</li>
          <li>ne pas dépasser le nombre de passagers réservé, ni transporter d’objet dangereux ou illégal ;</li>
          <li>répondre des dégradations causées au véhicule par vous ou votre groupe ;</li>
          <li>ne pas détourner l’app : pas de fausse réservation, pas de tentative d’accès au compte d’autrui, pas de copie ou d’ingénierie inverse du Mova Pass.</li>
        </ul>
        <p className="mb-0">Un manquement grave peut entraîner l’interruption du trajet sans remboursement et la suspension du compte.</p>
      </>
    ),
  },
  {
    id: 'responsabilite',
    title: 'Responsabilité',
    body: (
      <>
        <p>
          Mova s’engage à organiser votre transport avec soin et à faire appel à des opérateurs et chauffeurs dûment autorisés et assurés. Les horaires de passage et d’arrivée sont donnés au mieux : la circulation, la météo ou un événement extérieur peuvent les modifier.
        </p>
        <p>
          Mova n’est pas responsable des conséquences d’un cas de force majeure, de votre propre manquement à ces Conditions, ni des objets laissés à bord ; nous faisons toutefois notre possible pour vous les rendre. Rien dans ces Conditions ne limite la responsabilité qui ne peut l’être en vertu de la loi, notamment en cas de dommage corporel.
        </p>
        <p className="mb-0">
          L’app peut être momentanément indisponible pour maintenance ou en cas de panne. Nous faisons le nécessaire pour rétablir le service rapidement.
        </p>
      </>
    ),
  },
  {
    id: 'propriete',
    title: 'Propriété intellectuelle',
    body: (
      <p className="mb-0">
        La marque Mova, les logos, l’app, le site et leurs contenus appartiennent à Mova Mobility ou à ses partenaires. Vous pouvez les utiliser pour votre usage personnel des Services ; toute autre reproduction ou réutilisation demande notre accord écrit.
      </p>
    ),
  },
  {
    id: 'suspension',
    title: 'Suspension et résiliation',
    body: (
      <p className="mb-0">
        Vous pouvez cesser d’utiliser les Services et supprimer votre compte à tout moment. Mova peut suspendre ou fermer un compte en cas de fraude, d’impayé, de manquement grave à ces Conditions ou à la demande d’une autorité. Sauf urgence ou fraude, nous vous prévenons et vous pouvez présenter vos explications au support.
      </p>
    ),
  },
  {
    id: 'modifications',
    title: 'Modification des Conditions',
    body: (
      <p className="mb-0">
        Nous pouvons faire évoluer ces Conditions. La version en vigueur est celle publiée sur cette page, à la date indiquée en haut. Une modification importante vous est annoncée dans l’app ou par e-mail avant de s’appliquer ; une réservation déjà confirmée reste régie par les conditions acceptées au moment de la confirmation.
      </p>
    ),
  },
  {
    id: 'litiges',
    title: 'Réclamations et droit applicable',
    body: (
      <>
        <p>
          Une réclamation s’adresse d’abord au support, dans l’app ou via notre <Link to="/contact">page contact</Link>, idéalement sous 30 jours après le trajet concerné. Nous cherchons une solution amiable avec vous.
        </p>
        <p className="mb-0">
          Ces Conditions sont régies par le droit de la République du Congo. À défaut d’accord amiable, le litige est porté devant les juridictions compétentes de Brazzaville, sous réserve des règles protectrices dont vous bénéficiez en tant que consommateur dans votre pays de résidence.
        </p>
      </>
    ),
  },
];

export default function Terms() {
  return (
    <LegalPage
      seo={{ title: 'Conditions d’utilisation', description: 'Conditions générales d’utilisation et de vente de l’app Mova, du Mova Pass et du site mova-mobility.com.' }}
      eyebrow="Légal et transparence"
      title="Conditions générales"
      accent="d’utilisation et de vente"
      intro="Les règles du jeu, pour vous comme pour nous : réservations, paiements, Mova Pass, Mova Credit et ce que chacun s’engage à faire."
      updated={UPDATED}
      summary={SUMMARY}
      sections={sections}
      related={{ to: '/privacy', label: 'Politique de confidentialité' }}
    />
  );
}
