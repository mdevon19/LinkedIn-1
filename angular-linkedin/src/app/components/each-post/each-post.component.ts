import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-each-post',
  templateUrl: './each-post.component.html',
  styleUrls: ['./each-post.component.css']
})
export class EachPostComponent implements OnInit {

  @Input() post:Post;
  @Output() onToggleEvent: EventEmitter<Post> = new EventEmitter();

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  onApply(post:Post){
    console.log("applying");
    this.userService.applyToPost(post).subscribe(u=>{
      localStorage.setItem('user', JSON.stringify(u));
      console.log(u);
    });
  }

}
