package com.inventory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.inventory.model.Role;
import com.inventory.model.User;
import com.inventory.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Set;

@SpringBootApplication
public class InventoryManagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(InventoryManagementApplication.class, args);
    }

    @Bean
    public CommandLineRunner init(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("admin@inventory.com").isEmpty()) {
                User admin = new User();
                admin.setFullName("System Admin");
                admin.setEmail("admin@inventory.com");
                admin.setPassword(passwordEncoder.encode("Admin123!"));
                admin.setRoles(Set.of(Role.ADMIN));
                userRepository.save(admin);
            }
        };
    }
}
