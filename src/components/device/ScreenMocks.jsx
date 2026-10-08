import React from 'react';
import { PassCard, QrArt } from '../pass/PassArt';
import './screen-mocks.css';

/*
 * App screens drawn in HTML, used inside the iPhone frame until a real
 * screenshot exists for that slot (see src/data/appScreens.js). They follow
 * the app's own layout and its card, in the neutral light theme, so a phone
 * on the website never shows an empty grey screen.
 */

function StatusBar() {
  return (
    <div className="sm-status" aria-hidden="true">
      <span>9:41</span>
      <span className="sm-status-icons"><i className="bi bi-reception-4"></i><i className="bi bi-wifi"></i><i className="bi bi-battery-full"></i></span>
    </div>
  );
}

function TabBar({ active }) {
  const tabs = [
    ['home', 'bi-house-door'],
    ['book', 'bi-plus-circle'],
    ['pass', 'bi-credit-card-2-front'],
    ['trips', 'bi-list-ul'],
    ['account', 'bi-person'],
  ];
  return (
    <div className="sm-tabbar" aria-hidden="true">
      {tabs.map(([key, icon]) => (
        <i key={key} className={`bi ${icon} ${key === active ? 'is-active' : ''}`}></i>
      ))}
    </div>
  );
}

const SCANS = [
  ['Aujourd’hui', '07:42', 'Ligne Centre-ville'],
  ['Hier', '18:15', 'Ligne Poto-Poto'],
  ['Hier', '07:38', 'Ligne Centre-ville'],
  ['Lun. 6 oct.', '17:52', 'Ligne Bacongo'],
  ['Lun. 6 oct.', '07:40', 'Ligne Centre-ville'],
];

function PassMock() {
  return (
    <div className="sm">
      <StatusBar />
      <div className="sm-body">
        <p className="sm-title">Mova Pass</p>
        <PassCard className="sm-card" />
        <div className="sm-panel">
          <div className="sm-row-between">
            <span className="sm-strong">Il reste 18 jours</span>
            <span className="sm-link">Renouveler</span>
          </div>
          <div className="sm-bar"><span style={{ width: '40%' }} /></div>
          <span className="sm-muted">Mensuel · jusqu’au 30 novembre</span>
        </div>
        <p className="sm-section">Derniers passages</p>
        <div className="sm-panel is-list">
          {SCANS.slice(0, 3).map(([day, time, line]) => (
            <div key={day + time} className="sm-item">
              <span className="sm-item-icon"><i className="bi bi-bus-front"></i></span>
              <span className="sm-item-text"><b>{line}</b><small>{day} · {time}</small></span>
              <i className="bi bi-check-circle-fill sm-ok"></i>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="pass" />
    </div>
  );
}

function HistoryMock() {
  return (
    <div className="sm">
      <StatusBar />
      <div className="sm-body">
        <p className="sm-back"><i className="bi bi-chevron-left"></i> Mova Pass</p>
        <p className="sm-title">Historique</p>
        <div className="sm-chips"><span className="is-active">Tout</span><span>Cette semaine</span><span>Ce mois</span></div>
        <div className="sm-panel is-list">
          {SCANS.map(([day, time, line]) => (
            <div key={day + time} className="sm-item">
              <span className="sm-item-icon"><i className="bi bi-broadcast"></i></span>
              <span className="sm-item-text"><b>{line}</b><small>{day} · {time}</small></span>
              <span className="sm-tag">Validé</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EclairMock() {
  return (
    <div className="sm">
      <StatusBar />
      <div className="sm-body is-center">
        <p className="sm-back"><i className="bi bi-chevron-left"></i> Mova Pass</p>
        <p className="sm-title">Pass Éclair</p>
        <p className="sm-muted sm-lead">Présentez ce code au contrôleur à la place de votre carte.</p>
        <div className="sm-qr"><QrArt /></div>
        <span className="sm-pill"><i className="bi bi-clock"></i> Valable aujourd’hui</span>
        <p className="sm-muted sm-foot">Il vous reste 2 Pass Éclair cette semaine. Pensez à prendre votre carte.</p>
      </div>
    </div>
  );
}

function ActivateMock() {
  return (
    <div className="sm">
      <StatusBar />
      <div className="sm-body is-center">
        <p className="sm-back"><i className="bi bi-chevron-left"></i> Mova Pass</p>
        <p className="sm-title">Activer la carte</p>
        <p className="sm-muted sm-lead">Approchez votre carte du haut du téléphone.</p>
        <div className="sm-scan">
          <span className="sm-scan-ring" /><span className="sm-scan-ring" />
          <PassCard className="sm-card is-small" />
        </div>
        <span className="sm-pill"><i className="bi bi-broadcast"></i> Prêt à lire</span>
      </div>
    </div>
  );
}

const MOCKS = { pass: PassMock, passHistory: HistoryMock, eclair: EclairMock, passScan: ActivateMock };

/** The drawn screen for a manifest key, or null when there is none. */
export function ScreenMock({ kind }) {
  const Mock = MOCKS[kind];
  return Mock ? <Mock /> : null;
}
