import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
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
export class WallComponent implements OnInit, DoCheck{

  @Input() filterCategories:Category[];
  @Input() showPosts:Post[];
  selectedCategory:Category;
  lengthCheck:number;
  allPosts:Post[];

  constructor(private userService: UserService,
    private postService: PostService,
    private categoryService:CategoryService) { }
  
  
    ngDoCheck(): void {

      console.log("changes");
      console.log(this.filterCategories.length);
    if(this.lengthCheck !== this.filterCategories.length){
      this.showPosts = [];
      console.log("changes if");
        for(let post of this.allPosts){
          let postCat = {
            id: post.postCat.id,
            title: post.postCat.title,
            toggle: true
          }

          post.postCat = postCat;
          for(let c of this.filterCategories){
            console.log(c.id);
            console.log(post.postCat.id);
            if(post.postCat.id === c.id){
              this.showPosts.push(post);
              console.log(this.showPosts);
            }
          }
        }
        this.lengthCheck = this.filterCategories.length;
    }

    if(this.filterCategories.length === 1){
      this.showPosts = this.allPosts;
    }
  }

  ngOnInit(): void {
    this.showPosts = [];

    this.selectedCategory = {
      id:1,
      title:"Developer",
      toggle:false
    }

    this.lengthCheck = this.filterCategories.length;

    console.log(this.filterCategories.length);
    
    this.postService.getAllPosts().subscribe(p =>{
        this.allPosts = p;
        this.showPosts = p;
      });
    

    

  }

  addPost(content){
    this.categoryService.getAllCategories().subscribe(c =>{
      let allCategories:Category[] = c;
      for(let cat of allCategories){
        if(cat.title === this.selectedCategory.title){
          let post:Post = {
            id:0,
            desc: content.value,
            postCat: cat
          }
          this.userService.addPost(post).subscribe(u=>{
            localStorage.setItem('user', JSON.stringify(u));
            this.allPosts.push(post);
          })
        }
      }
    })
   }

   onChangeEvent(c:Category){
      this.selectedCategory = c;
      
   }



  

}
