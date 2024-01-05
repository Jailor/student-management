package andrei.studentapp.security;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Log
@Component
public class AuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if(request.getRequestURI().endsWith("/login") || request.getRequestURI().endsWith("/register")){
            filterChain.doFilter(request, response);
            return;
        }

        if(request.getMethod().equals("OPTIONS")){
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            try {
                username = jwtService.extractUsername(token);
            }
            catch (ExpiredJwtException e){
                log.severe("Token expired");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }
        log.info("authHeader: " + authHeader);
        log.info("token: " + token);
        log.info("username: " + username);
        String requestedResource = request.getRequestURI();
        log.info("Requesting access to resource:" + requestedResource);

        if (username != null ) {
            if (jwtService.validateToken(token, username)) {
                log.info("authenticated user " + username);
                filterChain.doFilter(request, response);
                return;
            }
        }
        log.info("unauthenticated user");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }
}
