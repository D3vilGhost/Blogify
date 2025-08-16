package com.d3vilGhost.blogify.service;

import com.d3vilGhost.blogify.dto.BlogRequest;
import com.d3vilGhost.blogify.model.BlogModel;
import com.d3vilGhost.blogify.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BlogService {
    @Autowired
    private BlogRepository  blogRepository;
    @Autowired
    private ImageUploadService imageUploadService;

    public ResponseEntity<?> createBlog(String author, BlogRequest blogRequest, MultipartFile image){
        try {
            BlogModel newBlog=new BlogModel();
            newBlog.setBlogId(String.format("%s%d",author,System.currentTimeMillis()));
            newBlog.setTitle(blogRequest.getTitle());
            newBlog.setSummary(blogRequest.getSummary());
            newBlog.setContent(blogRequest.getContent());
            newBlog.setAuthor(author);
            newBlog.setDate(LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            String fileUrl = imageUploadService.uploadImage(
                    image,
                    newBlog.getBlogId()
            );
            newBlog.setCoverImage(fileUrl);
            blogRepository.save(newBlog);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of(
                            "message","Blog Posted Successfully!",
                            "blogId", newBlog.getBlogId()
                            ));

        } catch (Exception e) {
            System.out.println("Error at createBlog Service: "+e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error","Internal server error!"));
        }
    }

    public ResponseEntity<?> editBlog(String author, BlogRequest blogRequest){
        try {
            BlogModel newBlog=new BlogModel();
//            newBlog.setBlogId(blogRequest.getBlogId());// use prvs blogid
            newBlog.setTitle(blogRequest.getTitle());
            newBlog.setSummary(blogRequest.getSummary());
            newBlog.setContent(blogRequest.getContent());
            newBlog.setAuthor(author);
            // update to new date
            newBlog.setDate(LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))+"( Edited )");
//            String fileUrl = imageUploadService.uploadImage(
//                    blogRequest.getCoverImage(),
//                    newBlog.getBlogId()
//            );
//            newBlog.setCoverImage(fileUrl);
            blogRepository.save(newBlog);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of(
                            "message","Blog Updated Successfully!",
                            "blogId", newBlog.getBlogId()
                    ));

        } catch (Exception e) {
            System.out.println("Error at createBlog Service: "+e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error","Internal server error!"));
        }
    }

    public ResponseEntity<?> getAllBlogs(){
        List<BlogModel> allBlogs=blogRepository
                .findAll(Sort.by(Sort.Direction.DESC,"createdTime"));

        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(allBlogs);
    }

    public ResponseEntity<?> getBlogById(String blogId){
        Optional<BlogModel> blog=blogRepository.findByBlogId(blogId);

        if(blog.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", "Invalid blogId!"));
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(blog.get());
    }

}
