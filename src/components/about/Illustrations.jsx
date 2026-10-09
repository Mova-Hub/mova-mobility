import React, { useEffect, useState } from 'react';

const GREEN = '#005921';
const GREEN_SOFT = '#5f8a6c';
const ORANGE = '#f0821e';

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return undefined;
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  return reduced;
}

const ROUTE = 'M40 300 C 120 300, 130 200, 220 200 S 330 110, 420 120 S 520 210, 600 90';

/**
 * A city route with stops and a bus travelling it: what "suivi en direct"
 * looks like, without a screenshot. The bus stays parked at the second stop
 * for people who asked for reduced motion.
 */
export function RouteIllustration({ className = '' }) {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 640 380" className={className} role="img" aria-label="Un bus Mova suit son itinéraire entre plusieurs arrêts">
      <defs>
        <pattern id="ill-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="#e7ece9" strokeWidth="1" />
        </pattern>
        <linearGradient id="ill-route" x1="0" x2="1">
          <stop offset="0" stopColor={GREEN} />
          <stop offset="1" stopColor={GREEN} />
        </linearGradient>
      </defs>
      <rect width="640" height="380" rx="28" fill="#f6f8f7" />
      <rect width="640" height="380" rx="28" fill="url(#ill-grid)" />
      {/* Blocks and a river, for a sense of city. */}
      <rect x="70" y="60" width="90" height="70" rx="12" fill="#eaf0ec" />
      <rect x="250" y="250" width="120" height="80" rx="12" fill="#eaf0ec" />
      <rect x="470" y="230" width="110" height="90" rx="12" fill="#eaf0ec" />
      <path d="M0 350 C 160 330, 260 370, 420 345 S 600 330, 640 340 L640 380 L0 380Z" fill="#dbe9f3" />
      {/* The route */}
      <path d={ROUTE} fill="none" stroke="#d3ddd7" strokeWidth="16" strokeLinecap="round" />
      <path d={ROUTE} fill="none" stroke="url(#ill-route)" strokeWidth="6" strokeLinecap="round" strokeDasharray="1 14" />
      {/* Stops */}
      {[[40, 300, 'Départ'], [220, 200, ''], [420, 120, ''], [600, 90, 'Arrivée']].map(([x, y, label], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle r="13" fill="#fff" stroke={i === 3 ? ORANGE : GREEN} strokeWidth="4" />
          {label && (
            <g transform="translate(0 -30)">
              <rect x="-38" y="-14" width="76" height="26" rx="13" fill="#0b0f0c" />
              <text y="4" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" fontFamily="inherit">{label}</text>
            </g>
          )}
        </g>
      ))}
      {/* The bus */}
      <g>
        <g transform="translate(-22 -14)">
          <rect width="44" height="28" rx="8" fill={GREEN} />
          <rect x="5" y="5" width="34" height="9" rx="3" fill="#bfe8d0" />
          <circle cx="11" cy="28" r="4" fill="#0b0f0c" />
          <circle cx="33" cy="28" r="4" fill="#0b0f0c" />
        </g>
        {reduced ? (
          <animateTransform attributeName="transform" type="translate" values="220 200" dur="1s" fill="freeze" />
        ) : (
          <animateMotion dur="9s" repeatCount="indefinite" path={ROUTE} rotate="0" />
        )}
      </g>
      {/* ETA bubble */}
      <g transform="translate(470 40)">
        <rect width="150" height="44" rx="14" fill="#fff" stroke="#e5e9e6" />
        <circle cx="22" cy="22" r="6" fill={GREEN}>
          {!reduced && <animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite" />}
        </circle>
        <text x="38" y="27" fontSize="14" fontWeight="700" fill="#0b0f0c" fontFamily="inherit">Arrivée 4 min</text>
      </g>
    </svg>
  );
}

const NODES = [
  // Bootstrap Icons: phone, bus-front, shield-check, headset.
  { x: 110, y: 90, icon: '\uF4E7', title: 'Passagers', sub: 'App Mova' },
  { x: 530, y: 90, icon: '\uF87F', title: 'Chauffeurs', sub: 'Opérateurs partenaires' },
  { x: 110, y: 330, icon: '\uF52F', title: 'Contrôleurs', sub: 'App terrain' },
  { x: 530, y: 330, icon: '\uF414', title: 'Équipe Mova', sub: 'Centre opérationnel' },
];

/**
 * How the pieces connect: one platform in the middle, four kinds of people
 * around it. Icons are Bootstrap Icons glyphs, already loaded by the site.
 */
export function EcosystemIllustration({ className = '' }) {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 640 420" className={className} role="img" aria-label="La plateforme Mova relie passagers, chauffeurs, contrôleurs et l’équipe opérationnelle">
      <defs>
        <filter id="eco-hub-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#3c2d14" floodOpacity=".14" />
        </filter>
      </defs>
      <rect width="640" height="420" rx="28" fill="#f6f3ec" />
      <circle cx="320" cy="210" r="150" fill="none" stroke="#e4dfd3" strokeWidth="1" />
      <circle cx="320" cy="210" r="95" fill="none" stroke="#e4dfd3" strokeWidth="1" />
      {NODES.map((n) => (
        <line key={n.title} x1="320" y1="210" x2={n.x} y2={n.y} stroke={GREEN_SOFT} strokeOpacity=".6" strokeWidth="2" strokeDasharray="6 8">
          {!reduced && <animate attributeName="stroke-dashoffset" values="0;-28" dur="1.4s" repeatCount="indefinite" />}
        </line>
      ))}
      {/* The Mova logo at the centre, on white: the logo is green and orange,
          so a green disc would swallow the mark. */}
      <circle cx="320" cy="210" r="66" fill="#ffffff" stroke="#e4dfd3" strokeWidth="1.5" filter="url(#eco-hub-shadow)" />
      <circle cx="320" cy="210" r="78" fill="none" stroke="#c9c2b2" strokeOpacity=".5" strokeWidth="1.5">
        {!reduced && <animate attributeName="r" values="70;88;70" dur="3s" repeatCount="indefinite" />}
        {!reduced && <animate attributeName="stroke-opacity" values=".5;0;.5" dur="3s" repeatCount="indefinite" />}
      </circle>
      {/* 500 x 220 logo, drawn 96 wide and centred on the hub. */}
      <image href="/assets/images/logo/logo.png" x="272" y="188.9" width="96" height="42.2" preserveAspectRatio="xMidYMid meet" />
      {NODES.map((n) => (
        <g key={n.title} transform={`translate(${n.x} ${n.y})`}>
          <rect x="-90" y="-36" width="180" height="72" rx="20" fill="#ffffff" stroke="#e4dfd3" />
          <circle cx="-58" cy="0" r="20" fill="#e6eee8" />
          <text x="-58" y="7" textAnchor="middle" fontSize="18" fill={GREEN} fontFamily="bootstrap-icons">{n.icon}</text>
          <text x="-30" y="-3" fontSize="14" fontWeight="700" fill="#141412" fontFamily="inherit">{n.title}</text>
          <text x="-30" y="15" fontSize="10.5" fill="#7a776f" fontFamily="inherit">{n.sub}</text>
        </g>
      ))}
    </svg>
  );
}
