import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleField } from './toggle-field';

describe('ToggleField', () => {
  let component: ToggleField;
  let fixture: ComponentFixture<ToggleField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
