import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerRegister } from './producer-register';

describe('ProducerRegister', () => {
  let component: ProducerRegister;
  let fixture: ComponentFixture<ProducerRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducerRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
