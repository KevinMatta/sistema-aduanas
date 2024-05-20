import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFacturaEncabezadoComponent } from './factura-encabezado.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormFacturaEncabezadoComponent', () => {
  let component: FormFacturaEncabezadoComponent;
  let fixture: ComponentFixture<FormFacturaEncabezadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFacturaEncabezadoComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFacturaEncabezadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
