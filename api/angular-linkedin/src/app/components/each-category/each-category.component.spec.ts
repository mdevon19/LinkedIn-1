import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EachCategoryComponent } from './each-category.component';
describe('EachCategoryComponent', () => {
  let component: EachCategoryComponent;
  let fixture: ComponentFixture<EachCategoryComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EachCategoryComponent]
    });
    fixture = TestBed.createComponent(EachCategoryComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
