package br.edu.fatecgru.buscameds.service;

import br.edu.fatecgru.buscameds.model.User;
import br.edu.fatecgru.buscameds.repository.UserRepository;
import com.mongodb.DuplicateKeyException;
import jakarta.servlet.http.Cookie;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.parser.Entity;
import java.security.InvalidParameterException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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

    public boolean existsByEmail(String email) { return userRepository.existsByEmail(email); }


    public List<User> findAll() {
        List<User> users = userRepository.findAll();

        if (users.isEmpty()) {
            throw new NoSuchElementException("Nenhum usuário encontrado.");
        }

        return users;
    }

    public void updateByEmail(User user) {
        if (user == null || user.getEmail() == null) {
            throw new IllegalArgumentException("Usuário ou email não podem ser nulos.");
        }

        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser == null) {
            throw new NoSuchElementException("Usuário não encontrado!");
        }

        // Atualiza apenas os campos fornecidos
        if (user.getName() != null) {
            existingUser.setName(user.getName());
        }
        if (user.getPassword() != null) {
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        if (user.getFavorite() != null) {
            existingUser.setFavorite(user.getFavorite());
        }

        // Salva o usuário atualizado
        userRepository.save(existingUser);
    }

    public void delete(String email) {

        if (email == null) {
            throw new IllegalArgumentException();
        }

        if (!userRepository.existsByEmail(email)) {
            throw new NoSuchElementException("Usuário não encontrado!");
        }

        userRepository.delete(userRepository.findByEmail(email));
    }

    public Cookie login(String email, String password) {

        if (email == null || password == null) {
            throw new IllegalArgumentException();
        }

        if ( !userRepository.existsByEmail(email) ) {
            throw new NoSuchElementException("Usuário não foi cadastrado!");
        }

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

        if (user == null) {
            throw new IllegalArgumentException();
        }

        User newUser = new User(
                user.getName(),
                user.getEmail(),
                passwordEncoder.encode(user.getPassword()),
                user.getFavorite()
        );

        return userRepository.save(newUser);
    }

    public Cookie logout() {
        // Remove o cookie
        Cookie cookie = new Cookie("auth_token", null);

        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0); // Faz o cookie expirar imediatamente

        return cookie;
    }

    public User findById(String id) {

        if (id == null) {
            throw new IllegalArgumentException();
        }

        if (!userRepository.existsById(id)) {
            throw new NoSuchElementException("Usuário não encontrado!");
        }

        return userRepository.findById(id).get();
    }

    public User findByEmail(String email) {
        if (email == null) {
            throw new IllegalArgumentException();
        }

        if (!userRepository.existsByEmail(email)) {
            throw new NoSuchElementException("Usuário não encontrado!");
        }

        return userRepository.findByEmail(email);
    }
}
