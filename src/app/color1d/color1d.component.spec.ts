import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Color1dComponent } from './color1d.component';

describe('Color1dComponent', () => {
  let component: Color1dComponent;
  let fixture: ComponentFixture<Color1dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Color1dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Color1dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
