import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Output() onToggle: EventEmitter<Category> = new EventEmitter();
  DBCategories:Category[];
  allCategories:Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.allCategories = [];
    this.DBCategories = [];

    this.categoryService.getAllCategories().subscribe(c =>{
      this.DBCategories = c;

      this.setCategories(c);
    })
  }

  setCategories(cat:Category[]){
    for(let c of cat ){
      this.allCategories.push({
        id:c.id,
        title:c.title,
        toggle:false
      })
  }
  }

  onToggleEvent(category: Category){
    console.log(category);
    this.onToggle.emit(category);
  }

}
