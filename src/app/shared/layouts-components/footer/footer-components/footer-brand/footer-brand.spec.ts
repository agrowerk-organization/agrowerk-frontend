import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterBrand } from './footer-brand';

describe('FooterBrand', () => {
  let component: FooterBrand;
  let fixture: ComponentFixture<FooterBrand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterBrand]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterBrand);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
