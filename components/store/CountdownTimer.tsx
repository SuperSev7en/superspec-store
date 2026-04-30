'use client';

import { useEffect, useState } from 'react';

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(endDate: Date): TimeLeft | null {
  const diff = endDate.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function Pad({ n }: { n: number }) {
  return <>{String(n).padStart(2, '0')}</>;
}

export function CountdownTimer({ endDate, label = 'Sale ends in' }: { endDate: Date; label?: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(getTimeLeft(endDate));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(endDate)), 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  if (!timeLeft) return null;

  const unitStyle: React.CSSProperties = {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    background: 'var(--text-color)', color: 'var(--background)',
    borderRadius: 4, padding: '6px 10px', minWidth: 44,
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 16px', border: '1px solid var(--border-color)', borderRadius: 6, background: 'var(--secondary-elements-background)' }}>
      <span className="Text--subdued" style={{ fontSize: 13, fontWeight: 600 }}>{label}:</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {timeLeft.days > 0 && (
          <>
            <div style={unitStyle}>
              <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}><Pad n={timeLeft.days} /></span>
              <span style={{ fontSize: 9, marginTop: 2, opacity: 0.7 }}>DAYS</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-light-color)' }}>:</span>
          </>
        )}
        <div style={unitStyle}>
          <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}><Pad n={timeLeft.hours} /></span>
          <span style={{ fontSize: 9, marginTop: 2, opacity: 0.7 }}>HRS</span>
        </div>
        <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-light-color)' }}>:</span>
        <div style={unitStyle}>
          <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}><Pad n={timeLeft.minutes} /></span>
          <span style={{ fontSize: 9, marginTop: 2, opacity: 0.7 }}>MIN</span>
        </div>
        <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-light-color)' }}>:</span>
        <div style={unitStyle}>
          <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}><Pad n={timeLeft.seconds} /></span>
          <span style={{ fontSize: 9, marginTop: 2, opacity: 0.7 }}>SEC</span>
        </div>
      </div>
    </div>
  );
}
