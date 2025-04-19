import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentContactComponent } from './sent-contact.component';

describe('SentContactComponent', () => {
  let component: SentContactComponent;
  let fixture: ComponentFixture<SentContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SentContactComponent]
    });
    fixture = TestBed.createComponent(SentContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
