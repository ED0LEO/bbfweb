import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeScheduleComponent } from './time-schedule.component';

describe('TimeScheduleComponent', () => {
  let component: TimeScheduleComponent;
  let fixture: ComponentFixture<TimeScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeScheduleComponent]
    });
    fixture = TestBed.createComponent(TimeScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
