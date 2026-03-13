import React, { useState, useEffect, useRef } from 'react';
import { exercises } from '../data/content';

export default function Routine({ setStreak, setTotalSessions }) {
  const [exIdx, setExIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercises[0].duration);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [showHow, setShowHow] = useState(false);
  const intervalRef = useRef(null);

  const ex = exercises[Math.min(exIdx, exercises.length - 1)];
  const total = ex.duration;
  const pct = done ? 1 : 1 - timeLeft / total;
  const circ = 289;
  const offset = circ - circ * pct;
  const fmt = (s) => s >= 60 ? `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}` : `0:${String(s).padStart(2,'0')}`;

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            // eslint-disable-next-line no-use-before-define
            goNext();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, exIdx]);

  const goNext = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setShowHow(false);
    if (exIdx + 1 >= exercises.length) {
      setDone(true);
      const today = new Date().toDateString();
      const lastDone = localStorage.getItem('lastRoutineDate');
      const currentStreak = parseInt(localStorage.getItem('streak') || '0');
      if (lastDone !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const newStreak = lastDone === yesterday.toDateString() ? currentStreak + 1 : 1;
        setStreak(newStreak);
        localStorage.setItem('lastRoutineDate', today);
      }
      setTotalSessions(t => t + 1);
    } else {
      const next = exIdx + 1;
      setExIdx(next);
      setTimeLeft(exercises[next].duration);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setExIdx(0);
    setTimeLeft(exercises[0].duration);
    setRunning(false);
    setDone(false);
    setShowHow(false);
  };

  if (done) {
    return (
      <div>
        <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 24 }}>✓</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#1D9E75', marginBottom: 8 }}>Routine complete</div>
          <div style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, marginBottom: 20 }}>
            Consistency improves posture and spinal health.<br />See you tomorrow.
          </div>
          <button className="big-btn" style={{ maxWidth: 220, margin: '0 auto' }} onClick={reset}>Reset for tomorrow</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="sec-label">Daily routine — 12 min</div>

      <div className="card" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="110" height="110" viewBox="0 0 110 110" style={{ flexShrink: 0 }}>
            <circle cx="55" cy="55" r="46" fill="none" stroke="#f3f4f6" strokeWidth="6" />
            <circle cx="55" cy="55" r="46" fill="none" stroke="#1D9E75" strokeWidth="6"
              strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
              transform="rotate(-90 55 55)" style={{ transition: 'stroke-dashoffset 0.5s' }} />
            <text x="55" y="50" textAnchor="middle" fontSize="20" fontWeight="600" fill="#1a1a1a">{fmt(timeLeft)}</text>
            <text x="55" y="66" textAnchor="middle" fontSize="10" fill="#9ca3af">{running ? 'Running' : 'Ready'}</text>
          </svg>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>{ex.name}</div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>{exIdx + 1} of {exercises.length}</div>
            <span className="pill pill-green" style={{ display: 'inline-block', marginBottom: 12 }}>{ex.sets}</span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button onClick={() => setRunning(r => !r)} style={{
                padding: '8px 20px', borderRadius: 8, background: '#1D9E75',
                color: 'white', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>{running ? 'Pause' : 'Start'}</button>
              <button onClick={goNext} style={{
                padding: '8px 14px', borderRadius: 8, border: '0.5px solid rgba(0,0,0,0.18)',
                background: 'none', color: '#6b7280', fontSize: 13, cursor: 'pointer',
              }}>Skip →</button>
              <button onClick={() => setShowHow(s => !s)} style={{
                padding: '8px 14px', borderRadius: 8, border: '0.5px solid #1D9E75',
                background: 'none', color: '#1D9E75', fontSize: 13, cursor: 'pointer',
              }}>How to {showHow ? '▲' : '▼'}</button>
            </div>
          </div>
        </div>

        {showHow && (
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '0.5px solid rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>How to do it</div>
            {ex.how.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', background: '#E1F5EE',
                  color: '#0F6E56', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 600, flexShrink: 0, marginTop: 1,
                }}>{i + 1}</div>
                <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{step}</div>
              </div>
            ))}
            <div style={{ marginTop: 12, padding: '10px 12px', background: '#E1F5EE', borderRadius: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#0F6E56', marginBottom: 3 }}>Why this works</div>
              <div style={{ fontSize: 12, color: '#0F6E56', lineHeight: 1.5 }}>{ex.why}</div>
            </div>
          </div>
        )}
      </div>

      <div className="sec-label">All exercises</div>
      {exercises.map((e, i) => (
        <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: i < exIdx ? 0.45 : 1 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, flexShrink: 0,
            background: i < exIdx ? '#E1F5EE' : i === exIdx ? '#1D9E75' : '#f3f4f6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 600,
            color: i < exIdx ? '#0F6E56' : i === exIdx ? 'white' : '#9ca3af',
          }}>{i < exIdx ? '✓' : i + 1}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{e.name}</div>
            <span className="pill pill-green">{e.sets}</span>
          </div>
          {i === exIdx && <span className="pill pill-blue">Current</span>}
        </div>
      ))}
    </div>
  );
}
