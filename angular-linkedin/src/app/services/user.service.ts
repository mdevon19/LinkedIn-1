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

  getAllUsers(){
    return this.http.get<User[]>('http://localhost:8080/LinkedIn_backend_war_exploded/api/users');
  }

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

getApplyUsersByPost(p:Post):Observable<User[]>{
  return this.http.get<User[]>("getApplied");
}

register(firstName, lastName, username, password): Observable<User> {
  throw new Error("Method not implemented.");
}

applyToPost(post:Post):Observable<User>{
  return this.http.get<User>("http://localhost:8080/LinkedIn_backend_war_exploded/api/users/"+JSON.parse(localStorage.getItem('user')).username +"/apply/"+post.id);
}

addPost(post:Post):Observable<User>{
  return this.http.get<User>("http://localhost:8080/LinkedIn_backend_war_exploded/api/users/addPost"+JSON.parse(localStorage.getItem('user')).id);
}
}
