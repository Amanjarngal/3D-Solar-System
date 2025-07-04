import React, { useState, useEffect } from 'react';

const sliderStyles = {
  Mercury: { accentColor: '#b0b0b0' },
  Venus: { accentColor: '#d98e04' },
  Earth: { accentColor: '#0077ff' },
  Mars: { accentColor: '#ff4500' },
  Jupiter: { accentColor: '#deb887' },
  Saturn: { accentColor: '#e2c580' },
  Uranus: { accentColor: '#7fffd4' },
  Neptune: { accentColor: '#4169e1' },
};

const SpeedControlPanel = ({ planetSpeeds, setPlanetSpeeds, handleReset }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 999,
        fontFamily: 'sans-serif',
        width: isMobile ? '90%' : '220px',
        maxWidth: '300px',
      }}
    >
      {/* Toggle Button for Mobile */}
      {isMobile && (
        <button
          onClick={() => setOpen(prev => !prev)}
          style={{
            width: '100%',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid #888',
            marginBottom: '8px',
            cursor: 'pointer',
          }}
        >
          {open ? 'Hide Speed Controls ▲' : 'Show Speed Controls ▼'}
        </button>
      )}

      {/* Panel Content */}
      {(!isMobile || open) && (
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.65)',
            padding: '12px',
            borderRadius: '10px',
            color: 'white',
          }}
        >
          <h4 style={{ marginBottom: '10px' }}>Adjust Orbital Speeds</h4>

          {Object.entries(planetSpeeds).map(([planet, speed]) => (
            <div key={planet} style={{ marginBottom: '10px' }}>
              <label>{planet}: {speed.toFixed(3)}</label>
              <input
                type="range"
                min="0"
                max="0.05"
                step="0.001"
                value={speed}
                onChange={e =>
                  setPlanetSpeeds(prev => ({
                    ...prev,
                    [planet]: parseFloat(e.target.value),
                  }))
                }
                style={{
                  width: '100%',
                  accentColor: sliderStyles[planet]?.accentColor || '#00ffff',
                }}
              />
            </div>
          ))}

          {/* 🔄 Reset Button */}
          <button
            onClick={handleReset}
            style={{
              marginTop: '10px',
              backgroundColor: '#ff5555',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer',
              width: '100%',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            🔄 Reset to Default
          </button>
        </div>
      )}
    </div>
  );
};

export default SpeedControlPanel;
