import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerLayout } from './producer-layout';

describe('ProducerLayout', () => {
  let component: ProducerLayout;
  let fixture: ComponentFixture<ProducerLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducerLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
