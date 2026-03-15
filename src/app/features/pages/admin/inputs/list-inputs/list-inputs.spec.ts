import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInputs } from './list-inputs';

describe('ListInputs', () => {
  let component: ListInputs;
  let fixture: ComponentFixture<ListInputs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListInputs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListInputs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
