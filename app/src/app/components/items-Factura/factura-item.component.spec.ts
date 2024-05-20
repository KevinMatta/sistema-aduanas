import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFacturaitemComponent } from './factura-item.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormFacturaitemComponent', () => {
  let component: FormFacturaitemComponent;
  let fixture: ComponentFixture<FormFacturaitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFacturaitemComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFacturaitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
