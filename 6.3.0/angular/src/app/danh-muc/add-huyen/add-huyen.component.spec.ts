import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHuyenComponent } from './add-huyen.component';

describe('AddHuyenComponent', () => {
  let component: AddHuyenComponent;
  let fixture: ComponentFixture<AddHuyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHuyenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
