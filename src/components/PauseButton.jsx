import React from 'react';

const PauseButton = ({ paused, setPaused }) => {
  return (
    <div style={{
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 999,
      background: 'rgba(0, 0, 0, 0.7)',
      padding: '8px 14px',
      borderRadius: '10px',
      color: 'white',
      cursor: 'pointer',
      fontFamily: 'sans-serif',
      fontSize: '14px'
    }}
      onClick={() => setPaused(prev => !prev)}
    >
      {paused ? '▶ Resume' : '⏸ Pause'}
    </div>
  );
};

export default PauseButton;
