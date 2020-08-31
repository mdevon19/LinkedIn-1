package com.ex.service;

import com.ex.dao.HibDao;
import com.ex.models.Category;
import com.ex.models.Post;
import com.ex.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Set;

/**
 * This will serve as a medium in between the controller and the DAO
 * It will cover any business logic and invoke the appropriate DAO methods.
 *
 */
@Service
public class UserService {

    private HibDao dao;

    @Autowired
    public UserService(HibDao dao){
        this.dao = dao;
    }

    /**
     * This will get all the users data
     *
     * @return - a list of all the users in the database
     */
    public List<User> getAllUsers() {
        return dao.getAllUsers();
    }

    /**
     * This method will be called for when a user logs in
     * It will grab that users data
     *
     * @param username - the username of the user trying to log in
     * @return - a user object that will represent the user that is logging in, will return null if no user is found
     */
    public User logInUser(String username){


        return getUser(username);
    }

    /**
     * This will be used to get a user's data
     *
     * @param username - the username of the user this is trying to fetch
     * @return - a user object associated with the username
     */
    public User getUser(String username) {
        return dao.getExistingUser(username);
    }


    /**
     * This will be used to create a new user in the database
     *
     * @param u - the user object that will be saved to the database
     * @return - the user object that got persisted to the database
     */
    public User getNewUser(User u) {
        if(dao.checkCreds(u.getUsername())){
            u = dao.addNewUser(u);
            return u;
        }else{
            return new User();
        }

    }

    /**
     * This will delete a user from the database
     *
     * @param username - the username of the user that this will delete
     */
    public void deleteUser(String username){
        User user = dao.getExistingUser(username);
        dao.deleteUser(user.getId());
    }

    /**
     * This will apply a user to a post
     *
     * @param u - username of the user trying to apply
     * @param p - the id of the post that the user is applying to
     * @return - the user object that was changed and persisted to the database
     */
    public User applyUser(String u, int p){
        User user = dao.getExistingUser(u);

        user = dao.getUserById(user.getId());
        Post post = dao.getPostById(p);

        user = dao.userApply(user,post);

        return user;

    }

    /**
     * This will add a category to a user
     *
     * @param id - the id of the category that is being added
     * @param u - the username of the user adding the category
     * @return - the changed and persisted user object
     */
    public User addCategory(int id, String u){
        Category c = dao.getCategoryById(id);
        User user = dao.getExistingUser(u);

        return dao.addCategoryForUser(c,user);

    }

    /**
     * This will add a post to database and associate it with the user
     *
     * @param id - the id of the user posting the post
     * @param p - the post that the user is posting
     * @return - the changed and persisted user
     */
    public User addPost(int id, Post p){
        User user = dao.getUserById(id);
        p.setPoster(user);
        return dao.addPostForUser(user,p);
    }

    /**
     * This will be used for checking if a user has a matching username and password in the database
     *
     * @param username - username of the user trying to log in
     * @param password - password of the user trying to log in
     * @return - returns the user object if found, null if not
     */
    public User checkCreds(String username, String password) {
        if(dao.checkCreds(username,password)){
            return dao.getExistingUser(username);
        }
        else{
            return null;
        }
    }

    /**
     * This will delete a user application  to a post
     *
     * @param u - the username of the  user deleting their application
     * @param id - the id of the post that the user is unapplying to
     * @return - the changed and persisted user
     */
    public User deleteApply(String u, int id) {

        User user = dao.getExistingUser(u);
        Post p = dao.getPostById(id);

        user = dao.deleteApplied(user, p);
        return user;
    }

    /**
     * This will get all the users that applied to a post
     *
     * @param id - the id of the post
     * @return - a set of users that applied to the post
     */
    public Set<User> getAppliedUsers(int id) {
        Post p = dao.getPostById(id);

        return p.getAppliedUsers();
    }

    public User getUserByPost(int id){
        Post p = dao.getPostById(id);
        User u = dao.getUserById(p.getPoster().getId());
        return u;
    }
}
