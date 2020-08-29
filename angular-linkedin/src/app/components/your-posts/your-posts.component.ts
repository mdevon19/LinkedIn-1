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

  constructor(private postService:PostService) { }

  /**
   * This captures all the posts of the user using the post service
   */
  ngOnInit(): void {
    this.posts = [];
    
    this.postService.getAllPosts().subscribe(p=>{
      this.setPosts(p);
    })

  }

  /**
   * This sets the posts array
   * @param posts - an array of type Post
   */
  setPosts(posts:Post[]){
    this.posts = posts;
    console.log(this.posts);
  }

}
