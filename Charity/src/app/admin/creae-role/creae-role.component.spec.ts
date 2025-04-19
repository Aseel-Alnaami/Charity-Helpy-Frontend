import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaeRoleComponent } from './creae-role.component';

describe('CreaeRoleComponent', () => {
  let component: CreaeRoleComponent;
  let fixture: ComponentFixture<CreaeRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaeRoleComponent]
    });
    fixture = TestBed.createComponent(CreaeRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
