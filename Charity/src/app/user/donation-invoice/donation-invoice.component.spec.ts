import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationInvoiceComponent } from './donation-invoice.component';

describe('DonationInvoiceComponent', () => {
  let component: DonationInvoiceComponent;
  let fixture: ComponentFixture<DonationInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonationInvoiceComponent]
    });
    fixture = TestBed.createComponent(DonationInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
