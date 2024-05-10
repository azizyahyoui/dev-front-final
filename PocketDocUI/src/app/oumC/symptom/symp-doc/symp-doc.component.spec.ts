import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SympDocComponent } from './symp-doc.component';

describe('SympDocComponent', () => {
  let component: SympDocComponent;
  let fixture: ComponentFixture<SympDocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SympDocComponent]
    });
    fixture = TestBed.createComponent(SympDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
