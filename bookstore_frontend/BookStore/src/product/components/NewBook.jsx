import React, { useEffect, useState } from 'react';
import BookProps from './BookProps';
import { getFourNewBook } from '../../api/BookAPI';

const NewBook = () => {
    const [books, setBook] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getFourNewBook()
            .then((bookData) => {
                setBook(bookData.ketQua);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

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
        <div className="container py-2">
            <style>
                {`
                .newbook-xinxo-header {
                    background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
                    border-radius: 18px;
                    box-shadow: 0 4px 24px #ff416c22;
                    margin-bottom: 2rem;
                }
                .newbook-xinxo-header h2 {
                    color: #fff;
                    text-shadow: 0 2px 8px #ff416c55;
                    letter-spacing: 1px;
                }
                `}
            </style>
            <div className="newbook-xinxo-header p-2 text-center">
                <h2 className="mb-0 fw-bold">
                    <span role="img" aria-label="book">📚</span> Top sách mới
                </h2>
            </div>

            <div className="row g-4">
                {books.map((book) => (
                    <div
                        key={book.bookId}
                        className="col-6 col-sm-4 col-md-3"
                        style={{ animation: 'fadeInUp 0.7s', animationDelay: `${Math.random() * 0.2 + 0.1}s` }}
                    >
                        <BookProps book={book} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewBook;