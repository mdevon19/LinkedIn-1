import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { YourPostsComponent } from './your-posts.component';
describe('YourPostsComponent', () => {
  let component: YourPostsComponent;
  let fixture: ComponentFixture<YourPostsComponent>;
  beforeEach(() => {
    const postServiceStub = () => ({
      getAllPosts: () => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [YourPostsComponent],
      providers: [{ provide: PostService, useFactory: postServiceStub }]
    });
    fixture = TestBed.createComponent(YourPostsComponent);
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
      spyOn(component, 'setPosts').and.callThrough();
      spyOn(postServiceStub, 'getAllPosts').and.callThrough();
      component.ngOnInit();
      expect(component.setPosts).toHaveBeenCalled();
      expect(postServiceStub.getAllPosts).toHaveBeenCalled();
    });
  });
});

