package khanhlandev.bookstore_backend.dao;

import khanhlandev.bookstore_backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(path = "reviews")
public interface ReviewRepository extends JpaRepository<Review,Long> {
}
