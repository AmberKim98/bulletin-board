import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateConfirmComponent } from './user-create-confirm.component';

describe('UserCreateConfirmComponent', () => {
  let component: UserCreateConfirmComponent;
  let fixture: ComponentFixture<UserCreateConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreateConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCreateConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
