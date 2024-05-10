import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatEventComponent } from './stat-event.component';

describe('StatEventComponent', () => {
  let component: StatEventComponent;
  let fixture: ComponentFixture<StatEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatEventComponent]
    });
    fixture = TestBed.createComponent(StatEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
