import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-each-category',
  templateUrl: './each-category.component.html',
  styleUrls: ['./each-category.component.css']
})
export class EachCategoryComponent implements OnInit {

  @Input() category:Category;
  @Output() onToggleEvent: EventEmitter<Category> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onToggle(category){
    category.toggle = !category.toggle;
    console.log(category);
    this.onToggleEvent.emit(category);
  }


}
