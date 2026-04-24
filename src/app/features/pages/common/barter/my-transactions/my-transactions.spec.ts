import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTransactions } from './my-transactions';

describe('MyTransactions', () => {
  let component: MyTransactions;
  let fixture: ComponentFixture<MyTransactions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTransactions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTransactions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
