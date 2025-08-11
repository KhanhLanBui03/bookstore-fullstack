import { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  Dropdown,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaShoppingCart, FaBell, FaSignOutAlt, FaUserCircle, FaShoppingBag } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItems, decreaseItem, removeItem } from '../../features/cartSlice';
import { getImageOfOneBook } from '../../api/ImageAPI';
import { MdDelete } from 'react-icons/md';

function Header({ keySearch, setKeySearch }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSearchInputChange = (e) => {
    setKeySearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keySearch.trim()) {
      navigate(`/search?q=${keySearch}`);
    }
  };

  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [cartImages, setCartImages] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed.user);
    }
  }, []);

  const getImageUrl = (imageData) => {
    if (!imageData) return null;
    if (imageData.startsWith('http')) {
      return imageData;
    }
    return `${imageData}`;
  };

  useEffect(() => {
    const fetchImages = async () => {
      const newImages = {};
      for (const item of cartItems) {
        if (!cartImages[item.bookId]) {
          try {
            const images = await getImageOfOneBook(item.bookId);
            const image = images.length > 0 ? images[0] : null;
            newImages[item.bookId] = getImageUrl(image?.imageData) || '/img/default-book.jpg';
          } catch (error) {
            console.error('Error fetching image for book:', item.bookId, error);
            newImages[item.bookId] = '/img/default-book.jpg';
          }
        }
      }
      if (Object.keys(newImages).length > 0) {
        setCartImages((prev) => ({ ...prev, ...newImages }));
      }
    };

    if (cartItems.length > 0) {
      fetchImages();
    }
  }, [cartItems]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  const allSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;
  const selectedTotalPrice = cartItems
    .filter((item) => selectedItems.includes(item.bookId))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      {/* CSS Styles */}
      <style>{`
        /* --- General Styles for Header --- */
        .main-navbar {
          background-color: #ffffff;
          border-bottom: 2px solid #f0f0f0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 1020;
          transition: background-color 0.3s ease;
        }

        .main-navbar .navbar-brand img {
          height: 48px;
          border-radius: 12px;
        }
        
        .main-navbar .nav-link,
        .main-navbar .dropdown-toggle {
          font-weight: 500;
          color: #333333 !important;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        
        .main-navbar .nav-link:hover,
        .main-navbar .dropdown-toggle:hover {
          background-color: #f8f9fa;
          color: #ff416c !important;
        }

        /* --- Search Bar --- */
        .search-bar-container {
          flex-grow: 1;
          margin: 0 1rem;
        }
        
        .search-bar {
          border-radius: 25px;
          border: 1px solid #e0e0e0;
          transition: all 0.2s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        
        .search-bar:focus-within {
          border-color: #ff416c;
          box-shadow: 0 4px 10px rgba(255, 65, 108, 0.1);
        }
        
        .search-input {
          border: none;
          background: transparent;
          padding-left: 1rem;
        }
        
        .search-input:focus {
          box-shadow: none;
        }
        
        .search-btn {
          background: linear-gradient(90deg, #ff416c, #ff4b2b);
          border: none;
          color: white;
          border-radius: 25px;
          padding: 8px 16px;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        
        .search-btn:hover {
          background: linear-gradient(90deg, #ff4b2b, #ff416c);
          transform: translateY(-1px);
        }

        /* --- User Icons & Dropdowns --- */
        .header-icons {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .icon-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #555;
          text-decoration: none;
          transition: color 0.2s ease;
          position: relative;
        }
        
        .icon-item:hover {
          color: #ff416c;
        }
        
        .icon-item .badge {
          position: absolute;
          top: -8px;
          right: -10px;
          padding: 4px 8px;
          border-radius: 10px;
          background-color: #ff416c;
          color: white;
          font-size: 10px;
          font-weight: bold;
        }
        
        .avatar-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
        }
        
        .avatar-img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ff416c;
          transition: border-color 0.2s ease;
        }
        
        .avatar-img:hover {
          border-color: #ff4b2b;
        }
        
        .avatar-placeholder {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #f0f0f0;
          color: #aaa;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
          border: 2px solid #e0e0e0;
        }

        .user-dropdown-menu {
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          border: none;
          padding: 8px;
        }

        .user-dropdown-header {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          border-bottom: 1px solid #eee;
          margin-bottom: 8px;
        }

        .user-dropdown-header .avatar-dropdown {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 12px;
          border: 2px solid #ff416c;
        }
        
        .user-dropdown-header .avatar-placeholder-dropdown {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #f0f0f0;
          color: #aaa;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 18px;
          border: 2px solid #e0e0e0;
          margin-right: 12px;
        }

        .user-dropdown-item {
          padding: 10px 12px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        
        .user-dropdown-item:hover {
          background-color: #fdecea;
          color: #ff416c;
        }
        
        .user-dropdown-item .dropdown-link {
          color: inherit;
          text-decoration: none;
          display: block;
        }

        .user-dropdown-item-logout {
          color: #ff416c !important;
        }
        
        .user-dropdown-item-logout:hover {
          background-color: #ffe3ec;
        }

        /* --- Dark Mode Toggle --- */
        .dark-mode-btn {
          border: none;
          background: #f0f0f0;
          color: #555;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .dark-mode-btn:hover {
          background: #e0e0e0;
          transform: rotate(30deg);
        }
        body.dark .dark-mode-btn {
          background: #444;
          color: #fff;
        }

        /* --- Offcanvas Cart --- */
        .cart-offcanvas-custom .offcanvas-header {
          background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
          color: #fff;
          border-bottom: 2px solid #f0f0f0;
        }

        .cart-offcanvas-custom .offcanvas-title {
          font-weight: 700;
        }

        .cart-offcanvas-custom .offcanvas-body {
          background-color: #fefefe;
          padding-bottom: 90px;
        }
        
        .cart-item-card {
          background-color: #ffffff;
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 15px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          transition: all 0.2s ease;
        }
        
        .cart-item-card:hover {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .cart-item-img {
          width: 70px;
          height: 90px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid #ddd;
        }
        
        .cart-item-name {
          font-weight: 600;
          color: #333;
          font-size: 16px;
        }

        .cart-item-price {
          font-weight: 700;
          color: #ff416c;
        }
        
        .cart-item-oldprice {
          color: #999;
          text-decoration: line-through;
          font-size: 12px;
        }

        .cart-qty-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cart-qty-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid #ff416c;
          background-color: #fff;
          color: #ff416c;
          font-size: 18px;
          font-weight: bold;
          transition: all 0.2s ease;
        }

        .cart-qty-btn:hover:not(:disabled) {
          background-color: #ff416c;
          color: #fff;
        }

        .cart-delete-btn {
          background: none;
          border: none;
          color: #ff416c;
          font-size: 20px;
          transition: color 0.2s ease;
        }

        .cart-delete-btn:hover {
          color: #ff4b2b;
        }

        .cart-summary {
          position: sticky;
          bottom: 0;
          background-color: #ffffff;
          padding: 15px;
          border-top: 1px solid #eee;
          box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
        }

        .cart-checkout-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 25px;
          background: linear-gradient(90deg, #ff416c, #ff4b2b);
          color: #fff;
          font-weight: 700;
          font-size: 16px;
          transition: all 0.2s ease;
        }

        .cart-checkout-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(255, 65, 108, 0.2);
        }

        /* --- Dark Mode Styles --- */
        body.dark-mode {
          background-color: #121212;
          color: #e0e0e0;
        }

        body.dark-mode .main-navbar {
          background-color: #1e1e1e;
          border-bottom-color: #333;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        body.dark-mode .main-navbar .nav-link,
        body.dark-mode .main-navbar .dropdown-toggle,
        body.dark-mode .icon-item,
        body.dark-mode .icon-item small {
          color: #e0e0e0 !important;
        }

        body.dark-mode .main-navbar .nav-link:hover,
        body.dark-mode .main-navbar .dropdown-toggle:hover {
          background-color: #333;
        }

        body.dark-mode .search-bar {
          background-color: #333;
          border-color: #444;
          box-shadow: none;
        }

        body.dark-mode .search-input {
          color: #e0e0e0;
        }

        body.dark-mode .user-dropdown-menu {
          background-color: #1e1e1e;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        body.dark-mode .user-dropdown-header {
          border-bottom-color: #333;
        }

        body.dark-mode .user-dropdown-header .text-muted {
          color: #999 !important;
        }

        body.dark-mode .user-dropdown-item {
          color: #e0e0e0 !important;
        }

        body.dark-mode .user-dropdown-item:hover {
          background-color: #333;
        }

        body.dark-mode .cart-offcanvas-custom .offcanvas-body {
          background-color: #1e1e1e;
        }

        body.dark-mode .cart-item-card {
          background-color: #222;
          border-color: #444;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        body.dark-mode .cart-item-card:hover {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        
        body.dark-mode .cart-item-name {
          color: #e0e0e0;
        }

        body.dark-mode .cart-summary {
          background-color: #1e1e1e;
          border-top-color: #444;
        }

        @media (max-width: 991px) {
          .search-bar-container {
            margin: 1rem 0;
          }
          .header-icons {
            margin-top: 1rem;
            gap: 15px;
            flex-direction: row;
          }
          .icon-item {
            flex-direction: row;
            gap: 8px;
          }
          .icon-item small {
            display: inline;
          }
        }
      `}</style>
      {/* End CSS Styles */}
      

      <div className="main-navbar">
        <Navbar expand="lg" className="container">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">
              <img src="/img/logo2.png" alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
                <Nav.Link as={Link} to="/about">Giới thiệu</Nav.Link>
                <NavDropdown title="Danh mục" id="navbarScrollingDropdown">
                  <NavDropdown.Item as={Link} to="/books">Sách</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/stationery">Văn phòng phẩm</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/promo">Khuyến mãi</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <div className="d-flex align-items-center search-bar-container">
                <Form className="d-flex w-100 search-bar" onSubmit={handleSearch}>
                  <Form.Control
                    type="search"
                    placeholder="Tìm sản phẩm..."
                    className="search-input"
                    onChange={onSearchInputChange}
                    value={keySearch}
                  />
                  <Button type="submit" className="search-btn">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242 1.106a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" /></svg>
                  </Button>
                </Form>
              </div>
              <div className="d-flex align-items-center header-icons">
                <Link to="/notifications" className="icon-item">
                  <FaBell size={20} />
                  <small className="d-none d-lg-block">Thông báo</small>
                  <span className="badge rounded-pill">3</span>
                </Link>
                <div onClick={() => setShowCart(true)} className="icon-item" style={{ cursor: 'pointer' }}>
                  <FaShoppingCart size={22} />
                  <small className="d-none d-lg-block">Giỏ hàng</small>
                  {cartItems.length > 0 && (
                    <span className="badge rounded-pill">
                      {calculateTotalQuantity()}
                    </span>
                  )}
                </div>

                {user ? (
                  <Dropdown align="end">
                    <Dropdown.Toggle as="div" className="avatar-container">
                      {user.avatar ? (
                        <img
                          src={getImageUrl(user.avatar)}
                          alt="Avatar"
                          className="avatar-img"
                        />
                      ) : (
                        <div className="avatar-placeholder">
                          {user.username ? user.username.charAt(0).toUpperCase() : 'RA'}
                        </div>
                      )}
                      <small className="d-none d-lg-block">{user.username || 'Tài khoản'}</small>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="user-dropdown-menu">
                      <div className="user-dropdown-header">
                        {user.avatar ? (
                          <img
                            src={getImageUrl(user.avatar)}
                            alt="Avatar"
                            className="avatar-dropdown"
                          />
                        ) : (
                          <div className="avatar-placeholder-dropdown">
                            {user.username ? user.username.charAt(0).toUpperCase() : 'RA'}
                          </div>
                        )}
                        <div>
                          <div className="fw-bold">{user.firstName} {user.lastName}</div>
                          <small className="text-muted">{user.email || user.username}</small>
                        </div>
                      </div>
                      <Dropdown.Item as={Link} to="/profile" className="user-dropdown-item">
                        <FaUserCircle className="me-2" />Hồ sơ cá nhân
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/orders" className="user-dropdown-item">
                        <FaShoppingBag className="me-2" />Đơn hàng của tôi
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout} className="user-dropdown-item user-dropdown-item-logout">
                        <FaSignOutAlt className="me-2" />Đăng xuất
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Dropdown align="end">
                    <Dropdown.Toggle as="div" className="avatar-container">
                      <FaUser size={20} />
                      <small className="d-none d-lg-block">Tài khoản</small>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="user-dropdown-menu">
                      <div className="p-2">
                        <Button as={Link} to="/login" variant="danger" className="w-100 rounded-3 mb-2">Đăng nhập</Button>
                        <Button as={Link} to="/register" variant="outline-danger" className="w-100 rounded-3">Đăng ký</Button>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
                
                <button
                  onClick={toggleDarkMode}
                  className="dark-mode-btn"
                  title="Chuyển chế độ sáng/tối"
                >
                  <span role="img" aria-label="dark-mode">
                    {document.body.classList.contains('dark-mode') ? '☀️' : '🌙'}
                  </span>
                </button>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      {/* Offcanvas giỏ hàng */}
      <Offcanvas show={showCart} onHide={() => setShowCart(false)} placement="end" className="cart-offcanvas-custom">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>🛒 Giỏ hàng của bạn</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
          {cartItems.length === 0 ? (
            <div className="text-center text-muted py-5">
              <p>Giỏ hàng trống.</p>
              <Button as={Link} to="/books" variant="danger" onClick={() => setShowCart(false)}>
                Mua sắm ngay
              </Button>
            </div>
          ) : (
            <>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="selectAll"
                  checked={allSelected}
                  onChange={(e) => {
                    setSelectedItems(e.target.checked ? cartItems.map((item) => item.bookId) : []);
                  }}
                />
                <label className="form-check-label" htmlFor="selectAll">
                  Chọn tất cả ({cartItems.length} sản phẩm)
                </label>
              </div>
              <div className="flex-grow-1 overflow-auto">
                {cartItems.map((item) => (
                  <div key={item.bookId} className="d-flex align-items-center cart-item-card">
                    <input
                      type="checkbox"
                      className="form-check-input me-3"
                      checked={selectedItems.includes(item.bookId)}
                      onChange={(e) => {
                        setSelectedItems((prev) =>
                          e.target.checked ? [...prev, item.bookId] : prev.filter((id) => id !== item.bookId)
                        );
                      }}
                    />
                    <img
                      src={cartImages[item.bookId] || "/img/default-book.jpg"}
                      alt={item.bookName}
                      className="cart-item-img"
                    />
                    <div className="flex-grow-1 mx-3">
                      <div className="cart-item-name">{item.bookName}</div>
                      <div className="d-flex align-items-center gap-2 my-1">
                        <div className="cart-item-price">{item.price.toLocaleString()} đ</div>
                        {item.originalPrice && (
                          <div className="cart-item-oldprice">{item.originalPrice.toLocaleString()} đ</div>
                        )}
                      </div>
                      <div className="cart-qty-controls">
                        <button
                          className="cart-qty-btn"
                          onClick={() => dispatch(decreaseItem(item.bookId))}
                          disabled={item.quantity <= 1}
                        >-</button>
                        <span>{item.quantity}</span>
                        <button
                          className="cart-qty-btn"
                          onClick={() => dispatch(addItems({ ...item, quantity: 1 }))}
                        >+</button>
                      </div>
                    </div>
                    <button
                      className="cart-delete-btn"
                      onClick={() => dispatch(removeItem(item.bookId))}
                      title="Xóa khỏi giỏ"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}
              </div>
              <div className="cart-summary mt-auto">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Tổng cộng:</h5>
                  <h4 className="mb-0 text-danger">{selectedTotalPrice.toLocaleString()} đ</h4>
                </div>
                <Button
                  className="cart-checkout-btn"
                  disabled={selectedItems.length === 0}
                  onClick={() => {
                    navigate('/checkout', { state: { selectedItems } });
                    setShowCart(false);
                  }}
                >
                  Thanh toán ngay ({selectedItems.length})
                </Button>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;