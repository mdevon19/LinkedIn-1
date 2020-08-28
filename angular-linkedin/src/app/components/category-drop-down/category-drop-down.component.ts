import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-drop-down',
  templateUrl: './category-drop-down.component.html',
  styleUrls: ['./category-drop-down.component.css']
})
export class CategoryDropDownComponent implements OnInit {

  allCategories:Category[];
  @Output() onChangeEvent: EventEmitter<Category> = new EventEmitter();

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(c=>{
      this.setCategories(c);
    })
  }

  setCategories(c:Category[]){
    this.allCategories = c;
  }

  onChange(event: any){
    console.log(event.target.value);
    this.categoryService.getAllCategories().subscribe(c=>{
      let allCats:Category[] = c;
      for(let cat of allCats){
        if(event.target.value === cat.title){
          this.onChangeEvent.emit(cat);
        }
      }
    })
  }

}
