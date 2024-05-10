import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationsStatComponent } from './consultations-stat.component';

describe('ConsultationsStatComponent', () => {
  let component: ConsultationsStatComponent;
  let fixture: ComponentFixture<ConsultationsStatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultationsStatComponent]
    });
    fixture = TestBed.createComponent(ConsultationsStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
