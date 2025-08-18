package com.d3vilGhost.blogify.controller;

import com.d3vilGhost.blogify.dto.AuthRequest;
import com.d3vilGhost.blogify.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest){
        try{
            if(authRequest.getUsername()==null || authRequest.getPassword()==null){
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(Map.of("error","Fill all the fields!"));
            }
            if(authRequest.getPassword().length()<6){
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(Map.of("error","Password length should be atleast 6!"));
            }
            return authService.login(authRequest);
        } catch (Exception e) {
            System.out.println("Error in login controller: "+e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", "Internal Server Error"));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody AuthRequest authRequest){
        try{
            if(authRequest.getUsername()==null || authRequest.getPassword()==null){
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(Map.of("error","Fill all the fields!"));
            }
            if(authRequest.getPassword().length()<6){
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(Map.of("error","Password length should be atleast 6!"));
            }
            return authService.signup(authRequest);
        } catch (Exception e) {
            System.out.println("Error in signup controller: "+ e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", "Internal Server Error"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        try {
            // can do this in service layer but leaving doing it in control layer
            Cookie cookie = new Cookie("jwt", "");
            cookie.setPath("/");
            cookie.setMaxAge(0); // Immediately expire
            cookie.setHttpOnly(true); // if you used httpOnly before
            response.addCookie(cookie);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(Map.of("message", "Logged Out Successfully!"));
        } catch (Exception e) {
            System.out.println("Error in logout controller: " + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", "Internal Server Error"));
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal User user){
        try{
            return authService.getProfile(user.getUsername());
        } catch (Exception e) {
            System.out.println("Error in profile controller: "+ e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", "Internal Server Error"));
        }
    }

}
