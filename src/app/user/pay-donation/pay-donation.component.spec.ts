import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayDonationComponent } from './pay-donation.component';

describe('PayDonationComponent', () => {
  let component: PayDonationComponent;
  let fixture: ComponentFixture<PayDonationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayDonationComponent]
    });
    fixture = TestBed.createComponent(PayDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
