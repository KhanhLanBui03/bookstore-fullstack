import { useEffect, useState } from 'react';
import { getAllReviewOfBook } from '../../api/ReviewAPI';
import renderRating from '../../layouts/utils/Rank';
import { Card, Container, Spinner, Alert, Image } from 'react-bootstrap';

const ReviewBook = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllReviewOfBook(bookId)
      .then(reviews => {
        setReviews(reviews);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [bookId]);

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="danger" />
        <p className="mt-2 text-danger fw-semibold">Đang tải đánh giá...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="text-center rounded-4 shadow">Lỗi: {error}</Alert>;
  }

  return (
    <Container className="my-5">
      <style>
        {`
        .review-xinxo-header {
          background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
          border-radius: 18px;
          box-shadow: 0 4px 24px #ff416c22;
          margin-bottom: 2rem;
        }
        .review-xinxo-header h4 {
          color: #fff;
          text-shadow: 0 2px 8px #ff416c55;
          letter-spacing: 1px;
        }
        .review-xinxo-card {
          border: none;
          border-radius: 18px;
          box-shadow: 0 4px 24px #ff416c22;
          background: #fff;
          transition: transform 0.18s;
        }
        .review-xinxo-card:hover {
          transform: scale(1.02) translateY(-2px);
          box-shadow: 0 8px 32px #ff416c33;
        }
        .review-xinxo-user {
          color: #ff416c;
          font-weight: 600;
        }
        .review-xinxo-comment {
          font-style: italic;
          color: #333;
          background: #ffe3ec44;
          border-radius: 10px;
          padding: 8px 14px;
          margin-top: 4px;
        }
        `}
      </style>
      <div className="review-xinxo-header p-3 text-center">
        <h4 className="mb-0 fw-bold">
          <span role="img" aria-label="star">⭐</span> Đánh giá từ khách hàng
        </h4>
      </div>

      {reviews.length === 0 ? (
        <Alert variant="secondary" className="text-center rounded-4 shadow">Chưa có đánh giá nào cho sản phẩm này.</Alert>
      ) : (
        <div className="d-flex flex-column gap-3">
          {reviews.map((review, index) => (
            <Card key={review.reviewId || index} className="review-xinxo-card p-3">
              <div className="d-flex align-items-start">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                  roundedCircle
                  width={48}
                  height={48}
                  className="me-3 border border-2 border-danger"
                  alt="Avatar"
                />
                <div>
                  <div className="review-xinxo-user mb-1">Người dùng #{review.reviewId}</div>
                  <div className="mb-1">{renderRating(review.scoreRank || 0)}</div>
                  <div className="review-xinxo-comment">"{review.comment}"</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default ReviewBook;