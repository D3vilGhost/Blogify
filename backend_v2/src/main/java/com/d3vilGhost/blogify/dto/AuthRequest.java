package com.d3vilGhost.blogify.dto;

import lombok.Getter;
import lombok.NonNull;

@Getter
public class AuthRequest {
    private String username;
    private String password;
}
