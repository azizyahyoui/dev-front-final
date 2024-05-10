import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEventFrontComponent } from './list-event-front.component';

describe('ListEventFrontComponent', () => {
  let component: ListEventFrontComponent;
  let fixture: ComponentFixture<ListEventFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEventFrontComponent]
    });
    fixture = TestBed.createComponent(ListEventFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
