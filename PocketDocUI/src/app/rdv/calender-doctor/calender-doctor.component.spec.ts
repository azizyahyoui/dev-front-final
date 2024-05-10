import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderDoctorComponent } from './calender-doctor.component';

describe('CalenderDoctorComponent', () => {
  let component: CalenderDoctorComponent;
  let fixture: ComponentFixture<CalenderDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalenderDoctorComponent]
    });
    fixture = TestBed.createComponent(CalenderDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
