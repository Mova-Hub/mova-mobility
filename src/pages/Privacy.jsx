import React from 'react';
import SEO from '../components/SEO';

const Privacy = () => {
  const lastUpdated = "18 Avril 2026";

  const sections = [
    { id: "intro", title: "1. Introduction" },
    { id: "collecte", title: "2. Données que nous collectons" },
    { id: "utilisation", title: "3. Utilisation de vos données" },
    { id: "partage", title: "4. Partage des informations" },
    { id: "droits", title: "5. Vos droits et suppression (App Store)" },
    { id: "securite", title: "6. Sécurité et conservation" },
    { id: "contact", title: "7. Nous contacter" }
  ];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white privacy-page">
      <SEO 
        title="Politique de Confidentialité | Mova" 
        description="Découvrez comment Mova protège vos données personnelles lors de vos réservations de bus et trajets de groupe."
      />

      {/* --- Hero Section --- */}
      <section className="py-5 bg-light border-bottom" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="container">
          <div className="text-center row justify-content-center">
            <div className="col-lg-8" data-aos="fade-up">
              <div className="gap-2 mb-3 d-flex align-items-center justify-content-center">
                <span style={{ width: '20px', height: '2px', backgroundColor: '#005921' }}></span>
                <span className="text-uppercase fw-bold" style={{ color: '#005921', fontSize: '0.75rem', letterSpacing: '2px' }}>
                  Légal & Transparence
                </span>
                <span style={{ width: '20px', height: '2px', backgroundColor: '#005921' }}></span>
              </div>
              <h1 className="mb-4 display-6 fw-semibold text-dark">Politique de <span style={{ color: '#005921' }}>Confidentialité</span></h1>
              <p className="text-muted fs-5">
                Chez Mova, la protection de votre vie privée est notre priorité. Cette page explique comment nous collectons, utilisons et protégeons vos données.
              </p>
              <p className="mt-4 small fw-bold text-muted">Dernière mise à jour : {lastUpdated}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Main Content Section --- */}
      <section className="py-5" style={{ marginTop: '2rem', marginBottom: '4rem' }}>
        <div className="container">
          <div className="row g-5">
            
            {/* Left Column: Sticky Table of Contents */}
            <div className="col-lg-4 d-none d-lg-block">
              <div className="p-4 border-0 shadow-sm card rounded-4 sticky-sidebar" style={{ backgroundColor: '#f9fafb' }}>
                <h5 className="mb-4 tracking-wider fw-bold text-dark fs-6 text-uppercase">Sommaire</h5>
                <ul className="gap-2 nav flex-column toc-list">
                  {sections.map((section) => (
                    <li className="nav-item" key={section.id}>
                      <a 
                        href={`#${section.id}`} 
                        onClick={(e) => scrollToSection(e, section.id)}
                        className="px-0 transition-all nav-link text-muted fw-semibold"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Privacy Content */}
            <div className="col-lg-8">
              <div className="privacy-content pe-lg-4">
                
                <div id="intro" className="mb-5 policy-section">
                  <h3 className="mb-3 fw-bold text-dark">1. Introduction</h3>
                  <p className="text-muted">
                    Bienvenue sur Mova. Que vous utilisiez notre service de location de bus global ou notre application mobile (disponible sur l'App Store et Google Play) pour réserver des trajets de groupe, nous sommes déterminés à protéger vos données personnelles. Cette politique s'applique à tous les utilisateurs de nos services (passagers, organisateurs d'événements, et opérateurs de bus).
                  </p>
                </div>

                <div id="collecte" className="mb-5 policy-section">
                  <h3 className="mb-3 fw-bold text-dark">2. Données que nous collectons</h3>
                  <p className="text-muted">Pour vous fournir un service de transport fiable, nous devons collecter certaines informations :</p>
                  <ul className="text-muted list-unstyled">
                    <li className="mb-2"><i className="bi bi-check2-circle me-2" style={{ color: '#005921' }}></i><strong>Informations de compte :</strong> Nom, prénom, adresse e-mail, numéro de téléphone, et photo de profil (optionnelle).</li>
                    <li className="mb-2"><i className="bi bi-check2-circle me-2" style={{ color: '#005921' }}></i><strong>Données de localisation :</strong> Avec votre consentement, nous collectons votre position précise ou approximative via votre appareil mobile pour vous indiquer l'arrêt de bus le plus proche, suivre votre trajet et assurer votre sécurité.</li>
                    <li className="mb-2"><i className="bi bi-check2-circle me-2" style={{ color: '#005921' }}></i><strong>Données de paiement :</strong> Historique de vos transactions et "Mova Pass". Les informations bancaires réelles sont traitées par nos prestataires sécurisés (ex: Stripe) et ne sont jamais stockées sur nos serveurs.</li>
                    <li><i className="bi bi-check2-circle me-2" style={{ color: '#005921' }}></i><strong>Données techniques de l'appareil :</strong> Modèle du téléphone, version du système d'exploitation (iOS/Android), adresses IP, et logs de plantage pour améliorer l'application.</li>
                  </ul>
                </div>

                <div id="utilisation" className="mb-5 policy-section">
                  <h3 className="mb-3 fw-bold text-dark">3. Utilisation de vos données</h3>
                  <p className="text-muted">Nous utilisons vos informations principalement pour :</p>
                  <div className="p-4 border-4 border-start bg-light rounded-end" style={{ borderColor: '#005921 !important' }}>
                    <p className="mb-1 text-dark fw-semibold">Gérer vos réservations</p>
                    <p className="mb-3 small text-muted">Faciliter la location de bus et la réservation de places pour des événements ou voyages.</p>
                    
                    <p className="mb-1 text-dark fw-semibold">Communication</p>
                    <p className="mb-3 small text-muted">Vous envoyer des notifications importantes sur vos trajets (retards, changements d'itinéraire, confirmations de paiement).</p>
                    
                    <p className="mb-1 text-dark fw-semibold">Amélioration du service</p>
                    <p className="mb-0 small text-muted">Analyser les itinéraires les plus demandés pour optimiser notre flotte de bus et améliorer l'interface de l'application Mova.</p>
                  </div>
                </div>

                <div id="partage" className="mb-5 policy-section">
                  <h3 className="mb-3 fw-bold text-dark">4. Partage des informations</h3>
                  <p className="text-muted">Mova ne vend <strong>jamais</strong> vos données personnelles à des tiers. Nous pouvons toutefois les partager dans les cas suivants :</p>
                  <ul className="text-muted">
                    <li><strong>Avec les opérateurs de bus :</strong> Uniquement les informations nécessaires (nom, point de montée) pour qu'ils puissent valider votre accès au véhicule.</li>
                    <li><strong>Prestataires de services :</strong> Fournisseurs d'hébergement cloud, services d'analyse et processeurs de paiement.</li>
                    <li><strong>Obligations légales :</strong> Si la loi l'exige, pour répondre à une procédure judiciaire ou protéger les droits et la sécurité de Mova et de ses utilisateurs.</li>
                  </ul>
                </div>

                <div id="droits" className="mb-5 policy-section">
                  <h3 className="mb-3 fw-bold text-dark">5. Vos droits et suppression de compte</h3>
                  <p className="text-muted">
                    Conformément aux directives de l'App Store d'Apple et au RGPD, vous disposez d'un contrôle total sur vos données :
                  </p>
                  <div className="p-4 bg-white border shadow-sm rounded-4" style={{ borderColor: '#e5e7eb' }}>
                    <h6 className="fw-bold" style={{ color: '#005921' }}>Comment supprimer vos données ?</h6>
                    <p className="small text-muted">
                      Vous pouvez demander la suppression complète de votre compte et de toutes les données associées directement depuis l'application Mova :
                      <br/><br/>
                      <strong>Dans l'App :</strong> Allez dans <em>Profil &gt; Paramètres &gt; Confidentialité &gt; Supprimer mon compte</em>.<br/>
                      <strong>Sur le Web :</strong> Envoyez un e-mail à <a href="mailto:privacy@mova-mobility.com" className="text-decoration-none" style={{ color: '#005921' }}>privacy@mova-mobility.com</a>. La suppression sera traitée sous 14 jours.
                    </p>
                  </div>
                  <p className="mt-3 text-muted">
                    Vous avez également le droit d'accéder à vos données, de les rectifier, ou de retirer votre consentement pour le suivi de localisation via les paramètres de votre smartphone (iOS ou Android).
                  </p>
                </div>

                <div id="securite" className="mb-5 policy-section">
                  <h3 className="mb-3 fw-bold text-dark">6. Sécurité et conservation</h3>
                  <p className="text-muted">
                    Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles (chiffrement SSL, serveurs sécurisés) pour protéger vos données contre tout accès non autorisé. Vos données sont conservées uniquement le temps nécessaire à la fourniture de nos services. Les comptes inactifs pendant plus de 3 ans sont automatiquement anonymisés ou supprimés.
                  </p>
                </div>

                <div id="contact" className="mb-0 policy-section">
                  <h3 className="mb-3 fw-bold text-dark">7. Nous contacter</h3>
                  <p className="text-muted">
                    Si vous avez des questions concernant cette politique de confidentialité ou la manière dont Mova gère vos données, notre Délégué à la Protection des Données (DPO) est à votre écoute.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Minimalist CTA Section --- */}
      <section className="py-5 bg-white border-top">
        <div className="container">
          <div className="gap-4 p-5 border shadow-sm rounded-5 d-flex flex-column flex-md-row align-items-center justify-content-between" 
               style={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}>
            
            <div className="text-center text-md-start">
              <h4 className="mb-2 fw-bolder text-dark">Une question sur vos données ?</h4>
              <p className="mb-0 text-muted">Notre équipe légale vous répond dans les plus brefs délais.</p>
            </div>

            <div className="gap-3 d-flex flex-column flex-sm-row">
              <a href="mailto:privacy@mova-mobility.com" 
                 className="px-4 py-3 text-black transition-all border hover:text-white btn btn-white rounded-pill fw-bold d-flex align-items-center justify-content-center hover-glow"
                 style={{ backgroundColor: '#fff' }}>
                <i className="bi bi-shield-check me-2 text-success"></i>
                Contacter le DPO
              </a>
              <a href="/contact" 
                 className="px-4 py-3 transition-all btn btn-dark rounded-pill fw-bold">
                Support Général
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- Styles --- */}
      <style dangerouslySetInnerHTML={{__html: `
        .tracking-wider { letter-spacing: 0.1em; }
        
        .sticky-sidebar {
          position: sticky;
          top: 100px; /* Adjust based on your header height */
        }
        
        .toc-list .nav-link {
          font-size: 0.95rem;
          border-left: 2px solid transparent;
          padding-left: 1rem;
        }
        
        .toc-list .nav-link:hover {
          color: #005921 !important;
          border-left: 2px solid #005921;
          background-color: rgba(0, 89, 33, 0.05);
          border-radius: 0 8px 8px 0;
        }

        .policy-section h3 {
          font-size: 1.5rem;
          letter-spacing: -0.02em;
        }
        
        .policy-section p, .policy-section li {
          line-height: 1.8;
          font-size: 1.05rem;
        }

        .hover-glow:hover {
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          border-color: #005921 !important;
        }
      `}} />
    </div>
  );
};

export default Privacy;