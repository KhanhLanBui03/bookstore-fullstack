import Carousel from 'react-bootstrap/Carousel';

function Carousels() {
  return (
    <div style={{ height: '100%' }}>

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
