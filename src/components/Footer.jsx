import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Ajout de l'import Link
import axios from 'axios';

function Footer() {
  const [newsletterData, setNewsletterData] = useState({
    name: '',
    phone: ''
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setNewsletterData({ ...newsletterData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      // Placeholder API call to send newsletter subscription to admin dashboard
      await axios.post('/api/subscribe-newsletter', newsletterData);
      setStatus({ type: 'success', message: 'Inscription réussie !' });
      setNewsletterData({ name: '', phone: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Échec de l’inscription. Veuillez réessayer.' });
    }
  };

  return (
    <footer className="pt-5 pb-5 footer position-relative">
      <div className="container">
        
        {/* Newsletter Section */}
        <div className="pb-4 mb-5 row">
          <div className="col-md-7">
            <h2 className="fs-5">Inscrivez-vous à notre newsletter</h2>
            <p className="text-muted">Restez informé des dernières offres et actualités de Móva Mobility !</p>
          </div>
          <div className="col-md-5">
            <form className="gap-2 d-flex" onSubmit={handleSubmit}>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Votre nom"
                value={newsletterData.name}
                onChange={handleChange}
                required
              />
              <input
                className="form-control"
                type="tel"
                name="phone"
                placeholder="Votre numéro"
                value={newsletterData.phone}
                onChange={handleChange}
                required
              />
              <button className="btn btn-primary fs-6 text-nowrap" type="submit">S'abonner</button>
            </form>
            {status && (
              <div className={`mt-3 alert alert-${status.type}`}>
                {status.message}
              </div>
            )}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="mb-5 row justify-content-between g-xl-5">
          
          {/* About & Socials */}
          <div className="mb-5 col-lg-4 mb-lg-0">
            <h3 className="mb-3 fs-5">À propos</h3>
            <p className="mb-4 leading-relaxed text-muted">
              Móva Mobility facilite vos déplacements avec des solutions de transport fiables et accessibles pour tous, connectant nos villes avec intelligence.
            </p>
            
            {/* Nouvelle Section Réseaux Sociaux */}
            <div className="gap-3 d-flex social-links">
              <a href="#" className="social-icon" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Links & Contact */}
          <div className="col-lg-8">
            <div className="row g-4"> {/* g-4 ajoute un bel espacement entre les colonnes internes */}
              
              {/* Links */}
              <div className="mb-4 col-md-4 mb-lg-0">
                <h3 className="mb-3 fs-5">Entreprise</h3>
                <ul className="list-unstyled footer-links">
                  <li><Link to="/movapass">Mova Pass</Link></li>
                  <li><Link to="/carrieres">Carrières</Link></li>
                  <li><Link to="/a-propos">Notre Vision</Link></li>
                  <li><Link to="/terms">Conditions générales</Link></li>
                  <li><Link to="/privacy">Politique de confidentialité</Link></li>
                </ul>
              </div>

              {/* Contact (Agrandie avec col-md-8) */}
              <div className="mb-4 col-md-8 mb-lg-0 quick-contact">
                <h3 className="mb-3 fs-5">Contact</h3>
                <div className="mb-3 d-flex align-items-start contact-item text-muted">
                  <i className="mt-1 bi bi-geo-alt-fill me-3"></i>
                  <span>74 / 80 Rue Roque de Fillol, 92800 Puteaux, France</span>
                </div>
                <div className="mb-3 d-flex align-items-start contact-item text-muted">
                  <i className="mt-1 bi bi-geo-alt-fill me-3"></i>
                  <span>1er étage Immeuble Monte christo, Rond point de la Gare, Brazzaville, République du Congo</span>
                </div>
                <a className="mb-3 d-flex align-items-center contact-item text-muted text-decoration-none hover-primary" href="mailto:contact@mova-mobility.com">
                  <i className="bi bi-envelope-fill me-3"></i>
                  <span>contact@mova-mobility.com</span>
                </a>
                <a className="mb-3 d-flex align-items-center contact-item text-muted text-decoration-none hover-primary" href="tel:+242067633232">
                  <i className="bi bi-telephone-fill me-3"></i>
                  <span>+242 06 763 3232</span>
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-4 row credits border-top">
          <div className="mb-3 text-center col-md-6 text-md-start mb-md-0 text-muted small">
            © {new Date().getFullYear()} Móva Mobility. Tous droits réservés.
          </div>
          <div className="text-center col-md-6 d-flex justify-content-center justify-content-md-end text-muted small">
            <span>Conçu par <a href="https://koverae.com" target="_blank" rel="noreferrer" className="text-decoration-none fw-semibold hover-primary">Koverae Technologies</a></span>
          </div>
        </div>
      </div>

      {/* --- STYLES CSS SUR-MESURE POUR LE FOOTER --- */}
      <style dangerouslySetInnerHTML={{__html: `
        .footer {
          background-color: #f8f9fa; /* Ou la couleur de fond que vous aviez */
        }
        
        /* Style des liens du footer */
        .footer-links li {
          margin-bottom: 0.75rem;
        }
        .footer-links a {
          color: #6c757d;
          text-decoration: none;
          transition: color 0.3s ease, transform 0.3s ease;
          display: inline-block;
        }
        .footer-links a:hover, .hover-primary:hover {
          color: var(--bs-primary, #0d6efd) !important;
          transform: translateX(4px);
        }

        /* Style des icônes de contact */
        .contact-item i {
          color: var(--bs-primary, #0d6efd);
          font-size: 1.15rem;
        }

        /* Section Réseaux Sociaux */
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(13, 110, 253, 0.08);
          color: var(--bs-primary, #0d6efd);
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          font-size: 1.1rem;
        }
        .social-icon:hover {
          background-color: var(--bs-primary, #0d6efd);
          color: #ffffff;
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(13, 110, 253, 0.2);
        }
        .social-icon:hover i {
          color: #ffffff !important;
        }
          
      `}} />
    </footer>
  );
}

export default Footer;