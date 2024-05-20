import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProfesionesComponent } from './form-profesiones.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormProfesionesComponent', () => {
  let component: FormProfesionesComponent;
  let fixture: ComponentFixture<FormProfesionesComponent>;




  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProfesionesComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProfesionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
