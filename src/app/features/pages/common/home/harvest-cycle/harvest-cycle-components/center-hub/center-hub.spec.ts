import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterHub } from './center-hub';

describe('CenterHub', () => {
  let component: CenterHub;
  let fixture: ComponentFixture<CenterHub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CenterHub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterHub);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
