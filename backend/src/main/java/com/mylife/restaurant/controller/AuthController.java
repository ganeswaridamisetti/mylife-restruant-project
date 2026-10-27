package com.mylife.restaurant.controller;

import com.mylife.restaurant.entity.AppUser;
import com.mylife.restaurant.repository.UserRepository;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController @RequestMapping("/api/auth") @CrossOrigin(origins="http://localhost:5173")
public class AuthController {
    private final UserRepository users;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    public AuthController(UserRepository users){this.users=users;}
    public record RegisterRequest(@NotBlank String name, @Email @NotBlank String email, String phone, @NotBlank String password) {}
    public record LoginRequest(@Email @NotBlank String email, @NotBlank String password) {}
    public record UserResponse(Long id, String name, String email, String phone, String role) {}
    @PostMapping("/register") public UserResponse register(@RequestBody RegisterRequest req){
        if(users.existsByEmailIgnoreCase(req.email())) throw new ResponseStatusException(HttpStatus.CONFLICT,"Email already registered");
        AppUser u=new AppUser(); u.setName(req.name());u.setEmail(req.email().trim().toLowerCase());u.setPhone(req.phone());u.setPassword(encoder.encode(req.password()));u.setRole("CUSTOMER");
        u=users.save(u); return new UserResponse(u.getId(),u.getName(),u.getEmail(),u.getPhone(),u.getRole());
    }
    @PostMapping("/login") public UserResponse login(@RequestBody LoginRequest req){
        AppUser u=users.findByEmailIgnoreCase(req.email()).orElseThrow(()->new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Invalid email or password"));
        if(!encoder.matches(req.password(),u.getPassword())) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Invalid email or password");
        return new UserResponse(u.getId(),u.getName(),u.getEmail(),u.getPhone(),u.getRole());
    }
}
