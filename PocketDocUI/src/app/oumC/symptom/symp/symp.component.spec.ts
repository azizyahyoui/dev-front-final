import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SympComponent } from './symp.component';

describe('SympComponent', () => {
  let component: SympComponent;
  let fixture: ComponentFixture<SympComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SympComponent]
    });
    fixture = TestBed.createComponent(SympComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
