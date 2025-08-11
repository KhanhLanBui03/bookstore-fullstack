import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Form,
  InputGroup,
  Card,
  Spinner,
  Alert,
  Modal,
} from "react-bootstrap";
import { PencilSquare, Trash, Eye, Search } from "react-bootstrap-icons";
import RequireAdmin from "./RequireAdmin";



const BookAdmin = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState({});
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch danh sách sách
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:8080/admin/management-book", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error("Lỗi khi tải dữ liệu sách");
      }

      const data = await res.json();

      const imageMap = {};
      data.forEach(book => {
        if (book.imageData) {
         
          const cleanImageData = book.imageData.replace(/[\n\s]/g, '');
          imageMap[book.bookId] = cleanImageData;
        }
      });

      setBooks(data);
      setImages(imageMap);
    } catch (error) {
      console.error("Lỗi khi lấy sách:", error);
      setError("Không thể tải danh sách sách.");
    } finally {
      setLoading(false);
    }
  };


  
 

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const filteredBooks = books.filter((book) =>
    book.bookName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4 book-admin">
      <style>{`
        /* Header */
        .book-admin .card-header {
          background: linear-gradient(90deg, #b71c1c, #d32f2f);
          font-size: 1.3rem;
          font-weight: bold;
          color: white;
          padding: 15px 20px;
          border-radius: 8px 8px 0 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        /* Search input */
        .book-admin .search-input {
          border-radius: 30px;
          padding-left: 15px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          border: 1px solid #f44336;
        }
        .book-admin .search-input:focus {
          outline: none;
          border-color: #d32f2f;
          box-shadow: 0 0 6px rgba(244,67,54,0.6);
        }
        /* Table */
        .book-admin .table {
          border-radius: 8px;
          overflow: hidden;
        }
        .book-admin thead {
          background: #f44336;
          color: white;
        }
        .book-admin .table-hover tbody tr:hover {
          background-color: rgba(244, 67, 54, 0.05);
          transition: background-color 0.2s ease-in-out;
        }
        /* Image */
        .book-admin img.book-thumb {
          border-radius: 6px;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .book-admin img.book-thumb:hover {
          transform: scale(1.08);
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        /* Buttons */
        .book-admin .btn {
          border-radius: 20px;
          transition: all 0.2s;
        }
        .book-admin .btn:hover {
          transform: translateY(-1px);
        }
        .book-admin .btn-outline-danger {
          color: #d32f2f;
          border-color: #d32f2f;
        }
        .book-admin .btn-outline-danger:hover {
          background-color: #d32f2f;
          color: white;
        }
        .book-admin .btn-outline-warning {
          color: #ff9800;
          border-color: #ff9800;
        }
        .book-admin .btn-outline-warning:hover {
          background-color: #ff9800;
          color: white;
        }
        .book-admin .btn-outline-info {
          color: #0288d1;
          border-color: #0288d1;
        }
        .book-admin .btn-outline-info:hover {
          background-color: #0288d1;
          color: white;
        }
        /* Modal */
        .book-admin .modal-header {
          background: linear-gradient(90deg, #b71c1c, #d32f2f);
          color: white;
          border-bottom: none;
        }
        .book-admin .modal-body img {
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .book-admin .modal-content {
          border-radius: 10px;
          overflow: hidden;
        }
        /* Tổng quan bảng */
.book-admin .table {
  border-radius: 10px; /* Bo tròn góc bảng */
  overflow: hidden; /* Đảm bảo các bo góc hiển thị đúng */
  box-shadow: 0 4px 20px rgba(0,0,0,0.08); /* Thêm bóng đổ nhẹ cho bảng */
}

/* Tiêu đề bảng */
.book-admin thead {
  background: linear-gradient(45deg, #d32f2f, #ef5350); /* Gradient màu đỏ tươi */
  color: white;
  font-weight: bold;
  font-size: 1rem;
}

/* Các hàng trong bảng */
.book-admin tbody tr {
  transition: background-color 0.3s ease; /* Hiệu ứng chuyển đổi màu nền mượt mà */
}

.book-admin tbody tr:nth-child(even) {
  background-color: #f8f9fa; /* Màu nền xen kẽ cho các hàng chẵn */
}

.book-admin tbody tr:hover {
  background-color: #ffebee; /* Màu nền khi di chuột qua */
  transform: scale(1.01); /* Phóng to nhẹ hàng khi hover */
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: relative;
  z-index: 1; /* Đảm bảo hàng hover nằm trên các hàng khác */
}

/* Các ô dữ liệu */
.book-admin td, .book-admin th {
  padding: 12px 15px; /* Tăng padding để nội dung có thêm không gian */
  vertical-align: middle; /* Căn giữa nội dung theo chiều dọc */
  border-color: #e0e0e0; /* Màu viền nhạt hơn */
}

/* Cột Ảnh */
.book-admin .book-thumb {
  width: 60px !important; /* Tăng kích thước ảnh thumb lên một chút */
  height: 80px !important;
  object-fit: cover;
  border: 2px solid #ddd;
  border-radius: 8px; /* Bo tròn góc ảnh */
}

/* Các nút hành động */
.book-admin .btn {
  font-size: 0.85rem;
  padding: 6px 12px;
  border-radius: 50px; /* Bo tròn hoàn toàn các nút */
  font-weight: 500;
  margin: 2px;
}
.book-admin .btn svg {
  margin-right: 5px;
}

/* Nút Sửa và Xóa khi hover */
.book-admin .btn-outline-warning:hover {
  background-color: #ffc107;
  color: #333 !important;
  border-color: #ffc107;
}
.book-admin .btn-outline-danger:hover {
  background-color: #dc3545;
  color: white !important;
  border-color: #dc3545;
}
      `}</style>

      <Card className="shadow-lg border-0">
        <Card.Header className="d-flex justify-content-between align-items-center">
          Quản lý sách
          <small className="text-light">Tổng: {filteredBooks.length} sách</small>
        </Card.Header>
        <Card.Body>
          {/* Search bar */}
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
            <Form.Control
              className="search-input"
              placeholder="Tìm kiếm sách..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>

          {loading ? (
            <div className="text-center my-4">
              <Spinner animation="border" style={{ color: "#d32f2f" }} />
              <p>Đang tải dữ liệu...</p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <Alert variant="danger" className="text-center">
              Không tìm thấy sách nào.
            </Alert>
          ) : (
            <Table bordered hover responsive className="align-middle">
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Tên sách</th>
                  <th>Tác giả</th>
                  <th>Thể loại</th>
                  <th>ISBN</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Trạng thái</th>
                  <th className="text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.bookId}>
                    <td className="text-center">
                      {images[book.bookId] ? (
                        <img
                          src={`${images[book.bookId]}`}
                          alt={book.bookName}
                          className="book-thumb"
                          style={{ width: "50px", height: "70px", objectFit: "cover" }}
                        />
                      ) : (
                        <span className="text-muted">No image</span>
                      )}
                    </td>
                    <td>{book.bookName}</td>
                    <td>{book.author}</td>
                    <td>{book.categoryName}</td>
                    <td>{book.isbn}</td>
                    <td>{book.price.toLocaleString()} ₫</td>
                    <td>{book.amount}</td>
                    <td>
                      <span
                        className={`badge ${book.status === "Còn hàng"
                          ? "bg-success"
                          : book.status === "Sắp hết"
                            ? "bg-warning"
                            : "bg-danger"
                          }`}
                      >
                        {book.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="me-2"
                        onClick={() => handleViewDetails(book)}
                      >
                        <Eye /> Xem
                      </Button>
                      <Button
                        variant="outline-warning"
                        size="sm"
                        className="me-2"
                        onClick={() => alert(`Edit book ID: ${book.bookId}`)}
                      >
                        <PencilSquare /> Sửa
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => alert(`Delete book ID: ${book.bookId}`)}
                      >
                        <Trash /> Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
          <style>{`
  /* Header */
  .book-admin .card-header {
    background: linear-gradient(90deg, #ff512f, #dd2476);
    font-size: 1.4rem;
    font-weight: bold;
    color: white;
    padding: 15px 20px;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }

  /* Search input */
  .book-admin .search-input {
    border-radius: 30px;
    padding-left: 15px;
    border: none;
    background-color: #f8f9fa;
    box-shadow: inset 0 2px 6px rgba(0,0,0,0.05);
  }
  .book-admin .search-input:focus {
    outline: none;
    background-color: white;
    box-shadow: 0 0 6px rgba(221, 36, 118, 0.5);
  }

  /* Table */
  .book-admin .table {
    border-radius: 12px;
    overflow: hidden;
    background: white;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  }
  .book-admin thead {
    background: #dd2476;
    color: white;
  }
  .book-admin tbody tr:nth-child(even) {
    background-color: #fdf2f8;
  }
  .book-admin .table-hover tbody tr:hover {
    background-color: rgba(221, 36, 118, 0.08);
    transition: 0.25s ease;
  }

  /* Image */
  .book-admin img.book-thumb {
    border-radius: 8px;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
  .book-admin img.book-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 18px rgba(0,0,0,0.3);
  }

  /* Buttons */
  .book-admin .btn {
    border-radius: 25px;
    padding: 6px 14px;
    font-weight: 500;
  }
  .book-admin .btn-outline-danger:hover {
    background-color: #e63946;
    color: white;
  }
  .book-admin .btn-outline-warning:hover {
    background-color: #ff9800;
    color: white;
  }
  .book-admin .btn-outline-info:hover {
    background-color: #2196f3;
    color: white;
  }

  /* Modal */
  .book-admin .modal-header {
    background: linear-gradient(90deg, #ff512f, #dd2476);
    color: white;
    border-bottom: none;
  }
  .book-admin .modal-body {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    padding: 20px;
    background-color: #fff7fa;
  }
  .book-admin .modal-body img {
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  }
  .book-admin .modal-content {
    border-radius: 15px;
    overflow: hidden;
  }
`}</style>

      {/* Modal xem chi tiết */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        {selectedBook && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Chi tiết sách</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex">
                {images[selectedBook.bookId] ? (
                  <img
                    src={`${images[selectedBook.bookId]}`}
                    alt={selectedBook.bookName}
                    style={{
                      width: "200px",
                      height: "280px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "200px",
                      height: "280px",
                      background: "#f0f0f0",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#999",
                    }}
                  >
                    No image
                  </div>
                )}
                <div>
                  <h4>{selectedBook.bookName}</h4>
                  <p><strong>Tác giả:</strong> {selectedBook.author}</p>
                  <p><strong>Thể loại:</strong> {selectedBook.categoryName}</p>
                  <p><strong>ISBN:</strong> {selectedBook.isbn}</p>
                  <p><strong>Giá:</strong> {selectedBook.price.toLocaleString()} ₫</p>
                  <p><strong>Số lượng:</strong> {selectedBook.amount}</p>
                  <p>
                    <strong>Trạng thái:</strong>{" "}
                    <span
                      className={`badge ${selectedBook.status === "Còn hàng"
                        ? "bg-success"
                        : selectedBook.status === "Sắp hết"
                          ? "bg-warning"
                          : "bg-danger"
                        }`}
                    >
                      {selectedBook.status}
                    </span>
                  </p>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  );
};

const BookManagement = RequireAdmin(BookAdmin);
export default BookManagement;
