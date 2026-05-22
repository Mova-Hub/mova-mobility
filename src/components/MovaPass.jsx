import React, { useState, useEffect } from 'react';

const SCREENS = [
  { src: '/assets/images/screens/home.JPG',    label: 'Accueil',      icon: 'bi-house-door' },
  { src: '/assets/images/screens/booking.JPG', label: 'Réservation',  icon: 'bi-calendar2-check' },
  { src: '/assets/images/screens/trajets.JPG', label: 'Mes Trajets',  icon: 'bi-geo-alt' },
];

const FEATURES = [
  { icon: 'bi-calendar2-check', title: 'Pass Mensuels',     desc: 'Trajets prédéfinis pour un budget maîtrisé. Abonnez-vous et partez.' },
  { icon: 'bi-clock-history',   title: 'Priorité à bord',   desc: 'Confirmation rapide et accès prioritaire à votre siège.' },
  { icon: 'bi-geo-alt',         title: 'Suivi en direct',   desc: 'Localisez votre transport instantanément sur la carte.' },
  { icon: 'bi-credit-card',     title: 'Paiement sécurisé', desc: "Gérez vos abonnements directement via l'app en toute sécurité." },
];

function MovaPass() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => goTo((prev) => (prev + 1) % SCREENS.length), 3800);
    return () => clearInterval(id);
  }, []);

  function goTo(getIdx) {
    setFading(true);
    setTimeout(() => {
      setActiveScreen((prev) => {
        const next = typeof getIdx === 'function' ? getIdx(prev) : getIdx;
        return next;
      });
      setFading(false);
    }, 280);
  }

  function handleTabClick(i) {
    if (i === activeScreen) return;
    setFading(true);
    setTimeout(() => { setActiveScreen(i); setFading(false); }, 280);
  }

  return (
    <section className="mp-section" id="movapass">

      {/* Decorative background blobs */}
      <div className="mp-blob mp-blob-1" aria-hidden="true" />
      <div className="mp-blob mp-blob-2" aria-hidden="true" />

      <div className="container position-relative">

        {/* ── Header ───────────────────────────────────────── */}
        <div className="mp-header" data-aos="fade-up">
          <span className="mp-badge">
            <span className="mp-badge-dot" />
            L'Application Mova Pass
          </span>
          <h2 className="mp-title">
            Une mobilité <em>sans friction</em>.
          </h2>
          <p className="mp-lead">
            Une seule interface pour réserver, suivre vos trajets et maîtriser
            votre budget avec nos forfaits intelligents.
          </p>
        </div>

        {/* ── Body ─────────────────────────────────────────── */}
        <div className="mp-body">

          {/* ── Left: Phone Mockup ───────────────────────── */}
          <div className="mp-phone-col" data-aos="fade-right" data-aos-delay="100">

            <div className="mp-scene">

              {/* Glow ring */}
              <div className="mp-glow" aria-hidden="true" />

              {/* Orbit ring */}
              <div className="mp-orbit" aria-hidden="true">
                <div className="mp-orbit-dot" />
              </div>

              {/* Floating notification — top */}
              <div className="mp-card mp-card-top">
                <div className="mp-card-icon">
                  <i className="bi bi-bus-front" />
                </div>
                <div className="mp-card-body">
                  <span className="mp-card-title">Bus confirmé</span>
                  <span className="mp-card-sub">Départ dans 5 min · Ligne 12</span>
                </div>
              </div>

              {/* Phone */}
              <div className="mp-phone">
                <div className="mp-phone-island" />
                <div className="mp-phone-screen">
                  <img
                    src={SCREENS[activeScreen].src}
                    alt={SCREENS[activeScreen].label}
                    className={`mp-screen-img ${fading ? 'mp-fade-out' : 'mp-fade-in'}`}
                  />

                  {/* In-screen status bar shimmer */}
                  <div className="mp-status-bar" aria-hidden="true" />
                </div>

                {/* Physical buttons */}
                <span className="mp-btn-vol-up"  aria-hidden="true" />
                <span className="mp-btn-vol-dn"  aria-hidden="true" />
                <span className="mp-btn-power"   aria-hidden="true" />
              </div>

              {/* Floating rating — bottom */}
              <div className="mp-card mp-card-bottom">
                <div className="mp-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className="bi bi-star-fill" />
                  ))}
                </div>
                <span className="mp-card-title">4.9 · 2 300+ avis</span>
              </div>

            </div>

            {/* Screen switcher tabs */}
            <div className="mp-tabs" role="tablist">
              {SCREENS.map((s, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={activeScreen === i}
                  className={`mp-tab ${activeScreen === i ? 'mp-tab-active' : ''}`}
                  onClick={() => handleTabClick(i)}
                >
                  <i className={`bi ${s.icon}`} />
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Features + CTA ────────────────────── */}
          <div className="mp-content-col" data-aos="fade-left" data-aos-delay="200">

            <h3 className="mp-content-title">
              Tout ce dont vous avez besoin,{' '}
              <span className="mp-green">dans votre poche.</span>
            </h3>

            <div className="mp-features">
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className="mp-feature"
                  data-aos="fade-up"
                  data-aos-delay={80 + i * 70}
                >
                  <div className="mp-feature-icon">
                    <i className={`bi ${f.icon}`} />
                  </div>
                  <div>
                    <h5 className="mp-feature-title">{f.title}</h5>
                    <p className="mp-feature-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="mp-divider" />

            {/* Store CTAs */}
            <div className="mp-stores">
              <a
                href="https://apps.apple.com/us/app/mova-mobility/id6762112462"
                target="_blank"
                rel="noopener noreferrer"
                className="mp-store-btn mp-store-solid"
              >
                <i className="bi bi-apple" />
                <div>
                  <small>Télécharger sur</small>
                  <strong>App Store</strong>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.busaccess.client"
                target="_blank"
                rel="noopener noreferrer"
                className="mp-store-btn mp-store-outline"
              >
                <i className="bi bi-google-play" />
                <div>
                  <small>Disponible sur</small>
                  <strong>Google Play</strong>
                </div>
              </a>
            </div>

            {/* Social proof */}
            <div className="mp-proof">
              <div className="mp-avatars" aria-hidden="true">
                {['M', 'S', 'A', 'K'].map((l, i) => (
                  <div key={i} className="mp-avatar" style={{ zIndex: 5 - i }}>{l}</div>
                ))}
              </div>
              <span>Rejoignez <strong>2 300+</strong> utilisateurs actifs</span>
            </div>

          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `

        /* ── Section ────────────────────────────────── */
        .mp-section {
          position: relative;
          padding: 7rem 0 6rem;
          background: #ffffff;
          overflow: hidden;
        }

        /* ── Background blobs ──────────────────────── */
        .mp-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
        }
        .mp-blob-1 {
          width: 500px; height: 500px;
          top: -180px; right: -180px;
          background: radial-gradient(circle, rgba(0,89,33,0.09) 0%, transparent 70%);
          animation: blobDrift 12s ease-in-out infinite;
        }
        .mp-blob-2 {
          width: 380px; height: 380px;
          bottom: -100px; left: -120px;
          background: radial-gradient(circle, rgba(204,232,201,0.35) 0%, transparent 70%);
          animation: blobDrift 16s ease-in-out infinite reverse;
        }

        /* ── Header ─────────────────────────────────── */
        .mp-header {
          text-align: center;
          max-width: 580px;
          margin: 0 auto 5rem;
        }
        .mp-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          background: rgba(0,89,33,0.07);
          border: 1px solid rgba(0,89,33,0.15);
          border-radius: 100px;
          font-size: 0.68rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.8px;
          color: #005921;
          margin-bottom: 1.4rem;
        }
        .mp-badge-dot {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #005921;
          animation: dotPulse 2.2s ease-in-out infinite;
        }
        .mp-title {
          font-size: clamp(2rem, 4.5vw, 3.1rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          color: #16181B;
          line-height: 1.12;
          margin-bottom: 1rem;
        }
        .mp-title em {
          font-style: normal;
          color: #005921;
        }
        .mp-lead {
          font-size: 1.05rem;
          color: #6b7280;
          line-height: 1.75;
          margin: 0;
        }

        /* ── Body grid ──────────────────────────────── */
        .mp-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 5rem;
        }

        /* ── Phone column ───────────────────────────── */
        .mp-phone-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }
        .mp-scene {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 3rem;
        }

        /* Glow halo */
        .mp-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 60%, rgba(0,89,33,0.13) 0%, transparent 68%);
          border-radius: 50%;
          pointer-events: none;
          animation: glowBreath 5s ease-in-out infinite;
        }

        /* Orbit ring */
        .mp-orbit {
          position: absolute;
          width: 340px; height: 340px;
          border-radius: 50%;
          border: 1px dashed rgba(0,89,33,0.18);
          animation: orbitSpin 18s linear infinite;
          pointer-events: none;
        }
        .mp-orbit-dot {
          position: absolute;
          top: -5px; left: 50%;
          transform: translateX(-50%);
          width: 10px; height: 10px;
          background: #005921;
          border-radius: 50%;
          box-shadow: 0 0 0 3px rgba(0,89,33,0.2);
        }

        /* Floating notification cards */
        .mp-card {
          position: absolute;
          background: #ffffff;
          border-radius: 16px;
          padding: 12px 16px;
          box-shadow:
            0 0 0 1px rgba(0,0,0,0.04),
            0 16px 48px -12px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 10;
          white-space: nowrap;
        }
        .mp-card-top {
          top: 30px;
          left: -10px;
          animation: cardFloat 5s ease-in-out infinite;
        }
        .mp-card-bottom {
          bottom: 50px;
          right: -10px;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          animation: cardFloat 5s ease-in-out 1.5s infinite;
        }
        .mp-card-icon {
          width: 36px; height: 36px;
          background: rgba(0,89,33,0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #005921;
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        .mp-card-body {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .mp-card-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: #16181B;
          display: block;
        }
        .mp-card-sub {
          font-size: 0.7rem;
          color: #9ca3af;
          display: block;
        }
        .mp-stars {
          display: flex;
          gap: 2px;
          color: #f59e0b;
          font-size: 0.65rem;
          margin-bottom: 1px;
        }

        /* Phone frame */
        .mp-phone {
          position: relative;
          width: 255px; height: 516px;
          background: #141414;
          border-radius: 46px;
          box-shadow:
            0 0 0 1px #000,
            0 0 0 8px #0f0f0f,
            0 0 0 9px rgba(255,255,255,0.04),
            0 50px 100px -20px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.08);
          z-index: 5;
          animation: phoneFloat 7s ease-in-out infinite;
        }
        .mp-phone-island {
          position: absolute;
          top: 14px;
          left: 50%; transform: translateX(-50%);
          width: 92px; height: 30px;
          background: #000;
          border-radius: 20px;
          z-index: 12;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05);
        }
        .mp-phone-screen {
          position: absolute;
          inset: 6px;
          border-radius: 40px;
          overflow: hidden;
          background: #0a0a0a;
        }
        .mp-screen-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .mp-fade-in  { animation: screenFadeIn  0.3s ease forwards; }
        .mp-fade-out { animation: screenFadeOut 0.28s ease forwards; }

        /* Status bar shimmer overlay */
        .mp-status-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 44px;
          background: linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%);
          z-index: 2;
          pointer-events: none;
        }

        /* Side buttons */
        .mp-btn-vol-up, .mp-btn-vol-dn, .mp-btn-power {
          position: absolute;
          background: #222;
          border-radius: 2px;
        }
        .mp-btn-vol-up  { left: -3px; top: 110px; width: 3px; height: 34px; }
        .mp-btn-vol-dn  { left: -3px; top: 156px; width: 3px; height: 34px; }
        .mp-btn-power   { right: -3px; top: 130px; width: 3px; height: 56px; }

        /* Screen tabs */
        .mp-tabs {
          display: flex;
          gap: 4px;
          background: rgba(0,89,33,0.06);
          padding: 5px;
          border-radius: 50px;
        }
        .mp-tab {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border: none;
          background: transparent;
          border-radius: 50px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.22s ease;
          font-family: inherit;
        }
        .mp-tab-active {
          background: #005921;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(0,89,33,0.38);
        }
        .mp-tab:not(.mp-tab-active):hover {
          color: #005921;
          background: rgba(0,89,33,0.1);
        }

        /* ── Content column ─────────────────────────── */
        .mp-content-col {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .mp-content-title {
          font-size: clamp(1.4rem, 2.4vw, 1.9rem);
          font-weight: 700;
          color: #16181B;
          letter-spacing: -0.025em;
          line-height: 1.3;
          margin: 0;
        }
        .mp-green { color: #005921; }

        /* Features list */
        .mp-features {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .mp-feature {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem 1.1rem;
          border-radius: 14px;
          border: 1px solid transparent;
          transition: all 0.25s ease;
          cursor: default;
        }
        .mp-feature:hover {
          background: #f8faf8;
          border-color: rgba(0,89,33,0.1);
          transform: translateX(5px);
        }
        .mp-feature-icon {
          width: 42px; height: 42px;
          background: rgba(0,89,33,0.08);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #005921;
          font-size: 1.15rem;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }
        .mp-feature:hover .mp-feature-icon {
          background: #005921;
          color: #fff;
          transform: scale(1.07) rotate(-4deg);
        }
        .mp-feature-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: #16181B;
          margin: 0 0 3px;
        }
        .mp-feature-desc {
          font-size: 0.845rem;
          color: #6b7280;
          margin: 0;
          line-height: 1.55;
        }

        .mp-divider {
          height: 1px;
          background: rgba(0,0,0,0.06);
          margin: 0.25rem 0;
        }

        /* Store buttons */
        .mp-stores {
          display: flex;
          gap: 0.875rem;
          flex-wrap: wrap;
        }
        .mp-store-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 22px;
          border-radius: 14px;
          text-decoration: none !important;
          font-size: 0.85rem;
          transition: all 0.22s ease;
          flex: 1;
          min-width: 150px;
        }
        .mp-store-solid {
          background: #005921;
          color: #fff;
          border: 2px solid #005921;
        }
        .mp-store-solid:hover {
          background: #004018;
          border-color: #004018;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0,89,33,0.3);
        }
        .mp-store-outline {
          background: transparent;
          color: #005921;
          border: 2px solid rgba(0,89,33,0.25);
        }
        .mp-store-outline:hover {
          background: rgba(0,89,33,0.05);
          border-color: rgba(0,89,33,0.5);
          color: #005921;
          transform: translateY(-2px);
        }
        .mp-store-btn i {
          font-size: 1.55rem;
          flex-shrink: 0;
        }
        .mp-store-btn div {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }
        .mp-store-btn small {
          font-size: 0.62rem;
          opacity: 0.75;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }
        .mp-store-btn strong {
          font-size: 0.95rem;
          font-weight: 700;
        }

        /* Social proof */
        .mp-proof {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.855rem;
          color: #6b7280;
        }
        .mp-avatars {
          display: flex;
        }
        .mp-avatar {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: #005921;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.68rem;
          font-weight: 800;
          border: 2px solid #fff;
          margin-right: -8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }
        .mp-proof strong { color: #16181B; }

        /* ── Keyframes ──────────────────────────────── */
        @keyframes screenFadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes screenFadeOut {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.97); }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.75); }
        }
        @keyframes blobDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(20px, -15px) scale(1.05); }
          66%       { transform: translate(-10px, 10px) scale(0.97); }
        }
        @keyframes glowBreath {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.65; transform: scale(1.06); }
        }
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes phoneFloat {
          0%, 100% { transform: translateY(0px) rotate(0.3deg); }
          50%       { transform: translateY(-14px) rotate(-0.3deg); }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }

        /* ── Responsive ─────────────────────────────── */
        @media (max-width: 991px) {
          .mp-section { padding: 5rem 0; }
          .mp-header   { margin-bottom: 3.5rem; }
          .mp-body {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
          .mp-phone-col { order: 1; }
          .mp-content-col { order: 2; }
          .mp-orbit { width: 290px; height: 290px; }
        }

        @media (max-width: 575px) {
          .mp-section { padding: 3.5rem 0; }
          .mp-phone { width: 215px; height: 436px; }
          .mp-phone-island { width: 78px; height: 26px; }
          .mp-card-top  { left: 0; top: 18px; }
          .mp-card-bottom { right: 0; bottom: 36px; }
          .mp-stores { flex-direction: column; }
          .mp-store-btn { flex: unset; width: 100%; }
          .mp-tab span  { display: none; }
          .mp-tab       { padding: 8px 14px; }
          .mp-orbit     { width: 250px; height: 250px; }
        }

      `}} />
    </section>
  );
}

export default MovaPass;
