import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Post } from 'src/app/models/post';
import { UserService } from 'src/app/services/user.service';
import { EachPostComponent } from './each-post.component';
describe('EachPostComponent', () => {
  let component: EachPostComponent;
  let fixture: ComponentFixture<EachPostComponent>;
  beforeEach(() => {
    const userServiceStub = () => ({
      applyToPost: post => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EachPostComponent],
      providers: [{ provide: UserService, useFactory: userServiceStub }]
    });
    fixture = TestBed.createComponent(EachPostComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('onApply', () => {
    it('makes expected calls', () => {
      const postStub: Post = <any>{};
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(userServiceStub, 'applyToPost').and.callThrough();
      component.onApply(postStub);
      expect(userServiceStub.applyToPost).toHaveBeenCalled();
    });
  });
});