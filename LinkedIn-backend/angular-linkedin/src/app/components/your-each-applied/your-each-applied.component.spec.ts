import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourEachAppliedComponent } from './your-each-applied.component';

describe('YourEachAppliedComponent', () => {
  let component: YourEachAppliedComponent;
  let fixture: ComponentFixture<YourEachAppliedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourEachAppliedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourEachAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
