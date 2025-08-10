package khanhlandev.bookstore_backend.dao;

import khanhlandev.bookstore_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(path = "user")
public interface UserRepository extends JpaRepository<User,Integer> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    public User findByUsername(String username );

    public User findByEmail(String email);
    @Query("SELECT COUNT(u) FROM User u WHERE u.activated = true")
    Long countActiveUsers();
}
