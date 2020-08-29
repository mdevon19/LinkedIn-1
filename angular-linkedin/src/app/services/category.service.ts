import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
/**
 * THis is used to get category data from our backend
 */
export class CategoryService {

  allCategories:Category[];
  dbCategories: any[];

  allCategoryUrl:string = 'http://localhost:8080/LinkedIn_backend_war_exploded/api/categories';

  constructor(private http:HttpClient) { }

  /**
   * This is used to get an observable of a category array that holds all categories
   * in our database
   */
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.allCategoryUrl);

  }
}
