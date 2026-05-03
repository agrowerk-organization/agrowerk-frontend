import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropVarieties } from './crop-varieties';

describe('CropVarieties', () => {
  let component: CropVarieties;
  let fixture: ComponentFixture<CropVarieties>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropVarieties]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropVarieties);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
