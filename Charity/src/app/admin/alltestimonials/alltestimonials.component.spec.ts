import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltestimonialsComponent } from './alltestimonials.component';

describe('AlltestimonialsComponent', () => {
  let component: AlltestimonialsComponent;
  let fixture: ComponentFixture<AlltestimonialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlltestimonialsComponent]
    });
    fixture = TestBed.createComponent(AlltestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
