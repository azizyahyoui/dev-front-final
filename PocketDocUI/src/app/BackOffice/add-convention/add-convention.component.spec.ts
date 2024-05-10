import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConventionComponent } from './add-convention.component';

describe('AddConventionComponent', () => {
  let component: AddConventionComponent;
  let fixture: ComponentFixture<AddConventionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddConventionComponent]
    });
    fixture = TestBed.createComponent(AddConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
