import React, { useState, useEffect, useRef } from 'react';
import { exercises } from '../data/content';

export default function Routine({ setStreak, setTotalSessions }) {
  const [exIdx, setExIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercises[0].dur);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef(null);

  const ex = exercises[Math.min(exIdx, exercises.length - 1)];
  const total = ex.dur;
  const pct = done ? 1 : 1 - timeLeft / total;
  const circ = 289;
  const offset = circ - circ * pct;

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            handleNext();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, exIdx]);

  const handleNext = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    if (exIdx + 1 >= exercises.length) {
      setDone(true);
      setStreak(s => s + 1);
      setTotalSessions(t => t + 1);
    } else {
      const next = exIdx + 1;
      setExIdx(next);
      setTimeLeft(exercises[next].dur);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setExIdx(0);
    setTimeLeft(exercises[0].dur);
    setRunning(false);
    setDone(false);
  };

  if (done) {
    return (
      <div>
        <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#1D9E75', marginBottom: 8 }}>Routine complete</div>
          <div style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, marginBottom: 20 }}>
            Consistency improves posture and spinal health.<br />See you tomorrow.
          </div>
          <button className="big-btn" style={{ maxWidth: 220, margin: '0 auto' }} onClick={reset}>
            Reset for tomorrow
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="sec-label">Daily routine — 12 min</div>
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="110" height="110" viewBox="0 0 110 110" style={{ flexShrink: 0 }}>
            <circle cx="55" cy="55" r="46" fill="none" stroke="#f3f4f6" strokeWidth="6" />
            <circle
              cx="55" cy="55" r="46" fill="none" stroke="#1D9E75" strokeWidth="6"
              strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
              transform="rotate(-90 55 55)"
              style={{ transition: 'stroke-dashoffset 0.5s' }}
            />
            <text x="55" y="50" textAnchor="middle" fontSize="20" fontWeight="600" fill="#1a1a1a">{fmt(timeLeft)}</text>
            <text x="55" y="66" textAnchor="middle" fontSize="10" fill="#9ca3af">{running ? 'Running' : 'Ready'}</text>
          </svg>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{ex.name}</div>
            <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, marginBottom: 12 }}>{ex.desc}</div>
            <span className="pill pill-green" style={{ marginBottom: 12, display: 'inline-block' }}>{ex.reps}</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setRunning(r => !r)}
                style={{
                  padding: '8px 20px', borderRadius: 8, background: '#1D9E75',
                  color: 'white', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}
              >
                {running ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={handleNext}
                style={{
                  padding: '8px 16px', borderRadius: 8, border: '0.5px solid rgba(0,0,0,0.18)',
                  background: 'none', color: '#6b7280', fontSize: 13, cursor: 'pointer',
                }}
              >
                Skip →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="sec-label">All exercises</div>
      {exercises.map((e, i) => (
        <div key={i} className="card" style={{
          display: 'flex', alignItems: 'flex-start', gap: 14, opacity: i < exIdx ? 0.45 : 1,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8, flexShrink: 0,
            background: i < exIdx ? '#E1F5EE' : i === exIdx ? '#E1F5EE' : '#f3f4f6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 600,
            color: i < exIdx ? '#0F6E56' : i === exIdx ? '#1D9E75' : '#9ca3af',
          }}>
            {i < exIdx ? '✓' : i + 1}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{e.name}</div>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>{e.desc}</div>
            <span className="pill pill-green">{e.reps}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
