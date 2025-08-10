import React from 'react';
import { FaCrown, FaMedal, FaBookOpen, FaRegSadTear } from 'react-icons/fa';

const getRankIcon = (index) => {
  const styles = {
    base: {
      borderRadius: '50%',
      padding: 8,
      marginRight: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease',
    },
    crown: { background: 'linear-gradient(135deg, #fff9d9, #FFD700)' },
    silver: { background: 'linear-gradient(135deg, #f4f4f4, #bdbdbd)' },
    bronze: { background: 'linear-gradient(135deg, #fbeee6, #cd7f32)' },
    default: { background: 'linear-gradient(135deg, #fff, #ffe3e3)' },
  };

  const iconProps = { style: { fontSize: 22, verticalAlign: 'middle' } };
  if (index === 0) return <span style={{ ...styles.base, ...styles.crown }}><FaCrown {...iconProps} color="#FFD700" /></span>;
  if (index === 1) return <span style={{ ...styles.base, ...styles.silver }}><FaMedal {...iconProps} color="#BDBDBD" /></span>;
  if (index === 2) return <span style={{ ...styles.base, ...styles.bronze }}><FaMedal {...iconProps} color="#cd7f32" /></span>;
  return <span style={{ ...styles.base, ...styles.default }}><FaBookOpen {...iconProps} color="#dc3545" /></span>;
};

const GenreInsights = ({ genreInsights }) => {
  return (
    <div style={{
      flex: 1,
      padding: '32px',
      borderRadius: '28px',
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 12px 30px rgba(220,53,69,0.15)',
      minHeight: 320,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* background circle */}
      <div style={{
        position: 'absolute',
        left: -60,
        top: -60,
        width: 180,
        height: 180,
        background: 'linear-gradient(135deg, #ffd6e0, #ffd700)',
        borderRadius: '50%',
        opacity: 0.12,
        animation: 'float 8s ease-in-out infinite',
      }} />

      <h4 style={{
        fontWeight: 800,
        color: '#dc3545',
        marginBottom: 20,
        fontSize: 22,
        display: 'flex',
        alignItems: 'center',
        zIndex: 1
      }}>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #ffd6e0, #ffd700)',
          borderRadius: '50%',
          width: 40,
          height: 40,
          marginRight: 12,
          boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
        }}>🏆</span>
        Thể loại bán chạy
      </h4>

      {Array.isArray(genreInsights) && genreInsights.length > 0 ? (
        <ol style={{ padding: 0, margin: 0, listStyle: 'none', zIndex: 1 }}>
          {genreInsights.slice(0, 5).map((genre, index) => (
            <li key={index} style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.6)',
              borderRadius: 16,
              marginBottom: 12,
              padding: '14px 24px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              fontWeight: 600,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer',
            }}
              className="genre-rank-item"
            >
              {getRankIcon(index)}
              <span style={{ flex: 1 }}>{genre.categoryName}</span>
              <span style={{
                color: index === 0 ? '#FFD700' : index === 1 ? '#BDBDBD' : index === 2 ? '#cd7f32' : '#dc3545',
                fontWeight: 800,
                fontSize: 18,
              }}>{genre.totalBooks} sách</span>
            </li>
          ))}
        </ol>
      ) : (
        <div style={{ textAlign: 'center', marginTop: 40, color: '#aaa' }}>
          <FaRegSadTear size={40} style={{ marginBottom: 10, color: '#dc3545' }} />
          <div style={{ fontSize: 18, fontWeight: 700 }}>Chưa có dữ liệu thể loại bán chạy.</div>
          <div style={{ fontSize: 14 }}>Hãy cập nhật dữ liệu để xem bảng xếp hạng!</div>
        </div>
      )}

      <style>{`
        .genre-rank-item:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 20px rgba(220,53,69,0.15);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px);}
          50% { transform: translateY(-10px);}
        }
      `}</style>
    </div>
  );
};

export default GenreInsights;
