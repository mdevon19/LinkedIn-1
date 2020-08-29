package com.ex.service;

import com.ex.dao.HibDao;
import com.ex.models.Category;
import com.ex.models.Post;
import com.ex.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

/**
 * This class will be used as a medium in between the controller and the DAO
 * It will cover any business logic and invoke methods to obtain data from the DAO
 *
 */
@Service
public class PostService {

    private HibDao dao;

    @Autowired
    public PostService(HibDao dao){
        this.dao = dao;
    }

    /**
     * This method is used to get all of the posts from the database
     *
     * @return - a list of all the posts in  the database
     */
    public List<Post> getAllPosts(){
        return dao.getAllPosts();
    }

    /**
     * This method will get the post that has the id of the parameter
     *
     * @param id - the od of the post this is fetching
     * @return - the post object related to the id
     */
    public Post getPost(int id){
        return dao.getPostById(id);
    }

    /**
     * This method will get all posts that were posted  by a specific user
     *
     * @param username - the username of the user to get the posts of
     * @return - a list of posts that the specific user posted
     */
    public List<Post> getPosts(String username) {

        User user = dao.getExistingUser(username);

        return dao.getPostsByUser(user);

    }

    /**
     * This will get all the posts that a specific user applied to
     *
     * @param username - the username of the user to get the applied posts from
     * @return - a set of posts that the user has applied to
     */
    public Set<Post> getAppliedPosts(String username) {

        User user = dao.getExistingUser(username);

        return dao.getPostsByApplied(user);
    }

    /**
     * This will get all posts for the specified category
     *
     * @param id - the id of the category that it want the posts of
     * @return - a list of posts that have the specified category
     */
    public List<Post> getPostsByCat(int id) {

        Category c = dao.getCategoryById(id);

        return dao.getPostsByCategory(c);
    }

    /**
     * This will delete a post
     *
     * @param id - the id of the post that is being deleted
     * @return - true if it was deleted, false if it wasn't
     */
    public boolean deletePost(int id){
        Post post = dao.getPostById(id);

        if(dao.deletePost(post) >= 1){
            return true;
        }
        else{
            return false;
        }
    }
}
