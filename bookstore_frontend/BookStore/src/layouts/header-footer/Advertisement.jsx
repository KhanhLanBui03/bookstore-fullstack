import React from 'react';

const Advertisement = () => {
  const containerStyle = {
    height: '38px',
    background: 'linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%)',
    overflow: 'hidden',
    position: 'relative',
    padding: '0 10px',
    borderRadius: '0 0 18px 18px',
    boxShadow: '0 2px 12px #ff416c22',
    display: 'flex',
    alignItems: 'center',
    zIndex: 200,
  };

  const textStyle = {
    whiteSpace: 'nowrap',
    display: 'inline-block',
    animation: 'scroll-left-xinxo 13s linear infinite',
    position: 'absolute',
    willChange: 'transform',
    fontSize: '1rem',
    color: '#fff',
    fontWeight: 700,
    letterSpacing: '1px',
    textShadow: '0 2px 8px #ff416c55',
    paddingLeft: 0,
    paddingRight: 0,
  };

  const keyframesStyle = `
    @keyframes scroll-left-xinxo {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(-100%);
      }
    }
    @media (max-width: 600px) {
      .adv-xinxo-text {
        font-size: 0.92rem !important;
      }
      .adv-xinxo-bar {
        height: 32px !important;
        border-radius: 0 0 10px 10px !important;
      }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={containerStyle} className="adv-xinxo-bar">
        <div style={textStyle} className="adv-xinxo-text">
          <span role="img" aria-label="gift">🎁</span> 
          <span style={{ color: '#ffe3ec', margin: '0 8px', fontWeight: 900, letterSpacing: '2px' }}>
            ƯU ĐÃI HÈ ĐẶC BIỆT
          </span>
          <span style={{ color: '#fff', margin: '0 8px' }}>
            | MUA 1 TẶNG 1
          </span>
          <span style={{ color: '#ffe3ec', margin: '0 8px' }}>
            | FREESHIP ĐƠN TỪ 200K
          </span>
          <span style={{ color: '#fff', margin: '0 8px' }}>
            | CHỈ HÔM NAY!
          </span>
          <span role="img" aria-label="fire">🔥</span>
        </div>
      </div>
    </>
  );
};

export default Advertisement;