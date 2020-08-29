import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-each-category',
  templateUrl: './each-category.component.html',
  styleUrls: ['./each-category.component.css']
})

/**
 * This component holds used to hold one category and create a checkbox type input with it
 */
export class EachCategoryComponent implements OnInit {

  @Input() category:Category;
  @Output() onToggleEvent: EventEmitter<Category> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * This function gets called when a the checkbox is changed
   * It will change the toggle property of the category then emit the category up
   * @param category - the category that just got unchecked or checked
   * 
   */
  onToggle(category){
    category.toggle = !category.toggle;
    console.log(category);
    this.onToggleEvent.emit(category);
  }


}
