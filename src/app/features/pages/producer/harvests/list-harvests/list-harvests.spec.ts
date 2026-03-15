import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHarvests } from './list-harvests';

describe('ListHarvests', () => {
  let component: ListHarvests;
  let fixture: ComponentFixture<ListHarvests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListHarvests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHarvests);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
