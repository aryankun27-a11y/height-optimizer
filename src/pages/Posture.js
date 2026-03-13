import React from 'react';

const issues = [
  {
    title: 'Forward head posture',
    desc: 'Common from phone and screen use. Each inch the head juts forward adds ~10 lbs of strain on the spine.',
    fix: 'Chin tucks — 10 reps, 3× daily',
  },
  {
    title: 'Rounded shoulders',
    desc: 'Causes a collapsed chest and makes you appear shorter. Usually from weak upper back muscles.',
    fix: 'Shoulder resets — wall hold for 30 sec',
  },
  {
    title: 'Anterior pelvic tilt',
    desc: 'Creates an exaggerated lower back curve. Often from prolonged sitting. Correctable with core work.',
    fix: 'Pelvic tilts — 10 reps holding 5 sec',
  },
];

export default function Posture() {
  const score = 70;
  const circ = 264;
  const offset = circ * (1 - score / 100);

  return (
    <div>
      <div className="sec-label">Posture score</div>
      <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ margin: '0 auto 12px', display: 'block' }}>
          <circle cx="50" cy="50" r="42" fill="none" stroke="#f3f4f6" strokeWidth="8" />
          <circle
            cx="50" cy="50" r="42" fill="none" stroke="#1D9E75" strokeWidth="8"
            strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
            transform="rotate(-90 50 50)"
          />
          <text x="50" y="44" textAnchor="middle" fontSize="20" fontWeight="600" fill="#1a1a1a">{score}</text>
          <text x="50" y="58" textAnchor="middle" fontSize="9" fill="#9ca3af">posture score</text>
        </svg>
        <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, maxWidth: 320, margin: '0 auto' }}>
          Good posture can make you appear 1–2 cm taller. It also reduces back pain and improves breathing.
        </div>
      </div>

      <div className="sec-label" style={{ marginTop: '1rem' }}>Common issues to fix</div>
      {issues.map((issue, i) => (
        <div key={i} className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%', background: '#D85A30', flexShrink: 0,
            }} />
            <div style={{ fontSize: 14, fontWeight: 500 }}>{issue.title}</div>
          </div>
          <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, marginBottom: 10 }}>{issue.desc}</div>
          <span className="pill pill-blue">Fix: {issue.fix}</span>
        </div>
      ))}

      <div className="sec-label" style={{ marginTop: '1rem' }}>Quick posture check</div>
      <div className="card">
        {[
          'Stand with your back against a wall',
          'Heels, buttocks, and shoulder blades should touch the wall',
          'The back of your head should also touch or be close to the wall',
          'There should be a small gap at the lower back (natural curve)',
          'Hold this position for 30 seconds daily to train muscle memory',
        ].map((step, i) => (
          <div key={i} style={{
            display: 'flex', gap: 12, padding: '9px 0',
            borderBottom: i < 4 ? '0.5px solid rgba(0,0,0,0.07)' : 'none',
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%',
              background: '#E1F5EE', color: '#0F6E56',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 600, flexShrink: 0,
            }}>{i + 1}</div>
            <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>{step}</div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '1rem', padding: 12, borderRadius: 8,
        background: '#f9fafb', fontSize: 12, color: '#9ca3af', lineHeight: 1.6,
      }}>
        This is a general guide, not a medical diagnosis. If you have chronic pain or spinal concerns, consult a physiotherapist.
      </div>
    </div>
  );
}
