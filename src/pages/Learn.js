import React, { useState } from 'react';
import { articles } from '../data/content';

export default function Learn() {
  const [open, setOpen] = useState(null);

  return (
    <div>
      <div className="sec-label">Science of height</div>
      <div className="card">
        {articles.map((a, i) => (
          <div
            key={i}
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              padding: '12px 0',
              borderBottom: i < articles.length - 1 ? '0.5px solid rgba(0,0,0,0.08)' : 'none',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 600, color: '#185FA5', marginBottom: 4 }}>{a.tag}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a', lineHeight: 1.4 }}>{a.title}</div>
              <div style={{ fontSize: 16, color: '#9ca3af', flexShrink: 0, marginTop: 1 }}>
                {open === i ? '−' : '+'}
              </div>
            </div>
            {open === i && (
              <div style={{
                fontSize: 13, color: '#6b7280', lineHeight: 1.7,
                marginTop: 10, paddingTop: 10, borderTop: '0.5px solid rgba(0,0,0,0.07)',
              }}>
                {a.body}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="sec-label" style={{ marginTop: '1.5rem' }}>Key facts</div>
      {[
        { label: 'Genetics account for', value: '60–80%', sub: 'of your final height' },
        { label: 'Growth hormone released during sleep', value: '70–80%', sub: 'in first 2 hours of deep sleep' },
        { label: 'Growth plates close by age', value: '18–21', sub: 'earlier in girls (16–18)' },
        { label: 'Posture can add up to', value: '2–5 cm', sub: 'in apparent height' },
      ].map((f, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 16,
          padding: '12px 0', borderBottom: i < 3 ? '0.5px solid rgba(0,0,0,0.08)' : 'none',
        }}>
          <div style={{
            fontSize: 18, fontWeight: 600, color: '#1D9E75',
            minWidth: 60, textAlign: 'center',
          }}>{f.value}</div>
          <div>
            <div style={{ fontSize: 12, color: '#9ca3af' }}>{f.label}</div>
            <div style={{ fontSize: 13, color: '#1a1a1a', fontWeight: 500 }}>{f.sub}</div>
          </div>
        </div>
      ))}

      <div style={{
        marginTop: '1.5rem', padding: 14, borderRadius: 8,
        background: '#E1F5EE', fontSize: 13, color: '#0F6E56', lineHeight: 1.6,
      }}>
        <strong style={{ fontWeight: 600 }}>Our approach:</strong> This app does not promise height increases. It helps you optimize posture, build healthy habits, and maximize your natural genetic potential — nothing more.
      </div>
    </div>
  );
}
