import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsApproval } from './assets-approval';

describe('AssetsApproval', () => {
  let component: AssetsApproval;
  let fixture: ComponentFixture<AssetsApproval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsApproval]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsApproval);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
