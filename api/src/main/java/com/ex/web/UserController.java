package com.ex.web;

import com.ex.models.Post;
import com.ex.models.RegisterForm;
import com.ex.models.User;
import com.ex.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(path="/users")
public class UserController {
    private UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    @CrossOrigin
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity getAllUsers() {
        System.out.println("hit");
        System.out.println(this.service);
        try {
            return new ResponseEntity(this.service.getAllUsers(), HttpStatus.OK);
        } catch (EntityNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @CrossOrigin
    @GetMapping(path="/getUser/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity getOtherUser(@PathVariable String username) {
        try {
            User u = this.service.getUser(username);
            return new ResponseEntity(u, HttpStatus.OK);
        } catch (EntityNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin
    @GetMapping(path="/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity getUserByUsername(@PathVariable String username) {
        try {
            User u = this.service.logInUser(username);
            return new ResponseEntity(u, HttpStatus.OK);
        } catch (EntityNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @CrossOrigin
    @RequestMapping(value="/addNewUser", method = RequestMethod.POST, produces =  MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity getNewUser(@RequestBody RegisterForm form){
            User u = new User();
            u.setUsername(form.getUsername());
            u.setFirstName(form.getFirst_name());
            u.setLastName(form.getLast_name());
            u.setPassword(form.getPassword());
        try{
            return new ResponseEntity(this.service.getNewUser(u), HttpStatus.OK);
        }catch(EntityNotFoundException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @CrossOrigin
    @GetMapping(path="deleteUser/{username}", produces = MediaType.TEXT_PLAIN_VALUE)
    public String deleteUser(@PathVariable String username){

        this.service.deleteUser(username);
        return "deleted";

    }
    @CrossOrigin
    @PostMapping(path="{username}/apply/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity applyUser(@PathVariable int id, @PathVariable String username){
        try{
            return new ResponseEntity(this.service.applyUser(username,id), HttpStatus.OK);
        }catch(EntityNotFoundException ex){
            return new ResponseEntity(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @CrossOrigin
    @GetMapping(path="editUser/category/{username}/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity addCategoryUser(@PathVariable int id, @PathVariable String username){
        try{
            return new ResponseEntity(this.service.addCategory(id,username), HttpStatus.OK);
        }catch(EntityNotFoundException ex){
            return new ResponseEntity(ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    @CrossOrigin
    @PostMapping(path="addPost/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity addPostUser(@PathVariable int id, @RequestBody Post p){
        System.out.println(p);
        System.out.println("addPost");
        try {
            return new ResponseEntity(this.service.addPost(id, p), HttpStatus.OK);
        }catch(EntityNotFoundException ex){
            return new ResponseEntity(ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    @CrossOrigin
    @RequestMapping(path="checkCreds/{username}/{password}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity checkCreds(@PathVariable String username, @PathVariable String password){
        System.out.println(username);
        try {
            return new ResponseEntity(this.service.checkCreds(username,password), HttpStatus.OK);
        }catch(EntityNotFoundException ex){
            return new ResponseEntity(ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    @CrossOrigin
    @GetMapping(path="deleteApply/{username}/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity deleteApply(@PathVariable int id, @PathVariable String username){
        try {
            return new ResponseEntity(this.service.deleteApply(username,id), HttpStatus.OK);
        }catch(EntityNotFoundException ex){
            return new ResponseEntity(ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    @CrossOrigin
    @GetMapping(path="appliedUsers/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity getAppliedFromPost(@PathVariable int id){
        try{
            return new ResponseEntity(this.service.getAppliedUsers(id), HttpStatus.OK);
        }catch(EntityNotFoundException ex){
            return new ResponseEntity(ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    @CrossOrigin
    @GetMapping(path="poster/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity getPosterByPost(@PathVariable int id){
        try{
            return new ResponseEntity(this.service.getUserByPost(id), HttpStatus.OK);
        }catch(EntityNotFoundException ex){
            return new ResponseEntity(ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

}
