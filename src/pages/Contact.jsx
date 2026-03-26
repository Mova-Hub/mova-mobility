import React, { useState } from 'react';
import SEO from '../components/SEO';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: 'General', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="bg-white contact-page">
        
      <SEO 
        title="Contactez nous" 
        description="Découvrez Mova, l'application qui révolutionne vos trajets en ville. Bus, itinéraires, et Mova Pass."
      />
      {/* --- Hero Section --- */}
      <section className="py-25 bg-light border-bottom">
        <div className="container">
          <div className="text-center row justify-content-center">
            <div className="col-lg-7" data-aos="fade-up">
              <div className="gap-2 mb-3 d-flex align-items-center justify-content-center">
                <span style={{ width: '20px', height: '2px', backgroundColor: '#005921' }}></span>
                <span className="text-uppercase fw-bold" style={{ color: '#005921', fontSize: '0.75rem', letterSpacing: '2px' }}>
                  Contactez-nous
                </span>
                <span style={{ width: '20px', height: '2px', backgroundColor: '#005921' }}></span>
              </div>
              <h1 className="mb-4 display-6 fw-semibold text-dark">Parlons de votre prochain <span style={{ color: '#005921' }}>trajet</span></h1>
              <p className="text-muted fs-5">
                Une question sur nos forfaits ou besoin d'une solution sur mesure ? Notre équipe est à votre disposition pour vous accompagner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Main Content Section --- */}
      <section className="py-24">
        <div className="container">
          <div className="row g-5">
            
            {/* Left Column: Contact Info & Trust */}
            <div className="col-lg-5" data-aos="fade-right">
              <div className="pe-lg-5">
                <h3 className="mb-5 fw-semibold text-dark">Nos coordonnées</h3>
                
                <div className="gap-4 mb-5 d-flex align-items-start">
                  <div className="shadow-sm contact-icon-box">
                    <i className="bi bi-geo-alt fs-4"></i>
                  </div>
                  <div>
                    <h6 className="mb-1 fw-bold text-dark">Adresse France</h6>
                    <p className="mb-0 text-muted small">74 / 80 Rue Roque de Fillol, 92800 Puteaux, France</p>
                  </div>
                </div>
                
                <div className="gap-4 mb-5 d-flex align-items-start">
                  <div className="shadow-sm contact-icon-box">
                    <i className="bi bi-geo-alt fs-4"></i>
                  </div>
                  <div>
                    <h6 className="mb-1 fw-bold text-dark">Adresse Congo</h6>
                    <p className="mb-0 text-muted small">1er étage Immeuble Monte christo, Rond point de la Gare, <br /> Brazzaville, République du Congo</p>
                  </div>
                </div>

                <div className="gap-4 mb-5 d-flex align-items-start">
                  <div className="shadow-sm contact-icon-box">
                    <i className="bi bi-envelope fs-4"></i>
                  </div>
                  <div>
                    <h6 className="mb-1 fw-bold text-dark">Email</h6>
                    <p className="mb-0 text-muted small">contact@mova-mobility.com</p>
                  </div>
                </div>

                <div className="gap-4 mb-5 d-flex align-items-start">
                  <div className="shadow-sm contact-icon-box">
                    <i className="bi bi-telephone fs-4"></i>
                  </div>
                  <div>
                    <h6 className="mb-1 fw-bold text-dark">Téléphone</h6>
                    <p className="mb-0 text-muted small">+242 06 763 3232</p>
                  </div>
                </div>

                <hr className="my-5 opacity-10" />

                <div className="social-links-container">
                  <h6 className="mb-4 tracking-wider fw-bold text-dark small text-uppercase">Suivez notre actualité</h6>
                  <div className="gap-3 d-flex">
                    {['facebook', 'linkedin', 'instagram', 'twitter-x'].map(social => (
                      <a key={social} href={`#${social}`} className="social-circle-link">
                        <i className={`bi bi-${social}`}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="col-lg-7" data-aos="fade-left">
              <div className="p-4 border-0 shadow-lg card p-md-5 rounded-5">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-dark">Nom complet</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control custom-input" 
                        placeholder="Arden BOUET" 
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-dark">Email professionnel</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control custom-input" 
                        placeholder="arden@company.com" 
                        required 
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="form-label small fw-bold text-dark">Numéro de téléphone (Optionnel)</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control custom-input" 
                        placeholder="+242 -- --- -- --" 
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold text-dark">Votre message</label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="form-control custom-input" 
                        rows="5" 
                        placeholder="Comment pouvons-nous vous aider ?" 
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <button 
                        type="submit" 
                        disabled={status === 'loading'}
                        className={`btn btn-dark w-100 py-3 rounded-pill fw-bold transition-all ${status === 'loading' ? 'opacity-50' : ''}`}
                      >
                        {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
                      </button>
                    </div>
                  </div>

                  {/* Feedback Messages */}
                  {status === 'success' && (
                    <div className="gap-2 mt-4 border-0 alert alert-success rounded-4 d-flex align-items-center">
                      <i className="bi bi-check-circle-fill fs-5"></i>
                      <span>Votre message a été envoyé avec succès ! Nous vous répondrons sous 24h.</span>
                    </div>
                  )}
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- Minimalist CTA Section --- */}
      <section className="py-8 bg-white">
        <div className="container">
          <div className="gap-4 p-5 border shadow-sm rounded-5 d-flex flex-column flex-md-row align-items-center justify-content-between" 
               style={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}>
            
            <div className="text-center text-md-start">
              <h4 className="mb-2 fw-bolder text-dark">Une urgence ou une question spécifique ?</h4>
              <p className="mb-0 text-muted">Nos conseillers vous répondent directement de vive voix.</p>
            </div>

            <div className="gap-3 d-flex flex-column flex-sm-row">
              <a href="tel:+242067633232" 
                 className="px-4 py-3 text-black transition-all border hover:text-white btn btn-white rounded-pill fw-bold d-flex align-items-center justify-content-center hover-glow"
                 style={{ backgroundColor: '#fff' }}>
                <i className="bi bi-telephone me-2 text-success"></i>
                +242 06 763 3232
              </a>
              <a href="mailto:contact@mova-mobility.com" 
                 className="px-4 py-3 transition-all btn btn-dark rounded-pill fw-bold">
                Nous écrire par mail
              </a>
            </div>
          </div>
          
          <div className="mt-5 text-center opacity-50">
            <p className="tracking-widest small text-uppercase fw-bold">Disponibilité : Lun — Ven • 08h - 18h</p>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .contact-icon-box {
          width: 54px;
          height: 54px;
          background: #00592110;
          color: #005921;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
        }
        .custom-input {
          padding: 0.8rem 1.2rem;
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          transition: all 0.2s ease;
        }
        .custom-input:focus {
          background-color: #fff;
          border-color: #005921;
          box-shadow: 0 0 0 4px rgba(0, 89, 33, 0.1);
          outline: none;
        }
        .social-circle-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f3f4f6;
          color: #4b5563;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .social-circle-link:hover {
          background: #005921;
          color: #fff;
          transform: translateY(-3px);
        }
        .contact-icon-box {
          width: 54px; height: 54px;
          background: #f0fdf4; color: #005921;
          display: flex; align-items: center; justify-content: center;
          border-radius: 12px;
        }
        .custom-input {
          padding: 0.85rem 1.2rem;
          background-color: #fff;
          border: 1.5px solid #eee;
          border-radius: 10px;
          transition: all 0.2s ease;
        }
        .custom-input:focus {
          border-color: #005921;
          box-shadow: 0 0 0 4px rgba(0, 89, 33, 0.05);
          outline: none;
        }
        .social-circle-link {
          width: 38px; height: 38px; border-radius: 50%;
          background: #f8f9fa; color: #666;
          display: flex; align-items: center; justify-content: center;
          transition: 0.2s; text-decoration: none;
        }
        .social-circle-link:hover {
          background: #005921; color: #fff;
        }
        .hover-glow:hover {
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          border-color: #005921 !important;
        }
        .tracking-widest { letter-spacing: 0.2em; }
      `}} />
    </div>
  );
};

export default Contact;