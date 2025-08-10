package khanhlandev.bookstore_backend.dao;

import khanhlandev.bookstore_backend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(path = "roles")
public interface RoleRepository extends JpaRepository<Role,Integer> {
    public Role findByRoleName(String roleName);
}
