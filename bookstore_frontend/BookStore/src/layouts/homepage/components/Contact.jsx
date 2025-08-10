import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const Contact = () => {
  return (
    <div 
      className="my-5 d-flex justify-content-center"
      style={{ width: '100%' }}
    >
      <Row
        className="g-0 shadow border rounded overflow-hidden flex-column flex-md-row"
        style={{
          width: '100%',
          maxWidth: '900px',
          backgroundColor: '#fffefc',
        }}
      >
        <Col xs={12} md="auto">
          <img
            src="/img/book-nook-soul-bookstore-01.webp"
            alt="Bookstore"
            className="w-100"
            style={{
              height: 'auto',
              maxHeight: '350px',
              objectFit: 'cover',
            }}
          />
        </Col>

        <Col
          xs={12}
          md="auto"
          className="p-4 d-flex align-items-center justify-content-center"
          style={{
            minHeight: '350px',
            backgroundColor: '#fffefc',
          }}
        >
          <div style={{ maxWidth: '330px', width: '100%' }}>
            <h5 className="fw-bold text-uppercase mb-2" style={{ letterSpacing: '0.5px' }}>
              Subscribe to my Newsletter
            </h5>
            <p
              style={{
                fontSize: '0.9rem',
                color: '#555',
                marginBottom: '1.2rem',
                lineHeight: '1.4',
              }}
            >
              Get Sonali’s 3Rs: a Recipe, a Recommendation, and a Really bad joke.
              Plus a free recipe book for signing up!
            </p>

            <Form className="d-flex flex-column flex-sm-row">
              <Form.Control
                type="email"
                placeholder="Your Email"
                className="me-sm-2 mb-2 mb-sm-0 shadow-sm"
                style={{
                  fontSize: '0.9rem',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                }}
              />
              <Button
                variant="danger"
                className="px-3 shadow-sm"
                style={{
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  borderRadius: '8px',
                }}
              >
                Subscribe
              </Button>
            </Form>
          </div>
        </Col>
      </Row>

    </div>
  );
};

export default Contact;
