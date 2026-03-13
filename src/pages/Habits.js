import React, { useState } from 'react';
import { habitsData } from '../data/content';

export default function Habits() {
  const [done, setDone] = useState(habitsData.map(() => false));

  const toggle = (i) => setDone(prev => prev.map((v, idx) => idx === i ? !v : v));
  const doneCount = done.filter(Boolean).length;
  const pct = Math.round((doneCount / habitsData.length) * 100);

  const science = [
    {
      title: 'Growth hormone',
      body: '80% of human growth hormone (HGH) is released during deep sleep, primarily in the first two hours after falling asleep. Poor sleep directly limits your body\'s ability to grow and recover.',
    },
    {
      title: 'Spinal decompression',
      body: 'Gravity compresses your spine throughout the day — you are measurably shorter at night than in the morning. Hanging, stretching, and sleeping on your back reverses this compression.',
    },
    {
      title: 'Vitamin D and calcium',
      body: 'Without adequate vitamin D, your body cannot absorb calcium efficiently. Morning sunlight for 20 minutes is the most effective and natural source.',
    },
  ];

  return (
    <div>
      <div className="sec-label">Today's habits</div>
      <div className="card" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: '#6b7280' }}>{doneCount} of {habitsData.length} done today</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#1D9E75' }}>{pct}%</span>
        </div>
        <div className="bar-wrap"><div className="bar-fill" style={{ width: pct + '%' }} /></div>
      </div>

      <div className="card">
        {habitsData.map((h, i) => (
          <div key={i} onClick={() => toggle(i)} style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '11px 0',
            borderBottom: i < habitsData.length - 1 ? '0.5px solid rgba(0,0,0,0.08)' : 'none',
            cursor: 'pointer',
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
              background: done[i] ? '#1D9E75' : 'transparent',
              border: done[i] ? '2px solid #1D9E75' : '2px solid #d1d5db',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: 12, fontWeight: 700,
              transition: 'all 0.15s',
            }}>
              {done[i] ? '✓' : ''}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 13, fontWeight: 500,
                color: done[i] ? '#6b7280' : '#1a1a1a',
                textDecoration: done[i] ? 'line-through' : 'none',
              }}>{h.label}</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>{h.sub}</div>
            </div>
            <span className={`pill ${done[i] ? 'pill-green' : 'pill-amber'}`}>
              {done[i] ? 'Done' : 'Todo'}
            </span>
          </div>
        ))}
      </div>

      <div className="sec-label" style={{ marginTop: '1.5rem' }}>Why these habits matter</div>
      {science.map((s, i) => (
        <div key={i} style={{
          background: '#f9fafb', borderRadius: 8, padding: 14, marginBottom: 10,
        }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{s.title}</div>
          <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>{s.body}</div>
        </div>
      ))}
    </div>
  );
}
