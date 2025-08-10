package khanhlandev.bookstore_backend.service;

import khanhlandev.bookstore_backend.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    public User findByUsername(String username);
}
