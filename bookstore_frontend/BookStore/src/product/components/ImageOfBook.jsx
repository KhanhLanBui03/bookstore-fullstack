import { useEffect, useState } from 'react';
import { getAllImagesOfBook } from '../../api/ImageAPI';
import { Row, Col, Image, Spinner, Alert } from 'react-bootstrap';

const ImageOfBook = ({ bookId }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllImagesOfBook(bookId)
      .then((list) => {
        setImages(list);
        if (list.length > 0) {
          setSelectedImage(list[0]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [bookId]);

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">Lỗi: {error}</Alert>;

  return (
    <div className='text-center'>
      {selectedImage && (
        <div className="mb-3">
          <Image
            src={selectedImage.imageData}
            alt={selectedImage.imageName}
            fluid
            style={{
              maxHeight: '350px',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            }}
          />
        </div>
      )}
      <Row className="justify-content-center g-2">
        {images.map((image, index) => (
          <Col xs={3} md={2} key={index}>
            <Image
              src={image.imageData}
              alt={image.imageName}
              thumbnail
              onClick={() => setSelectedImage(image)}
              style={{
                cursor: 'pointer',
                border: selectedImage?.imageId === image.imageId ? '2px solid #0d6efd' : '1px solid #ccc',
                borderRadius: '6px',
                objectFit: 'cover',
                height: '80px',
                width: '100%',
              }}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ImageOfBook;
