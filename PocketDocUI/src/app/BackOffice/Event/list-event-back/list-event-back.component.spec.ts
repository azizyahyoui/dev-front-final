import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEventBackComponent } from './list-event-back.component';

describe('ListEventBackComponent', () => {
  let component: ListEventBackComponent;
  let fixture: ComponentFixture<ListEventBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEventBackComponent]
    });
    fixture = TestBed.createComponent(ListEventBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
