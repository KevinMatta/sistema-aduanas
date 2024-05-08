import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEstadosComponent } from './form-estados.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormEstadosComponent', () => {
  let component: FormEstadosComponent;
  let fixture: ComponentFixture<FormEstadosComponent>;




  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEstadosComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
