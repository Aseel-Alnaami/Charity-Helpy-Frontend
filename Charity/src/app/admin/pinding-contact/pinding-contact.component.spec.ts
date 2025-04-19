import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PindingContactComponent } from './pinding-contact.component';

describe('PindingContactComponent', () => {
  let component: PindingContactComponent;
  let fixture: ComponentFixture<PindingContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PindingContactComponent]
    });
    fixture = TestBed.createComponent(PindingContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
