package com.inventory.controller;

import com.inventory.dto.AuthRequest;
import com.inventory.dto.AuthResponse;
import com.inventory.model.Role;
import com.inventory.model.User;
import com.inventory.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody User user) {
        user.setRoles(Collections.singleton(Role.STAFF));
        return ResponseEntity.ok(authService.register(user));
    }
}


// Completed code ...

