import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropVarietyCard } from './crop-variety-card';

describe('CropVarietyCard', () => {
  let component: CropVarietyCard;
  let fixture: ComponentFixture<CropVarietyCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropVarietyCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropVarietyCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
