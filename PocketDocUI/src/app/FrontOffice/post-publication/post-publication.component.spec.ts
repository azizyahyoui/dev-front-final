import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPublicationComponent } from './post-publication.component';

describe('PostPublicationComponent', () => {
  let component: PostPublicationComponent;
  let fixture: ComponentFixture<PostPublicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostPublicationComponent]
    });
    fixture = TestBed.createComponent(PostPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
