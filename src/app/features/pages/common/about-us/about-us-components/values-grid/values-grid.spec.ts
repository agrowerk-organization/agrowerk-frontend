import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuesGrid } from './values-grid';

describe('ValuesGrid', () => {
  let component: ValuesGrid;
  let fixture: ComponentFixture<ValuesGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValuesGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValuesGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
