import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-your-each-applied',
  templateUrl: './your-each-applied.component.html',
  styleUrls: ['./your-each-applied.component.css']
})
export class YourEachAppliedComponent implements OnInit {

  @Input() post:Post;
  user:User;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPosterByPost(this.post).subscribe(u=>{
      this.user = u;
    })
  }

  /**
   * This will delete an application to a post for the user
   * @param post - the post the user wants to unapply to
   */
  onDelete(post:Post){
    this.userService.deleteApply(post.id,JSON.parse(localStorage.getItem('user'))).subscribe(u=>{
      localStorage.setItem('user',JSON.stringify(u));
      location.reload();
    })
  }

}
