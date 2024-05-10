import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationChartComponentComponent } from './consultation-chart-component.component';

describe('ConsultationChartComponentComponent', () => {
  let component: ConsultationChartComponentComponent;
  let fixture: ComponentFixture<ConsultationChartComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultationChartComponentComponent]
    });
    fixture = TestBed.createComponent(ConsultationChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
