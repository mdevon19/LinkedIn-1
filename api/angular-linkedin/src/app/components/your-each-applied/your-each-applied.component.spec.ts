// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { Post } from 'src/app/models/post';
// import { UserService } from 'src/app/services/user.service';
// import { YourEachAppliedComponent } from './your-each-applied.component';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// describe('YourEachAppliedComponent', () => {
//   let component: YourEachAppliedComponent;
//   let fixture: ComponentFixture<YourEachAppliedComponent>;
//   beforeEach(() => {
//     const userServiceStub = () => ({
//       getPosterByPost: post => ({ subscribe: f => f({}) }),
//       deleteApply: (id, arg) => ({ subscribe: f => f({}) })
//     });
//     TestBed.configureTestingModule({

//       schemas: [NO_ERRORS_SCHEMA],
//       declarations: [YourEachAppliedComponent],
//       providers: [{ provide: UserService, useFactory: userServiceStub }],
//       imports: [ HttpClientTestingModule, RouterTestingModule]
//     });
//     fixture = TestBed.createComponent(YourEachAppliedComponent);
//     component = fixture.componentInstance;
//   });
//   it('can load instance', () => {
//     expect(component).toBeTruthy();
//   });
//   describe('onDelete', () => {
//     it('makes expected calls', () => {
//       const postStub: Post = <any>{};
//       const userServiceStub: UserService = fixture.debugElement.injector.get(
//         UserService
//       );
//       spyOn(userServiceStub, 'deleteApply').and.callThrough();
//       component.onDelete(postStub);
//       expect(userServiceStub.deleteApply).toHaveBeenCalled();
//     });
//   });
//   describe('ngOnInit', () => {
//     it('makes expected calls', () => {
//       const userServiceStub: UserService = fixture.debugElement.injector.get(
//         UserService
//       );
//       spyOn(userServiceStub, 'getPosterByPost').and.callThrough();
//       component.ngOnInit();
//       expect(userServiceStub.getPosterByPost).toHaveBeenCalled();
//     });
//   });
// });
