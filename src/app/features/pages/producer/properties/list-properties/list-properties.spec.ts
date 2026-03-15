import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProperties } from './list-properties';

describe('ListProperties', () => {
  let component: ListProperties;
  let fixture: ComponentFixture<ListProperties>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProperties]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProperties);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
