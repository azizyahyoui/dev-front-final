import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiGeminiComponent } from './affi-gemini.component';

describe('AffiGeminiComponent', () => {
  let component: AffiGeminiComponent;
  let fixture: ComponentFixture<AffiGeminiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffiGeminiComponent]
    });
    fixture = TestBed.createComponent(AffiGeminiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
