package com.d3vilGhost.blogify.jwt;

import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Configuration
@Getter// to get properties from application.properties
public class JwtConfig {
    // JwtConfig files holds details related to any token
    @Value("${jwt.secretKey}")
    private String secretKey; // to hold jwt secret key
    @Value("${jwt.expirationTime}")
    private int expirationTime; // to hold expiration time of token

    public SecretKey getSigningKey(){
        // this is basically signing algorithm for our jwt
        // as it accepts bytes[] we convert secretKey to bytes[]
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }
}