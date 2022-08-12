import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStaffPositionComponent } from './add-edit-staff-position.component';

describe('AddEditStaffPositionComponent', () => {
  let component: AddEditStaffPositionComponent;
  let fixture: ComponentFixture<AddEditStaffPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditStaffPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditStaffPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
