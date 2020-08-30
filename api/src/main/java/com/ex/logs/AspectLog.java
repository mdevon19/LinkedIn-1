package com.ex.logs;

import com.ex.dao.Dao;
import com.ex.dao.HibDao;
import com.ex.models.Category;
import com.ex.models.Post;
import com.ex.models.User;

import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * This class will be using Spring AOP to add logs to the database when a certain events occur
 *
 *
 */
public class AspectLog {

    private Dao dao;

    @Autowired
    public AspectLog(HibDao dao){
        this.dao = dao;

    }

    /**
     * This method will be used to around the login to log when a user trys to log in
     * It will log when the user tried to log in and  log if it was a fail or  a success
     *
     * @param pjp - the ProceedingJoinPoint that is around the LogIn method in the UserService
     */
    public void aroundLogIn(ProceedingJoinPoint pjp){

        String m = null;
        String username = (String)pjp.getArgs()[0];
//        m = username + " tried to log in";
//        dao.addLog(m);

        try{
            Object user = pjp.proceed();

            if(user == null){
//                dao.addLog(username + " failed to log in");
            }
            else{
//                dao.addLog(username + " successfully logged in");

            }

        }catch(Throwable throwable){
            throwable.printStackTrace();
        }
    }

    /**
     * This method will be used to log when a user tries to create an account
     * It will log when they tried to create an account and log if it was a success or a failure
     *
     * @param user - the user object that represents the user that is trying to create an account
     */
    public void afterCreateAcc(User user){

        if(user.getUsername() == null){
            dao.addLog("user failed to create an account");
        }else{
            dao.addLog("user made new account: " + user.getUsername());
        }
    }

    /**
     * This method will be used to log when a user tries to post a post
     * It will log the username and what the post id of the post is
     *
     * @param pjp - the ProceedingJoinPoint that is around the addPost in the UserService
     */
    public void aroundPost(ProceedingJoinPoint pjp){

        String username = (String)pjp.getArgs()[0];
        Post p = (Post)pjp.getArgs()[1];

        try{
            User u = (User) pjp.proceed();
            for(Post post: u.getUserPosts()){
                if(post.getId() == p.getId()){
                    dao.addLog(username + " posted a post with an id: " + p.getId());
                }
            }
        }catch(Throwable throwable){
            throwable.printStackTrace();
        }

    }

    /**
     * This will be used when a user tries to apply to a post
     * It will log the username of the user and the id of the post they are applying to
     *
     * @param pjp - the ProceedingJoinPoint that is around the applyUser in the UserService
     */
    public void aroundApply(ProceedingJoinPoint pjp){

        String username = (String)pjp.getArgs()[0];
        int p = (int)pjp.getArgs()[1];

        try{
            User u = (User) pjp.proceed();

            for(Post post: u.getAppliedPosts()){
                if(p == post.getId()){
                    dao.addLog(username + " applied to a post with an id: " + p);
                }
            }

        }catch(Throwable throwable){
            throwable.printStackTrace();
        }
    }

    /**
     * This will be used to log when a user unapplies to a post
     * It will log the username of the user and the id of the post
     *
     * @param pjp - the ProceedingJoinPoint that is around the deleteApply in the UserService
     */
    public void aroundDeleteApply(ProceedingJoinPoint pjp){

        String username = (String)pjp.getArgs()[0];
        Post p = (Post)pjp.getArgs()[1];
        boolean delete = true;

        try{
            User u = (User) pjp.proceed();

            for(Post post: u.getAppliedPosts()){
                if(p.getId() == post.getId()){
                    delete = false;
                }
            }

        }catch(Throwable throwable){
            throwable.printStackTrace();
        }

        if(delete){
            dao.addLog(username + " deleted application to a post with an id: " + p.getId());
        }
    }

    /**
     * This will be used to log when a user tries to add a category to their account
     * It will log the username of the user and the title of the category
     *
     * @param pjp - the ProceedingJoinPoint that is around the addCategory in the UserService
     */
    public void aroundAddCategory(ProceedingJoinPoint pjp){

        String username = (String)pjp.getArgs()[1];
        int id = (int)pjp.getArgs()[1];

        try{
            User u = (User) pjp.proceed();

            for(Category c : u.getUserCats()){
                if(c.getId() == id){
                    dao.addLog(username + " added " + c.getTitle() + " to their categories");
                }
            }

        }catch(Throwable throwable){
            throwable.printStackTrace();
        }
    }

}
