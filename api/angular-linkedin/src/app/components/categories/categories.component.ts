import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

/**
 * This component will be used to contain a list of all categories in a checklist
 * It will also capture the emitted event from each category when they are checked on or off
 * 
 */
export class CategoriesComponent implements OnInit {

  @Output() onToggle: EventEmitter<Category> = new EventEmitter();
  DBCategories:Category[];
  allCategories:Category[];

  constructor(private categoryService: CategoryService) { }

  /**
   * This will set the category arrays as new arrays and then populate them by
   * using the category service to grab data from the backend
   * 
   */
  ngOnInit(): void {
    this.allCategories = [];
    this.DBCategories = [];

    this.categoryService.getAllCategories().subscribe(c =>{
      this.DBCategories = c;

      this.setCategories(c);
    })
  }

  /**
   * This will set the allCategories array, which will be used to render each category 
   * @param cat - an array of type category
   * 
   */
  setCategories(cat:Category[]){
    for(let c of cat ){
      this.allCategories.push({
        id:c.id,
        title:c.title,
        toggle:false
      })
  }
  }

  /**
   * This will be triggered when a category is checked and emits that event up to this component
   * It will emit the event up to the home component to handle
   * 
   * @param category - a category that has just been checked or unchecked
   */
  onToggleEvent(category: Category){
    console.log(category);
    this.onToggle.emit(category);
  }

}
