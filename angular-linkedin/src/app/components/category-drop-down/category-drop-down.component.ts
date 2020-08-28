import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-drop-down',
  templateUrl: './category-drop-down.component.html',
  styleUrls: ['./category-drop-down.component.css']
})
export class CategoryDropDownComponent implements OnInit {

  allCategories:Category[];

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(c=>{
      this.setCategories(c);
    })
  }

  setCategories(c:Category[]){
    this.allCategories = c;
  }

}
