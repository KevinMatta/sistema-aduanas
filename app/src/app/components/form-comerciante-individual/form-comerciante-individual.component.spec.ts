import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComercianteIndividualComponent } from './form-comerciante-individual.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { FormUbicacionComponent } from '../form-ubicacion/form-ubicacion.component';

describe('FormComercianteIndividualComponent', () => {
  let component: FormComercianteIndividualComponent;
  let fixture: ComponentFixture<FormComercianteIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComercianteIndividualComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComercianteIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
