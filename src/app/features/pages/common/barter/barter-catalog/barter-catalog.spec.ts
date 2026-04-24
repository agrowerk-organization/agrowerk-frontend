import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarterCatalog } from './barter-catalog';

describe('BarterCatalog', () => {
  let component: BarterCatalog;
  let fixture: ComponentFixture<BarterCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarterCatalog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarterCatalog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
