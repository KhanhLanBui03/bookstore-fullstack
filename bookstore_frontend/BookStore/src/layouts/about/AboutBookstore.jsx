import React from 'react';

const AboutBookstore = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-danger">📖 About Our Bookstore</h1>
        <p className="lead text-muted">
          A sanctuary for readers, thinkers, and lifelong learners.
        </p>
      </div>

      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
            alt="Bookstore Interior"
            className="img-fluid rounded-4 shadow-sm"
          />
        </div>
        <div className="col-md-6">
          <h3 className="fw-bold">Who We Are</h3>
          <p>
            Founded in 2024, our bookstore was born from a simple love of books.
            We're more than just a shop—we're a vibrant hub for book lovers,
            students, and curious minds. Whether you're into fiction, science,
            history, or children's books, we have something special just for you.
          </p>
        </div>
      </div>

      <div className="row align-items-center mb-5 flex-md-row-reverse">
        <div className="col-md-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHckl6pjchKGmZNdYUcCT5gEa5eCDHtprbQ&s"
            alt="Bookshelves"
            className="img-fluid rounded-4 shadow-sm"
          />
        </div>
        <div className="col-md-6">
          <h3 className="fw-bold">Our Mission</h3>
          <p>
            We aim to inspire and empower people through reading. Our carefully curated
            selection is handpicked to suit every taste and age. With both online and
            offline presence, we make discovering your next great read easier than ever.
          </p>
        </div>
      </div>

      <div className="text-center mt-5">
        <h4 className="fw-bold">📍 Visit Us or Shop Online</h4>
        <p>
          Located in the heart of Bình Định, we offer in-store events, reading spaces,
          and fast nationwide delivery. Join our community and explore the world through books!
        </p>
        <a href="/shop" className="btn btn-danger btn-lg mt-3">
          Browse Our Collection
        </a>
      </div>
    </div>
  );
};

export default AboutBookstore;
