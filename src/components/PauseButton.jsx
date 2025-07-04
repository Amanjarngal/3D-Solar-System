import React from 'react';

const PauseButton = ({ paused, setPaused, theme }) => {
  const isDark = theme === 'dark';

  return (
    <div
      style={{
        position: 'absolute',
        top: 100,
        right: 40,
        zIndex: 999,
        background: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(234, 224, 224, 0.7)',
        padding: '8px 14px',
        borderRadius: '10px',
        color: isDark ? 'white' : 'black',
        cursor: 'pointer',
        fontFamily: 'sans-serif',
        fontSize: '14px',
        border: isDark ? '1px solid #444' : '1px solid #aaa',
        boxShadow: isDark ? '0 0 8px #000' : '0 0 8px #ccc',
        transition: 'background 0.3s, color 0.3s'
      }}
      onClick={() => setPaused(prev => !prev)}
    >
      {paused ? '▶ Resume' : '⏸ Pause'}
    </div>
  );
};

export default PauseButton;
