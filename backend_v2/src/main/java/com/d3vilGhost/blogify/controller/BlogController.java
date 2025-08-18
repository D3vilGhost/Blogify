package com.d3vilGhost.blogify.controller;

import com.d3vilGhost.blogify.dto.BlogRequest;
import com.d3vilGhost.blogify.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/blog")
public class BlogController {
    @Autowired
    private BlogService blogService;

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createNewBlog(
            @AuthenticationPrincipal User user,
            @RequestPart("title") String title,
            @RequestPart("summary") String summary,
            @RequestPart("content") String content,
            @RequestPart("coverImage") MultipartFile image
    ){
        try {
            if(title.isBlank() || summary.isBlank() || content.isBlank()){
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(Map.of("error","Please fill all the fields."));
            }
            BlogRequest blogRequest=new BlogRequest();
            blogRequest.setTitle(title);
            blogRequest.setSummary(summary);
            blogRequest.setContent(content);
            return blogService.createBlog(user.getUsername(),blogRequest,image);
        } catch (Exception e) {
            System.out.println("Error in createNewBlog controller: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Internal Server Error"));
        }
    }

    @PutMapping(value = "/edit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> editExistingBlog(
            @AuthenticationPrincipal User user,
            @RequestPart("blogId") String blogId,
            @RequestPart("title") String title,
            @RequestPart("summary") String summary,
            @RequestPart("content") String content,
            @RequestPart("coverImage") MultipartFile image
    ){
        try {
            if(title.isBlank() || summary.isBlank() || content.isBlank()){
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(Map.of("error","Please fill all the fields."));
            }
            BlogRequest blogRequest=new BlogRequest();
            blogRequest.setTitle(title);
            blogRequest.setSummary(summary);
            blogRequest.setContent(content);
            return blogService.editBlog(user.getUsername(),blogRequest,image,blogId);
        } catch (Exception e) {
            System.out.println("Error in editExistingBlog controller: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Internal Server Error"));
        }
    }

    @GetMapping("/feed")
    public ResponseEntity<?> getFeed(){
        try{
            return blogService.getAllBlogs();
        } catch (Exception e) {
            System.out.println("Error in getFeed controller: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Internal Server Error"));
        }
    }


    @GetMapping("/{blogId}")
    public ResponseEntity<?> getProfile(@PathVariable String blogId){
        try{
            return blogService.getBlogById(blogId);
        } catch (Exception e) {
            System.out.println("Error in getFeed controller: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Internal Server Error"));
        }
    }

}
