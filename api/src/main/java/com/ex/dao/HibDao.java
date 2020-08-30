package com.ex.dao;

import com.ex.models.*;
import org.hibernate.*;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

/**
 * This is a DAO based class that implements a generic Dao class, which declares the methods
 * This class uses hibernate to persist data into the database using models defined in the com.ex.models package
 *
 */

@Repository
@Transactional
public class HibDao implements Dao {
    private SessionFactory sessionFactory;

    public HibDao(){

    }

    /**
     * A constructor that with create the HibDao object by using Spring
     *
     * @param sf - a SessionFactory bean provided by bean, which is init. in the ORMConfig class
     */
    @Autowired
    public HibDao(SessionFactory sf){
        this.sessionFactory = sf;

    }


    /**
     * This method is used for creating a new fresh new user to the database
     *
     * @param u - the user object you would like to persist to the database
     * @return - the user object that you persisted to the database
     */
    public User addNewUser(User u){

        Session session = this.sessionFactory.openSession();
        session.beginTransaction();
        session.save(u);

        session.getTransaction().commit();
        session.close();


        return u;
    }


    /**
     * This method is used to grab user data from the database based on the user's username
     *
     * @param username - the username string of the user you would like to get data from
     * @return - the user object from the database that is associated with the username
     */
    @Override
    @Transactional
    public User getExistingUser(String username) {

        Session session = this.sessionFactory.openSession();


        String hql = "from User where username = :u";
        Query query = session.createQuery(hql);
        query.setString("u", username);

        List<User> users = (List)query.list();


        for(User u: users){
            session.close();
            return getUserById(u.getId());
        }

        session.close();
        return null;

    }


    /**
     * This  method will be used to grab every category's data from the database
     *
     * @return - a list that will hold each category from the database
     */
    public List<Category> getAllCats(){

        Session session = this.sessionFactory.openSession();

        session.beginTransaction();

        String hql = "from Category";
        Query query = session.createQuery(hql);

        List<Category> cats = (List) query.list();

        session.getTransaction().commit();
        session.close();

        return cats;
    }

    /**
     * This method will grab every post's data from the database
     *
     * @return - a list that holds every post from the database
     */
    public List<Post> getAllPosts(){

        Session session = this.sessionFactory.openSession();
        session.beginTransaction();

        String hql = "from Post";
        Query query = session.createQuery(hql);

        List<Post> posts = (List) query.list();

        session.getTransaction().commit();
        session.close();

        return posts;
    }

    /**
     * This method will delete a post from the database and any associations with it
     *
     * @param p - the post object you would like to delete from the database
     * @return - an int that represents how many posts got delete from the database
     */
    public int deletePost(Post p){

        p.setPostCat(null);
        Session sess1 = this.sessionFactory.openSession();
        for(User u: p.getAppliedUsers()){
            u.getAppliedPosts().remove(p);
            sess1.beginTransaction();
            sess1.update(u);
            sess1.getTransaction().commit();
        }

        p.setPoster(null);
        Session sess = this.sessionFactory.openSession();
        sess.beginTransaction();

        sess.update(p);

        sess.getTransaction().commit();
        sess.close();

        Session session = this.sessionFactory.openSession();
        session.beginTransaction();


        session.delete(p);

        session.getTransaction().commit();
        session.close();

        return 1;
    }

    /**
     * This method will be used to apply a user to a post and persist it to the database
     *
     * @param u - a user object that represents the user that is applying
     * @param p - a post object that represents the post the user is applying to
     * @return - a user object that now has the applied post associated with it
     */
    public User userApply(User u, Post p){

        u.addAppliedPosts(p);

        Session session = this.sessionFactory.openSession();
        session.beginTransaction();
        session.update(u);
        session.getTransaction().commit();
        session.close();
        return u;

    }

    /**
     * This method will delete an applied posts to a user and persist it to the database
     *
     * @param u - the user object that represents the user that is unapplying
     * @param p - the post object that represents the post the user is unapplying to
     * @return - a user object that has the applied post deleted from its data
     */
    public User deleteApplied(User u, Post p){

        u.deleteApplied(p);

        Session session = this.sessionFactory.openSession();
        session.beginTransaction();

        session.update(u);

        session.getTransaction().commit();
        session.close();
        return getExistingUser(u.getUsername());
    }

    /**
     * This method will be used to delete the user's data from the database and any associated data with the user
     *
     * @param id - the id of the user that is being deleted
     */
    @Override
    public void deleteUser(int id){

        User user = getUserById(id);

        user.getAppliedPosts().clear();

        Session sess1 = this.sessionFactory.openSession();
        sess1.beginTransaction();

        sess1.update(user);

        sess1.getTransaction().commit();
        sess1.close();


        deleteAllPostsForUser(user);

        user = getUserById(id);

        user.getUserCats().clear();


        Session sess = this.sessionFactory.openSession();
        sess.beginTransaction();

        sess.update(user);

        sess.getTransaction().commit();
        sess.close();

        Session session = this.sessionFactory.openSession();
        session.beginTransaction();




        session.delete(user);

        session.getTransaction().commit();
        session.close();
    }


    /**
     * This method can be used to check the creds. of a user to see if a user in the database, is associated with
     * the given username.
     *
     * @param username - the username string that you are checking
     * @return - true if the user was found, false if it wasn't
     */
    @Override
    public boolean checkCreds(String username) {
        Session session = this.sessionFactory.openSession();
        session.beginTransaction();

        String hql = "from User where username = ?";
        Query query = session.createQuery(hql);
        query.setParameter(0,username);

        List user = query.list();

        session.getTransaction().commit();
        session.close();


        if(user.size() >= 1){
            return false;
        }else{
            return true;
        }

    }

