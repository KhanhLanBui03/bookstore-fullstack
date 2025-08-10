package khanhlandev.bookstore_backend.dao;

import khanhlandev.bookstore_backend.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(path = "images")
public interface ImageRepository extends JpaRepository<Image,Integer> {
}
