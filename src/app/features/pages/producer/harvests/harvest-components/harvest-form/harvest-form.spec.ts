import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestForm } from './harvest-form';

describe('HarvestForm', () => {
  let component: HarvestForm;
  let fixture: ComponentFixture<HarvestForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HarvestForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarvestForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
