import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { confirmNewsletter, unsubscribeNewsletter, errorMessage } from '../api/site';

const COPY = {
  confirm: {
    title: 'Confirmation d’inscription',
    loading: 'Confirmation de votre inscription…',
    done: 'Inscription confirmée',
    fallback: 'Vous recevrez désormais nos actualités. Chaque e-mail contient un lien de désinscription.',
    run: confirmNewsletter,
  },
  unsubscribe: {
    title: 'Désinscription',
    loading: 'Désinscription en cours…',
    done: 'Vous êtes désinscrit',
    fallback: 'Vous ne recevrez plus nos e-mails. Vous pouvez vous réinscrire à tout moment depuis le bas de page.',
    run: unsubscribeNewsletter,
  },
};

/*
 * Landing page for the two links in the newsletter e-mails.
 *
 * The token is sent to the API exactly once, on load: `ran` guards against
 * React running the effect twice in development, which would otherwise show
 * an error for a link that just worked.
 */
export default function NewsletterAction({ mode }) {
  const copy = COPY[mode];
  const [params] = useSearchParams();
  const token = params.get('token');
  const [state, setState] = useState(token ? 'loading' : 'error');
  const [message, setMessage] = useState(token ? '' : 'Ce lien est incomplet. Utilisez le lien reçu par e-mail.');
  const ran = useRef(false);

  useEffect(() => {
    if (!token || ran.current) return;
    ran.current = true;
    copy
      .run(token)
      .then((msg) => {
        setMessage(msg || copy.fallback);
        setState('done');
      })
      .catch((err) => {
        setMessage(
          err?.status === 404 || err?.status === 422
            ? 'Ce lien n’est plus valide : il a peut-être expiré (7 jours) ou déjà été utilisé.'
            : errorMessage(err),
        );
        setState('error');
      });
  }, [token, copy]);

  return (
    <section className="py-25 bg-light" style={{ minHeight: '70vh' }}>
      <SEO title={copy.title} description="Newsletter Móva Mobility" />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="p-5 text-center bg-white border-0 shadow-sm rounded-5" role="status" aria-live="polite">
              {state === 'loading' && (
                <>
                  <div className="mb-4 spinner-border text-success" aria-hidden="true" />
                  <p className="mb-0 text-muted">{copy.loading}</p>
                </>
              )}
              {state === 'done' && (
                <>
                  <i className="mb-3 bi bi-check-circle-fill d-block" style={{ fontSize: 48, color: '#005921' }} aria-hidden="true" />
                  <h1 className="mb-3 t-heading">{copy.done}</h1>
                  <p className="mb-4 text-muted">{message}</p>
                </>
              )}
              {state === 'error' && (
                <>
                  <i className="mb-3 bi bi-exclamation-circle d-block text-danger" style={{ fontSize: 48 }} aria-hidden="true" />
                  <h1 className="mb-3 t-heading">Lien non valide</h1>
                  <p className="mb-4 text-muted">{message}</p>
                </>
              )}
              {state !== 'loading' && (
                <Link to="/" className="px-4 btn btn-dark rounded-pill">Retour à l’accueil</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
