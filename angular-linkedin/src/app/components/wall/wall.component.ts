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
/**
 * This component is in charge of the components and functionality
 * of the full wall page
 * 
 */
export class WallComponent implements OnInit, DoCheck{

  @Input() filterCategories:Category[];
  @Input() showPosts:Post[];
  selectedCategory:Category;
  lengthCheck:number;
  allPosts:Post[];

  constructor(private userService: UserService,
    private postService: PostService,
    private categoryService:CategoryService) { }
  
  
    /**
     * This will check if the filterCategories has changed, if so it will 
     * filter the posts based on the categories inside the filterCategories array
     * It will then change the lengthCheck to the length of the filterCategories
     * 
     */
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

  /**
   * This will set the selectedCategory as the Developer category 
   * Then get all the posts and capture them from the post service
   */
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

  /**
   * This will run when a user tries to add a post
   * It will capture the category and content of the post
   * Then it will add the post to the database by using
   * the user service and capture the new user data
   * @param content 
   * 
   */
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

   /**
    * This will run when the user changes the category in the drop down
    * It will set the selectedCategory as that new category
    * @param c - the category that was just selected
    */
   onChangeEvent(c:Category){
      this.selectedCategory = c;
      
   }



  

}
