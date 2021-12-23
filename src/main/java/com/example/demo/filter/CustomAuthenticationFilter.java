package com.example.demo.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.demo.customer.Customer;
import com.example.demo.customer.CustomerRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    private final CustomerRepository customerRepository;

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager ,CustomerRepository customerRepository ){
        this.authenticationManager = authenticationManager;
        this.customerRepository=customerRepository;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        // Get the user from the request body
        ObjectMapper mapper = new ObjectMapper();
        com.example.demo.customer.Customer customer = null;
        try {
            customer = mapper.readValue(request.getInputStream(), com.example.demo.customer.Customer.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // User information that will be used to authenticate
        String phoneNo = customer.getPhoneNo();
        String password = customer.getPassword();

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(phoneNo,password);
        return authenticationManager.authenticate(authenticationToken);
    }

    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        User user = (User)authentication.getPrincipal();

        Customer customer=customerRepository.findByPhoneNo(user.getUsername());
        Map<String, String> payload = new HashMap<>();
        payload.put("id",customer.getIdCustomer().toString());

        Algorithm algorithm = Algorithm.HMAC256("jwt_super_secret".getBytes());
        String access_token = JWT.create()
                .withSubject(user.getUsername())
                .withPayload(payload)
                .withExpiresAt(new Date(System.currentTimeMillis() + 480 * 60 * 1000))
                .withIssuer(request.getRequestURI().toString())
                .withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);
        Map<String, String> token = new HashMap<>();
        token.put("access_token", access_token);
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), token);
    }

}
