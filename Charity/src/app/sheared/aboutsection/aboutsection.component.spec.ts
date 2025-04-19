import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutsectionComponent } from './aboutsection.component';

describe('AboutsectionComponent', () => {
  let component: AboutsectionComponent;
  let fixture: ComponentFixture<AboutsectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutsectionComponent]
    });
    fixture = TestBed.createComponent(AboutsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
