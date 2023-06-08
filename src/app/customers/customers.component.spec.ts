import { ComponentFixture, TestBed } from '@angular/core/testing';

import { customersComponent } from './customers.component';

describe('customersComponent', () => {
  let component: customersComponent;
  let fixture: ComponentFixture<customersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [customersComponent]
    });
    fixture = TestBed.createComponent(customersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
