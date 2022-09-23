import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsCreateUpdateComponent } from './posts-create-update.component';

describe('PostsCreateUpdateComponent', () => {
  let component: PostsCreateUpdateComponent;
  let fixture: ComponentFixture<PostsCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
