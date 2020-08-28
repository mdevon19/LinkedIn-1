import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/app/models/post';
import { Category } from 'src/app/models/category';
import { PostService } from 'src/app/services/post.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  @Input() showPosts:Post[];

  constructor(private userService: UserService,
    private postService: PostService,
    private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.showPosts = [];

    this.postService.getAllPosts().subscribe(p =>{
      this.showPosts = p;
    })
  }

  addPost(category_name,content){
    this.categoryService.getAllCategories().subscribe(c =>{
      let allCategories:Category[] = c;
      for(let cat of allCategories){
        if(cat.title === category_name){
          let post:Post = {
            id:0,
            desc: content,
            postCat: cat
          }
          this.userService.addPost(post).subscribe(u=>{
            localStorage.setItem('user', JSON.stringify(u));
          })
        }
      }
    })
   }

  

}
