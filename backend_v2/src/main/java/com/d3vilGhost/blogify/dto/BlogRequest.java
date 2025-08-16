package com.d3vilGhost.blogify.dto;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class BlogRequest {
    private String title;
    private String summary;
    private String content;
}
