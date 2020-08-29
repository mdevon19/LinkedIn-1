import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Category } from 'src/app/models/category';
import { PostService } from 'src/app/services/post.service';
import { HomeComponent } from './home.component';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  beforeEach(() => {
    const postServiceStub = () => ({
      getAllPosts: () => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent],
      providers: [{ provide: PostService, useFactory: postServiceStub }]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  
});