import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-your-posts',
  templateUrl: './your-posts.component.html',
  styleUrls: ['./your-posts.component.css']
})
export class YourPostsComponent implements OnInit {
  posts:Post[];

  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.posts = [];
    
    this.postService.getAllPosts().subscribe(p=>{
      this.setPosts(p);
    })

  }

  setPosts(posts:Post[]){
    this.posts = posts;
    console.log(this.posts);
  }

}
