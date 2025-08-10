import React from 'react';
import { FaBell, FaSun } from 'react-icons/fa';

const AdminHeader = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser).user : null;

  const username = user?.username || 'User';
  const role = user?.roles?.[0]?.name || 'Admin';
  const avatar = user?.avatar;

  const defaultAvatar = "https://via.placeholder.com/36"; // fallback nếu không có avatar

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 32px',
        background: '#fff',
        borderBottom: '1px solid #eee',
        minHeight: 56,
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      {/* Left: Welcome text */}
      <div style={{ fontWeight: '600', fontSize: '18px' }}>
        Welcome {username} 👏
      </div>

      {/* Right: Search, icons, avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {/* Search box */}
        <input
          type="text"
          placeholder="Search here..."
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: '1px solid #ccc',
            outline: 'none',
            width: '220px',
          }}
        />

        {/* Light/Dark icon */}
        <FaSun size={18} color="#555" style={{ cursor: 'pointer' }} />

        {/* Notification icon */}
        <FaBell size={18} color="#555" style={{ cursor: 'pointer' }} />

        {/* Avatar & info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src={avatar ? `data:image/jpeg;base64,${avatar}` : defaultAvatar}
            alt="avatar"
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>{username}</span>
            <span style={{ fontSize: '12px', color: '#888' }}>{role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
