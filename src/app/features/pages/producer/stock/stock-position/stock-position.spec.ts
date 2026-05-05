import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPosition } from './stock-position';

describe('StockPosition', () => {
  let component: StockPosition;
  let fixture: ComponentFixture<StockPosition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockPosition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockPosition);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
