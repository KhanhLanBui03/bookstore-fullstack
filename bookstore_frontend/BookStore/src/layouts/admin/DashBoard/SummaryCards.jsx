import React from 'react';
import { FaUsers, FaDollarSign, FaChartLine, FaUserAlt } from 'react-icons/fa';

const gradientColors = [
  'linear-gradient(135deg, #4f8cff 0%, #38b6ff 100%)',
  'linear-gradient(135deg, #00b894 0%, #00e6d3 100%)',
  'linear-gradient(135deg, #fdcb6e 0%, #ffe29f 100%)',
  'linear-gradient(135deg, #fd79a8 0%, #a18cd1 100%)'
];

const SummaryCards = ({ summary }) => {
  const cards = [
    {
      label: 'Total Revenue',
      value: `$${summary.totalRevenue.toLocaleString()}`,
      icon: <FaDollarSign />,
      color: '#4f8cff',
      gradient: gradientColors[0]
    },
    {
      label: 'Active Users',
      value: summary.activeUsers,
      icon: <FaUsers />,
      color: '#00b894',
      gradient: gradientColors[1]
    },
    {
      label: 'Monthly Growth',
      value: `$${summary.monthlyGrowth.toLocaleString()}`,
      icon: <FaChartLine />,
      color: '#fdcb6e',
      gradient: gradientColors[2]
    },
    {
      label: 'Avg Revenue/User',
      value: `$${summary.avgRevenuePerUser.toFixed(2)}`,
      icon: <FaUserAlt />,
      color: '#fd79a8',
      gradient: gradientColors[3]
    }
  ];

  return (
    <div className='mt-2' style={{
      display: 'flex',
      gap: '32px',
      marginBottom: '36px',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }}>
      {cards.map((card, index) => (
        <div
          key={index}
          style={{
            flex: 1,
            minWidth: 260,
            maxWidth: 350,
            background: 'rgba(255,255,255,0.98)',
            borderRadius: '28px',
            padding: '36px 32px 28px 32px',
            boxShadow: '0 12px 36px 0 rgba(80,80,180,0.13), 0 2px 8px #00000009',
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.18s cubic-bezier(.4,0,.2,1)',
            border: 'none',
            cursor: 'pointer',
            backdropFilter: 'blur(2px)'
          }}
          className="summary-card"
        >
          {/* Animated Gradient Circle */}
          <div style={{
            position: 'absolute',
            left: -50,
            top: -50,
            width: 140,
            height: 140,
            background: card.gradient,
            borderRadius: '50%',
            filter: 'blur(0px)',
            opacity: 0.17,
            zIndex: 0,
            animation: 'float 7s ease-in-out infinite'
          }} />
          {/* Icon */}
          <div style={{
            fontSize: 44,
            color: '#fff',
            background: card.gradient,
            borderRadius: '50%',
            width: 76,
            height: 76,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 6px 24px ${card.color}33`,
            zIndex: 1,
            border: `4px solid #fff`,
            transition: 'transform 0.2s'
          }}>
            {card.icon}
          </div>
          {/* Info */}
          <div style={{ zIndex: 1 }}>
            <div style={{
              fontSize: 16,
              color: '#888',
              fontWeight: 700,
              letterSpacing: 0.5,
              marginBottom: 6,
              textTransform: 'uppercase'
            }}>{card.label}</div>
            <div style={{
              fontSize: 32,
              fontWeight: 900,
              color: card.color,
              letterSpacing: 0.5,
              textShadow: `0 2px 12px ${card.color}22`
            }}>{card.value}</div>
          </div>
        </div>
      ))}
      <style>{`
        .summary-card:hover {
          transform: translateY(-10px) scale(1.045);
          box-shadow: 0 24px 64px #4f8cff33, 0 2px 8px #00000011;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px);}
          50% { transform: translateY(-18px);}
        }
      `}</style>
    </div>
  );
};

export default SummaryCards;