import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleNode } from './cycle-node';

describe('CycleNode', () => {
  let component: CycleNode;
  let fixture: ComponentFixture<CycleNode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CycleNode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CycleNode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
