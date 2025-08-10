package khanhlandev.bookstore_backend.dao;

import khanhlandev.bookstore_backend.entity.DeliveryMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(path = "delivery-method")
public interface DeliveryMethodRepository extends JpaRepository<DeliveryMethod,Integer> {
}
