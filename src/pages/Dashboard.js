import React from 'react';

export default function Dashboard({ heightLog, streak, totalSessions, setActiveTab }) {
  const today = new Date().getDay();
  const todayIdx = today === 0 ? 6 : today - 1;
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const currentHeight = heightLog.length ? heightLog[0].v.toFixed(1) : '—';
  const gained = heightLog.length >= 2
    ? (heightLog[0].v - heightLog[heightLog.length - 1].v).toFixed(1)
    : '—';

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-val">{currentHeight}</div>
          <div className="stat-lbl">Height (cm)</div>
        </div>
        <div className="stat-box">
          <div className="stat-val">{streak}</div>
          <div className="stat-lbl">Day streak</div>
        </div>
        <div className="stat-box">
          <div className="stat-val" style={{ color: gained !== '—' && parseFloat(gained) > 0 ? '#1D9E75' : undefined }}>
            {gained !== '—' ? (parseFloat(gained) > 0 ? '+' : '') + gained : '—'}
          </div>
          <div className="stat-lbl">Gained (cm)</div>
        </div>
      </div>

      <div className="sec-label">Today's focus</div>
      <button className="big-btn" onClick={() => setActiveTab('routine')}>
        Start today's routine →
      </button>

      <div className="sec-label">This week</div>
      <div className="card">
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 16 }}>
          {days.map((d, i) => {
            const isFilled = i < todayIdx;
            const isToday = i === todayIdx;
            return (
              <div key={i} style={{
                width: 32, height: 32,
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 500,
                background: isFilled ? '#1D9E75' : isToday ? '#E1F5EE' : '#f3f4f6',
                color: isFilled ? 'white' : isToday ? '#0F6E56' : '#9ca3af',
                border: isToday ? '1.5px solid #1D9E75' : 'none',
              }}>{d}</div>
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {[
            { v: streak, l: 'Current streak' },
            { v: totalSessions, l: 'Total sessions' },
            { v: heightLog.length, l: 'Height entries' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a' }}>{s.v}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sec-label" style={{ marginTop: '1rem' }}>Posture reminder</div>
      <div className="card row">
        <div style={{
          width: 38, height: 38, borderRadius: 8,
          background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2">
            <path d="M12 2v20M6 6l6-4 6 4M6 18l6 4 6-4" />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>Check your posture</div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>Shoulders back · chin parallel to floor · back straight.</div>
        </div>
        <span className="pill pill-green">Now</span>
      </div>

      <div className="sec-label" style={{ marginTop: '1rem' }}>Achievements</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10 }}>
        {[
          { label: 'First log', sub: 'Log your height', earned: heightLog.length > 0 },
          { label: '7-day streak', sub: 'Complete 7 days', earned: streak >= 7 },
          { label: '30-day streak', sub: 'Complete 30 days', earned: streak >= 30 },
        ].map((a, i) => (
          <div key={i} style={{
            background: a.earned ? '#E1F5EE' : '#f9fafb',
            borderRadius: 8, padding: '14px 10px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{a.earned ? '🏅' : '○'}</div>
            <div style={{ fontSize: 12, fontWeight: 500, color: a.earned ? '#0F6E56' : '#6b7280', marginBottom: 2 }}>{a.label}</div>
            <div style={{ fontSize: 11, color: '#9ca3af' }}>{a.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
