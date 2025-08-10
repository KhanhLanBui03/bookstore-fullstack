import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaFacebook, FaInstagramSquare, FaYoutube, FaPinterestSquare, FaMapMarkerAlt } from 'react-icons/fa';
import { AiFillLinkedin } from 'react-icons/ai';

const Footer = () => {
    return (
        <footer className="footer-xinxo bg-white pt-4 pb-3 mt-4 border-top mx-2 mx-md-4 rounded-4 shadow-lg position-relative overflow-hidden">
            <style>
                {`
                .footer-xinxo {
                    background: linear-gradient(120deg, #fff 80%, #ffe3ec 100%);
                    font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
                }
                .footer-xinxo .footer-logo {
                    border-radius: 18px;
                    box-shadow: 0 4px 24px #ff416c22;
                    transition: transform 0.2s;
                }
                .footer-xinxo .footer-logo:hover {
                    transform: scale(1.07) rotate(-4deg);
                    box-shadow: 0 8px 32px #ff416c33;
                }
                .footer-xinxo h6 {
                    color: #ff416c;
                    letter-spacing: 1px;
                }
                .footer-xinxo ul li {
                    transition: color 0.3s, transform 0.3s;
                    padding-left: 0.2rem;
                }
                .footer-xinxo ul li:hover {
                    color: #ff416c;
                    transform: translateX(4px) scale(1.04);
                    cursor: pointer;
                }
                .footer-xinxo .footer-social svg {
                    color: #ff416c;
                    background: #fff;
                    border-radius: 50%;
                    box-shadow: 0 2px 8px #ff416c22;
                    padding: 4px;
                    transition: background 0.2s, color 0.2s, transform 0.2s;
                }
                .footer-xinxo .footer-social svg:hover {
                    background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
                    color: #fff;
                    transform: scale(1.15) rotate(-8deg);
                }
                .footer-xinxo .footer-app img {
                    border-radius: 12px;
                    box-shadow: 0 2px 8px #ff416c22;
                    transition: transform 0.2s;
                }
                .footer-xinxo .footer-app img:hover {
                    transform: scale(1.08) rotate(-3deg);
                }
                .footer-xinxo .footer-pay img {
                    filter: grayscale(0.2);
                    opacity: 0.85;
                    transition: filter 0.2s, opacity 0.2s, transform 0.2s;
                }
                .footer-xinxo .footer-pay img:hover {
                    filter: none;
                    opacity: 1;
                    transform: scale(1.08);
                }
                .footer-xinxo .footer-contact p, .footer-xinxo .footer-contact svg {
                    color: #ff416c;
                    font-size: 1rem;
                    margin-bottom: 0.3rem;
                }
                .footer-xinxo .footer-contact p {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                @media (max-width: 768px) {
                    .footer-xinxo {
                        font-size: 0.97rem;
                        border-radius: 0;
                        margin: 0;
                    }
                    .footer-xinxo .footer-logo {
                        height: 70px !important;
                        width: 70px !important;
                    }
                }
            `}
            </style>
            <Container>
                <Row className="mb-4">
                    <Col md={4} className="mb-3 pe-md-4 border-end">
                        <img src='./img/logo2.png' className="footer-logo mb-2" style={{ height: '100px', width: '100px' }} alt="logo" />
                        <p className="small text-muted mb-1">
                            Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM <br />
                            Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA<br />
                            60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam
                        </p>
                        <p className="small text-muted mb-2">
                            Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ Thống Fahasa trên toàn quốc.
                        </p>
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <img src="./img/logobocongthuong.webp" alt="BCT" height={40} />
                        </div>
                        <div className="footer-social d-flex gap-3 fs-4 mb-2">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagramSquare /></a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"><FaPinterestSquare /></a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><AiFillLinkedin /></a>
                        </div>
                        <div className="footer-app mt-3 d-flex gap-2">
                            <img src="./img/android1.webp" alt="Google Play" height={40} />
                            <img src="./img/appstore1.webp" alt="App Store" height={40} />
                        </div>
                    </Col>

                    <Col md={2} className="mb-3">
                        <h6 className="fw-bold">DỊCH VỤ</h6>
                        <ul className="list-unstyled small">
                            <li>Điều khoản sử dụng</li>
                            <li>Chính sách bảo mật thông tin cá nhân</li>
                            <li>Chính sách bảo mật thanh toán</li>
                            <li>Giới thiệu Fahasa</li>
                            <li>Hệ thống trung tâm - nhà sách</li>
                        </ul>
                    </Col>

                    <Col md={3} className="mb-3">
                        <h6 className="fw-bold">HỖ TRỢ</h6>
                        <ul className="list-unstyled small">
                            <li>Chính sách đổi - trả - hoàn tiền</li>
                            <li>Chính sách bảo hành - bồi hoàn</li>
                            <li>Chính sách vận chuyển</li>
                            <li>Chính sách khách sỉ</li>
                        </ul>
                    </Col>

                    <Col md={3} className="mb-3">
                        <h6 className="fw-bold">TÀI KHOẢN CỦA TÔI</h6>
                        <ul className="list-unstyled small">
                            <li>Đăng nhập/Tạo mới tài khoản</li>
                            <li>Thay đổi địa chỉ khách hàng</li>
                            <li>Chi tiết tài khoản</li>
                            <li>Lịch sử mua hàng</li>
                        </ul>
                        <div className="footer-contact mt-2">
                            <h6 className="fw-bold mb-2">LIÊN HỆ</h6>
                            <p><FaMapMarkerAlt /> 60-62 Lê Lợi, Q.1, TP. HCM</p>
                            <p><span role="img" aria-label="mail">📧</span> cskh@fahasa.com.vn</p>
                            <p><span role="img" aria-label="phone">📞</span> 1900636467</p>
                        </div>
                    </Col>
                </Row>

                <Row className="border-top pt-3 footer-pay">
                    <Col className="d-flex justify-content-center gap-4 flex-wrap">
                        <img src="./img/vnpay_logo.webp" height={32} alt="vnpay" />
                        <img src="./img/momopay.webp" height={32} alt="momo" />
                        <img src="./img/shopeepay_logo.webp" height={32} alt="shopeepay" />
                        <img src="./img/logo_zalopay_2.webp" height={32} alt="zalopay" />
                        <img src="./img/Logo_ninjavan.webp" height={32} alt="ninjavan" />
                        <img src="./img/logo_lex.webp" height={32} alt="lex" />
                    </Col>
                </Row>

                <Row className="pt-3">
                    <Col className="text-center small text-muted">
                        Giấy chứng nhận Đăng ký Kinh doanh số 0304132047 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày 20/12/2005, đăng ký thay đổi lần thứ 10, ngày 20/05/2022.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;