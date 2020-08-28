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
export class YourEachPostComponent implements OnInit {

  @Input() post:Post;

  appliedUsers:User[];

  constructor(private userService:UserService,
    private postService:PostService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(u=>{
      this.setAppliedUsers(u);
      
    })
  }

  onApply(post:Post){
    console.log("deleted");
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

  setAppliedUsers(users:User[]){
    this.appliedUsers = users;
    console.log(this.appliedUsers);
  }

}
