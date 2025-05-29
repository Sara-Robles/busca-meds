package br.edu.fatecgru.buscameds.service;

import br.edu.fatecgru.buscameds.model.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class JwtService {

    @Value("key")
    private String secret;

    public String generateToken(User user){
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            String token = JWT.create()
                    .withIssuer("auth")
                    .withSubject(user.getUsername())
                    .withExpiresAt(this.getExpirationDate())
                    .sign(algorithm);
            return token;

        } catch (JWTCreationException exception) {
            throw new RuntimeException("ERROR WHILE GENERATING TOKEN", exception);
        }
    }

    public String validateToken(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            return JWT.require(algorithm)
                    .withIssuer("auth")
                    .build()
                    .verify(token)
                    .getSubject();

        } catch (JWTVerificationException exception) {
            return null;
        }
    }

    private Instant getExpirationDate(){
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }

}
