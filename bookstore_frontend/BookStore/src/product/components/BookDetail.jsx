import React, { useEffect, useState } from 'react';
import { FaCartPlus } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { getBookByBookId } from '../../api/BookAPI';
import renderRating from '../../layouts/utils/Rank';
import dinhDangSo from '../../layouts/utils/DinhDangSo';
import ImageOfBook from './ImageOfBook';
import ReviewBook from './ReviewBook';

const BookDetail = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [soLuong, setSoLuong] = useState(1);

    const tangSoLuong = () => {
        const soLuongTonKho = book?.amount || 0;
        if (soLuong < soLuongTonKho) setSoLuong(soLuong + 1);
    };

    const giamSoLuong = () => {
        if (soLuong > 1) setSoLuong(soLuong - 1);
    };

    const handleSoLuongChange = (event) => {
        const soLuongTonKho = book?.amount || 0;
        const soLuongMoi = parseInt(event.target.value);
        if (!isNaN(soLuongMoi) && soLuongMoi >= 1 && soLuongMoi <= soLuongTonKho) {
            setSoLuong(soLuongMoi);
        }
    };

    const handleMuaNgay = () => {
        alert('Chức năng mua ngay chưa được cài đặt.');
    };

    const handleThemVaoGioHang = () => {
        alert('Chức năng thêm vào giỏ hàng chưa được cài đặt.');
    };

    useEffect(() => {
        getBookByBookId(bookId)
            .then(book => {
                setBook(book);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [bookId]);

    if (loading)
        return (
            <div className="d-flex justify-content-center align-items-center py-5">
                <div className="spinner-border text-danger" style={{ width: 48, height: 48 }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    if (error)
        return (
            <div className="alert alert-danger text-center my-4 rounded-4 shadow">
                Error: {error}
            </div>
        );
    if (!book)
        return <h1>Sách không tồn tại</h1>;

    // ...existing import...
    return (
        <div className="container py-4">
            <style>
                {`
      .bd-card {
        background: #fff;
        border-radius: 24px;
        box-shadow: 0 8px 32px #ff416c22;
        padding: 32px 24px;
        margin-bottom: 32px;
      }
      .bd-img-wrap {
        background: #fff;
        border-radius: 18px;
        box-shadow: 0 4px 24px #ff416c22;
        padding: 16px;
        transition: transform 0.2s;
      }
      .bd-img-wrap:hover {
        transform: scale(1.04);
        box-shadow: 0 8px 32px #ff416c33;
      }
      .bd-title {
        font-size: 2rem;
        font-weight: 700;
        color: #ff416c;
        margin-bottom: 0.5rem;
        text-shadow: 0 2px 8px #ff416c22;
      }
      .bd-price {
        color: #ff416c;
        font-size: 1.7rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
      .bd-btn-main {
        background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
        color: #fff;
        border: none;
        border-radius: 30px;
        font-weight: 700;
        font-size: 1.1rem;
        box-shadow: 0 4px 16px rgba(255,65,108,0.15);
        transition: all 0.2s cubic-bezier(.4,2,.6,1);
      }
      .bd-btn-main:hover {
        background: linear-gradient(90deg, #ff4b2b 0%, #ff416c 100%);
        transform: translateY(-2px) scale(1.03);
        box-shadow: 0 8px 24px rgba(255,65,108,0.25);
        color: #fff;
      }
      .bd-btn-cart {
        border-radius: 30px;
        font-weight: 600;
      }
      @media (max-width: 768px) {
        .bd-card { padding: 16px 6px; }
      }
      `}
            </style>
            <div className="bd-card row align-items-center g-4">
                {/* Ảnh sách */}
                <div className="col-12 col-md-5 text-center">
                    <div className="bd-img-wrap d-inline-block">
                        <ImageOfBook bookId={bookId} />
                    </div>
                </div>
                {/* Thông tin sách */}
                <div className="col-12 col-md-7">
                    <div className="bd-title mb-2">{book.bookName}</div>
                    <div className="mb-2">{renderRating(book.avgRank || 0)}</div>
                    <div className="bd-price mb-2">{dinhDangSo(book.price)} đ</div>
                    <div className="mb-2 text-muted small">Còn lại: <b>{book.amount}</b> quyển</div>
                    <div className="mb-3" dangerouslySetInnerHTML={{ __html: book.description || '' }} />
                    <div className="d-flex align-items-center mb-3">
                        <span className="me-2 fw-semibold">Số lượng:</span>
                        <button className="btn btn-outline-secondary me-2" onClick={giamSoLuong}>-</button>
                        <input
                            className="form-control text-center"
                            type="number"
                            value={soLuong}
                            min={1}
                            max={book.amount}
                            onChange={handleSoLuongChange}
                            style={{ maxWidth: '80px' }}
                        />
                        <button className="btn btn-outline-secondary ms-2" onClick={tangSoLuong}>+</button>
                    </div>
                    <div className="mb-3">
                        <span className="text-muted">Tạm tính: </span>
                        <span className="bd-price">{dinhDangSo(soLuong * book.price)} đ</span>
                    </div>
                    <div className="d-flex gap-3 flex-wrap">
                        <button type="button" className="bd-btn-main px-4 py-2" onClick={handleMuaNgay}>Mua ngay</button>
                        <button type="button" className="btn btn-outline-secondary bd-btn-cart px-4 py-2" onClick={handleThemVaoGioHang}>
                            <FaCartPlus /> Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>
            {/* Đánh giá */}
            <div className="row mt-4 mb-4">
                <ReviewBook bookId={bookId} />
            </div>
        </div>
    );
    // ...existing code...
};

export default BookDetail;