    /**
     * This will be used to get every user's data in the database
     *
     * @return - a list of user objects that are persisted in the database
     */
    @Override
    public List<User> getAllUsers() {

        Session session = this.sessionFactory.openSession();
        session.beginTransaction();

        String hql = "from User";
        Query query = session.createQuery(hql);

        List users = query.list();

        session.getTransaction().commit();
        session.close();

        return users;

    }

    /**
     * This method can be used to check the creds. of a user to see if a user in the database, is associated with
     * the given username and password
     *
     * @param username - the username string you are checking
     * @param password - the password string you are checking
     * @return - true if a user is found, false if not found
     */
    @Override
    public boolean checkCreds(String username, String password) {
        Session session = this.sessionFactory.openSession();
        session.beginTransaction();

        String hql = "from User where username = ? and password =?";
        Query query = session.createQuery(hql);
        query.setParameter(0,username);
        query.setParameter(1,password);

        List user = query.list();

        session.getTransaction().commit();
        session.close();


        if(user.size() >= 1){
            return true;
        }else{
            return false;
        }
    }

    /**
     * This method will obtain a post object from the database using its id
     *
     * @param p - the id of the post you are trying to obtain
     * @return - the post object associated with the id inputted
     */
    @Override
    public Post getPostById(int p) {

        Session session = this.sessionFactory.openSession();
        Post post = session.get(Post.class,p);
        session.close();
        return post;
    }

    /**
     * This method will obtain a category object from the database using its id
     *
     * @param c - the id of the category you are trying to obtain
     * @return - the category object associated with the id inputted
     */
    @Override
    public Category getCategoryById(int c) {

        Session session = this.sessionFactory.openSession();
        Category cat = session.get(Category.class, c);
        session.close();
        return cat;
    }

    /**
     * This method will grab all posts with the specific category associated with it
     *
     * @param c - the category object you want your posts to contain
     * @return - a list of all posts in the database with the category of the inputted category
     */
    @Override
    public List<Post> getPostsByCategory(Category c) {
        Session session = this.sessionFactory.openSession();
        session.beginTransaction();
        Criteria cr = session.createCriteria(Post.class);
        cr.add(Restrictions.eq("postCat", c));
        List list = cr.list();
        session.getTransaction().commit();
        session.close();
        return list;
    }

    /**
     * This will add a category to a user in the database
     *
     * @param c - the category you would like to add to the user
     * @param u - the user that is adding the category
     * @return - the user object with the category now added to it
     */
    @Override
    public User addCategoryForUser(Category c, User u) {
        u.addCat(c);

        Session session = this.sessionFactory.openSession();
        session.beginTransaction();
        session.update(u);
        session.getTransaction().commit();
        session.close();
        return u;
    }

    /**
     * This method will add a post object to a user and save the post and user to the database
     *
     * @param u - the user object that is adding the post
     * @param p - the post object that the user is adding
     * @return - the user object with the new post now added to it
     */
    @Override
    public User addPostForUser(User u, Post p) {

        p.setPoster(u);
        Session session = this.sessionFactory.openSession();

        addNewPost(p,session);

        session.close();

        u.addPostedPost(p);

        return u;
    }

    /**
     * This will be used to grab all posts associate with the user in the database
     *
     * @param u - the user that this will get the posts of
     * @return - a list of post object that the are associated with the user
     */
    @Override
    public List<Post> getPostsByUser(User u) {
        Session session = this.sessionFactory.openSession();
        session.beginTransaction();
        Criteria cr = session.createCriteria(Post.class);
        cr.add(Restrictions.eq("poster", u));
        List list = cr.list();
        session.getTransaction().commit();
        session.close();
        return list;
    }

    /**
     * This will get all posts that a user has applied to from the database
     *
     * @param u - the user that will be used to get the applied posts
     * @return - a set of post objects that should represent the posts the user applied to
     */
    @Override
    public Set<Post> getPostsByApplied(User u) {

        Session session = this.sessionFactory.openSession();
        session.beginTransaction();
        Criteria cr = session.createCriteria(User.class);
        cr.add(Restrictions.eq("id", u.getId()));
        if(cr.list().size() >= 1){
            u = (User) cr.list().get(0);
            session.getTransaction().commit();
            session.close();
            return u.getAppliedPosts();
        }
        else{
            session.getTransaction().commit();
            session.close();
            return null;
        }
    }


    /**
     * This method will obtain a user object from the database using its id
     *
     * @param id - the id of the user you are trying to obtain
     * @return - the user object associated with the id inputted
     */
    @Override
    public User getUserById(int id) {
        Session session = this.sessionFactory.openSession();

        User u = session.get(User.class,id);

        session.close();

        return u;
    }

    /**
     * This method will add a post to the database will no user associated with it
     * (This should be used with another method that associates the user with it)
     *
     * @param p - the post object that will be persisted to the database
     * @param session - a session object that will be used to as the connection to the database
     * @return - the post object that was added to the database
     */
    @Override
    public Post addNewPost(Post p, Session session) {


        session.save(p);


        return p;

    }

    /**
     * This will be used to add a log to the log table of the database
     *
     * @param m - the message that you would like to add to the log table
     */
    @Override
    public void addLog(String m) {
        Session session = this.sessionFactory.openSession();
        session.beginTransaction();

        Query q = session.createQuery("insert into logs(message) values (" + m +")");
        q.executeUpdate();

        session.getTransaction().commit();
        session.close();


    }

    /**
     * This method will delete all posts that were posted by a user
     *
     * @param u - the user that this will delete the posts of
     */
    @Override
    public void deleteAllPostsForUser(User u) {
         for(Post p : u.getUserPosts()){
            deletePost(p);
        }
    }




}
