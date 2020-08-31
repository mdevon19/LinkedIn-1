package com.ex.models;

import org.hibernate.annotations.Proxy;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * This is a POJO the should represent a user in our application
 * It uses hibernate to set up the design implemented in our database
 *
 * id - the id of the user, a generated value from the database
 * username - the username of the user
 * password - the password of the user
 * firstName - the first name of the user
 * lastName - the last name of the user
 * email - the email of the user
 * userCats - a set of categories that represents the categories of the user
 * appliedPosts - a set of posts that represents the posts the user applied to
 * userPosts - a set of posts that represents the posts that the user posted
 *
 */
@Entity
@Table(name = "users", schema = "linkedin")
@Proxy(lazy = false)
public class User {

    @Id
    @Column(name="id", columnDefinition ="serial primary key")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="username")
    private String username;

    @Column(name="hash")
    private String password;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="email")
    private String email;

    @ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}, fetch=FetchType.EAGER)
    @JoinTable(
            name = "user_categories",
            joinColumns = { @JoinColumn(name = "user_id",  referencedColumnName="id", columnDefinition="INT") },
            inverseJoinColumns = { @JoinColumn(name = "cat_id",  referencedColumnName="id", columnDefinition="INT") }
    )
    private Set<Category> userCats;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}, fetch=FetchType.EAGER)
    @JoinTable(
            name = "applied",
            joinColumns = { @JoinColumn(name = "user_id",  referencedColumnName="id", columnDefinition="INT") },
            inverseJoinColumns = { @JoinColumn(name = "post_id",  referencedColumnName="id", columnDefinition="INT") }
    )
    private Set<Post> appliedPosts;

    @OneToMany(mappedBy = "poster", cascade = CascadeType.ALL, orphanRemoval = true, fetch=FetchType.EAGER)
    private Set<Post> userPosts;

    public User(String username, String password, String firstName, String lastName, String email, Set<Category> userCats, Set<Post> appliedPosts, Set<Post> userPosts) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.userCats = userCats;
        this.appliedPosts = appliedPosts;
        this.userPosts = userPosts;
    }

    public User(){
        userCats = new HashSet<Category>();
        appliedPosts = new HashSet<Post>();
        userPosts = new HashSet<Post>();
    }

    public void deleteApplied(Post p){
        for( Post post : appliedPosts){
            if(post.getId() == p.getId()){
                appliedPosts.remove(p);
            }
        }
    }

    public Set<Category> getUserCats() {
        return userCats;
    }

    public void setUserCats(Set<Category> userCats) {
        this.userCats = userCats;
    }

    public Set<Post> getAppliedPosts() {
        return appliedPosts;
    }

    public void setAppliedPosts(Set<Post> appliedPosts) {
        this.appliedPosts = appliedPosts;
    }

    public Set<Post> getUserPosts() {
        return userPosts;
    }

    public void setUserPosts(Set<Post> userPosts) {
        this.userPosts = userPosts;
    }

    public int getId() {
        return id;
    }


    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public void addAppliedPosts(Post p) {
        appliedPosts.add(p);
    }

    public void addCat(Category cat) {
        userCats.add(cat);
    }

    public void addPostedPost(Post p) {
        userPosts.add(p);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", userCats=" + userCats +
                ", appliedPosts=" + appliedPosts +
                ", userPosts=" + userPosts +
                '}';
    }
}
