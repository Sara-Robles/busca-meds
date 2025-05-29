package br.edu.fatecgru.buscameds.service;

import br.edu.fatecgru.buscameds.model.User;
import br.edu.fatecgru.buscameds.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void delete(String id) {
        userRepository.deleteById(id);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public void update(User user) {
        userRepository.save(user);
    }

    public Cookie login(String email, String password) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(email, password);
        var auth = authenticationManager.authenticate(usernamePassword);
        var token = jwtService.generateToken((User) auth.getPrincipal());

        Cookie cookie = new Cookie("auth_token", token);
        cookie.setPath("/"); // Disponível para todas as rotas
        cookie.setHttpOnly(true);

        // Adiciona token em cookie
        return cookie;
    }

    public User register(User user){
        User newUser = new User(
                user.getName(),
                user.getEmail(),
                passwordEncoder.encode(user.getPassword()),
                user.getFavorite()
        );

        return userRepository.save(newUser);
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

}
