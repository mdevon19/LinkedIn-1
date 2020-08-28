import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  getAllPosts(): Observable<Post[]>{
    return this.http.get<Post[]>("http://localhost:8080/LinkedIn_backend_war_exploded/api/posts");
  }

  getPostsForUser(u:User): Observable<Post[]>{
    return this.http.get<Post[]>("http://localhost:8080/LinkedIn_backend_war_exploded/api/posts/poster/"+u.id);
  }

  deletePost(p:Post): Observable<any>{
    return this.http.get<any>("http://localhost:8080/LinkedIn_backend_war_exploded/api/posts/delete/" + p.id);
  }
}
