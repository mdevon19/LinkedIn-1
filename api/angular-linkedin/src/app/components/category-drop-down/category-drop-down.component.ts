import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-drop-down',
  templateUrl: './category-drop-down.component.html',
  styleUrls: ['./category-drop-down.component.css']
})

/**
 * This component creates and handles the functionality of a drop down that contains all the categories
 * 
 */
export class CategoryDropDownComponent implements OnInit {

  allCategories:Category[];
  @Output() onChangeEvent: EventEmitter<Category> = new EventEmitter();

  constructor(private categoryService:CategoryService) { }

  /**
   * when this is created, it will populate the allCategories array with all the categories it 
   * recieves from the category service
   * 
   */
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(c=>{
      this.setCategories(c);
    })
  }

  /**
   * This will set the allCategories array
   * @param c - a category type array
   * 
   */
  setCategories(c:Category[]){
    this.allCategories = c;
  }

  /**
   * This captures when the drop down selected category has changed
   * It will find out which category was selected and then emit the event up
   * @param event - the event of changing the selected category in the drop down
   * 
   */
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
