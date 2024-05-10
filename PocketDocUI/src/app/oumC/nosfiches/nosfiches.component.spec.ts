import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosfichesComponent } from './nosfiches.component';

describe('NosfichesComponent', () => {
  let component: NosfichesComponent;
  let fixture: ComponentFixture<NosfichesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NosfichesComponent]
    });
    fixture = TestBed.createComponent(NosfichesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
