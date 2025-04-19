import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProblemsComponent } from './manage-problems.component';

describe('ManageProblemsComponent', () => {
  let component: ManageProblemsComponent;
  let fixture: ComponentFixture<ManageProblemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageProblemsComponent]
    });
    fixture = TestBed.createComponent(ManageProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
