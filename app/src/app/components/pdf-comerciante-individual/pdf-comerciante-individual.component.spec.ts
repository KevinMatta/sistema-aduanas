import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfComercianteIndividualComponent } from './pdf-comerciante-individual.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { FormUbicacionComponent } from '../form-ubicacion/form-ubicacion.component';

describe('PdfComercianteIndividualComponent', () => {
  let component: PdfComercianteIndividualComponent;
  let fixture: ComponentFixture<PdfComercianteIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfComercianteIndividualComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfComercianteIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
