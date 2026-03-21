import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerForm } from './producer-form';

describe('ProducerForm', () => {
  let component: ProducerForm;
  let fixture: ComponentFixture<ProducerForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducerForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
