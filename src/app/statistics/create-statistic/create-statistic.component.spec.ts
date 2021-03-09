import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStatisticComponent } from './create-statistic.component';

describe('CreateStatisticComponent', () => {
  let component: CreateStatisticComponent;
  let fixture: ComponentFixture<CreateStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStatisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
