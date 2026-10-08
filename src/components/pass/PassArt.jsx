import React, { useRef } from 'react';
import './pass-art.css';

/** The contactless mark, drawn the way it sits on the card (four arcs). */
export function ContactlessMark({ className = 'pa-card-nfc' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M8.5 9.5a4 4 0 0 1 0 5" />
      <path d="M11.5 7a8 8 0 0 1 0 10" />
      <path d="M14.5 4.5a11.5 11.5 0 0 1 0 15" />
      <path d="M17.5 2a15 15 0 0 1 0 20" />
    </svg>
  );
}

/**
 * The Mova Pass NFC card, drawn as the app draws it
 * (mobile/src/features/pass/components/PassCardFace.tsx): near-black fill,
 * green and orange glows, the logo, the contactless mark, the number in
 * groups, holder and status. No chip: it is a contactless NFC card, not a
 * bank card. With `tilt`, it leans towards the pointer on desktop.
 */
export function PassCard({ className = '', tilt = false, holder = 'VOTRE NOM', until = '30 NOV.', style }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!tilt || !el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`);
    el.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(0)}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };
  return (
    <div className={`pa-card ${className}`} style={style} ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} role="img" aria-label="Carte Mova Pass">
      <div className="pa-card-face">
        <span className="pa-card-glow is-top" />
        <span className="pa-card-glow is-bottom" />
        <div className="pa-card-top">
          <img src="/assets/images/logo/logo.png" alt="" className="pa-card-logo" />
          <ContactlessMark />
        </div>
        <span className="pa-card-number">•••• •••• •••• 0427</span>
        <div className="pa-card-bottom">
          <div className="pa-card-field">
            <span className="pa-card-label">TITULAIRE</span>
            <span className="pa-card-value">{holder}</span>
          </div>
          <div className="pa-card-field is-right">
            <span className="pa-card-status"><i />Actif</span>
            <span className="pa-card-label">JUSQU’AU {until}</span>
          </div>
        </div>
        {tilt && <span className="pa-card-shine" />}
      </div>
    </div>
  );
}

/** A deterministic QR-like pattern: decorative, it encodes nothing. */
export function QrArt({ size = 25, className = 'pa-qr' }) {
  const cells = [];
  const finder = (x, y) => {
    const box = (ox, oy) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7;
    const ring = (ox, oy) => {
      const dx = x - ox; const dy = y - oy;
      return dx === 0 || dy === 0 || dx === 6 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4);
    };
    if (box(0, 0)) return ring(0, 0) ? 1 : 0;
    if (box(size - 7, 0)) return ring(size - 7, 0) ? 1 : 0;
    if (box(0, size - 7)) return ring(0, size - 7) ? 1 : 0;
    return null;
  };
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const f = finder(x, y);
      const on = f === null ? ((x * 7 + y * 13 + x * y * 3) % 5 < 2 ? 1 : 0) : f;
      if (on) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" />);
    }
  }
  return (
    <svg viewBox={`-2 -2 ${size + 4} ${size + 4}`} className={className} aria-hidden="true">
      <rect x="-2" y="-2" width={size + 4} height={size + 4} rx="2" fill="#fff" />
      <g fill="#10100f">{cells}</g>
    </svg>
  );
}
