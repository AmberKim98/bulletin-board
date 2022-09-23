import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCSVComponent } from './upload-csv.component';

describe('UploadCSVComponent', () => {
  let component: UploadCSVComponent;
  let fixture: ComponentFixture<UploadCSVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCSVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadCSVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
