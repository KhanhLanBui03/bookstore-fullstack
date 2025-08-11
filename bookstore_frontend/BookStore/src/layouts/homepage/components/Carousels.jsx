import Carousel from 'react-bootstrap/Carousel';

function Carousels() {
  return (
    
    <div style={{ height: '100%' }}>
    <style>
      {
        `
        /* Container chính của carousel */
.carousel-container {
    height: 100%;
    width: 100%;
    max-width: 1200px; /* Giới hạn chiều rộng để carousel không quá lớn */
    margin: 0 auto; /* Căn giữa carousel */
    padding: 20px;
}

/* Kiểu dáng tổng thể của carousel */
.carousel {
    border-radius: 15px; /* Bo góc mềm mại */
    overflow: hidden; /* Cắt bỏ phần ảnh tràn ra ngoài */
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); /* Bóng đổ 3D nhẹ nhàng */
    border: 1px solid #e0e0e0; /* Đường viền mỏng */
    transition: all 0.3s ease-in-out; /* Hiệu ứng chuyển đổi mượt */
}

/* Hiệu ứng khi hover */
.carousel:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2); /* Bóng đổ đậm hơn khi hover */
    transform: translateY(-5px); /* Nâng carousel lên một chút */
}

/* Kiểu dáng của hình ảnh trong carousel */
.carousel-image {
    border-radius: 15px;
    object-fit: cover; /* Đảm bảo hình ảnh được căn chỉnh và không bị méo */
    transition: transform 0.5s ease-in-out; /* Hiệu ứng phóng to mượt mà */
}

.carousel-item:hover .carousel-image {
    transform: scale(1.03); /* Phóng to nhẹ ảnh khi hover */
}

/* Chú thích của carousel */
.carousel-caption {
    background-color: rgba(0, 0, 0, 0.6); /* Nền mờ cho chú thích */
    border-radius: 10px;
    padding: 15px;
    bottom: 20px;
    left: 5%;
    right: 5%;
    max-width: 80%;
    margin: 0 auto;
    text-align: center;
    transform: translateY(10px);
    opacity: 0;
    transition: all 0.5s ease;
}

/* Hiện chú thích khi hover */
.carousel-item:hover .carousel-caption {
    transform: translateY(0);
    opacity: 1;
}

.caption-title {
    font-size: 1.8rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.caption-text {
    font-size: 1rem;
}

/* Tùy chỉnh màu sắc và kích thước của các nút điều hướng (mũi tên) */
.carousel-control-prev-icon,
.carousel-control-next-icon {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    padding: 15px;
    width: 30px;
    height: 30px;
}

/* Tùy chỉnh màu sắc và kích thước của các chỉ số (indicators) */
.carousel-indicators [data-bs-target] {
    background-color: #d32f2f; /* Màu đỏ nổi bật */
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin: 0 6px;
    border: none;
    transition: all 0.3s ease;
}

.carousel-indicators .active {
    background-color: #ef5350; /* Màu đỏ đậm hơn cho chỉ số đang hoạt động */
    transform: scale(1.2);
}
        `
      }
    </style>
      <Carousel fade interval={2000} >
        <Carousel.Item>
          <img
            className="d-block w-100 rounded shadow-sm"
            src="./img/conongxanh.webp"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 rounded shadow-sm"
            src="./img/ct.webp"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 rounded shadow-sm"
            src="./img/laprap.webp"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Carousels;
