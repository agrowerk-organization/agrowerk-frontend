import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerBranding } from './producer-branding';

describe('ProducerBranding', () => {
  let component: ProducerBranding;
  let fixture: ComponentFixture<ProducerBranding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerBranding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducerBranding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
