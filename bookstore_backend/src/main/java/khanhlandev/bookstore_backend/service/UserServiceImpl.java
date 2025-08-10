package khanhlandev.bookstore_backend.service;

import khanhlandev.bookstore_backend.dao.RoleRepository;
import khanhlandev.bookstore_backend.dao.UserRepository;
import khanhlandev.bookstore_backend.entity.Role;
import khanhlandev.bookstore_backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.text.Collator;
import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collector;
import java.util.stream.Collectors;
@Service
public class UserServiceImpl implements UserService{


    private UserRepository userRepository;

    private RoleRepository roleRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userE = userRepository.findByUsername(username);
        if(userE == null){
            throw new UsernameNotFoundException("Tài khoản không tồn tại!");
        }
        org.springframework.security.core.userdetails.User user = new org.springframework.security.core.userdetails.User(userE.getUsername(),userE.getPassword(),roleToAuthorities(userE.getRoles()));
        return user;
    }
    private Collection<? extends GrantedAuthority> roleToAuthorities(Collection<Role> roles){
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getRoleName())).collect(Collectors.toList());
    }

}
