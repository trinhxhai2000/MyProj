import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTinhComponent } from './add-tinh.component';

describe('AddTinhComponent', () => {
  let component: AddTinhComponent;
  let fixture: ComponentFixture<AddTinhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTinhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
