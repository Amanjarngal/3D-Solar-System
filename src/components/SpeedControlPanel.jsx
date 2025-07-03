import React from 'react';

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

const SpeedControlPanel = ({ planetSpeeds, setPlanetSpeeds }) => {
  return (
    <div style={{
      position: 'absolute',
      top: 10,
      left: 10,
      padding: '12px',
      background: 'rgba(0, 0, 0, 0.65)',
      color: 'white',
      borderRadius: '10px',
      zIndex: 999,
      width: '220px',
      fontFamily: 'sans-serif'
    }}>
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
    </div>
  );
};

export default SpeedControlPanel;
