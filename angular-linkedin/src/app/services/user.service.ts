import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Post } from '../models/post';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
/**
 * This will be used to communicate will our backend to either capture or change data in our database
 */
export class UserService {


  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public realUser:User;

  constructor(     
    private router: Router,
    private http: HttpClient) { 

    }

    public get userValue(): User {
      return this.userSubject.value;
  }

  /**
   * This will return an observable that holds an array of every user in the database
   * 
   */
  getAllUsers(){
    return this.http.get<User[]>('http://localhost:8080/LinkedIn_backend_war_exploded/api/users');
  }

  /**
   * This will return an Observable that contains a user model of the specifc user
   * @param username - the ussername of the user
   * @param password - the password of the user
   */
getUser(username, password):Observable<User>{
    this.user = this.http.get<User>('http://localhost:8080/LinkedIn_backend_war_exploded/api/users/checkCreds/' + username +"/"+password);
    return this.user;
}
logout() {
  // remove user from local storage and set current user to null
  localStorage.removeItem('user');
  this.userSubject.next(null);
  this.router.navigate(['']);
}

/**
 * This will return a observable that holds an array of all users that applied to a post
 * @param p - the post that this will get the applied users of
 */
getApplyUsersByPost(p:Post):Observable<User[]>{
  return this.http.get<User[]>("http://localhost:8080/LinkedIn_backend_war_exploded/api/users/appliedUsers/"+p.id);
}

/**
 * This will create a new user into the database and return an observable that contains that new users data
 * @param formData - the form data that holds the username, password, first name, and last name of the new user
 */
register(formData:any): Observable<User> {
  return this.http.post<User>("http://localhost:8080/LinkedIn_backend_war_exploded/api/users/addNewUser",formData);
}

/**
 * This will apply a user to a post in our database and return an observable of the updated user data
 * @param post - the post the user is applying to
 */
applyToPost(post:Post):Observable<User>{
  return this.http.post<User>("http://localhost:8080/LinkedIn_backend_war_exploded/api/users/"+JSON.parse(localStorage.getItem('user')).username +"/apply/"+post.id,post);
}

/**
 * This will add a post to our database and return an observable that holds the uodated user data
 * @param post - the post that is being added
 */
addPost(post:Post):Observable<User>{
  console.log(post);
  return this.http.post<User>("http://localhost:8080/LinkedIn_backend_war_exploded/api/users/addPost/"+JSON.parse(localStorage.getItem('user')).id,post);
}

/**
 * this will return an observable of the user data associated with the id
 * @param id - the id of the user
 */
getUserById(id:number){
  return this.http.get<User>("http://localhost:8080/LinkedIn_backend_war_exploded/api/users/"+id);
}
}
