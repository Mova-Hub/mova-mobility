import React from 'react';
import { APP_STORE_URL, PLAY_STORE_URL } from '../config/stores';

/**
 * The two store buttons, App Store first. `tone="light"` for dark backgrounds.
 */
export default function StoreButtons({ tone = 'dark', className = '', center = false }) {
  return (
    <div className={`store-btns ${center ? 'is-center' : ''} ${className}`} data-tone={tone}>
      <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="store-btn" aria-label="Télécharger dans l’App Store">
        <i className="bi bi-apple" aria-hidden="true"></i>
        <span><small>Télécharger dans</small>l’App Store</span>
      </a>
      <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="store-btn" aria-label="Disponible sur Google Play">
        <i className="bi bi-google-play" aria-hidden="true"></i>
        <span><small>Disponible sur</small>Google Play</span>
      </a>
      <style>{`
        .store-btns { display: flex; flex-wrap: wrap; gap: .75rem; }
        .store-btns.is-center { justify-content: center; }
        .store-btn {
          display: inline-flex; align-items: center; gap: .65rem;
          min-height: 52px; padding: .55rem 1.2rem .55rem 1rem; border-radius: 14px;
          background: #000; color: #fff; text-decoration: none; border: 1px solid #000;
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .store-btn:hover { color: #fff; transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0, 0, 0, .18); }
        .store-btn:focus-visible { outline: 3px solid var(--bs-primary); outline-offset: 2px; }
        .store-btn i { font-size: 1.55rem; line-height: 1; }
        .store-btn span { display: flex; flex-direction: column; font-weight: 600; font-size: 1.05rem; line-height: 1.1; letter-spacing: -.01em; }
        .store-btn small { font-size: .66rem; font-weight: 500; opacity: .85; letter-spacing: .01em; }
        .store-btns[data-tone="light"] .store-btn { background: #fff; color: #000; border-color: #fff; }
        .store-btns[data-tone="light"] .store-btn:hover { color: #000; }
      `}</style>
    </div>
  );
}
