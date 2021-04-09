import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuyenComponent } from './huyen.component';

describe('HuyenComponent', () => {
  let component: HuyenComponent;
  let fixture: ComponentFixture<HuyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuyenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
