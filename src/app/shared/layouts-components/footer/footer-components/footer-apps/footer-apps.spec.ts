import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterApps } from './footer-apps';

describe('FooterApps', () => {
  let component: FooterApps;
  let fixture: ComponentFixture<FooterApps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterApps]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterApps);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
