import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddiplomeComponent } from './adddiplome.component';

describe('AdddiplomeComponent', () => {
  let component: AdddiplomeComponent;
  let fixture: ComponentFixture<AdddiplomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdddiplomeComponent]
    });
    fixture = TestBed.createComponent(AdddiplomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
