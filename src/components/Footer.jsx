import React, { useState } from 'react';
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
    <footer className="footer pt-5 pb-5">
      <div className="container">
        <div className="row mb-5 pb-4">
          <div className="col-md-7">
            <h2 className="fs-5">Inscrivez-vous à notre newsletter</h2>
            <p>Restez informé des dernières offres et actualités de Móva Mobility !</p>
          </div>
          <div className="col-md-5">
            <form className="d-flex gap-2" onSubmit={handleSubmit}>
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
                placeholder="Votre numéro de téléphone"
                value={newsletterData.phone}
                onChange={handleChange}
                required
              />
              <button className="btn btn-primary fs-6" type="submit">S'abonner</button>
            </form>
            {status && (
              <div className={`mt-3 alert alert-${status.type}`}>
                {status.message}
              </div>
            )}
          </div>
        </div>
        <div className="row justify-content-between mb-5 g-xl-5">
          <div className="col-md-4 mb-5 mb-lg-0">
            <h3 className="mb-3">À propos</h3>
            <p className="mb-4">Móva Mobility facilite vos déplacements avec des solutions de transport fiables et accessibles pour tous.</p>
          </div>
          <div className="col-md-7">
            <div className="row g-2">
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <h3 className="mb-3">Entreprise</h3>
                <ul className="list-unstyled">
                  <li><a href="#busaccess">BusAccess</a></li>
                  <li><a href="#movapass">Mova Pass</a></li>
                  <li><a href="#terrain-impact">Terrain & Impact</a></li>
                  <li><a href="#">Conditions générales</a></li>
                  <li><a href="#">Politique de confidentialité</a></li>
                </ul>
              </div>
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-0 quick-contact">
                <h3 className="mb-3">Contact</h3>
                <p className="d-flex mb-3"><i className="bi bi-geo-alt-fill me-3"></i><span>74 / 80 Rue Roque de Fillol, 92800 Puteaux, France</span></p>
                <p className="d-flex mb-3"><i className="bi bi-geo-alt-fill me-3"></i><span>Av des 3 martyrs, Brazzaville, Congo Brazzaville</span></p>
                <a className="d-flex mb-3" href="mailto:contact@mova-mobility.com"><i className="bi bi-envelope-fill me-3"></i><span>contact@mova-mobility.com</span></a>
                <a className="d-flex mb-3" href="tel://+242067633232"><i className="bi bi-telephone-fill me-3"></i><span>+242 06 763 3232</span></a>
              </div>
            </div>
          </div>
        </div>
        <div className="row credits pt-3">
          <div className="col-xl-8 text-center text-xl-start mb-3 mb-xl-0">
            © {new Date().getFullYear()} Móva Mobility. Tous droits réservés
          </div>
          <div className="col-xl-4 justify-content-start justify-content-xl-end quick-links d-flex flex-column flex-xl-row text-center text-xl-start gap-1">
            Conçu par <a href="https://koverae.com" target="_blank">Koverae Technologies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;