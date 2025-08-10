package khanhlandev.bookstore_backend.dao;

import khanhlandev.bookstore_backend.entity.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(path = "payment-method")
public interface PaymentMethodRepository extends JpaRepository<PaymentMethod,Integer> {

}
