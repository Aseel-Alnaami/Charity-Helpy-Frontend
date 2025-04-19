import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDonationComponent } from './create-donation.component';

describe('CreateDonationComponent', () => {
  let component: CreateDonationComponent;
  let fixture: ComponentFixture<CreateDonationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDonationComponent]
    });
    fixture = TestBed.createComponent(CreateDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
