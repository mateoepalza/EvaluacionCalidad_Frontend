import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesItemComponent } from './employees-item.component';

describe('EmployeesItemComponent', () => {
  let component: EmployeesItemComponent;
  let fixture: ComponentFixture<EmployeesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
