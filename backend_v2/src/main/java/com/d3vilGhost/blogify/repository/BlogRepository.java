package com.d3vilGhost.blogify.repository;

import com.d3vilGhost.blogify.dto.ProfileBlogResponse;
import com.d3vilGhost.blogify.model.BlogModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlogRepository extends MongoRepository<BlogModel,String> {
    @Query(value="{ 'blogId': ?0 }", fields = "{'_id': 0, 'blogId': 0, '__v':0 }")
    Optional<BlogModel> findByBlogId(String blogId);
    Optional<ProfileBlogResponse> findByAuthor(String author);
}
