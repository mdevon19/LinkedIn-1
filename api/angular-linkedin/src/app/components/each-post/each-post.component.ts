import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-each-post',
  templateUrl: './each-post.component.html',
  styleUrls: ['./each-post.component.css']
})
/**
 * This holds each post and is in charge of dealing with when a user applys
 * 
 */
export class EachPostComponent implements OnInit {

  @Input() post:Post;
  @Output() onToggleEvent: EventEmitter<Post> = new EventEmitter();
  user:User;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    console.log(this.post);
    this.userService.getPosterByPost(this.post).subscribe(u=>{
      this.user = u;
      console.log(this.user);
    })
  }

  /**
   * This function gets called when a user applys to a post
   * It sends the request to the backend using the user service and then captures the new user data
   * @param post - the post the user just applied to
   * 
   */
  onApply(post:Post){
    console.log("applying");
    this.userService.applyToPost(post).subscribe(u=>{
      localStorage.setItem('user', JSON.stringify(u));
      console.log(u);
    });
  }

}
