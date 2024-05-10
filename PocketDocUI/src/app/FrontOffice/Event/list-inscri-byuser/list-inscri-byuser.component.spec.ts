import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInscriByuserComponent } from './list-inscri-byuser.component';

describe('ListInscriByuserComponent', () => {
  let component: ListInscriByuserComponent;
  let fixture: ComponentFixture<ListInscriByuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListInscriByuserComponent]
    });
    fixture = TestBed.createComponent(ListInscriByuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
