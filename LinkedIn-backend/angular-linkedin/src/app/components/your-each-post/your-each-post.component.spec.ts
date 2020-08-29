import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Post } from 'src/app/models/post';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { YourEachPostComponent } from './your-each-post.component';
describe('YourEachPostComponent', () => {
  let component: YourEachPostComponent;
  let fixture: ComponentFixture<YourEachPostComponent>;
  beforeEach(() => {
    const userServiceStub = () => ({
      getApplyUsersByPost: post => ({ subscribe: f => f({}) }),
      getUserById: id => ({ subscribe: f => f({}) })
    });
    const postServiceStub = () => ({
      deletePost: post => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [YourEachPostComponent],
      providers: [
        { provide: UserService, useFactory: userServiceStub },
        { provide: PostService, useFactory: postServiceStub }
      ]
    });
    fixture = TestBed.createComponent(YourEachPostComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(component, 'setAppliedUsers').and.callThrough();
      spyOn(userServiceStub, 'getApplyUsersByPost').and.callThrough();
      component.ngOnInit();
      expect(component.setAppliedUsers).toHaveBeenCalled();
      expect(userServiceStub.getApplyUsersByPost).toHaveBeenCalled();
    });
  });
});