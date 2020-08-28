import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allPosts:Post[];
  showPosts:Post[];

  filterCategories:Category[];
  @Input() category: Category;

  constructor(private postService:PostService) { 
    this.filterCategories = [{
      id:0,
      title:'init',
      toggle:false
    }]
  }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(p=>{
      this.allPosts = p;
      this.filterPosts();
    })
  }

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

  filterPosts(){
    this.showPosts = [];

    for(let p of this.allPosts){
      if(this.filterCategories.includes(p.postCat)){
        this.showPosts.push(p);
      }
    }
  }

}
