import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      // Placeholder API call to send contact form to admin dashboard
      await axios.post('/api/send-contact', formData);
      setStatus({ type: 'success', message: 'Message envoyé avec succès !' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Échec de l’envoi du message. Veuillez réessayer.' });
    }
  };

  return (
    <section className="section contact__v2" id="contact">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-6 col-lg-7 mx-auto text-center">
            <span className="subtitle text-uppercase mb-3" data-aos="fade-up" data-aos-delay="0">Contact</span>
            <h2 className="h2 fw-bold mb-3" data-aos="fade-up" data-aos-delay="0">Contactez-nous</h2>
            <p data-aos="fade-up" data-aos-delay="100">Pour toute question ou réservation, notre équipe est là pour vous aider.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex gap-5 flex-column">
              <div className="d-flex align-items-start gap-3" data-aos="fade-up" data-aos-delay="0">
                <div className="icon d-block"><i className="bi bi-telephone"></i></div>
                <span><span className="d-block">Téléphone</span><strong>+242 06 763 3232</strong></span>
              </div>
              <div className="d-flex align-items-start gap-3" data-aos="fade-up" data-aos-delay="100">
                <div className="icon d-block"><i className="bi bi-send"></i></div>
                <span><span className="d-block">Email</span><strong>contact@mova-mobility.com</strong></span>
              </div>
              <div className="d-flex align-items-start gap-3" data-aos="fade-up" data-aos-delay="200">
                <div className="icon d-block"><i className="bi bi-geo-alt"></i></div>
                <span><span className="d-block">Adresse France</span>
                  <address className="fw-bold">74 / 80 Rue Roque de Fillol, 92800 Puteaux, France</address></span>
              </div>
              <div className="d-flex align-items-start gap-3" data-aos="fade-up" data-aos-delay="200">
                <div className="icon d-block"><i className="bi bi-geo-alt"></i></div>
                <span><span className="d-block">Adresse Congo</span>
                  <address className="fw-bold">1er étage Immeuble Monte christo, Rond point de la Gare, Brazzaville, République du Congo</address></span>
              </div>

            </div>
          </div>
          <div className="col-md-6">
            <div className="form-wrapper" data-aos="fade-up" data-aos-delay="300">
              <form onSubmit={handleSubmit}>
                <div className="row gap-3 mb-3">
                  <div className="col-md-12">
                    <label className="mb-2" htmlFor="name">Nom</label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="mb-2" htmlFor="email">Email</label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row gap-3 mb-3">
                  <div className="col-md-12">
                    <label className="mb-2" htmlFor="subject">Sujet</label>
                    <input
                      className="form-control"
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row gap-3 gap-md-0 mb-3">
                  <div className="col-md-12">
                    <label className="mb-2" htmlFor="message">Message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>
                <button className="btn btn-primary fw-semibold" type="submit">Envoyer le message</button>
                {status && (
                  <div className={`mt-3 alert alert-${status.type}`}>
                    {status.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;