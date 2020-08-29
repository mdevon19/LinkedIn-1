import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryDropDownComponent } from './category-drop-down.component';
describe('CategoryDropDownComponent', () => {
  let component: CategoryDropDownComponent;
  let fixture: ComponentFixture<CategoryDropDownComponent>;
  beforeEach(() => {
    const categoryServiceStub = () => ({
      getAllCategories: () => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CategoryDropDownComponent],
      providers: [{ provide: CategoryService, useFactory: categoryServiceStub }]
    });
    fixture = TestBed.createComponent(CategoryDropDownComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const categoryServiceStub: CategoryService = fixture.debugElement.injector.get(
        CategoryService
      );
      spyOn(component, 'setCategories').and.callThrough();
      spyOn(categoryServiceStub, 'getAllCategories').and.callThrough();
      component.ngOnInit();
      expect(component.setCategories).toHaveBeenCalled();
      expect(categoryServiceStub.getAllCategories).toHaveBeenCalled();
    });
  });
});