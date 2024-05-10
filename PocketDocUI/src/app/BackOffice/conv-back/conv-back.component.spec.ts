import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvBackComponent } from './conv-back.component';

describe('ConvBackComponent', () => {
  let component: ConvBackComponent;
  let fixture: ComponentFixture<ConvBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvBackComponent]
    });
    fixture = TestBed.createComponent(ConvBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
