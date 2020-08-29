import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Category } from 'src/app/models/category';
import { PostService } from 'src/app/services/post.service';
import { CategoryService } from 'src/app/services/category.service';
import { WallComponent } from './wall.component';
describe('WallComponent', () => {
  let component: WallComponent;
  let fixture: ComponentFixture<WallComponent>;
  beforeEach(() => {
    const userServiceStub = () => ({
      addPost: post => ({ subscribe: f => f({}) })
    });
    const postServiceStub = () => ({
      getAllPosts: () => ({ subscribe: f => f({}) })
    });
    const categoryServiceStub = () => ({
      getAllCategories: () => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [WallComponent],
      providers: [
        { provide: UserService, useFactory: userServiceStub },
        { provide: PostService, useFactory: postServiceStub },
        { provide: CategoryService, useFactory: categoryServiceStub }
      ]
    });
    fixture = TestBed.createComponent(WallComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const postServiceStub: PostService = fixture.debugElement.injector.get(
        PostService
      );
      spyOn(postServiceStub, 'getAllPosts').and.callThrough();
      component.ngOnInit();
      expect(postServiceStub.getAllPosts).toHaveBeenCalled();
    });
  });
});
