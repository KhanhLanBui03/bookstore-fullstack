import { useEffect, useState } from 'react';
import {
  Button, Container, Form, Nav, Navbar, NavDropdown,
  Offcanvas, Dropdown, Modal
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaShoppingCart, FaBell } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItems, decreaseItem, removeItem } from '../../features/cartSlice';
import { getImageOfOneBook } from '../../api/ImageAPI';
import { MdDelete } from "react-icons/md";

function Header({ keySearch, setKeySearch }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State và hàm xử lý tìm kiếm
  const onSearchInputChange = (e) => {
    setKeySearch(e.target.value);
  };

  const handleSearch = () => {
    // Xử lý tìm kiếm ở đây hoặc để component cha xử lý
    console.log("Searching for:", keySearch);
  }

  // Giỏ hàng
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [cartImages, setCartImages] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  // Người dùng
  const [user, setUser] = useState(null);

  // Kiểm tra đăng nhập khi component mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed.user); // <-- sửa chỗ này
    }
  }, []);


  // Lấy ảnh cho các sản phẩm trong giỏ hàng
  useEffect(() => {
    const fetchImages = async () => {
      const newImages = {};
      for (const item of cartItems) {
        if (!cartImages[item.bookId]) {
          try {
            const images = await getImageOfOneBook(item.bookId);
            const image = images.length > 0 ? images[0] : null;
            newImages[item.bookId] = image?.link || image?.imageData || "/img/default-book.jpg";
          } catch (error) {
            console.error("Error fetching image for book:", item.bookId, error);
            newImages[item.bookId] = "/img/default-book.jpg";
          }
        }
      }
      if (Object.keys(newImages).length > 0) {
        setCartImages(prev => ({ ...prev, ...newImages }));
      }
    };

    if (cartItems.length > 0) {
      fetchImages();
    }
  }, [cartItems]);

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.location.reload(); // Đảm bảo làm mới toàn bộ state
  };

  // Tính toán tổng giá trị
  const allSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;
  const selectedTotalPrice = cartItems
    .filter(item => selectedItems.includes(item.bookId))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  useEffect(() => {
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
  };
  return (
    <>
      <style>{`
    .offcanvas-end {
      width: 500px;
    }
    @media (max-width: 768px) {
      .offcanvas-end {
        width: 100%;
      }
    }
    .avatar-img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #ff416c;
      box-shadow: 0 2px 8px #ff416c22;
      transition: box-shadow 0.2s;
    }
    .avatar-img:hover {
      box-shadow: 0 4px 16px #ff416c44;
    }
    .avatar-dropdown {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
      border: 2px solid #ff416c;
    }
    .cart-badge {
      background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
      color: #fff;
      font-weight: bold;
      font-size: 0.7rem;
      box-shadow: 0 2px 8px #ff416c33;
      border: 2px solid #fff;
    }
    .cart-btn-gradient {
      background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
      color: #fff;
      border: none;
      font-weight: 600;
      border-radius: 30px;
      transition: all 0.2s cubic-bezier(.4,2,.6,1);
      box-shadow: 0 4px 16px rgba(255,65,108,0.15);
    }
    .cart-btn-gradient:hover, .cart-btn-gradient:focus {
      background: linear-gradient(90deg, #ff4b2b 0%, #ff416c 100%);
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 8px 24px rgba(255,65,108,0.25);
      color: #fff;
    }
    .cart-qty-btn {
      background: linear-gradient(135deg, #fff 60%, #ffe3ec 100%);
      color: #ff416c;
      border: 2px solid #ff416c;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      font-size: 1.2rem;
      font-weight: bold;
      box-shadow: 0 2px 8px rgba(255,65,108,0.10);
      transition: all 0.2s cubic-bezier(.4,2,.6,1);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    .cart-qty-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .cart-qty-btn:hover:not(:disabled) {
      background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
      color: #fff;
      transform: scale(1.13);
      box-shadow: 0 8px 24px rgba(255,65,108,0.18);
    }
    .cart-delete-btn {
      background: transparent;
      border: none;
      color: #ff416c;
      font-size: 1.3rem;
      transition: color 0.2s;
      margin-left: 8px;
    }
    .cart-delete-btn:hover {
      color: #ff4b2b;
    }
    .cart-item-img {
      width: 64px;
      height: 84px;
      object-fit: cover;
      border-radius: 10px;
      border: 2px solid #ffe3ec;
      box-shadow: 0 2px 8px #ff416c11;
    }
    .cart-item-name {
      font-weight: 600;
      color: #222;
      font-size: 1rem;
      line-height: 1.2;
    }
    .cart-item-price {
      color: #ff416c;
      font-weight: bold;
      font-size: 1rem;
    }
    .cart-item-oldprice {
      color: #aaa;
      text-decoration: line-through;
      font-size: 0.85rem;
    }
    .cart-checkout-btn {
      background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
      color: #fff;
      border: none;
      border-radius: 30px;
      font-weight: 700;
      font-size: 1.1rem;
      box-shadow: 0 4px 16px rgba(255,65,108,0.15);
      transition: all 0.2s cubic-bezier(.4,2,.6,1);
    }
    .cart-checkout-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .cart-checkout-btn:hover:not(:disabled) {
      background: linear-gradient(90deg, #ff4b2b 0%, #ff416c 100%);
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 8px 24px rgba(255,65,108,0.25);
      color: #fff;
    }
    .main-navbar {
      background: #fff;
      border-bottom: 2px solid #ffe3ec;
      box-shadow: 0 4px 24px 0 rgba(255,65,108,0.07);
      border-radius: 0 0 18px 18px;
      padding: 0.5rem 0;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .main-navbar .navbar-brand img {
      height: 56px;
      width: 56px;
      border-radius: 14px;
      box-shadow: 0 2px 12px #ff416c22;
      transition: transform 0.2s;
    }
    .main-navbar .navbar-brand img:hover {
      transform: scale(1.08) rotate(-6deg);
      box-shadow: 0 8px 32px #ff416c33;
    }
    .main-navbar .nav-link, .main-navbar .dropdown-toggle {
      font-weight: 600;
      color: #222 !important;
      border-radius: 18px;
      padding: 0.5rem 1.1rem;
      transition: background 0.18s, color 0.18s;
    }
    .main-navbar .nav-link:hover, .main-navbar .dropdown-toggle:hover {
      background: linear-gradient(90deg, #ff416c11 0%, #ff4b2b11 100%);
      color: #ff416c !important;
    }
    .main-navbar .dropdown-menu {
      border-radius: 16px;
      border: 1.5px solid #ffe3ec;
      box-shadow: 0 8px 32px #ff416c11;
    }
    .search-bar {
      background: #fff;
      border-radius: 30px;
      box-shadow: 0 2px 12px #ff416c11;
      border: 1.5px solid #ffe3ec;
      transition: box-shadow 0.2s;
      max-width: 420px;
      margin-right: 1rem;
    }
    .search-bar:focus-within {
      box-shadow: 0 4px 24px #ff416c22;
      border-color: #ff416c;
    }
    .search-btn {
      background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
      color: #fff;
      border-radius: 30px;
      border: none;
      font-weight: 700;
      transition: background 0.18s, box-shadow 0.18s;
      box-shadow: 0 2px 8px #ff416c22;
      margin-left: 0.5rem;
    }
    .search-btn:hover {
      background: linear-gradient(90deg, #ff4b2b 0%, #ff416c 100%);
      box-shadow: 0 8px 24px #ff416c33;
    }
    @media (max-width: 768px) {
      .main-navbar .navbar-brand img { height: 44px; width: 44px; }
      .search-bar { max-width: 100%; margin-right: 0; }
    }
  `}</style>
  

      <div className="container-fluid main-navbar">
        <Navbar expand="lg" className="container">
          <Container fluid className="align-items-center">
            <Navbar.Brand as={Link} to="/" className="fw-bold text-danger fs-4">
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
            </Navbar.Collapse>
            <Form className="d-flex flex-grow-1 flex-lg-grow-0 search-bar align-items-center px-2" style={{ minWidth: 0 }}>
              <Form.Control
                type="search"
                placeholder="Tìm sản phẩm..."
                className="border-0 bg-transparent flex-grow-1"
                onChange={onSearchInputChange}
                value={keySearch}
                style={{ borderRadius: 30, boxShadow: 'none' }}
              />
              <Button className="search-btn px-3 py-2 d-flex align-items-center" onClick={handleSearch}>
                <span className="me-1 d-none d-md-inline">Tìm</span>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242 1.106a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" /></svg>
              </Button>
            </Form>
            <div className="d-flex align-items-center gap-3">
              <Link to="/notifications" className="text-dark text-decoration-none d-flex flex-column align-items-center">
                <FaBell size={20} />
                <small>Thông báo</small>
              </Link>
              <div onClick={() => setShowCart(true)} className="position-relative text-dark d-flex flex-column align-items-center" style={{ cursor: 'pointer' }}>
                <FaShoppingCart size={22} />
                {cartItems.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill cart-badge">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
                <small>Giỏ hàng</small>

              </div>
              


              {user ? (
                <Dropdown align="end">
                  <Dropdown.Toggle as="div" className="text-dark d-flex flex-column align-items-center" style={{ cursor: 'pointer' }}>
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Avatar"
                        className="avatar-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <FaUser size={20} />
                    )}
                    <small>{user.username || user.firstName || 'Tài khoản'}</small>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="shadow-sm rounded-3 p-2">
                    <Dropdown.Item className="p-2 border-bottom">
                      <div className="d-flex align-items-center">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt="Avatar"
                            className="avatar-dropdown"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <FaUser size={20} style={{ marginRight: '10px' }} />
                        )}
                        <div>
                          <div className="fw-bold">
                            {user.firstName} {user.lastName}
                          </div>
                          <small className="text-muted">{user.email || user.username}</small>
                        </div>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/profile" className="py-2">
                      <i className="bi bi-person me-2"></i>Hồ sơ cá nhân
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/orders" className="py-2">
                      <i className="bi bi-box me-2"></i>Đơn hàng của tôi
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout} className="py-2 text-danger">
                      <i className="bi bi-box-arrow-right me-2"></i>Đăng xuất
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Dropdown align="end">
                  <Dropdown.Toggle as="div" className="text-dark d-flex flex-column align-items-center" style={{ cursor: 'pointer' }}>
                    <FaUser size={20} />
                    <small>Tài khoản</small>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="shadow-sm rounded-3 p-2">
                    <Dropdown.Item className="p-0 mb-2">
                      <Button variant="danger" className="w-100 rounded-3" as={Link} to="/login">Đăng nhập</Button>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className="p-0">
                      <Button as={Link} to="/register" variant="outline-danger" className="w-100 rounded-3">Đăng ký</Button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}

            </div>
            <button
                onClick={toggleDarkMode}
                style={{
                  borderRadius: 24,
                  border: "none",
                  padding: "8px 18px",
                  background: "var(--header-gradient)",
                  color: "#fff",
                  fontWeight: 700,
                  boxShadow: "0 2px 8px #ff416c33",
                  cursor: "pointer"
                }}
                title="Chuyển chế độ sáng/tối"
              >
                🌓
              </button>

          </Container>
        </Navbar>
      </div>

      {/* Offcanvas giỏ hàng */}
      <Offcanvas show={showCart} onHide={() => setShowCart(false)} placement="end"  className="cart-offcanvas-xinxo">
        <style>{`
    .cart-offcanvas-xinxo .offcanvas-header {
      background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
      color: #fff;
      border-bottom: 2px solid #ffe3ec;
      box-shadow: 0 2px 12px #ff416c22;
    }
    .cart-offcanvas-xinxo .offcanvas-title {
      font-weight: 800;
      font-size: 1.25rem;
      letter-spacing: 1px;
      text-shadow: 0 2px 8px #ff416c22;
    }
    .cart-offcanvas-xinxo .offcanvas-body {
      background: linear-gradient(135deg, #fff 60%, #fbeaec 100%);
      padding-bottom: 32px;
      min-height: 100vh;
    }
    .cart-offcanvas-xinxo .cart-item-img {
      border: 2.5px solid #ff416c;
      box-shadow: 0 2px 12px #ff416c22;
      transition: box-shadow 0.2s;
    }
    .cart-offcanvas-xinxo .cart-item-img:hover {
      box-shadow: 0 8px 24px #ff416c33;
    }
    .cart-offcanvas-xinxo .cart-item-name {
      color: #ff416c;
      font-weight: 700;
      font-size: 1.08rem;
      margin-bottom: 2px;
    }
    .cart-offcanvas-xinxo .cart-item-price {
      color: #ff4b2b;
      font-size: 1.08rem;
      font-weight: 700;
    }
    .cart-offcanvas-xinxo .cart-item-oldprice {
      color: #aaa;
      text-decoration: line-through;
      font-size: 0.92rem;
    }
    .cart-offcanvas-xinxo .cart-qty-btn {
      border: none;
      background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
      color: #fff;
      font-size: 1.1rem;
      font-weight: bold;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      margin: 0 2px;
      box-shadow: 0 2px 8px #ff416c22;
      transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
    }
    .cart-offcanvas-xinxo .cart-qty-btn:disabled {
      opacity: 0.5;
      background: #ffe3ec;
      color: #ff416c;
    }
    .cart-offcanvas-xinxo .cart-qty-btn:hover:not(:disabled) {
      background: linear-gradient(90deg, #ff4b2b 0%, #ff416c 100%);
      transform: scale(1.12);
      box-shadow: 0 8px 24px #ff416c33;
    }
    .cart-offcanvas-xinxo .cart-delete-btn {
      color: #ff416c;
      background: none;
      border: none;
      font-size: 1.3rem;
      margin-left: 8px;
      transition: color 0.18s;
    }
    .cart-offcanvas-xinxo .cart-delete-btn:hover {
      color: #ff4b2b;
    }
    .cart-offcanvas-xinxo .cart-badge {
      background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
      color: #fff;
      font-weight: bold;
      font-size: 0.7rem;
      border: 2px solid #fff;
      box-shadow: 0 2px 8px #ff416c33;
    }
    .cart-offcanvas-xinxo .cart-checkout-btn {
      background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
      color: #fff;
      border: none;
      border-radius: 30px;
      font-weight: 700;
      font-size: 1.1rem;
      box-shadow: 0 4px 16px rgba(255,65,108,0.15);
      transition: all 0.2s cubic-bezier(.4,2,.6,1);
    }
    .cart-offcanvas-xinxo .cart-checkout-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .cart-offcanvas-xinxo .cart-checkout-btn:hover:not(:disabled) {
      background: linear-gradient(90deg, #ff4b2b 0%, #ff416c 100%);
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 8px 24px rgba(255,65,108,0.25);
      color: #fff;
    }
    .cart-offcanvas-xinxo .form-check-input:checked {
      background-color: #ff416c;
      border-color: #ff416c;
      box-shadow: 0 2px 8px #ff416c22;
    }
    .cart-offcanvas-xinxo .form-check-label {
      font-weight: 600;
      color: #ff416c;
    }
    .cart-offcanvas-xinxo .text-danger {
      color: #ff416c !important;
    }
    .cart-offcanvas-xinxo .fw-bold.fs-5.text-end {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px #ff416c11;
      padding: 12px 0 0 0;
      margin-bottom: 0;
    }
    @media (max-width: 600px) {
      .cart-offcanvas-xinxo .offcanvas-header { padding: 1rem 1rem 0.5rem 1rem; }
      .cart-offcanvas-xinxo .offcanvas-body { padding: 1rem; }
    }
    body.dark .cart-offcanvas-xinxo .offcanvas-header {
      background: linear-gradient(90deg, #232526 0%, #ff416c 100%) !important;
      color: #fff;
    }
    body.dark .cart-offcanvas-xinxo .offcanvas-body {
      background: linear-gradient(135deg, #23272f 60%, #2d1a1a 100%) !important;
      color: #fff;
    }
    body.dark .cart-offcanvas-xinxo .cart-item-name {
      color: #ff8fa3;
    }
    body.dark .cart-offcanvas-xinxo .cart-item-price {
      color: #ff8fa3;
    }
    body.dark .cart-offcanvas-xinxo .cart-checkout-btn {
      background: linear-gradient(90deg, #232526 0%, #ff416c 100%);
    }
    body.dark .cart-offcanvas-xinxo .cart-checkout-btn:hover:not(:disabled) {
      background: linear-gradient(90deg, #ff4b2b 0%, #232526 100%);
    }
  `}</style>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='fw-bold'>🛒 Giỏ hàng của bạn</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length === 0 ? (
            <div className="text-center text-muted py-4">
              <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
              <Button as={Link} to="/books" variant="outline-danger" onClick={() => setShowCart(false)}>
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
                    setSelectedItems(
                      e.target.checked ? cartItems.map((item) => item.bookId) : []
                    );
                  }}
                />
                <label className="form-check-label" htmlFor="selectAll">
                  Chọn tất cả ({cartItems.length} sản phẩm)
                </label>
              </div>
              <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {cartItems.map((item) => (
                  <div
                    key={item.bookId}
                    className="d-flex border-bottom pb-3 mb-3 align-items-start"
                    style={{ gap: '10px' }}
                  >
                    <input
                      type="checkbox"
                      className="form-check-input mt-2"
                      checked={selectedItems.includes(item.bookId)}
                      onChange={(e) => {
                        setSelectedItems((prev) =>
                          e.target.checked
                            ? [...prev, item.bookId]
                            : prev.filter((id) => id !== item.bookId)
                        );
                      }}
                    />
                    <img
                      src={cartImages[item.bookId] || "/img/default-book.jpg"}
                      alt={item.bookName}
                      className="cart-item-img"
                    />
                    <div className="flex-grow-1 d-flex flex-column justify-content-between">
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="cart-item-name">{item.bookName}</div>
                        <button
                          className="cart-delete-btn"
                          onClick={() => dispatch(removeItem(item.bookId))}
                          title="Xóa khỏi giỏ"
                        >
                          <MdDelete />
                        </button>
                      </div>
                      <div className="cart-item-price">
                        {item.price.toLocaleString()} đ
                      </div>
                      {item.originalPrice && (
                        <div className="cart-item-oldprice">
                          {item.originalPrice.toLocaleString()} đ
                        </div>
                      )}
                      <div className="d-flex align-items-center mt-2">
                        <button
                          className="cart-qty-btn"
                          onClick={() => dispatch(decreaseItem(item.bookId))}
                          disabled={item.quantity <= 1}
                        >−</button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="cart-qty-btn"
                          onClick={() => dispatch(addItems({ ...item, quantity: 1 }))}
                        >+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="fw-bold fs-5 text-end mt-4 border-top pt-3">
                <span className="text-muted me-2">Tổng cộng:</span>
                <span className="text-danger">{selectedTotalPrice.toLocaleString()} đ</span>
              </div>
              <button
                className="mt-3 w-100 cart-checkout-btn py-2"
                disabled={selectedItems.length === 0}
                onClick={() => {
                  navigate('/checkout', { state: { selectedItems } });
                  setShowCart(false);
                }}
              >
                Thanh toán ngay
              </button>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;