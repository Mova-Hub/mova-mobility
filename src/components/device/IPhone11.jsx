import React, { useState } from 'react';
import { ScreenMock } from './ScreenMocks';
import './iphone11.css';

/**
 * One screen inside the device: the screenshot, its fallback, and finally a
 * drawn placeholder. Tries each source in order, so a missing file degrades
 * quietly instead of showing a broken image. Callers key it by `src`, so a
 * new screen starts again from its first source.
 */
export function AppScreen({ screen, eager = false }) {
  const sources = [screen?.src, screen?.fallback].filter(Boolean);
  const [index, setIndex] = useState(0);

  if (!screen || index >= sources.length) {
    return screen?.mock ? <ScreenMock kind={screen.mock} /> : <Placeholder screen={screen} />;
  }

  return (
    <img
      src={sources[index]}
      alt={screen.alt || screen.title || ''}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setIndex((i) => i + 1)}
      draggable={false}
    />
  );
}

function Placeholder({ screen }) {
  return (
    <div className="ip11-fill ip11-placeholder" role="img" aria-label={screen?.alt || screen?.title || 'Écran de l’app'}>
      <div className="ip11-ph-bar"><span>9:41</span><span><i className="bi bi-reception-4"></i> <i className="bi bi-battery-full"></i></span></div>
      <div className="ip11-ph-body">
        <span className="ip11-ph-icon"><i className={`bi ${screen?.icon || 'bi-phone'}`}></i></span>
        <span className="ip11-ph-title">{screen?.title || 'Mova'}</span>
        <span className="ip11-ph-lines"><i></i><i></i><i></i></span>
      </div>
      <div className="ip11-home" />
    </div>
  );
}

/**
 * An iPhone 11 frame around one screen, or several crossfading.
 *
 * `screens` + `active` crossfades between them (all are mounted, only the
 * active one is visible, so switching never flashes white while loading).
 * `width` is any CSS length: '280px', 'min(300px, 72vw)'.
 */
export default function IPhone11({ screen, screens, active = 0, width = '300px', finish = 'black', className = '', style, eager = false, children }) {
  const list = screens || (screen ? [screen] : []);
  return (
    <div className={`ip11 ${className}`} data-finish={finish} style={{ '--w': width, ...style }}>
      <span className="ip11-btn is-left is-silent" aria-hidden="true" />
      <span className="ip11-btn is-left is-vol-up" aria-hidden="true" />
      <span className="ip11-btn is-left is-vol-down" aria-hidden="true" />
      <span className="ip11-btn is-right is-power" aria-hidden="true" />
      <div className="ip11-glass">
        <div className="ip11-screen">
          {list.map((s, i) => (
            <div key={s.src || i} className={`ip11-layer ${i === active ? '' : 'is-hidden'}`} aria-hidden={i !== active}>
              <AppScreen screen={s} eager={eager && i === active} />
            </div>
          ))}
          {children}
          <div className="ip11-notch" aria-hidden="true">
            <span className="ip11-speaker" />
            <span className="ip11-camera" />
          </div>
          <div className="ip11-sheen" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
