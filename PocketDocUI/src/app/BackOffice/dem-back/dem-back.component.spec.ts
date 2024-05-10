import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemBackComponent } from './dem-back.component';

describe('DemBackComponent', () => {
  let component: DemBackComponent;
  let fixture: ComponentFixture<DemBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemBackComponent]
    });
    fixture = TestBed.createComponent(DemBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
