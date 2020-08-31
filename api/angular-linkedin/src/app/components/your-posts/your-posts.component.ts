import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-your-posts',
  templateUrl: './your-posts.component.html',
  styleUrls: ['./your-posts.component.css']
})
/**
 * This component is in charge of the your post page and each post component
 * 
 */
export class YourPostsComponent implements OnInit {
  posts:Post[];
  appliedPosts:Post[];

  constructor(private postService:PostService) { }

  /**
   * This captures all the posts of the user using the post service
   * Also captures all the applied posts of the user
   */
  ngOnInit(): void {
    this.posts = [];
    
    this.postService.getPostsForUser(JSON.parse(localStorage.getItem('user'))).subscribe(p=>{
      this.setPosts(p);
      this.postService.appliedPosts(JSON.parse(localStorage.getItem('user'))).subscribe(a=>{
        this.setAppliedPosts(a);
      })
    })

  }

  /**
   * Sets the appliedPosts array
   * @param a - an array of type Post
   */
  setAppliedPosts(a: Post[]) {
    this.appliedPosts = a;
    console.log(this.appliedPosts);
  }

  /**
   * This sets the posts array
   * @param posts - an array of type Post
   */
  setPosts(posts:Post[]){
    this.posts = posts;
    console.log(this.posts);
  }

  onDeleteEvent(post:Post){
    let index = 0;
    for(let p of this.appliedPosts){
      if(p.id === post.id){
        this.appliedPosts.splice(index,1);
      }
      index = index + 1;
    }
  }

  onApplyEvent(post:Post){
    let index = 0;
    for(let p of this.posts){
      if(p.id === post.id){
        this.posts.splice(index,1);
      }
      index = index + 1;
    }
  }

}
