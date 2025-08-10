import React, { useState, useEffect } from 'react';
import RequireAdmin from './RequireAdmin';
import {
  FaBook, FaUser, FaDollarSign, FaBarcode, FaStar, FaSave, FaSpinner,
  FaCheckCircle, FaExclamationTriangle, FaEye, FaEyeSlash
} from 'react-icons/fa';

const BookForm = () => {
  const [book, setBook] = useState({
    bookName: '',
    price: '',
    originalPrice: '',
    description: '',
    amount: '',
    author: '',
    isbn: '',
    avgRank: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalFields = 8;
    const filledFields = Object.values(book).filter(value => value !== '').length;
    setProgress((filledFields / totalFields) * 100);
  }, [book]);

  const validateForm = () => {
    const newErrors = {};
    if (!book.bookName.trim()) newErrors.bookName = 'Tên sách không được để trống';
    if (!book.author.trim()) newErrors.author = 'Tác giả không được để trống';
    if (!book.price || book.price <= 0) newErrors.price = 'Giá bán phải lớn hơn 0';
    if (!book.originalPrice || book.originalPrice <= 0) newErrors.originalPrice = 'Giá niêm yết phải lớn hơn 0';
    if (!book.amount || book.amount <= 0) newErrors.amount = 'Số lượng phải lớn hơn 0';
    if (!book.isbn.trim()) newErrors.isbn = 'ISBN không được để trống';
    if (book.avgRank && (book.avgRank < 0 || book.avgRank > 5)) newErrors.avgRank = 'Điểm đánh giá phải từ 0-5';
    if (!book.description.trim()) newErrors.description = 'Mô tả không được để trống';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField('');

  const resetForm = () => {
    setBook({
      bookName: '', price: '', originalPrice: '', description: '',
      amount: '', author: '', isbn: '', avgRank: '',
    });
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setIsSuccess(false);

    const token = localStorage.getItem('token');
    const bookData = {
      ...book,
      price: parseFloat(book.price),
      originalPrice: parseFloat(book.originalPrice),
      amount: parseInt(book.amount),
      avgRank: book.avgRank ? parseFloat(book.avgRank) : 0,
    };

    try {
      const response = await fetch('http://localhost:8080/admin/addBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        setIsSuccess(true);
        resetForm();
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert(`❌ Lỗi: ${error.message || 'Gặp lỗi kết nối server'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({ icon: Icon, name, type = "text", placeholder, required = false, step, min, max }) => (
    <div className="form-group mb-4 position-relative">
      <div className="input-group input-group-lg">
        <span className="input-group-text bg-transparent border-end-0" style={{
          border: errors[name] ? '2px solid #ff416c' : '2px solid #e9ecef',
          borderRight: 'none',
          borderRadius: '16px 0 0 16px',
          background: focusedField === name ? 'linear-gradient(90deg, #ffe3ec 0%, #fff 100%)' : '#fff',
          transition: 'all 0.3s ease',
        }}>
          {Icon && <Icon className={`${focusedField === name ? 'text-danger' : 'text-muted'}`} />}
        </span>
        <input
          type={type}
          className={`form-control border-start-0 ${errors[name] ? 'is-invalid' : ''}`}
          name={name}
          value={book[name]}
          onChange={handleChange}
          onFocus={() => handleFocus(name)}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          step={step}
          min={min}
          max={max}
          style={{
            border: errors[name] ? '2px solid #ff416c' : '2px solid #e9ecef',
            borderLeft: 'none',
            borderRadius: '0 16px 16px 0',
            backgroundColor: errors[name] ? '#fff5f5' : '#fff',
            boxShadow: focusedField === name ? '0 0 0 0.2rem #ff416c33' : 'none',
            transition: 'all 0.3s ease',
          }}
        />
      </div>
      {errors[name] && (
        <div className="invalid-feedback d-block mt-2">
          <FaExclamationTriangle className="me-1" />
          {errors[name]}
        </div>
      )}
    </div>
  );

  const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  return (
    <div className="container-fluid py-5" style={{
      background: 'linear-gradient(135deg, #ff416c 0%, #ffe3ec 100%)',
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* Animated Background */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0, pointerEvents: 'none' }}>
        <div className="position-absolute" style={{
          top: '10%', left: '10%', width: '120px', height: '120px',
          background: 'rgba(255,65,108,0.13)', borderRadius: '50%', animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div className="position-absolute" style={{
          top: '20%', right: '15%', width: '180px', height: '180px',
          background: 'rgba(255,75,43,0.09)', borderRadius: '50%', animation: 'float 8s ease-in-out infinite reverse'
        }}></div>
      </div>

      <div className="row justify-content-center position-relative" style={{ zIndex: 1 }}>
        <div className="col-lg-8 col-xl-7">
          {/* Progress Bar */}
          <div className="card mb-4 border-0" style={{
            borderRadius: '18px',
            backgroundColor: 'rgba(255, 255, 255, 0.93)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px #ff416c22'
          }}>
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-semibold text-dark">Tiến độ hoàn thành</span>
                <span className="text-danger fw-bold">{Math.round(progress)}%</span>
              </div>
              <div className="progress" style={{ height: '10px', borderRadius: '12px' }}>
                <div
                  className="progress-bar"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%)',
                    borderRadius: '12px',
                    transition: 'width 0.5s cubic-bezier(.4,2,.6,1)'
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className="alert alert-success alert-dismissible fade show mb-4" role="alert" style={{
              borderRadius: '15px',
              border: 'none',
              boxShadow: '0 4px 15px #43e97b33'
            }}>
              <FaCheckCircle className="me-2" />
              <strong>Thành công!</strong> Sách đã được thêm vào hệ thống.
              <button type="button" className="btn-close" onClick={() => setIsSuccess(false)}></button>
            </div>
          )}

          <div className="card shadow-2xl border-0" style={{
            borderRadius: '24px',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            boxShadow: '0 20px 40px #ff416c11'
          }}>
            {/* Header */}
            <div className="card-header text-center py-4" style={{
              background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
              borderRadius: '24px 24px 0 0',
              border: 'none'
            }}>
              <div className="d-flex align-items-center justify-content-center">
                <div className="bg-white rounded-circle p-3 me-3 shadow-lg" style={{
                  width: '64px',
                  height: '64px',
                  animation: 'pulse 2s infinite'
                }}>
                  <FaBook className="text-danger" size={28} />
                </div>
                <div>
                  <h2 className="text-white mb-1 fw-bold">📚 Thêm Sách Mới</h2>
                  <p className="text-white-50 mb-0">Quản lý kho sách của bạn</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="card-body p-5">
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <InputField icon={FaBook} label="Tên sách" name="bookName" placeholder="Nhập tên sách..." required />
                  </div>
                  <div className="col-md-6">
                    <InputField icon={FaUser} label="Tác giả" name="author" placeholder="Nhập tên tác giả..." required />
                  </div>
                  <div className="col-md-6">
                    <InputField icon={FaDollarSign} label="Giá bán (VNĐ)" name="price" type="number" placeholder="0" required min="0" step="1000" />
                    {book.price && <div className="text-success small mt-1">💰 {formatCurrency(book.price)}</div>}
                  </div>
                  <div className="col-md-6">
                    <InputField icon={FaDollarSign} label="Giá niêm yết (VNĐ)" name="originalPrice" type="number" placeholder="0" required min="0" step="1000" />
                    {book.originalPrice && <div className="text-muted small mt-1">📋 {formatCurrency(book.originalPrice)}</div>}
                  </div>
                  <div className="col-md-6">
                    <InputField icon={FaBook} label="Số lượng" name="amount" type="number" placeholder="0" required min="1" />
                    {book.amount && <div className="text-info small mt-1">📦 Còn {book.amount} cuốn trong kho</div>}
                  </div>
                  <div className="col-md-6">
                    <InputField icon={FaBarcode} label="ISBN" name="isbn" placeholder="Nhập mã ISBN..." required />
                  </div>
                  <div className="col-md-6">
                    <InputField icon={FaStar} label="Điểm đánh giá" name="avgRank" type="number" placeholder="0.0" step="0.1" min="0" max="5" />
                    {book.avgRank && <div className="text-warning small mt-1">⭐ {book.avgRank}/5.0 điểm</div>}
                  </div>
                  {/* Description */}
                  <div className="col-12">
                    <div className="form-group mb-4">
                      <label className="form-label fw-semibold text-dark mb-2">
                        <FaBook className="me-2 text-danger" />
                        Mô tả <span className="text-danger ms-1">*</span>
                      </label>
                      <textarea
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        name="description"
                        rows="4"
                        value={book.description}
                        onChange={handleChange}
                        onFocus={() => handleFocus('description')}
                        onBlur={handleBlur}
                        placeholder="Nhập mô tả chi tiết về sách..."
                        required
                        style={{
                          border: errors.description ? '2px solid #ff416c' : '2px solid #e9ecef',
                          borderRadius: '16px',
                          backgroundColor: errors.description ? '#fff5f5' : '#fff',
                          resize: 'vertical',
                          boxShadow: focusedField === 'description' ? '0 0 0 0.2rem #ff416c33' : 'none',
                          transition: 'all 0.3s ease',
                        }}
                      />
                      {errors.description && (
                        <div className="invalid-feedback d-block">
                          <FaExclamationTriangle className="me-1" />
                          {errors.description}
                        </div>
                      )}
                      {book.description && (
                        <div className="text-muted small mt-1">📝 {book.description.length} ký tự</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="text-center mt-5">
                  <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-lg px-4 py-3 fw-bold"
                      onClick={resetForm}
                      disabled={isLoading}
                      style={{ borderRadius: '14px', borderWidth: '2px', transition: 'all 0.3s ease' }}
                    >
                      🔄 Làm mới
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-info btn-lg px-4 py-3 fw-bold"
                      onClick={() => setShowPreview(!showPreview)}
                      disabled={isLoading}
                      style={{ borderRadius: '14px', borderWidth: '2px', transition: 'all 0.3s ease' }}
                    >
                      {showPreview ? <FaEyeSlash className="me-2" /> : <FaEye className="me-2" />}
                      {showPreview ? 'Ẩn' : 'Xem'} Preview
                    </button>
                    <button
                      type="submit"
                      className="btn btn-danger btn-lg px-5 py-3 fw-bold"
                      disabled={isLoading}
                      style={{
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
                        border: 'none',
                        boxShadow: '0 4px 15px #ff416c33',
                        transition: 'all 0.3s ease',
                        transform: isLoading ? 'scale(0.95)' : 'scale(1)'
                      }}
                    >
                      {isLoading ? (
                        <>
                          <FaSpinner className="me-2 fa-spin" />
                          Đang xử lý...
                        </>
                      ) : (
                        <>
                          <FaSave className="me-2" />
                          💾 Lưu Sách
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {/* Preview Section */}
              {showPreview && (
                <div className="mt-5 p-4 border rounded-3" style={{
                  background: 'linear-gradient(135deg, #fff 0%, #ffe3ec 100%)',
                  border: '2px dashed #ff416c !important'
                }}>
                  <h5 className="text-center mb-3">
                    <FaEye className="me-2 text-danger" />
                    Xem trước thông tin sách
                  </h5>
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>Tên sách:</strong> {book.bookName || 'Chưa nhập'}</p>
                      <p><strong>Tác giả:</strong> {book.author || 'Chưa nhập'}</p>
                      <p><strong>ISBN:</strong> {book.isbn || 'Chưa nhập'}</p>
                      <p><strong>Giá bán:</strong> {book.price ? formatCurrency(book.price) : 'Chưa nhập'}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Giá niêm yết:</strong> {book.originalPrice ? formatCurrency(book.originalPrice) : 'Chưa nhập'}</p>
                      <p><strong>Số lượng:</strong> {book.amount || 'Chưa nhập'}</p>
                      <p><strong>Điểm đánh giá:</strong> {book.avgRank ? `${book.avgRank}/5.0` : 'Chưa nhập'}</p>
                      <p><strong>Mô tả:</strong> {book.description ? `${book.description.substring(0, 50)}...` : 'Chưa nhập'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-4">
            <p className="text-danger mb-0">
              <small>
                💡 <strong>Lưu ý:</strong> Tất cả thông tin có dấu * là bắt buộc phải nhập
              </small>
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .form-control:focus {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px #ff416c22 !important;
        }
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px #ff416c33;
        }
      `}</style>
    </div>
  );
};

const BookForm_Admin = RequireAdmin(BookForm);
export default BookForm_Admin;