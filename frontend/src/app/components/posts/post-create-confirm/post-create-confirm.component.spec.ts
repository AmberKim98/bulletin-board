import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreateConfirmComponent } from './post-create-confirm.component';

describe('PostCreateConfirmComponent', () => {
  let component: PostCreateConfirmComponent;
  let fixture: ComponentFixture<PostCreateConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCreateConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCreateConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
