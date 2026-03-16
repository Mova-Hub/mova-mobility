import React from 'react';
import ReservationModal from './ReservationModal';

function FAQ() {
    
  return (

        <section className="section faq__v2" id="faq">
          <div className="container">
            <div className="row mb-4">
              <div className="col-md-6 col-lg-7 mx-auto text-center">
                <span className="subtitle text-uppercase mb-3" data-aos="fade-up" data-aos-delay="0">FAQ</span>
                <h2 className="h2 fw-bold mb-3" data-aos="fade-up" data-aos-delay="0">Questions Fréquentes</h2>
                <p data-aos="fade-up" data-aos-delay="100">Trouvez des réponses à vos questions sur nos services BusAccess et Mova Pass pour des déplacements fluides et sans stress.</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 mx-auto" data-aos="fade-up" data-aos-delay="200">
                <div className="faq-content">
                  <div className="accordion custom-accordion" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">Quels types d'événements sont couverts par BusAccess ?</button>
                      </h2>
                      <div className="accordion-collapse collapse show" id="panelsStayOpen-collapseOne">
                        <div className="accordion-body">BusAccess de Móva Mobility propose des solutions de transport pour une large gamme d'événements, incluant les mariages, les cérémonies funéraires, les sorties scolaires, les événements d'entreprise et bien plus. Nous personnalisons chaque réservation pour répondre à vos besoins spécifiques, garantissant confort et ponctualité.</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">Comment fonctionne le Mova Pass ?</button>
                      </h2>
                      <div className="accordion-collapse collapse" id="panelsStayOpen-collapseTwo">
                        <div className="accordion-body">Le Mova Pass est un forfait de mobilité urbaine qui offre des trajets illimités en ville, des réductions exclusives et un accès prioritaire aux bus. Il suffit de s’inscrire via notre site ou application, d’activer votre pass, et de profiter d’une expérience de déplacement fluide et sans contraintes.</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">Comment réserver un bus avec BusAccess ?</button>
                      </h2>
                      <div className="accordion-collapse collapse" id="panelsStayOpen-collapseThree">
                        <div className="accordion-body">Réserver un bus est simple : visitez notre site ou application, choisissez votre événement, précisez la date, l’heure et le lieu, puis confirmez votre réservation avec un paiement sécurisé. Nos équipes s’assurent que votre bus arrive à l’heure, prêt à transporter vos invités en tout confort.</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">L’application Móva est-elle disponible sur tous les appareils ?</button>
                      </h2>
                      <div className="accordion-collapse collapse" id="panelsStayOpen-collapseFour">
                        <div className="accordion-body">Oui ! Notre application Móva Mobility est entièrement compatible avec les smartphones et tablettes iOS et Android. Elle offre une interface intuitive pour réserver des bus, gérer votre Mova Pass et suivre vos trajets en temps réel.</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive">Proposez-vous un support client pour les réservations ?</button>
                      </h2>
                      <div className="accordion-collapse collapse" id="panelsStayOpen-collapseFive">
                        <div className="accordion-body">Absolument ! Notre équipe de support client est disponible 24/7 par chat, email ou téléphone pour répondre à toutes vos questions, vous aider avec vos réservations ou résoudre tout problème lié à vos trajets. Votre satisfaction est notre priorité.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  );
}

export default FAQ;