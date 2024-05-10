import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentaireComponent } from './post-commentaire.component';

describe('PostCommentaireComponent', () => {
  let component: PostCommentaireComponent;
  let fixture: ComponentFixture<PostCommentaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostCommentaireComponent]
    });
    fixture = TestBed.createComponent(PostCommentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
