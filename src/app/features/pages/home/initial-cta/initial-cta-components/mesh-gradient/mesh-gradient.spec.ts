import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeshGradient } from './mesh-gradient';

describe('MeshGradient', () => {
  let component: MeshGradient;
  let fixture: ComponentFixture<MeshGradient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeshGradient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeshGradient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
