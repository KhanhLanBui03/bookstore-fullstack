import React from 'react';
import Container from 'react-bootstrap/Container';
import Carousels from './Carousels';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Banner = () => {
  return (
    <Container className="mt-2">
      <Row style={{ minHeight: '320px' }}>
        <Col lg={8} sm={12} className="">
          <div style={{ height: '100%' }}>
            <Carousels />
          </div>
        </Col>

        {/* Ẩn trên mobile, chỉ hiện từ sm trở lên */}
        <Col
          lg={4}
          className="d-none d-sm-flex flex-column gap-2"
          style={{ height: '100%' }}
        >
          <img
            src="./img/uudai.webp"
            alt="Ưu đãi"
            className="img-fluid rounded shadow-sm"
            style={{ height: '50%', objectFit: 'cover' }}
          />
          <img
            src="./img/zalopay.webp"
            alt="ZaloPay"
            className="img-fluid rounded shadow-sm"
            style={{ height: '50%', objectFit: 'cover' }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Banner;
