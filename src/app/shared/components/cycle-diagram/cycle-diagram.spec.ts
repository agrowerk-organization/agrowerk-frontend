import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleDiagram } from './cycle-diagram';

describe('CycleDiagram', () => {
  let component: CycleDiagram;
  let fixture: ComponentFixture<CycleDiagram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CycleDiagram]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CycleDiagram);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
