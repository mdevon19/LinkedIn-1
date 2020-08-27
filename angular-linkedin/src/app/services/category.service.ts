import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../_models/Category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  allCategories:Category[];
  dbCategories: any[];

  allCategoryUrl:string = 'http://localhost:8080/LinkedIn_backend_war_exploded/api/categories';

  constructor(private http:HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.allCategoryUrl);

  }
}
