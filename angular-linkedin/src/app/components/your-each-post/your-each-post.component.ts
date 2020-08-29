import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-your-each-post',
  templateUrl: './your-each-post.component.html',
  styleUrls: ['./your-each-post.component.css']
})
/**
 * This component is in charge of each post of the user 
 */
export class YourEachPostComponent implements OnInit {

  @Input() post:Post;

  appliedUsers:User[];
  appliedLength:number;

  constructor(private userService:UserService,
    private postService:PostService) { }

    /**
     * This captures all of the users thats applied to the post using the user service
     */
  ngOnInit(): void {
    this.userService.getApplyUsersByPost(this.post).subscribe(u=>{
      this.setAppliedUsers(u);
      this.appliedLength = this.appliedUsers.length;
    })
  }

  /**
   * This runs when the user accepts an applicant of their post
   * It will delete the post from the database using the post service,
   * then capture the new user data in sends back
   * @param post 
   */
  onApply(post:Post){
    console.log("deleted");
    if(this.appliedUsers.length !== 0){
    this.postService.deletePost(post).subscribe(p=>{
      if(p === "deleted"){
        console.log("deleted");
        this.userService.getUserById(JSON.parse(localStorage.getItem('user')).id).subscribe(u=>{
            localStorage.setItem('user',JSON.stringify(u));
            location.reload();
        });
      }
    })
  }
  }

  /**
   * This sets the appliedUsers array
   * @param users - an array of type User
   */
  setAppliedUsers(users:User[]){
    this.appliedUsers = users;
    console.log(this.appliedUsers);
  }

}
