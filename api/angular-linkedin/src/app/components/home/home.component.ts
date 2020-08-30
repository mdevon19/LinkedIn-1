import { Component, OnInit, Input, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
/**
 * This component is used to contain all components that are inside the home html page
 */
export class HomeComponent implements OnInit {

  allPosts:Post[];
  showPosts:Post[];

  @Output() filterCategories:Category[];
  @Input() category: Category;

  /**
   * It sets the filterCategories array to a run sized array with a defualt category
   * @param postService 
   */
  constructor(private postService:PostService) { 
    this.filterCategories = [{
      id:0,
      title:'init',
      toggle:false
    }]
  }

  /**
   * when created this components caprues all posts in the database using the post service
   * 
   */
  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(p=>{
      this.allPosts = p;
      this.filterPosts();
    })
  }

  /**
   * This function is run when the categories component emits a category up to here
   * It will push or remove teh category from the filterCategories depending on if
   * the toggle property is true or false
   * @param category - the category that was just selected or unselected
   */
  onToggle(category:Category){
    if(category.toggle){
      this.filterCategories.push(category);
      console.log("if");
    }
    else{
      const index = this.filterCategories.indexOf(category, 0);
      if (index > -1) {
       this.filterCategories.splice(index, 1);
       console.log("splice");
      }
      console.log("else");
    }

    console.log(this.filterCategories);
    console.log(category);

    this.filterPosts();
    
  }

  /**
   * This function filters the posts to only show the posts of the catgories selected
   */
  filterPosts(){
    this.showPosts = [];

    for(let p of this.allPosts){
      if(this.filterCategories.includes(p.postCat)){
        this.showPosts.push(p);
      }
    }
  }

}
