import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
/**
 * This is used to get any post data from our backend
 */
export class PostService {

    public apiUrl: string = window.location.protocol + "//" + window.location.host + "/api";


  constructor(private http:HttpClient) { }

  /**
   * This will return an Observable that holds an array of all the posts in our database
   */
  getAllPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.apiUrl + '/posts');

    // return this.http.get<Post[]>("http://localhost:8080/api/posts");
  }

  /**
   * This will return an observable that holds an array of all the posts of a certain user
   * @param u - the user to get the posts of
   */
  getPostsForUser(u:User): Observable<Post[]>{
    return this.http.get<Post[]>(this.apiUrl +'/posts/poster/'+u.id);


    // return this.http.get<Post[]>("http://localhost:8080/api/posts/poster/"+u.id);
  }

  /**
   * This will return an observable that holds a string that will say "deleted" if deleted and "not-deleted" if it wasn't
   * @param p - the post to delete
   */
  deletePost(p:Post): Observable<string>{
    return this.http.get<string>(this.apiUrl +'/posts/delete/' + p.id);

    // return this.http.get<string>("http://localhost:8080/api/posts/delete/" + p.id);
  }

  /**
   * This will return an observable that holds an array of posts that a user applied to
   * @param u - the user to get the applied post of
   */
  appliedPosts(u:User): Observable<Post[]>{
    return this.http.get<Post[]>(this.apiUrl +'/posts/applied/'+u.username);

    // return this.http.get<Post[]>("http://localhost:8080/api/posts/applied/"+u.username);
  }

}
