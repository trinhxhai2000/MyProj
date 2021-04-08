import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinhDetailComponent } from './tinh-detail.component';

describe('TinhDetailComponent', () => {
  let component: TinhDetailComponent;
  let fixture: ComponentFixture<TinhDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinhDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinhDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
