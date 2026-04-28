package com.inventory.service;

import com.inventory.model.Role;
import com.inventory.model.User;
import com.inventory.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void initDefaultAdmin() {
        if (!userRepository.existsByEmail("admin@inventory.com")) {
            User admin = new User("admin@inventory.com", passwordEncoder.encode("Admin123!"), "Super Admin");
            admin.setRoles(Collections.singleton(Role.ADMIN));
            userRepository.save(admin);
        }
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
}
