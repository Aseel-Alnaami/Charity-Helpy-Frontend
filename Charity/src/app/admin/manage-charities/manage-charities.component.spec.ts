import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCharitiesComponent } from './manage-charities.component';

describe('ManageCharitiesComponent', () => {
  let component: ManageCharitiesComponent;
  let fixture: ComponentFixture<ManageCharitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCharitiesComponent]
    });
    fixture = TestBed.createComponent(ManageCharitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
