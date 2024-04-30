import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUbicacionComponent } from './form-ubicacion.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormUbicacionComponent', () => {
  let component: FormUbicacionComponent;
  let fixture: ComponentFixture<FormUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUbicacionComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
