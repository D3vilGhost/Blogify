package com.d3vilGhost.blogify.model;

import com.mongodb.lang.NonNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "blog")
@NoArgsConstructor
public class BlogModel {
    @Id
    private ObjectId id;
    @Indexed(unique = true)
    @NonNull
    private String blogId;
    @NonNull
    private String title;
    @NonNull
    private String summary;
    @NonNull
    private String content;
    @NonNull
    private String coverImage;
    @NonNull
    private String author;
    @NonNull
    private String date;
}
