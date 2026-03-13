import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

export default function Progress({ heightLog, streak, totalSessions }) {
  const cur = heightLog.length ? heightLog[0].v : null;
  const start = heightLog.length ? heightLog[heightLog.length - 1].v : null;
  const gain = cur && start ? (cur - start).toFixed(1) : null;

  const chartData = {
    labels: [...heightLog].reverse().map(e => e.label),
    datasets: [{
      data: [...heightLog].reverse().map(e => e.v),
      borderColor: '#1D9E75',
      backgroundColor: 'rgba(29,158,117,0.07)',
      borderWidth: 2,
      pointRadius: 4,
      pointBackgroundColor: '#1D9E75',
      tension: 0.3,
      fill: true,
    }],
  };

  const chartOptions = {
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { size: 11 }, color: '#9ca3af', callback: v => v + ' cm' } },
      x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9ca3af' } },
    },
  };

  const today = new Date().getDay();
  const todayIdx = today === 0 ? 6 : today - 1;
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div>
      <div className="sec-label">Overview</div>
      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-val" style={{ color: '#1D9E75' }}>{streak}</div>
          <div className="stat-lbl">Day streak</div>
        </div>
        <div className="stat-box">
          <div className="stat-val">{totalSessions}</div>
          <div className="stat-lbl">Total sessions</div>
        </div>
        <div className="stat-box">
          <div className="stat-val" style={{ color: gain > 0 ? '#1D9E75' : undefined }}>
            {gain !== null ? (gain > 0 ? '+' : '') + gain : '—'}
          </div>
          <div className="stat-lbl">cm gained</div>
        </div>
      </div>

      <div className="sec-label">This week</div>
      <div className="card">
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 14 }}>
          {days.map((d, i) => (
            <div key={i} style={{
              width: 34, height: 34, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 500,
              background: i < todayIdx ? '#1D9E75' : i === todayIdx ? '#E1F5EE' : '#f3f4f6',
              color: i < todayIdx ? 'white' : i === todayIdx ? '#0F6E56' : '#9ca3af',
              border: i === todayIdx ? '1.5px solid #1D9E75' : 'none',
            }}>{d}</div>
          ))}
        </div>
        <div style={{ textAlign: 'center', fontSize: 13, color: '#6b7280' }}>
          {streak > 0 ? `${streak}-day streak — keep going!` : 'Complete your first routine to start a streak.'}
        </div>
      </div>

      <div className="sec-label" style={{ marginTop: '1rem' }}>Height progress</div>
      <div className="card">
        {heightLog.length >= 2 ? (
          <Line data={chartData} options={chartOptions} height={160} />
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0', fontSize: 13, color: '#9ca3af' }}>
            Log at least 2 height entries to see your growth graph.
          </div>
        )}
      </div>

      {heightLog.length > 0 && (
        <>
          <div className="sec-label" style={{ marginTop: '1rem' }}>Height stats</div>
          <div className="card">
            {[
              { l: 'Starting height', v: start ? start.toFixed(1) + ' cm' : '—' },
              { l: 'Current height', v: cur ? cur.toFixed(1) + ' cm' : '—' },
              { l: 'Total change', v: gain !== null ? (gain > 0 ? '+' : '') + gain + ' cm' : '—' },
              { l: 'Entries logged', v: heightLog.length },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', padding: '9px 0',
                borderBottom: i < 3 ? '0.5px solid rgba(0,0,0,0.07)' : 'none',
              }}>
                <span style={{ fontSize: 13, color: '#6b7280' }}>{s.l}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>{s.v}</span>
              </div>
            ))}
          </div>
        </>
      )}

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
