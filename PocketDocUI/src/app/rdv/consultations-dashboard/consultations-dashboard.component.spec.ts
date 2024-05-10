import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationsDashboardComponent } from './consultations-dashboard.component';

describe('ConsultationsDashboardComponent', () => {
  let component: ConsultationsDashboardComponent;
  let fixture: ComponentFixture<ConsultationsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultationsDashboardComponent]
    });
    fixture = TestBed.createComponent(ConsultationsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
