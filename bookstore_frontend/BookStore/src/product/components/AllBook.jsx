import React, { useEffect, useState } from 'react';
import BookProps from './BookProps';
import { getAllBook, searchBook } from '../../api/BookAPI';
import Pagination from '../../layouts/utils/Pagination';
import Dropdown from 'react-bootstrap/Dropdown';
import { useParams, useNavigate } from 'react-router-dom';

const AllBook = ({ keySearch }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(1);
    const soLuongMoiTrang = 8;

    const { categoryId } = useParams();
    const navigate = useNavigate();

    let categoryIdNumber = 0;
    try {
        categoryIdNumber = parseInt(categoryId, 10);
        if (isNaN(categoryIdNumber)) categoryIdNumber = 0;
    } catch {
        categoryIdNumber = 0;
    }

    useEffect(() => {
        setLoading(true);
        if (keySearch !== '' || categoryIdNumber > 0) {
            searchBook(keySearch, categoryIdNumber)
                .then((result) => {
                    setBooks(result.ketQua || []);
                    setTongSoTrang(result.tongSoTrang || 1);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        } else {
            getAllBook(trangHienTai - 1, soLuongMoiTrang)
                .then((result) => {
                    setBooks(result.ketQua || []);
                    setTongSoTrang(result.tongSoTrang || 1);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [trangHienTai, keySearch, categoryIdNumber]);

    const phanTrang = (trang) => {
        setTrangHienTai(trang);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center my-4">
                Error: {error}
            </div>
        );
    }

    if (books.length === 0) {
        return (
            <div className="container py-2">
                <div className="list-xinxo-header p-2 text-center">
                    <h2 className="mb-0 fw-bold">
                        <span role="img" aria-label="book">📚</span> Danh sách quyển sách nổi bật
                    </h2>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                    <h1 className="text-danger">Không tìm thấy thông tin:</h1>
                    <h1>{keySearch}</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-2">
            <div>
                <Dropdown className="my-4 filter-dropdown">
                    <style>
                        {`
      .filter-dropdown .dropdown-toggle {
        background: var(--header-gradient, linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%));
        color: #fff !important;
        border: none;
        font-weight: 700;
        border-radius: 24px;
        padding: 10px 28px;
        box-shadow: 0 2px 12px #ff416c33;
        transition: background 0.2s, color 0.2s, box-shadow 0.2s;
      }
      .filter-dropdown .dropdown-toggle:hover,
      .filter-dropdown .dropdown-toggle:focus {
        background: linear-gradient(90deg, #ff4b2b 0%, #ff416c 100%);
        color: #fff !important;
        box-shadow: 0 4px 24px #ff416c55;
      }
      .filter-dropdown .dropdown-menu {
        border-radius: 18px;
        border: 2px solid #ff416c;
        box-shadow: 0 8px 32px #ff416c22;
        background: var(--card-bg, #fff);
        min-width: 220px;
        padding: 8px 0;
      }
      .filter-dropdown .dropdown-item {
        font-weight: 600;
        color: #ff416c !important;
        border-radius: 12px;
        margin: 2px 8px;
        transition: background 0.18s, color 0.18s;
        padding: 10px 18px;
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .filter-dropdown .dropdown-item:hover,
      .filter-dropdown .dropdown-item:focus {
        background: linear-gradient(90deg, #ff416c11 0%, #ff4b2b11 100%);
        color: #ff4b2b !important;
      }
      .filter-dropdown .dropdown-item.active {
        background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
        color: #fff !important;
      }
      .filter-dropdown .dropdown-toggle::after {
        margin-left: 12px;
        vertical-align: middle;
      }
    `}
                    </style>
                    <Dropdown.Toggle id="dropdown-basic">
                        <span role="img" aria-label="filter">🔎</span> Lọc theo thể loại
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => navigate('/0')}>
                            <span role="img" aria-label="all">📚</span> Tất cả
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate('/1')}>
                            <span role="img" aria-label="cat1">🧩</span> Thể loại 1
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate('/2')}>
                            <span role="img" aria-label="cat2">🎨</span> Thể loại 2
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate('/3')}>
                            <span role="img" aria-label="cat3">🔬</span> Thể loại 3
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="list-xinxo-header p-2 text-center">
                <style>
                    {`
                .list-xinxo-header {
                    background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
                    border-radius: 18px;
                    box-shadow: 0 4px 24px #ff416c22;
                    margin-bottom: 2rem;
                }
                .list-xinxo-header h2 {
                    color: #fff;
                    text-shadow: 0 2px 8px #ff416c55;
                    letter-spacing: 1px;
                }
                `}
                </style>
                <h2 className="mb-0 fw-bold">
                    <span role="img" aria-label="book">📚</span> Danh sách quyển sách nổi bật
                </h2>
            </div>

            <div className="row g-4">
                {books.map((book) => (
                    <div key={book.bookId} className="col-6 col-sm-4 col-md-3 col-lg-3">
                        <BookProps book={book} />
                    </div>
                ))}
            </div>

            <div className="d-flex justify-content-center mt-4">
                <style>
                    {`
                        .pagination-xinxo {
                            background: #fff;
                            border-radius: 24px;
                            box-shadow: 0 4px 24px #ff416c22;
                            padding: 18px 32px;
                            display: inline-block;
                            margin-bottom: 24px;
                            animation: fadeInUp 0.7s;
                        }
                        @keyframes fadeInUp {
                            0% { opacity: 0; transform: translateY(24px);}
                            100% { opacity: 1; transform: translateY(0);}
                        }
                        .pagination-xinxo .pagination .page-item .page-link,
                        .pagination-xinxo .pagination .page-item.active .page-link {
                            color: #ff416c;
                            border: none;
                            background: transparent;
                            font-weight: 600;
                            border-radius: 12px !important;
                            transition: background 0.2s, color 0.2s;
                        }
                        .pagination-xinxo .pagination .page-item.active .page-link {
                            background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
                            color: #fff !important;
                            box-shadow: 0 2px 8px #ff416c33;
                        }
                        .pagination-xinxo .pagination .page-item .page-link:hover {
                            background: #ffe3ec;
                            color: #ff416c;
                        }
                        `}
                </style>
                <div className="pagination-xinxo">
                    <Pagination
                        trangHienTai={trangHienTai}
                        tongSoTrang={tongSoTrang}
                        phanTrang={phanTrang}
                    />
                </div>
            </div>
        </div>
    );
};

export default AllBook;
