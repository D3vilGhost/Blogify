package com.d3vilGhost.blogify.service;

import com.d3vilGhost.blogify.dto.AuthRequest;
import com.d3vilGhost.blogify.dto.ProfileBlogResponse;
import com.d3vilGhost.blogify.jwt.JwtService;
import com.d3vilGhost.blogify.model.UserModel;
import com.d3vilGhost.blogify.repository.BlogRepository;
import com.d3vilGhost.blogify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public ResponseEntity<?> login(AuthRequest authRequest){
        Optional<UserModel> user=userRepository.findByUsername(authRequest.getUsername());
        if(user.isEmpty()){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error","Invalid username!"));
        }
        UserModel registeredUser=user.get();
        if(!passwordEncoder.matches(authRequest.getPassword(), registeredUser.getPassword())){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error","Wrong password!"));
        }

        HttpHeaders cookieHeader=jwtService.generateTokenAndSetCookie(registeredUser);
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .headers(cookieHeader)
                .body(Map.of("username",authRequest.getUsername()));
    }

    public ResponseEntity<?> signup(AuthRequest authRequest){
        UserModel newUserModel=new UserModel();
        newUserModel.setUsername(authRequest.getUsername());
        newUserModel.setPassword(passwordEncoder.encode(authRequest.getPassword()));
        try {
            UserModel savedUserModel = userRepository.save(newUserModel);
            HttpHeaders cookieHeader=jwtService.generateTokenAndSetCookie(savedUserModel);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .headers(cookieHeader)
                    .body(Map.of("username",authRequest.getUsername()));
            // Return 201 Created with the saved user

        } catch (DuplicateKeyException e) {
            // username already exists
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error","Username Already Exists"));
            // Return 409 Conflict

        } catch (Exception e) {
            // some error
            System.out.println("Error in signup service: "+ e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error","Internal Server Error"));
            // Return 500 Internal Server Error
        }
    }

    public ResponseEntity<?> getProfile(String username){
        List<ProfileBlogResponse> userProfile = blogRepository.findByAuthor(username);
        if(userProfile.isEmpty()){
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Collections.EMPTY_LIST);
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(userProfile);
    }

}
