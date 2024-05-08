import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContactoComponent } from './form-contacto.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormContactoComponent', () => {
  let component: FormContactoComponent;
  let fixture: ComponentFixture<FormContactoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormContactoComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
