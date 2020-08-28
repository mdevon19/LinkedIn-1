import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-your-each-post',
  templateUrl: './your-each-post.component.html',
  styleUrls: ['./your-each-post.component.css']
})
export class YourEachPostComponent implements OnInit {

  @Input() post:Post;

  appliedUsers:User[];

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(u=>{
      this.setAppliedUsers(u);
      
    })
  }

  onApply(post:Post){

  }

  setAppliedUsers(users:User[]){
    this.appliedUsers = users;
    console.log(this.appliedUsers);
  }

}
