import React, { useEffect, useState } from 'react';
import BookProps from './BookProps';
import { getEightBook } from '../../api/BookAPI';
import { useNavigate } from 'react-router-dom';

const List = ({ keySearch }) => {
    const [books, setBook] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getEightBook()
            .then((bookData) => {
                setBook(bookData.ketQua);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [keySearch]);

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

    return (
        <div data-aos="fade-up" className="aos-init aos-animate container py-2">
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
                .list-xinxo-btn {
                    background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
                    color: #fff;
                    border: none;
                    border-radius: 30px;
                    font-weight: 700;
                    font-size: 1.1rem;
                    box-shadow: 0 4px 16px rgba(255,65,108,0.15);
                    transition: all 0.2s cubic-bezier(.4,2,.6,1);
                }
                .list-xinxo-btn:hover {
                    background: linear-gradient(90deg, #ff4b2b 0%, #ff416c 100%);
                    transform: translateY(-2px) scale(1.03);
                    box-shadow: 0 8px 24px rgba(255,65,108,0.25);
                    color: #fff;
                }
                `}
            </style>

            <div className="list-xinxo-header p-2 text-center">
                <h2 className="mb-0 fw-bold">
                    <span role="img" aria-label="book">📚</span> Danh sách quyển sách nổi bật
                </h2>
            </div>

            <div className="row g-4">
                {books.map((book) => (
                    <div
                        key={book.bookId}
                        className="col-6 col-sm-4 col-md-3 col-lg-3"
                        style={{ animation: 'fadeInUp 0.7s', animationDelay: `${Math.random() * 0.2 + 0.1}s` }}
                    >
                        <BookProps book={book} />
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center mt-4">
                <button
                    onClick={() => navigate('/all-book')}
                    className="list-xinxo-btn px-4 py-2"
                >
                    Xem Thêm
                </button>
            </div>
        </div>
    );
};

export default List;