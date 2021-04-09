import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuyenDetailComponent } from './huyen-detail.component';

describe('HuyenDetailComponent', () => {
  let component: HuyenDetailComponent;
  let fixture: ComponentFixture<HuyenDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuyenDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HuyenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
