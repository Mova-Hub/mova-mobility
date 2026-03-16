import React, { useState } from 'react';
import axios from 'axios';

function ReservationModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    name: '',
    eventType: '',
    dateTime: '',
    itinerary: '',
    phone: '',
    feedbackChannel: 'sms'
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      // Placeholder API call to send email to admin
      await axios.post('/api/send-reservation-email', formData);
      // Placeholder API call to send SMS to user
      await axios.post('/api/send-sms', {
        phone: formData.phone,
        message: `Votre réservation pour ${formData.eventType} le ${formData.dateTime} est confirmée.`
      });
      setStatus({ type: 'success', message: 'Réservation envoyée avec succès !' });
      setFormData({
        name: '',
        eventType: '',
        dateTime: '',
        itinerary: '',
        phone: '',
        feedbackChannel: 'sms'
      });
    } catch (error) {
      setStatus({ type: 'error', message: 'Échec de l’envoi. Veuillez réessayer.' });
    }
  };

  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 p-4" style={{ zIndex: 3000 }}>
          <div className="modal-header border-0">
            <h5 className="modal-title">Informations pour la réservation</h5>
            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="eventType" className="form-label">Type d'événement</label>
                <select
                  className="form-control"
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="Mariage">Mariage</option>
                  <option value="Obsèques">Obsèques</option>
                  <option value="Excursions scolaires">Excursions scolaires</option>
                  <option value="Excursions professionnelles">Excursions professionnelles</option>
                  <option value="Cérémonie officielle">Cérémonie officielle</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="dateTime" className="form-label">Date et heure</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="dateTime"
                  name="dateTime"
                  value={formData.dateTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="itinerary" className="form-label">Itinéraires</label>
                <textarea
                  className="form-control"
                  id="itinerary"
                  name="itinerary"
                  value={formData.itinerary}
                  onChange={handleChange}
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Numéro de téléphone</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="feedbackChannel" className="form-label">Canal de feedback préféré</label>
                <select
                  className="form-control"
                  id="feedbackChannel"
                  name="feedbackChannel"
                  value={formData.feedbackChannel}
                  onChange={handleChange}
                >
                  <option value="sms">SMS</option>
                  <option value="email">Email</option>
                  <option value="call">Appel</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>
              {status && (
                <div className={`alert alert-${status.type} mt-3`}>
                  {status.message}
                </div>
              )}
              <button type="submit" className="btn btn-primary fw-semibold">Envoyer la réservation</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationModal;