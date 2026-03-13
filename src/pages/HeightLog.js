import React, { useState, useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, Filler, Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

export default function HeightLog({ heightLog, setHeightLog }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const logHeight = () => {
    const v = parseFloat(input);
    if (!v || v < 100 || v > 250) { setError('Enter a valid height between 100–250 cm.'); return; }
    setError('');
    const label = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    setHeightLog(prev => [{ v, label }, ...prev]);
    setInput('');
  };

  const cur = heightLog.length ? heightLog[0].v.toFixed(1) : '—';
  const start = heightLog.length ? heightLog[heightLog.length - 1].v.toFixed(1) : '—';
  const gain = heightLog.length >= 2
    ? ((heightLog[0].v - heightLog[heightLog.length - 1].v)).toFixed(1)
    : '—';

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
      y: {
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { font: { size: 11 }, color: '#9ca3af', callback: v => v + ' cm' },
      },
      x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9ca3af' } },
    },
  };

  return (
    <div>
      <div className="sec-label">Log your height</div>
      <div className="card" style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 10, lineHeight: 1.5 }}>
          Measure weekly, in the morning before eating, standing straight against a wall.
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            type="number" value={input} onChange={e => setInput(e.target.value)}
            placeholder="Height in cm (e.g. 170.5)"
            min="100" max="250" step="0.1"
            onKeyDown={e => e.key === 'Enter' && logHeight()}
            style={{
              flex: 1, padding: '9px 12px', borderRadius: 8,
              border: '0.5px solid rgba(0,0,0,0.18)', fontSize: 14,
              background: '#fff', color: '#1a1a1a', outline: 'none',
            }}
          />
          <button onClick={logHeight} style={{
            padding: '9px 20px', borderRadius: 8, background: '#1D9E75',
            color: 'white', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
          }}>Log</button>
        </div>
        {error && <div style={{ fontSize: 12, color: '#D85A30', marginTop: 6 }}>{error}</div>}
      </div>

      {heightLog.length > 0 && (
        <div className="stats-grid">
          <div className="stat-box"><div className="stat-val">{cur}</div><div className="stat-lbl">Current (cm)</div></div>
          <div className="stat-box"><div className="stat-val">{start}</div><div className="stat-lbl">Starting (cm)</div></div>
          <div className="stat-box">
            <div className="stat-val" style={{ color: parseFloat(gain) > 0 ? '#1D9E75' : undefined }}>
              {gain !== '—' ? (parseFloat(gain) > 0 ? '+' : '') + gain : '—'}
            </div>
            <div className="stat-lbl">Change (cm)</div>
          </div>
        </div>
      )}

      <div className="sec-label">Growth graph</div>
      <div className="card">
        {heightLog.length >= 2 ? (
          <Line data={chartData} options={chartOptions} height={160} />
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0', fontSize: 13, color: '#9ca3af' }}>
            Log at least 2 entries to see your growth graph.
          </div>
        )}
      </div>

      <div className="sec-label" style={{ marginTop: '1rem' }}>History</div>
      <div className="card">
        {heightLog.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '1rem 0', fontSize: 13, color: '#9ca3af' }}>No entries yet.</div>
        ) : heightLog.map((e, i) => {
          const diff = i < heightLog.length - 1 ? (e.v - heightLog[i + 1].v).toFixed(1) : null;
          const col = diff > 0 ? '#1D9E75' : diff < 0 ? '#D85A30' : '#9ca3af';
          return (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px 0', borderBottom: i < heightLog.length - 1 ? '0.5px solid rgba(0,0,0,0.08)' : 'none',
            }}>
              <span style={{ fontSize: 13, color: '#6b7280' }}>{e.label}</span>
              <span style={{ fontSize: 13, fontWeight: 500, display: 'flex', gap: 8, alignItems: 'center' }}>
                {e.v.toFixed(1)} cm
                {diff !== null && (
                  <span style={{ fontSize: 11, color: col }}>{parseFloat(diff) > 0 ? '+' : ''}{diff}</span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
