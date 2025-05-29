package br.edu.fatecgru.buscameds.security;

import br.edu.fatecgru.buscameds.repository.UserRepository;
import br.edu.fatecgru.buscameds.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    JwtService jwtService;

    @Autowired
    UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        var token = this.recoverToken(request);

        if (token != null) {
            var email = jwtService.validateToken(token);
            UserDetails user = userRepository.findByEmail(email);


            if (user != null) {
                var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request){
        // Tenta obter o token do cabeçalho Authorization (formato Bearer)
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.replace("Bearer ", "");
        }

        // Se não encontrou no cabeçalho, tenta obter do cookie
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("auth_token".equals(cookie.getName())) { // Verifica pelo nome do cookie
                    return cookie.getValue(); // Retorna o valor do token no cookie
                }
            }
        }

        // Se não encontrou em nenhum lugar
        return null;
    }

}
