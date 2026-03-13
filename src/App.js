import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Routine from './pages/Routine';
import HeightLog from './pages/HeightLog';
import Habits from './pages/Habits';
import Posture from './pages/Posture';
import Learn from './pages/Learn';
import './App.css';

function useLocalState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch { return initial; }
  });
  const set = (v) => {
    setValue(prev => {
      const next = typeof v === 'function' ? v(prev) : v;
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  };
  return [value, set];
}

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'routine', label: 'Routine' },
  { id: 'log', label: 'Height Log' },
  { id: 'habits', label: 'Habits' },
  { id: 'posture', label: 'Posture' },
  { id: 'learn', label: 'Learn' },
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [heightLog, setHeightLog] = useLocalState('heightLog', []);
  const [streak, setStreak] = useLocalState('streak', 0);
  const [totalSessions, setTotalSessions] = useLocalState('totalSessions', 0);

  const sharedProps = { heightLog, setHeightLog, streak, setStreak, totalSessions, setTotalSessions };

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard {...sharedProps} setActiveTab={setActiveTab} />;
      case 'routine': return <Routine {...sharedProps} />;
      case 'log': return <HeightLog {...sharedProps} />;
      case 'habits': return <Habits />;
      case 'posture': return <Posture />;
      case 'learn': return <Learn />;
      default: return <Dashboard {...sharedProps} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-icon">↑</span>
            <span className="brand-name">Height Optimizer</span>
          </div>
          <p className="brand-sub">Maximize your natural height potential</p>
        </div>
      </header>

      <nav className="app-nav">
        <div className="nav-inner">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`nav-btn ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="app-main">
        <div className="page-inner">
          {renderPage()}
        </div>
      </main>

      <footer className="app-footer">
        <p>Improve posture and maximize your natural height potential. Not medical advice.</p>
      </footer>
    </div>
  );
}

export default App;
