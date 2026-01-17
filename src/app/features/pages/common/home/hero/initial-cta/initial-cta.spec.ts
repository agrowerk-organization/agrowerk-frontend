import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialCta } from './initial-cta';

describe('InitialCta', () => {
  let component: InitialCta;
  let fixture: ComponentFixture<InitialCta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialCta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialCta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
