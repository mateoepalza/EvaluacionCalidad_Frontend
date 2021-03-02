import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsDetatilComponent } from './statistics-detatil.component';

describe('StatisticsDetatilComponent', () => {
  let component: StatisticsDetatilComponent;
  let fixture: ComponentFixture<StatisticsDetatilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsDetatilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsDetatilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
