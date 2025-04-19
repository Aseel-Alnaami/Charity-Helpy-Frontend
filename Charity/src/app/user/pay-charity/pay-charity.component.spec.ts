import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayCharityComponent } from './pay-charity.component';

describe('PayCharityComponent', () => {
  let component: PayCharityComponent;
  let fixture: ComponentFixture<PayCharityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayCharityComponent]
    });
    fixture = TestBed.createComponent(PayCharityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
