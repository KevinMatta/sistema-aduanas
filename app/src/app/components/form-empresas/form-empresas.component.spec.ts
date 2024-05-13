import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEmpresasComponent } from './form-empresas.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormContactoComponent', () => {
  let component: FormEmpresasComponent;
  let fixture: ComponentFixture<FormEmpresasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEmpresasComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
