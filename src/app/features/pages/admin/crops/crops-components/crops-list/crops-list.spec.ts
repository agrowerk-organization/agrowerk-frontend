import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropsList } from './crops-list';

describe('CropsList', () => {
  let component: CropsList;
  let fixture: ComponentFixture<CropsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
