import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pattern } from './pattern';

describe('Pattern', () => {
  let component: Pattern;
  let fixture: ComponentFixture<Pattern>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pattern]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pattern);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
