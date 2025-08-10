import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaBook, FaUsers, FaHome, FaPlus, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const menu = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { to: '/admin/book-form', label: 'Thêm sách mới', icon: <FaPlus /> },
  { to: '/admin/products', label: 'Quản lý sách', icon: <FaBook /> },
  { to: '/admin/users', label: 'Quản lý người dùng', icon: <FaUsers /> },
  { to: '/', label: 'Trang chủ', icon: <FaHome /> },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const adminName = localStorage.getItem('adminName') || 'Admin';
  const adminAvatar = localStorage.getItem('adminAvatar') || '/img/logo2.png';

  const handleLogout = () => {
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminAvatar');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside
      style={{
        width: 260,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fff 60%, #fbeaec 100%)',
        boxShadow: '2px 0 16px #f0f1f2',
        position: 'sticky',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 10,
      }}
    >
      <div>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '36px 0 18px 0', borderBottom: '1px solid #eee',
          background: 'rgba(255,255,255,0.85)',
        }}>
          <img
            src={adminAvatar}
            alt="Admin Avatar"
            style={{
              width: 70,
              height: 70,
              borderRadius: '50%',
              marginBottom: 8,
              border: '2.5px solid #dc3545',
              background: '#fff',
              objectFit: 'cover',
              boxShadow: '0 2px 12px #dc354522'
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 700, color: '#dc3545', fontSize: 20 }}>{adminName}</span>
            <FaUserCircle color="#dc3545" size={20} />
          </div>
          <span style={{ color: '#888', fontSize: 13, marginTop: 2, fontWeight: 500 }}>Admin Panel</span>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginTop: 28 }}>
          {menu.map((item) => {
            const active = location.pathname === item.to;
            return (
              <li key={item.to} style={{ position: 'relative' }}>
                <Link
                  to={item.to}
                  className="sidebar-link ripple"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '13px 32px',
                    color: active ? '#dc3545' : '#333',
                    background: active ? 'rgba(220,53,69,0.08)' : 'transparent',
                    borderLeft: active ? '5px solid #dc3545' : '5px solid transparent',
                    borderRadius: '0 12px 12px 0',
                    margin: '0 0 6px 0',
                    fontWeight: active ? 700 : 500,
                    fontSize: 16,
                    textDecoration: 'none',
                    transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
                    boxShadow: active ? '0 2px 12px #dc354522' : 'none',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  // Không dùng target="_blank" hoặc reload lại trang, chỉ chuyển route bên phải
                  // React Router sẽ giữ lại Sidebar, chỉ thay đổi nội dung bên phải
                >
                  <span style={{ fontSize: 19, minWidth: 22 }}>{item.icon}</span>
                  {item.label}
                  {active && <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, background: '#dc3545', borderRadius: '5px 0 0 5px' }}></span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: '100%',
            padding: '12px 0',
            border: 'none',
            background: 'transparent',
            fontWeight: 600,
            color: '#dc3545',
            cursor: 'pointer',
            borderTop: '1px solid #eee',
            fontSize: 15,
          }}
        >
          <FaSignOutAlt />
          Đăng xuất
        </button>
        <div style={{ textAlign: 'center', padding: '10px 0', fontSize: 13, color: '#aaa' }}>
          <span>© {new Date().getFullYear()} LNBookStore</span>
          <br />
          <span style={{ fontSize: 11 }}>v1.0 Admin</span>
        </div>
      </div>

      <style>{`
        .sidebar-link:hover {
          background: linear-gradient(90deg, #fbeaec 60%, #fff 100%);
          color: #dc3545 !important;
          box-shadow: 0 2px 12px #dc354522;
        }
        .sidebar-link:focus {
          outline: 2px solid #dc3545;
        }
        .ripple {
          position: relative;
          overflow: hidden;
        }
        .ripple:active::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 120%;
          height: 120%;
          background: rgba(220,53,69,0.13);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: ripple-anim 0.5s linear;
          pointer-events: none;
        }
        @keyframes ripple-anim {
          0% { opacity: 0.5; }
          100% { opacity: 0; }
        }
        @media (max-width: 900px) {
          aside {
            width: 100vw !important;
            min-width: 0 !important;
            border-radius: 0 !important;
          }
        }
        @media (max-width: 600px) {
          aside {
            display: none !important;
          }
        }
        body.dark aside {
          background: linear-gradient(135deg, #23272f 60%, #2d1a1a 100%) !important;
        }
        body.dark .sidebar-link {
          color: #fff !important;
        }
        body.dark .sidebar-link:hover {
          background: linear-gradient(90deg, #3a2323 60%, #23272f 100%) !important;
          color: #dc3545 !important;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;