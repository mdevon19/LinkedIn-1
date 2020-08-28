import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourEachPostComponent } from './your-each-post.component';

describe('YourEachPostComponent', () => {
  let component: YourEachPostComponent;
  let fixture: ComponentFixture<YourEachPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourEachPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourEachPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
