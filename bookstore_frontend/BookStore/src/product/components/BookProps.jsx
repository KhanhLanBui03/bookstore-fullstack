import React, { useEffect, useState } from 'react';
import { getImageOfOneBook } from '../../api/ImageAPI';
import { useDispatch } from 'react-redux';
import { addItems } from '../../features/cartSlice';
import { FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// ...existing code...
const BookProps = ({ book }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getImageOfOneBook(book.bookId)
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [book.bookId]);

  const handleAddToCart = () => {
    dispatch(addItems(book));
  };

  if (loading) return <h5>Đang tải...</h5>;
  if (error) return <h5>Lỗi: {error}</h5>;

  const imageUrl = images[0]?.imageData || '';
  const discount = book.originalPrice && book.price
    ? Math.round(100 - (book.price / book.originalPrice) * 100)
    : 0;

  return (
    <div
      className="card h-100 rounded-4 border-0 shadow-lg overflow-hidden bg-white position-relative"
      style={{
        transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
        cursor: 'pointer',
        minWidth: 250,
        maxWidth: 320,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.13)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.07)';
      }}
    >
      <Link to={`/book/${book.bookId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="bg-light d-flex align-items-center justify-content-center position-relative" style={{ height: '220px' }}>
          {discount > 0 && (
            <span
              className="badge bg-danger position-absolute top-0 start-0 m-2 shadow"
              style={{ fontSize: 13, zIndex: 2 }}
            >
              -{discount}%
            </span>
          )}
          <img
            src={imageUrl}
            alt={book.bookName}
            className="img-fluid p-3"
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              borderRadius: 10,
              boxShadow: '0 8px 32px #ff416c22',
              transition: 'transform 0.4s cubic-bezier(.4,2,.6,1)',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
          />
        </div>
      </Link>

      <div className="card-body d-flex flex-column p-3">
        <Link to={`/book/${book.bookId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h6 className="fw-bold text-dark text-truncate mb-1" title={book.bookName}>
            {book.bookName}
          </h6>
          <p
            className="text-secondary small text-truncate mb-2"
            title={book.description}
            style={{ minHeight: 18 }}
          >
            {book.description}
          </p>
        </Link>

        <div className="mb-2 d-flex align-items-end gap-2">
          <span className="text-muted small">
            <del>{book.originalPrice?.toLocaleString() || 0}₫</del>
          </span>
          <span className="text-danger fw-bold fs-5">
            {book.price?.toLocaleString() || 0}₫
          </span>
        </div>

        {book.stock !== undefined && (
          <div className="mb-2">
            <span className={`badge ${book.stock > 0 ? 'bg-success' : 'bg-secondary'}`}>
              {book.stock > 0 ? `Còn ${book.stock} cuốn` : 'Hết hàng'}
            </span>
          </div>
        )}

        ..
        <div className="d-flex gap-2 mt-auto">
          {/* Nút Mua Ngay */}
          <button
            className="flex-grow-1 border-0"
            style={{
              fontWeight: 700,
              letterSpacing: 1,
              borderRadius: '30px',
              background: 'linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%)',
              color: '#fff',
              padding: '10px 0',
              fontSize: '1rem',
              boxShadow: '0 4px 16px rgba(255,65,108,0.15)',
              transition: 'all 0.25s cubic-bezier(.4,2,.6,1)',
              outline: 'none',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,65,108,0.25)';
              e.currentTarget.style.background = 'linear-gradient(90deg, #ff4b2b 0%, #ff416c 100%)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,65,108,0.15)';
              e.currentTarget.style.background = 'linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%)';
            }}
            disabled={book.stock === 0}
          >
            <span style={{ letterSpacing: 1 }}>Mua ngay</span>
          </button>

          {/* Nút Thêm vào giỏ */}
          <button
            className="d-flex align-items-center justify-content-center border-0"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart();
            }}
            title="Thêm vào giỏ hàng"
            style={{
              borderRadius: '50%',
              width: 48,
              height: 48,
              background: 'linear-gradient(135deg, #fff 60%, #ffe3ec 100%)',
              color: '#ff416c',
              border: '2px solid #ff416c',
              boxShadow: '0 2px 8px rgba(255,65,108,0.10)',
              transition: 'all 0.25s cubic-bezier(.4,2,.6,1)',
              outline: 'none',
              fontSize: 22,
              position: 'relative',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'scale(1.13)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,65,108,0.18)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #fff 60%, #ffe3ec 100%)';
              e.currentTarget.style.color = '#ff416c';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(255,65,108,0.10)';
            }}
            disabled={book.stock === 0}
          >
            <FaCartPlus size={22} />
          </button>
        </div>


      </div>
    </div>
  );
};
// ...existing code...

export default BookProps;
